/* ==========================================================================
   mobile-shell.js · S1 手机端外壳
   不改动 app.js 的既有逻辑，只在外层接管：导航、排布可见性、双心上下排、
   歌词折叠、手势与安全区。桌面端（>820px）行为保持原样。
   ========================================================================== */
(function () {
  const MOBILE_MAX = 820;
  const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
  const isMobile = () => mq.matches;
  const $ = (id) => document.getElementById(id);

  const statusDays = $("mStatusDays");
  const dock = $("mDock");
  const sheet = $("mSheet");

  /* ---------------- 图片预载（页面一打开就取，别等相册建好） ---------------- */
  (function preloadPhotos() {
    const urls = ((typeof CONFIG !== "undefined" && CONFIG.photos) || []).map((p) => p.src);
    if (!urls.length) return;
    const bar = $("progressBar");
    let done = 0;
    const bump = () => {
      done++;
      if (bar) bar.style.width = Math.round((done / urls.length) * 100) + "%";
    };
    urls.forEach((src) => {
      const im = new Image();
      im.decoding = "async";
      im.onload = bump;
      im.onerror = () => {
        // 冷启动偶尔会 404，隔一会儿再取一次
        setTimeout(() => {
          const retry = new Image();
          retry.onload = bump;
          retry.onerror = bump;
          retry.src = src + "?retry=1";
        }, 800);
      };
      im.src = src;
    });
  })();
  const sheetButtons = Array.from(document.querySelectorAll(".m-modes button"));
  const lyricOverlay = $("lyricOverlay");
  const lyricMin = $("lyricMin");
  const musicBtn = dock ? dock.querySelector('[data-act="music"]') : null;
  const albumScreen = $("albumScreen");

  /* ---------------- 顶部天数 ---------------- */
  function tickDays() {
    if (!statusDays) return;
    const start = new Date(CONFIG.loveStartAt).getTime();
    if (!Number.isFinite(start)) return;
    statusDays.textContent = String(Math.floor(Math.max(0, Date.now() - start) / 86400000));
  }
  tickDays();
  setInterval(tickDays, 1000);

  /* ---------------- 排布可见性 ---------------- */
  function syncMode(mode) {
    document.body.dataset.layout = mode;
    sheetButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode));
    });
    /* 平铺是"翻照片"模式，歌词自动收成一条细条，别压住照片 */
    if (typeof setLyricMin === "function") setLyricMin(isMobile() && mode === "grid");
  }
  syncMode(typeof layoutMode === "string" ? layoutMode : "carousel");

  const _setLayoutMode = setLayoutMode;
  setLayoutMode = function (mode, immediate) {
    _setLayoutMode(mode, immediate);
    syncMode(layoutMode);
  };

  const _renderLayout = renderLayout;
  renderLayout = function (now, force) {
    if (isMobile() && layoutMode === "grid") return;
    return _renderLayout(now, force);
  };

  /* ---------------- 双心：手机上下排 ---------------- */
  /* 心形散点：用隐式方程在爱心内部取点，再用最远点采样铺满。
     照片少时铺成"一颗实心爱心"，比 7 张卡片描边更像心。 */
  const HEART_POINTS = (() => {
    let seed = 20260101;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const raw = [];
    let guard = 0;
    while (raw.length < 2600 && guard < 60000) {
      guard++;
      const x = (rnd() * 2 - 1) * 1.25;
      const y = (rnd() * 2 - 1) * 1.3;
      const inside = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3) <= 0;
      if (inside) raw.push([x, y]);
    }
    const xs = raw.map((p) => p[0]);
    const ys = raw.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const norm = raw.map(([x, y]) => [
      (x - minX) / (maxX - minX) - 0.5,
      (y - minY) / (maxY - minY) - 0.5
    ]);
    return norm;
  })();

  function filledHeartSlots(count) {
    const pool = HEART_POINTS;
    const picked = [];
    /* 从最下方的尖开始，逐点取"离已有点最远"的候选，保证铺得均匀 */
    let start = 0;
    let bestY = Infinity;
    pool.forEach((p, i) => {
      if (p[1] < bestY) {
        bestY = p[1];
        start = i;
      }
    });
    picked.push(pool[start]);
    const dist2 = pool.map((p) => (p[0] - pool[start][0]) ** 2 + (p[1] - pool[start][1]) ** 2);
    for (let k = 1; k < count; k++) {
      let idx = 0;
      let far = -1;
      for (let i = 0; i < pool.length; i++) {
        if (dist2[i] > far) {
          far = dist2[i];
          idx = i;
        }
      }
      const p = pool[idx];
      picked.push(p);
      for (let i = 0; i < pool.length; i++) {
        const d = (pool[i][0] - p[0]) ** 2 + (pool[i][1] - p[1]) ** 2;
        if (d < dist2[i]) dist2[i] = d;
      }
    }
    return picked;
  }

  const _computeTargetStates = computeTargetStates;
  computeTargetStates = function (mode, now = performance.now()) {
    const states = _computeTargetStates(mode, now);
    if (mode !== "heart" || !isMobile() || !albumScreen) return states;

    const rect = albumStage.getBoundingClientRect();
    if (!rect.width || !rect.height) return states;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const total = states.length;
    /* 照片少时一颗实心爱心；照片多了才拆成上下两颗 */
    const single = total < 24;

    if (single) {
      const size = Math.min(rect.width * 0.92, rect.height * 0.62);
      const slots = filledHeartSlots(total);
      return states.map((state, index) => {
        const slot = slots[index % slots.length];
        const depth = 0.55 + ((slot[1] + 0.5) * 0.45);
        return {
          ...state,
          x: centerX + slot[0] * size,
          y: centerY - slot[1] * size,
          scale: 0.34 + depth * 0.14,
          opacity: 0.78 + depth * 0.22,
          brightness: 0.94 + depth * 0.12,
          saturate: 1 + depth * 0.06,
          blur: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: ((index % 5) - 2) * 2.4,
          depth
        };
      });
    }

    const perHeart = Math.max(1, Math.ceil(total / 2));
    const countA = Math.min(perHeart, total);
    const countB = Math.max(1, total - perHeart);
    const scale = Math.min(rect.width * 0.60, rect.height * 0.28) / 32;
    const gap = Math.min(rect.height * 0.27, 190);
    const loop = heartLoopRotation;

    return states.map((state, index) => {
      const which = index < perHeart ? 0 : 1;
      const count = which === 0 ? countA : countB;
      const local = index % perHeart;
      const v = (local + (loop % count)) % count;
      const t = (Math.PI * 2 * v) / count;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy =
        13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const depth = (Math.cos(t - Math.PI / 2) + 1) / 2;
      const wave = Math.sin(now * 0.0018 + local * 0.7 + which * 1.3) * 3;
      const dir = which === 0 ? -gap : gap;
      return {
        ...state,
        x: centerX + hx * scale,
        y: centerY + dir - hy * scale * 0.92 + wave,
        scale: 0.34 + depth * 0.20,
        opacity: 0.62 + depth * 0.38,
        brightness: 0.92 + depth * 0.14,
        saturate: 1 + depth * 0.08,
        blur: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: Math.sin(t) * 4,
        depth
      };
    });
  };

  /* ---------------- 面板开合 ---------------- */
  function openSheet() {
    if (!sheet) return;
    sheet.classList.add("show");
    sheet.setAttribute("aria-hidden", "false");
  }
  function closeSheet() {
    if (!sheet) return;
    sheet.classList.remove("show");
    sheet.setAttribute("aria-hidden", "true");
  }

  sheetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      closeSheet();
      setLayoutMode(mode);
      showSubtitle(modeLabel(mode), "换一种看法", 1600);
    });
  });
  document.querySelectorAll("[data-close-sheet]").forEach((el) =>
    el.addEventListener("click", closeSheet)
  );

  function modeLabel(mode) {
    const map = {
      carousel: "照片开始绕着你转。",
      heart: "把照片拼成两颗心。",
      grid: "一页一页翻着看。",
      galaxy: "像星系一样散开。",
      film: "像一段旧胶片。",
      focus: "这一张，先看它。"
    };
    return map[mode] || "换一种看法。";
  }

  /* ---------------- 音乐 ---------------- */
  function syncMusicBtn() {
    if (!musicBtn) return;
    const playing = !bgm.paused;
    musicBtn.classList.toggle("is-on", playing);
    const label = musicBtn.querySelector("em");
    if (label) label.textContent = playing ? "播放中" : "音乐";
  }
  bgm.addEventListener("play", syncMusicBtn);
  bgm.addEventListener("pause", syncMusicBtn);
  syncMusicBtn();

  /* ---------------- 工具条 ---------------- */
  if (dock) {
    dock.addEventListener("click", async (event) => {
      const btn = event.target.closest("button[data-act]");
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === "layout") {
        openSheet();
        return;
      }
      if (act === "timeline") {
        closeSheet();
        openTimeline();
        return;
      }
      if (act === "letter") {
        closeSheet();
        openLetter();
        return;
      }
      if (act === "music") {
        if (!bgm.paused) {
          bgm.pause();
          return;
        }
        const ok = await unlockAudioAndPlay(activeSongIndex);
        if (!ok) showSubtitle("音乐没打开，检查一下 music 文件夹。", "声音", 2400);
        syncMusicBtn();
      }
    });
  }

  /* ---------------- 歌词折叠 ---------------- */
  function setLyricMin(min) {
    document.body.dataset.lyric = min ? "min" : "";
  }
  if (lyricMin) {
    lyricMin.addEventListener("click", (event) => {
      event.stopPropagation();
      setLyricMin(document.body.dataset.lyric !== "min");
    });
  }
  if (lyricOverlay) {
    lyricOverlay.addEventListener("click", () => {
      if (document.body.dataset.lyric === "min") setLyricMin(false);
    });
  }

  /* ---------------- 大图手势：左右切、下滑关 ---------------- */
  let touchStartX = 0;
  let touchStartY = 0;
  let touchActive = false;
  photoModal.addEventListener(
    "touchstart",
    (event) => {
      const t = event.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchActive = true;
    },
    { passive: true }
  );
  photoModal.addEventListener(
    "touchend",
    (event) => {
      if (!touchActive) return;
      touchActive = false;
      const t = event.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx) && dy > 0) {
        closePhoto();
        return;
      }
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        const dir = dx < 0 ? 1 : -1;
        updateModalContent(currentOpenIndex + dir, dir);
      }
    },
    { passive: true }
  );

  /* ---------------- 图片失败自动重试（别让一张图永久空白） ---------------- */
  document.addEventListener(
    "error",
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (!img.closest("#carousel") && !img.closest(".mobile-gallery") && !img.closest(".modal")) return;
      const tries = Number(img.dataset.retry || 0);
      if (tries >= 2) return;
      img.dataset.retry = String(tries + 1);
      const base = (img.getAttribute("src") || "").split("?")[0];
      if (!base) return;
      setTimeout(() => {
        img.src = base + "?r=" + Date.now();
      }, 700 * (tries + 1));
    },
    true
  );

  /* ---------------- 双击不再切布局 ---------------- */
  document.addEventListener(
    "dblclick",
    (event) => {
      if (event.target.closest("#albumStage")) event.stopPropagation();
    },
    true
  );

  /* ---------------- 综艺字幕自动退场 ---------------- */
  let subtitleTimer2 = 0;
  const _showSubtitle = showSubtitle;
  showSubtitle = function (text, tag, duration) {
    _showSubtitle(text, tag, duration);
    subtitleBar.classList.remove("m-faded");
    clearTimeout(subtitleTimer2);
    subtitleTimer2 = setTimeout(() => subtitleBar.classList.add("m-faded"), 3800);
  };

  /* ---------------- 首次提示 ---------------- */
  const tip = document.createElement("div");
  tip.className = "m-tip";
  tip.textContent = "拖一下可以转 · 点照片看大图";
  if (albumScreen) albumScreen.appendChild(tip);
  setTimeout(() => tip.remove(), 4200);

  /* ---------------- 尺寸变化时刷新 ---------------- */
  const onViewportChange = () => {
    if (!isMobile()) {
      document.body.dataset.lyric = "";
      closeSheet();
    }
    renderLayout(performance.now(), true);
  };
  mq.addEventListener ? mq.addEventListener("change", onViewportChange) : mq.addListener(onViewportChange);

  window.__MOBILE__ = { isMobile, setLyricMin };
})();
