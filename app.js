const CONFIG = {
  password: "520",
  albumTitle: "送给你的云端相册",
  // 修改这里为你们正式在一起的时间，例如："2023-08-20T20:00:00+08:00"
  loveStartAt: "2024-01-01T00:00:00+08:00",
  photoCount: 14,
  stickers: ["甜度超标", "想一直保存", "回忆特写", "那天的光", "喜欢这页", "私藏镜头", "今天也想你", "续集预定", "一眼收藏", "高光时刻"],
  songs: [
    {
      key: "1",
      title: "队长 - 予你",
      src: "music/1.mp3",
      lyrics: [
        { time: 0, text: "这一首，留给最柔软的靠近。" },
        { time: 5, text: "像把晚风装进信封，只想递给你。" },
        { time: 12, text: "照片慢慢漂浮，心事也慢慢亮起。" },
        { time: 20, text: "这一页写不完，就交给下一次见面。" }
      ]
    },
    {
      key: "2",
      title: "汪苏泷 - 像晴天像雨天",
      src: "music/2.mp3",
      lyrics: [
        { time: 0, text: "像晴天，也像雨天，都是想见你的天气。" },
        { time: 6, text: "光落下来时，照片也跟着变温柔。" },
        { time: 14, text: "有些心动不吵，只在画面边缘发亮。" },
        { time: 23, text: "愿每一种天气，都能走到你身边。" }
      ]
    },
    {
      key: "3",
      title: "长岛加冰",
      src: "music/3.mp3",
      lyrics: [
        { time: 0, text: "长岛加冰，回忆加一点微醺。" },
        { time: 5, text: "灯光很轻，照片慢慢从夜色里浮起。" },
        { time: 13, text: "我把普通瞬间，调成只属于我们的甜度。" },
        { time: 22, text: "这一杯敬过去，也敬还没发生的以后。" }
      ]
    },
    {
      key: "4",
      title: "朗杰 - bumola",
      src: "music/4.mp3",
      lyrics: [
        { time: 0, text: "节奏响起，照片像小星球一样绕着你。" },
        { time: 6, text: "每一次切换，都是一场轻轻的靠近。" },
        { time: 14, text: "把一张照片取出来，放在你喜欢的位置。" },
        { time: 24, text: "这一刻不必解释，只要跟着旋律漂浮。" }
      ]
    },
    {
      key: "5",
      title: "卓沅 - not angry",
      src: "music/5.mp3",
      lyrics: [
        { time: 0, text: "不生气，今天只负责喜欢你。" },
        { time: 6, text: "把小别扭折成纸船，放进温柔的夜里。" },
        { time: 15, text: "你看，连照片都在偷偷靠近。" },
        { time: 24, text: "下一秒也许会笑，那就先收藏这一秒。" }
      ]
    }
  ],
  currentSongIndex: 0,
  lyrics: [
    { time: 0, text: "按下音乐，让回忆跟着旋律浮起来。" },
    { time: 4, text: "我把照片放进云里，也把你放进心里。" },
    { time: 9, text: "风吹过那天的路，光停在你的眼睛里。" },
    { time: 15, text: "每一页都不吵，只偷偷说一句喜欢你。" },
    { time: 22, text: "那些普通瞬间，被你一笑就变得很亮。" },
    { time: 29, text: "如果回忆会开花，今天应该是粉色的。" },
    { time: 36, text: "故事慢慢翻页，我们慢慢往后走。" },
    { time: 44, text: "下一张照片，留给下一个拥抱。" },
    { time: 52, text: "这份礼物不大，但每一秒都是真的。" }
  ],
  photos: Array.from({ length: 14 }, (_, i) => {
    const n = i + 1;
    const titles = [
      "第一张想留下的照片",
      "那天的光刚刚好",
      "普通日子里的小事",
      "被我偷偷收藏的一页",
      "一起走过的路",
      "那一刻刚好看见你",
      "这一页给你",
      "故事还在继续",
      "今天也想保存",
      "藏在相册里的小瞬间"
    ];
    const descs = [
      "这张照片不一定最清楚，但它很像一个小开关，一打开，很多记忆就亮了。",
      "后来我看了很多次，还是觉得那天的你，比照片里还要生动一点。",
      "真正舍不得删的，往往不是大场面，是这些看起来没什么的小瞬间。",
      "有些笑容很短，但会在脑子里住很久。",
      "路边的风、灯、影子，还有你说话时的语气，我都想放进这里。",
      "我不是很会说漂亮话，所以把这些照片排好，替我多说一点。",
      "以后翻到这里，希望你会觉得，那段时间真的很值得。",
      "这个相册没有真正的最后一页，因为后面的照片，我们还没拍完。",
      "这不是一张完美照片，但它是一个很想反复看的瞬间。",
      "我把它放在这里，像给那天留了一个小小座位。"
    ];
    return {
      src: `photos/${n}.jpg`,
      title: titles[i % titles.length],
      date: `MEMORY ${String(n).padStart(2, "0")}`,
      desc: descs[i % descs.length]
    };
  }),
  timeline: [
    { date: "01", title: "第一次被认真保存", text: "从某一张照片开始，普通的一天变成了可以反复翻看的记忆。" },
    { date: "02", title: "一起吃过的饭", text: "有些快乐很具体，可能就是一张桌子、两双筷子，还有一句没说完的话。" },
    { date: "03", title: "一起走过的地方", text: "地图上只是一个点，放进回忆里，就变成了一整段路。" },
    { date: "04", title: "新的照片还没拍", text: "这里先空着，等我们慢慢填。" }
  ]
};

const screens = {
  intro: document.getElementById("introScreen"),
  password: document.getElementById("passwordScreen"),
  loading: document.getElementById("loadingScreen"),
  album: document.getElementById("albumScreen")
};
const storyProgress = document.getElementById("storyProgress");
const storySteps = Array.from(document.querySelectorAll(".story-step"));
const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const loadingLines = document.getElementById("loadingLines");
const progressBar = document.getElementById("progressBar");
const carousel = document.getElementById("carousel");
const mobileGallery = document.getElementById("mobileGallery");
const photoModal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");
const modalDate = document.getElementById("modalDate");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
let modalCounter = null;
let modalTextSwapTimer = null;
const modalSticker = document.getElementById("modalSticker");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const timelinePanel = document.getElementById("timelinePanel");
const letterPanel = document.getElementById("letterPanel");
const timelineBtn = document.getElementById("timelineBtn");
const letterBtn = document.getElementById("letterBtn");
const timelineList = document.getElementById("timelineList");
const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");
const albumStage = document.getElementById("albumStage");
const dragTip = document.getElementById("dragTip");
const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
const letterTypingArea = document.getElementById("letterTypingArea");
const subtitleBar = document.getElementById("subtitleBar");
const subtitleText = document.getElementById("subtitleText");
const subtitleTag = document.getElementById("subtitleTag");
const sfxBadge = document.getElementById("sfxBadge");
const centerOrb = document.getElementById("centerOrb");
const beatHint = document.getElementById("beatHint");
const beatFlash = document.getElementById("beatFlash");
const soundEnableBtn = document.getElementById("soundEnableBtn");
const audioDebugTip = document.createElement("div");
audioDebugTip.className = "audio-debug-tip";
document.body.appendChild(audioDebugTip);
const lyricLine = document.getElementById("lyricLine");
const lyricPrev = document.getElementById("lyricPrev");
const lyricNext = document.getElementById("lyricNext");
const beatBars = Array.from(document.querySelectorAll("#beatBars .bar"));
const lyricOverlay = document.getElementById("lyricOverlay");
const resetDragBtn = document.getElementById("resetDragBtn");
const layoutToast = document.createElement("div");
layoutToast.className = "layout-toast";
document.body.appendChild(layoutToast);
const loveDuration = document.getElementById("loveDuration");

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
const fxCanvas = document.getElementById("fxCanvas");
const fxCtx = fxCanvas.getContext("2d");

let albumBuilt = false;
let cards = [];
let mobileCards = [];
let rotation = 0;
let targetRotation = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartRotation = 0;
let movedDuringDrag = false;
let lastFrame = performance.now();
let layoutMode = "carousel";
let heartLoopRotation = 0;
let heartLoopSpeed = 0.0005;
let focusManualIndex = 0;
let focusManualActiveUntil = 0;
let currentStates = [];
let displayStates = [];
let transitionState = null;
let stars = [];
let particles = [];
let foregroundHearts = [];
let mouseHearts = [];
let lastMouseHeartTime = 0;
let mouseHeartPos = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
let heartLoopPausedUntil = 0;
let trailLastEmit = 0;
let currentOpenSource = null;
let currentOpenIndex = 0;
let pinnedCards = new Map();
let photoDrag = null;
let lastLyricIndex = -1;
let activeSongIndex = CONFIG.currentSongIndex || 0;
let wheelLock = false;
let gridPage = 0;
let gridFlipState = null;
const GRID_FLIP_DURATION = 920;
let typingTimer = null;
let subtitleTimer = null;
let audioCtx = null;
let analyser = null;
let analyserData = null;
let bgmLinked = false;
let fakeBeatT = 0;
let audioUnlocked = false;
let pendingSongIndex = 0;
let lastAudioError = "";
let hasFirstInteractionUnlockedAudio = false;

function pad2(num) {
  return String(num).padStart(2, "0");
}

function updateLoveDuration() {
  if (!loveDuration) return;
  const start = new Date(CONFIG.loveStartAt);
  const time = start.getTime();
  const daysEl = loveDuration.querySelector("[data-love='days']");
  const hoursEl = loveDuration.querySelector("[data-love='hours']");
  const minutesEl = loveDuration.querySelector("[data-love='minutes']");
  const secondsEl = loveDuration.querySelector("[data-love='seconds']");
  if (!Number.isFinite(time)) {
    loveDuration.classList.add("is-time-error");
    return;
  }
  loveDuration.classList.remove("is-time-error");
  let diff = Math.max(0, Date.now() - time);
  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  if (daysEl) daysEl.textContent = String(days);
  if (hoursEl) hoursEl.textContent = pad2(hours);
  if (minutesEl) minutesEl.textContent = pad2(minutes);
  if (secondsEl) secondsEl.textContent = pad2(seconds);
}

updateLoveDuration();
setInterval(updateLoveDuration, 1000);


function showSubtitle(text, tag = "综艺字幕", duration = 2300) {
  subtitleTag.textContent = tag;
  subtitleText.textContent = text;
  subtitleBar.style.opacity = "1";
  clearTimeout(subtitleTimer);
  subtitleTimer = setTimeout(() => {
    subtitleBar.style.opacity = "0.88";
  }, duration);
}

function showSfx(text) {
  sfxBadge.textContent = text;
  sfxBadge.classList.add("show");
  clearTimeout(showSfx.timer);
  showSfx.timer = setTimeout(() => sfxBadge.classList.remove("show"), 1200);
}

function updateStoryProgress(stepKey) {
  const order = ["intro", "password", "loading", "album", "letter"];
  const idx = order.indexOf(stepKey);
  storySteps.forEach((step, i) => {
    step.classList.toggle("active", i === idx);
    step.classList.toggle("done", i < idx);
  });
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("screen-active"));
  screens[name].classList.add("screen-active");
  updateStoryProgress(name);
}

openGiftBtn.addEventListener("click", () => {
  if (openGiftBtn.disabled) return;
  openGiftBtn.disabled = true;
  giftBox.classList.add("opening");
  showSubtitle("礼物开箱中——准备进入这份专属回忆。", "开箱时刻", 2600);
  showSfx("✨ OPEN GIFT");
  spawnGiftParticles();
  setTimeout(() => {
    showScreen("password");
    passwordInput.focus();
    showSubtitle("第一道小小关卡：输入纪念密码。", "剧情提示", 2400);
    openGiftBtn.disabled = false;
    giftBox.classList.remove("opening");
  }, 1250);
});

function spawnGiftParticles() {
  const rect = giftBox.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height * 0.35;
  for (let i = 0; i < 50; i++) {
    const ang = Math.random() * Math.PI * 2;
    const speed = 1.4 + Math.random() * 3.4;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - 1.4,
      life: 0,
      ttl: 650 + Math.random() * 480,
      size: 2 + Math.random() * 5,
      color: Math.random() > 0.4 ? "255,158,203" : (Math.random() > 0.5 ? "255,210,138" : "152,220,255"),
      heartShape: Math.random() > 0.72
    });
  }
}

function unlock() {
  const value = passwordInput.value.trim();
  if (value === CONFIG.password) {
    passwordError.textContent = "";
    showScreen("loading");
    showSubtitle("密码正确，正在解锁属于你们的回忆剧情。", "解锁成功", 2200);
    showSfx("🔓 UNLOCKED");
    runLoading();
  } else {
    passwordError.textContent = "密码不对，再想想那个只属于你们的小数字。";
    showSubtitle("密码错误，再试一次试试看。", "提示", 1900);
    passwordInput.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ], { duration: 260 });
  }
}
unlockBtn.addEventListener("click", unlock);
passwordInput.addEventListener("keydown", event => { if (event.key === "Enter") unlock(); });

function runLoading() {
  const lines = [
    "正在读取照片碎片...",
    "正在整理那些没有说出口的小瞬间...",
    "正在生成专属时间线...",
    "正在加入礼物网页剧情...",
    "正在给每一张照片加一点光...",
    "云端相册生成完成。"
  ];
  loadingLines.innerHTML = "";
  progressBar.style.width = "0%";
  lines.forEach((line, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "loading-line";
      div.textContent = "✦ " + line;
      loadingLines.appendChild(div);
      progressBar.style.width = `${Math.round(((index + 1) / lines.length) * 100)}%`;
      if (index === lines.length - 1) showSfx("✅ READY");
    }, index * 480);
  });

  setTimeout(() => {
    showScreen("album");
    buildAlbum();
    setLayoutMode("carousel", true);
    renderLayout(performance.now());
    showSubtitle("礼物已打开。现在可以开始浏览这些被认真保存的瞬间。", "剧情推进", 2800);
    setTimeout(() => showSubtitle("滚轮切换布局；R 归位；T 时间轴；X 信；Esc 返回。", "操作提示", 2600), 960);
  }, lines.length * 480 + 620);
}

function buildAlbum() {
  if (albumBuilt) return;
  albumBuilt = true;
  carousel.innerHTML = "";
  mobileGallery.innerHTML = "";
  cards = [];
  mobileCards = [];

  CONFIG.photos.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "photo-card";
    card.dataset.index = String(index);
    const sticker = CONFIG.stickers[index % CONFIG.stickers.length];
    card.innerHTML = `
      <div class="memory-sticker ${index % 2 ? 'alt' : ''}">${sticker}</div>
      <img src="${item.src}" alt="${item.title}" draggable="false">
      <span>${item.title}</span>
    `;
    const cardImg = card.querySelector("img");
    if (cardImg) {
      cardImg.addEventListener("error", () => {
        card.classList.add("image-missing");
      });
      cardImg.addEventListener("load", () => {
        card.classList.remove("image-missing");
      });
    }
    card.addEventListener("pointerdown", event => startPhotoDrag(event, index, card));
    card.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      if (!movedDuringDrag) openPhoto(index, card.querySelector("img"));
    });
    carousel.appendChild(card);
    cards.push(card);

    const mobile = document.createElement("button");
    mobile.type = "button";
    mobile.className = "mobile-photo";
    mobile.innerHTML = `
      <div class="memory-sticker ${index % 2 ? 'alt' : ''}">${sticker}</div>
      <img src="${item.src}" alt="${item.title}" draggable="false">
      <span>${item.title}</span>
    `;
    const mobileImg = mobile.querySelector("img");
    if (mobileImg) {
      mobileImg.addEventListener("error", () => mobile.classList.add("image-missing"));
      mobileImg.addEventListener("load", () => mobile.classList.remove("image-missing"));
    }
    mobile.addEventListener("click", () => openPhoto(index, mobile.querySelector("img")));
    mobileGallery.appendChild(mobile);
    mobileCards.push(mobile);
  });

  buildTimeline();
}

function buildTimeline() {
  timelineList.innerHTML = "";
  CONFIG.timeline.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "timeline-item story-card-item";
    div.innerHTML = `
      <div class="timeline-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="timeline-story-card">
        <div class="timeline-topline">
          <span class="timeline-chip">MEMORY CHAPTER</span>
          <div class="timeline-date">${item.date}</div>
        </div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    timelineList.appendChild(div);
  });
}

function updateDragTip() {
  if (!dragTip) return;
  const tips = {
    carousel: "环绕模式：照片围绕成弧形，可拖动旋转。",
    heart: "心形模式：照片会形成爱心，并沿爱心路径缓慢轮转。",
    grid: "平铺模式：固定 5×10，滚轮可在两组 50 张照片之间翻正反页。",
    galaxy: "银河螺旋：中心主照点亮，周围照片像星系一样旋开。",
    film: "胶片回忆：照片像电影胶片一样缓慢流动。",
    focus: "主照片聚焦：中央主图突出，周围照片轻轻环绕。"
  };
  dragTip.textContent = tips[layoutMode] || "滚轮切换展示方式。";
}

function setLayoutMode(mode, immediate = false) {
  const prevMode = layoutMode;
  layoutMode = mode;
  modeButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
  updateDragTip();

  if (mode !== "carousel") targetRotation = 0;
  if (immediate || currentStates.length === 0) {
    transitionState = null;
    renderLayout(performance.now(), true);
    return;
  }

  const fromStates = currentStates.map(s => ({ ...s }));
  const now = performance.now();
  displayStates = [];
  const burstMode = mode === "heart" && prevMode !== "heart";
  if (burstMode) heartLoopPausedUntil = now + 2200;
  const toStates = computeTargetStates(mode, now);

  transitionState = {
    mode,
    start: now,
    duration: burstMode ? 1680 : 820,
    type: burstMode ? "heart-burst" : "morph",
    fromStates,
    toStates
  };

  spawnModeParticles(fromStates, toStates, burstMode);
  const labelMap = {
    carousel: "环绕",
    heart: "心形",
    grid: "平铺",
    galaxy: "银河螺旋",
    film: "胶片回忆",
    focus: "主照片聚焦"
  };
  showSfx(labelMap[mode] || "MODE");
}
modeButtons.forEach(btn => btn.addEventListener("click", () => setLayoutMode(btn.dataset.mode)));

function computeTargetStates(mode, now = performance.now()) {
  const rect = albumStage.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2 + 8;
  const total = cards.length;

  return cards.map((card, index) => {
    let x = centerX, y = centerY, scale = 1, opacity = 1, brightness = 1, saturate = 1, blur = 0, rotateZ = 0, rotateX = 0, rotateY = 0, depth = 0.5;

    if (mode === "carousel") {
      // 100-photo three-layer orbit: fewer cards on top, more cards on the lower layers.
      // The three layers rotate as independent elliptical bands, giving the album more depth and less cover-up.
      const layerCounts = total >= 57 ? [24, 33, Math.max(0, total - 57)] : [Math.ceil(total * 0.42), Math.ceil(total * 0.33), Math.max(0, total - Math.ceil(total * 0.42) - Math.ceil(total * 0.33))];
      const layerMeta = [
        { offsetY: -Math.min(rect.height * 0.205, 142), rx: 0.34, maxRx: 470, ry: 0.060, maxRy: 50, speed: 1.18, phase: 0.34, size: 0.48 },
        { offsetY: -Math.min(rect.height * 0.020, 18),  rx: 0.43, maxRx: 610, ry: 0.085, maxRy: 72, speed: -0.92, phase: 1.40, size: 0.52 },
        { offsetY:  Math.min(rect.height * 0.190, 138), rx: 0.52, maxRx: 760, ry: 0.110, maxRy: 94, speed: 0.72, phase: 2.22, size: 0.56 }
      ];
      let layer = 0;
      let localIndex = index;
      let passed = 0;
      for (let li = 0; li < layerCounts.length; li++) {
        if (index < passed + layerCounts[li]) { layer = li; localIndex = index - passed; break; }
        passed += layerCounts[li];
      }
      const countInLayer = Math.max(1, layerCounts[layer]);
      const meta = layerMeta[layer];
      const radiusX = Math.min(rect.width * meta.rx, meta.maxRx);
      const radiusY = Math.min(rect.height * meta.ry, meta.maxRy);
      const angle = ((localIndex / countInLayer) * Math.PI * 2) + rotation * meta.speed + meta.phase;
      const sin = Math.sin(angle), cos = Math.cos(angle);
      const layerDepthBoost = layer * 0.075;
      depth = Math.max(0, Math.min(1.18, (cos + 1) / 2 + layerDepthBoost));
      x = centerX + sin * radiusX;
      y = centerY + meta.offsetY + cos * radiusY;
      scale = meta.size + depth * 0.34;
      opacity = 0.30 + Math.min(1, depth) * 0.70;
      blur = Math.max(0, (1 - Math.min(1, depth)) * (1.45 + layer * 0.16));
      rotateZ = sin * (layer === 1 ? 4.5 : -4.5);
      brightness = 0.72 + Math.min(1, depth) * 0.42;
      saturate = 0.9 + Math.min(1, depth) * 0.22;
    }

    if (mode === "heart") {
      // 100-photo double-heart layout: left heart uses photos 1-50, right heart uses photos 51-100.
      const perHeart = Math.max(1, Math.ceil(total / 2));
      const heartId = index < perHeart ? 0 : 1;
      const localIndex = index % perHeart;
      const countInHeart = heartId === 0 ? Math.min(perHeart, total) : Math.max(1, total - perHeart);
      const loopOffset = heartLoopRotation % countInHeart;
      const virtualIndex = (localIndex + loopOffset) % countInHeart;
      const t = (Math.PI * 2 * virtualIndex) / countInHeart;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const heartScale = Math.min(rect.width * 0.72, rect.height) * 0.0155;
      const heartGap = Math.min(rect.width * 0.265, 330);
      const heartCenterX = centerX + (heartId === 0 ? -heartGap / 2 : heartGap / 2);
      const wave = Math.sin(now * 0.0018 + localIndex * 0.7 + heartId * 1.3) * 4;
      x = heartCenterX + hx * heartScale;
      y = centerY - hy * heartScale * 0.88 + wave;
      depth = (Math.cos(t - Math.PI / 2) + 1) / 2;
      scale = 0.42 + depth * 0.22;
      opacity = 0.62 + depth * 0.38;
      rotateZ = Math.sin(t) * 4 + (heartId === 0 ? -1.2 : 1.2);
      brightness = 0.92 + depth * 0.14;
      saturate = 1.0 + depth * 0.08;
    }

    if (mode === "grid") {
      // Fixed 5 x 10 visible layout. With 100 photos it behaves like a two-sided card deck:
      // page 1 = photos 1-50, page 2 = photos 51-100.
      const cols = 10;
      const rows = 5;
      const pageSize = cols * rows;
      const page = index < pageSize ? 0 : 1;
      const slot = index % pageSize;
      const col = slot % cols;
      const row = Math.floor(slot / cols);
      const usableW = Math.min(rect.width * 0.94, 1320);
      const usableH = Math.min(rect.height * 0.72, 520);
      const gapX = cols > 1 ? usableW / (cols - 1) : 0;
      const gapY = rows > 1 ? usableH / (rows - 1) : 0;
      const startX = centerX - usableW / 2;
      const startY = centerY - usableH / 2;
      const wave = Math.sin(now * 0.0015 + slot * 0.8) * 3;
      x = startX + col * gapX;
      y = startY + row * gapY + wave;
      depth = 0.6 + (1 - row / Math.max(1, rows));
      scale = (0.56 + ((slot % 2) * 0.025)) * 1.08;
      rotateZ = slot % 2 === 0 ? -2.2 : 2.2;
      brightness = 0.95;
      saturate = 1.02;

      const activePage = gridFlipState ? gridFlipState.fromPage : gridPage;
      const isActive = page === activePage;
      opacity = isActive ? 1 : 0;
      rotateX = 0;
      rotateY = isActive ? 0 : (page === 0 ? -180 : 180);
      blur = isActive ? 0 : 0.65;

      if (gridFlipState) {
        const p = Math.max(0, Math.min(1, (now - gridFlipState.start) / gridFlipState.duration));
        const eased = easeInOutCubic(p);
        const sign = gridFlipState.direction >= 0 ? 1 : -1;
        const fromPage = gridFlipState.fromPage;
        const toPage = gridFlipState.toPage;
        const lift = Math.sin(p * Math.PI);
        scale *= 1 + lift * 0.035;
        blur = lift * 0.16;
        if (page === fromPage) {
          rotateY = sign * 180 * eased;
          opacity = 1;
          depth += 0.12 * (1 - eased);
        } else if (page === toPage) {
          rotateY = -sign * 180 * (1 - eased);
          opacity = 1;
          depth += 0.12 * eased;
        } else {
          opacity = 0;
          rotateY = page === 0 ? -180 : 180;
          blur = 0.65;
        }
      }
    }

    if (mode === "galaxy") {
      const phase = now * 0.00032;
      if (index === 0) {
        x = centerX;
        y = centerY - 2;
        scale = 1.16 + Math.sin(now * 0.0015) * 0.018;
        opacity = 1;
        depth = 1.2;
        rotateZ = Math.sin(now * 0.0011) * 1.8;
        brightness = 1.08;
        saturate = 1.08;
      } else {
        const i = index - 1;
        const arm = i % 3;
        const layer = Math.floor(i / 3);
        const angle = layer * 0.54 + arm * (Math.PI * 2 / 3) + phase * (1.2 - Math.min(0.62, layer / total));
        const radius = Math.max(54, rect.width * 0.15) + layer * Math.min(22, rect.width * 0.014);
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius * 0.62;
        const near = (Math.sin(angle) + 1) / 2;
        depth = 0.35 + near * 0.58 - layer * 0.002;
        scale = Math.max(0.38, 0.82 - layer * 0.006 + near * 0.12);
        opacity = Math.max(0.34, 0.94 - layer * 0.008);
        rotateZ = Math.cos(angle) * 8;
        blur = Math.max(0, layer * 0.015 - near * 0.25);
        brightness = 0.86 + near * 0.22;
        saturate = 0.92 + near * 0.14;
      }
    }

    if (mode === "film") {
      const speed = now * 0.05;
      const step = Math.min(168, Math.max(132, rect.width * 0.105));
      const totalWidth = total * step;
      let rawX = index * step - (speed % totalWidth);
      while (rawX < -totalWidth / 2) rawX += totalWidth;
      while (rawX > totalWidth / 2) rawX -= totalWidth;
      const focus = 1 - Math.min(1, Math.abs(rawX) / (rect.width * 0.48));
      x = centerX + rawX;
      y = centerY + Math.sin(index * 0.55 + now * 0.001) * 12;
      depth = 0.35 + focus * 0.75;
      scale = 0.66 + focus * 0.18;
      opacity = 0.48 + focus * 0.52;
      rotateZ = Math.sin(index * 0.5 + now * 0.0012) * 1.4;
      blur = Math.max(0, (1 - focus) * 0.7);
      brightness = 0.80 + focus * 0.22;
      saturate = 0.88 + focus * 0.16;
    }

    if (mode === "focus") {
      const autoIndex = Math.floor(now / 4200) % Math.max(1, total);
      const mainIndex = now < focusManualActiveUntil ? focusManualIndex % total : autoIndex;
      const relative = (index - mainIndex + total) % total;
      if (relative === 0) {
        x = centerX;
        y = centerY - 5;
        scale = 1.18 + Math.sin(now * 0.0014) * 0.014;
        opacity = 1;
        depth = 1.2;
        rotateZ = Math.sin(now * 0.0012) * 1.2;
        brightness = 1.08;
        saturate = 1.08;
        blur = 0;
      } else {
        const ringIndex = relative - 1;
        const ring = ringIndex % 2;
        const orbitIndex = Math.floor(ringIndex / 2);
        const count = Math.ceil((total - 1) / 2);
        const angle = (orbitIndex / Math.max(1, count)) * Math.PI * 2 + (ring ? -now * 0.00023 : now * 0.00028);
        const rx = ring ? Math.min(rect.width * 0.38, 560) : Math.min(rect.width * 0.27, 410);
        const ry = ring ? Math.min(rect.height * 0.25, 300) : Math.min(rect.height * 0.18, 220);
        const near = (Math.sin(angle) + 1) / 2;
        x = centerX + Math.cos(angle) * rx;
        y = centerY + Math.sin(angle) * ry;
        depth = 0.3 + near * 0.55 + (ring ? 0 : 0.12);
        scale = (ring ? 0.48 : 0.62) + near * 0.08;
        opacity = ring ? 0.46 + near * 0.25 : 0.66 + near * 0.28;
        rotateZ = Math.sin(angle) * 5;
        blur = ring ? 0.55 + (1 - near) * 0.4 : (1 - near) * 0.35;
        brightness = ring ? 0.74 + near * 0.16 : 0.84 + near * 0.18;
        saturate = ring ? 0.84 + near * 0.1 : 0.92 + near * 0.1;
      }
    }

    return { x, y, scale, opacity, brightness, saturate, blur, rotateZ, rotateX, rotateY, depth };
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

function drawStates(states, mode) {
  const rect = albumStage.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2 + 8;

  const smoothFactor = transitionState ? 0.18 : (mode === "carousel" ? 0.085 : 0.115);
  const smoothValue = (from, to, factor = smoothFactor) => {
    if (!Number.isFinite(from)) return to;
    return from + (to - from) * factor;
  };

  const rendered = states.map((s, index) => {
    const prev = displayStates[index] || s;
    const next = {
      x: smoothValue(prev.x, s.x),
      y: smoothValue(prev.y, s.y),
      scale: smoothValue(prev.scale, s.scale),
      opacity: smoothValue(prev.opacity, s.opacity, 0.18),
      brightness: smoothValue(prev.brightness, s.brightness, 0.16),
      saturate: smoothValue(prev.saturate, s.saturate, 0.16),
      blur: smoothValue(prev.blur, s.blur, 0.14),
      rotateZ: smoothValue(prev.rotateZ, s.rotateZ),
      rotateX: smoothValue(Number.isFinite(prev.rotateX) ? prev.rotateX : 0, Number.isFinite(s.rotateX) ? s.rotateX : 0, mode === "grid" ? 0.38 : 0.10),
      rotateY: mode === "grid" && gridFlipState
        ? (Number.isFinite(s.rotateY) ? s.rotateY : 0)
        : smoothValue(Number.isFinite(prev.rotateY) ? prev.rotateY : 0, Number.isFinite(s.rotateY) ? s.rotateY : 0, mode === "grid" ? 0.32 : 0.10),
      depth: smoothValue(prev.depth, s.depth, mode === "carousel" ? 0.062 : 0.10)
    };
    return next;
  });

  // Stable continuous depth order: use smoothed depth, then a tiny stable bias.
  // This avoids the hard "suddenly jumping to the top" feeling when two cards cross.
  const order = rendered
    .map((s, index) => ({ index, depth: s.depth + index * 0.00001 }))
    .sort((a, b) => a.depth - b.depth);

  const rankMap = new Map();
  order.forEach((item, rank) => rankMap.set(item.index, rank));

  rendered.forEach((s, index) => {
    const card = cards[index];
    if (!card) return;

    if (pinnedCards.has(index)) {
      const pinned = pinnedCards.get(index);
      card.style.transform = `translate(-50%, -50%) translate(${pinned.x - centerX}px, ${pinned.y - centerY}px) scale(${pinned.scale || 1}) rotate(${pinned.rotateZ || 0}deg)`;
      card.style.opacity = "1";
      card.style.zIndex = String(5400 + index);
      card.style.filter = "brightness(1.08) saturate(1.05)";
      card.classList.add("is-pinned");
      return;
    }

    const depth01 = Math.max(0, Math.min(1, s.depth));
    const frontLift = mode === "grid" ? 0 : Math.max(0, depth01 - 0.52) * (mode === "carousel" ? 36 : 26);
    const visualScale = s.scale * (mode === "carousel" ? (0.93 + depth01 * 0.10) : (0.94 + depth01 * 0.12));
    const visualBlur = Math.max(0, s.blur + (1 - depth01) * 0.42);
    const visualBrightness = Math.max(0.6, s.brightness * (0.86 + depth01 * 0.18));
    const visualSaturate = Math.max(0.65, s.saturate * (0.88 + depth01 * 0.14));

    card.classList.remove("is-pinned");
    if (mode !== "heart") { card.classList.remove("heart-looping", "heart-front"); }

    card.style.transform = `perspective(980px) translate(-50%, -50%) translate(${s.x - centerX}px, ${s.y - centerY - frontLift}px) rotateX(${Number.isFinite(s.rotateX) ? s.rotateX : 0}deg) rotateY(${Number.isFinite(s.rotateY) ? s.rotateY : 0}deg) scale(${visualScale}) rotate(${s.rotateZ}deg)`;
    const minOpacity = mode === "grid" ? 0 : 0.22;
    card.style.opacity = Math.max(minOpacity, s.opacity).toFixed(3);
    card.style.zIndex = String(100 + (rankMap.get(index) || 0));
    card.style.filter = `brightness(${visualBrightness.toFixed(3)}) saturate(${visualSaturate.toFixed(3)}) blur(${visualBlur.toFixed(2)}px)`;
    card.style.pointerEvents = mode === "grid" && s.opacity < 0.18 ? "none" : "";

    card.classList.toggle("front-photo", mode === "carousel" && depth01 > 0.78);
    card.classList.toggle("side-photo", mode === "carousel" && depth01 <= 0.78);
    card.classList.toggle("heart-looping", mode === "heart");
    card.classList.toggle("heart-front", mode === "heart" && depth01 > 0.68);
    card.classList.toggle("mode-galaxy-card", mode === "galaxy");
    card.classList.toggle("mode-grid-card", mode === "grid");
    card.classList.toggle("mode-grid-hidden", mode === "grid" && s.opacity < 0.18);
    card.classList.toggle("mode-film-card", mode === "film");
    card.classList.toggle("mode-focus-card", mode === "focus");
    card.classList.toggle("mode-focus-main", mode === "focus" && s.depth > 1);
    card.classList.toggle("depth-front", depth01 > 0.72);
    card.classList.toggle("depth-mid", depth01 <= 0.72 && depth01 > 0.38);
    card.classList.toggle("depth-back", depth01 <= 0.38);
  });

  displayStates = rendered.map(s => ({ ...s }));
  currentStates = rendered.map(s => ({ ...s }));
}

function renderLayout(now = performance.now(), force = false) {
  if (!albumStage || !cards.length) return;

  if (transitionState) {
    const elapsed = now - transitionState.start;
    const p = Math.min(1, elapsed / transitionState.duration);
    const rect = albumStage.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2 + 8;
    let states = [];

    if (transitionState.type === "heart-burst") {
      if (p < 0.26) {
        const t = easeOutCubic(p / 0.26);
        states = transitionState.fromStates.map((from, index) => {
          const angle = (Math.PI * 2 * index) / transitionState.fromStates.length + index * 0.42;
          const burstRadius = 88 + index * 12 + Math.sin(index * 0.8) * 18;
          return {
            ...from,
            x: lerp(from.x, centerX + Math.cos(angle) * burstRadius, t),
            y: lerp(from.y, centerY + Math.sin(angle) * burstRadius * 0.78, t),
            scale: lerp(from.scale, from.scale * 0.78, t),
            opacity: lerp(from.opacity, 0.66, t),
            rotateZ: lerp(from.rotateZ, from.rotateZ + (index % 2 === 0 ? 22 : -22), t),
            blur: lerp(from.blur, 1.2, t),
            depth: from.depth,
            brightness: lerp(from.brightness, 0.94, t),
            saturate: lerp(from.saturate, 1.05, t)
          };
        });
      } else if (p < 0.82) {
        const t = easeInOutCubic((p - 0.26) / 0.56);
        states = transitionState.fromStates.map((from, index) => {
          const angle = (Math.PI * 2 * index) / transitionState.fromStates.length + index * 0.42;
          const burstRadius = 88 + index * 12 + Math.sin(index * 0.8) * 18;
          const burstState = {
            ...from,
            x: centerX + Math.cos(angle) * burstRadius,
            y: centerY + Math.sin(angle) * burstRadius * 0.78,
            scale: from.scale * 0.78,
            opacity: 0.66,
            rotateZ: from.rotateZ + (index % 2 === 0 ? 22 : -22),
            blur: 1.2,
            depth: from.depth,
            brightness: 0.94,
            saturate: 1.05
          };
          const to = transitionState.toStates[index];
          return {
            x: lerp(burstState.x, to.x, t),
            y: lerp(burstState.y, to.y, t),
            scale: lerp(burstState.scale, to.scale * 1.04, t),
            opacity: lerp(burstState.opacity, to.opacity, t),
            brightness: lerp(burstState.brightness, to.brightness, t),
            saturate: lerp(burstState.saturate, to.saturate, t),
            blur: lerp(burstState.blur, to.blur, t),
            rotateZ: lerp(burstState.rotateZ, to.rotateZ + Math.sin(index * 0.6) * 4, t),
            depth: lerp(burstState.depth, to.depth, t)
          };
        });
      } else {
        const t = easeOutCubic((p - 0.82) / 0.18);
        states = transitionState.toStates.map((to, index) => {
          const settlePulse = 1 + (1 - t) * (0.08 + (index % 4) * 0.01);
          return {
            x: to.x,
            y: lerp(to.y - 8, to.y, t),
            scale: lerp(to.scale * settlePulse, to.scale, t),
            opacity: to.opacity,
            brightness: lerp(to.brightness + 0.04, to.brightness, t),
            saturate: lerp(to.saturate + 0.08, to.saturate, t),
            blur: lerp(0.35, to.blur, t),
            rotateZ: lerp(to.rotateZ + (index % 2 === 0 ? 3 : -3), to.rotateZ, t),
            depth: to.depth
          };
        });
      }
    } else {
      const t = easeInOutCubic(p);
      states = transitionState.fromStates.map((from, index) => {
        const to = transitionState.toStates[index];
        return {
          x: lerp(from.x, to.x, t),
          y: lerp(from.y, to.y, t),
          scale: lerp(from.scale, to.scale, t),
          opacity: lerp(from.opacity, to.opacity, t),
          brightness: lerp(from.brightness, to.brightness, t),
          saturate: lerp(from.saturate, to.saturate, t),
          blur: lerp(from.blur, to.blur, t),
          rotateZ: lerp(from.rotateZ, to.rotateZ, t),
          depth: lerp(from.depth, to.depth, t)
        };
      });
    }

    drawStates(states, transitionState.mode);
    if (now - trailLastEmit > 68) {
      emitTrailFromStates(states, albumStage.getBoundingClientRect(), transitionState.type === "heart-burst");
      trailLastEmit = now;
    }
    if (p >= 1) {
      transitionState = null;
      currentStates = computeTargetStates(layoutMode, now);
      drawStates(currentStates, layoutMode);
    }
    return;
  }

  const states = computeTargetStates(layoutMode, now);
  drawStates(states, layoutMode);
}

function updateGridFlip(now = performance.now()) {
  if (!gridFlipState) return;
  if (now - gridFlipState.start >= gridFlipState.duration) {
    gridPage = gridFlipState.toPage;
    gridFlipState = null;
  }
}

function startGridPageFlip(deltaY = 1) {
  if (layoutMode !== "grid" || gridFlipState || transitionState) return false;
  const direction = deltaY >= 0 ? 1 : -1;
  const toPage = gridPage === 0 ? 1 : 0;
  gridFlipState = {
    fromPage: gridPage,
    toPage,
    direction,
    start: performance.now(),
    duration: GRID_FLIP_DURATION
  };
  showSfx(toPage === 0 ? "PAGE 1" : "PAGE 2");
  showLayoutToast(toPage === 0 ? "平铺正面：照片 1-50" : "平铺背面：照片 51-100");
  return true;
}

function handleGridWheel(deltaY) {
  if (layoutMode !== "grid" || gridFlipState || transitionState) return false;
  // Down on page 1 flips to page 2; up on page 2 flips back to page 1.
  // At the page boundary, keep the original wheel-to-layout behavior so the user will not be stuck in grid mode.
  if ((deltaY > 0 && gridPage === 0) || (deltaY < 0 && gridPage === 1)) {
    return startGridPageFlip(deltaY);
  }
  return false;
}

function animateLayouts(now = performance.now()) {
  const delta = Math.min(40, now - lastFrame);
  lastFrame = now;
  updateGridFlip(now);
  if (layoutMode === "heart" && now > heartLoopPausedUntil && !photoModal.classList.contains("show") && screens.album.classList.contains("screen-active") && !transitionState) {
    heartLoopRotation += delta * heartLoopSpeed;
    if (heartLoopRotation > Math.max(1, cards.length)) heartLoopRotation = heartLoopRotation % Math.max(1, cards.length);
  }
  if (layoutMode === "carousel" && !isDragging && !photoModal.classList.contains("show") && screens.album.classList.contains("screen-active") && !transitionState) {
    targetRotation += delta * 0.000196;
    rotation += (targetRotation - rotation) * 0.095;
  } else if (layoutMode === "carousel") {
    rotation += (targetRotation - rotation) * 0.095;
  }
  renderLayout(now);
  updateLyricByTime();
  updateBeatVisual(delta);
  requestAnimationFrame(animateLayouts);
}

function emitTrailFromStates(states, stageRect, heart = false) {
  states.forEach((s, i) => {
    if (i % 5 !== 0) return;
    const x = stageRect.left + s.x;
    const y = stageRect.top + s.y;
    for (let k = 0; k < 3; k++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: heart ? -0.7 - Math.random() * 1.1 : -0.3 - Math.random() * 0.7,
        life: 0,
        ttl: 380 + Math.random() * 280,
        size: heart ? 3 + Math.random() * 3 : 2 + Math.random() * 2,
        color: heart ? (Math.random() > 0.45 ? "255,158,203" : "255,210,138") : "255,240,210",
        heartShape: heart && Math.random() > 0.55
      });
    }
  });
}

function spawnModeParticles(fromStates, toStates, burstMode) {
  const rect = albumStage.getBoundingClientRect();
  fromStates.forEach(s => {
    const x = rect.left + s.x;
    const y = rect.top + s.y;
    for (let k = 0; k < (burstMode ? 4 : 3); k++) {
      const ang = (Math.PI * 2 * k) / (burstMode ? 9 : 6) + Math.random() * 0.6;
      const speed = burstMode ? 1.4 + Math.random() * 1.8 : 0.8 + Math.random() * 1.4;
      particles.push({
        x, y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - 0.4,
        life: 0,
        ttl: 520 + Math.random() * 360,
        size: burstMode ? 3 + Math.random() * 4 : 2 + Math.random() * 3,
        color: burstMode ? (Math.random() > 0.4 ? "255,158,203" : (Math.random() > 0.5 ? "255,210,138" : "152,220,255")) : "255,240,210",
        heartShape: burstMode && Math.random() > 0.7
      });
    }
  });
}

function drawHeartParticle(x, y, size, alpha, color) {
  fxCtx.save();
  fxCtx.translate(x, y);
  fxCtx.scale(size / 10, size / 10);
  fxCtx.beginPath();
  fxCtx.moveTo(0, 3);
  fxCtx.bezierCurveTo(0, -1, -6, -1, -6, 3);
  fxCtx.bezierCurveTo(-6, 7, 0, 10, 0, 12);
  fxCtx.bezierCurveTo(0, 10, 6, 7, 6, 3);
  fxCtx.bezierCurveTo(6, -1, 0, -1, 0, 3);
  fxCtx.closePath();
  fxCtx.fillStyle = `rgba(${color}, ${alpha})`;
  fxCtx.fill();
  fxCtx.restore();
}

function drawFx() {
  fxCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawForegroundHeartsLayer();
  drawMouseHeartsLayer(16);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life += 16;
    if (p.life >= p.ttl) { particles.splice(i, 1); continue; }
    const t = p.life / p.ttl;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.005;
    const alpha = 1 - t;
    if (p.heartShape) {
      drawHeartParticle(p.x, p.y, p.size * (1 - t * 0.25), alpha, p.color);
    } else {
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, Math.max(0.8, p.size * (1 - t * 0.25)), 0, Math.PI * 2);
      fxCtx.fillStyle = `rgba(${p.color}, ${alpha})`;
      fxCtx.fill();
    }
  }
  requestAnimationFrame(drawFx);
}

function openPhoto(index, sourceEl = null) {
  currentOpenIndex = (index + CONFIG.photos.length) % CONFIG.photos.length;
  const item = CONFIG.photos[currentOpenIndex];
  currentOpenSource = sourceEl || null;
  modalImg.src = item.src;
  if (modalCounter) modalCounter.textContent = `${String(currentOpenIndex + 1).padStart(2, "0")} / ${String(CONFIG.photos.length).padStart(2, "0")}`;
  modalDate.textContent = item.date;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modalSticker.textContent = CONFIG.stickers[currentOpenIndex % CONFIG.stickers.length];

  document.body.classList.add("modal-open");
  photoModal.classList.add("show", "flighting", "cinematic-enter");
  showSubtitle(`正在查看：${item.title}`, "打开照片", 1900);
  showSfx("📷 OPEN PHOTO");

  const srcRect = currentOpenSource ? currentOpenSource.getBoundingClientRect() : null;
  if (!srcRect) { photoModal.classList.remove("flighting"); setTimeout(() => photoModal.classList.remove("cinematic-enter"), 700); return; }

  const clone = document.createElement("img");
  clone.src = item.src;
  clone.className = "modal-flight-clone";
  clone.style.left = `${srcRect.left}px`;
  clone.style.top = `${srcRect.top}px`;
  clone.style.width = `${srcRect.width}px`;
  clone.style.height = `${srcRect.height}px`;
  document.body.appendChild(clone);
  const targetRect = getModalImageTargetRect();
  requestAnimationFrame(() => {
    clone.style.left = `${targetRect.left}px`;
    clone.style.top = `${targetRect.top}px`;
    clone.style.width = `${targetRect.width}px`;
    clone.style.height = `${targetRect.height}px`;
    clone.style.borderRadius = `24px`;
  });
  setTimeout(() => {
    photoModal.classList.remove("flighting");
    setTimeout(() => photoModal.classList.remove("cinematic-enter"), 380);
    clone.style.opacity = "0";
    setTimeout(() => clone.remove(), 220);
  }, 520);
  for (let i = 0; i < 24; i++) {
    particles.push({
      x: srcRect.left + srcRect.width / 2,
      y: srcRect.top + srcRect.height / 2,
      vx: (Math.random() - 0.5) * 2.2,
      vy: (Math.random() - 0.8) * 2.2,
      life: 0,
      ttl: 460 + Math.random() * 240,
      size: 2 + Math.random() * 3.5,
      color: Math.random() > 0.5 ? "255,210,138" : "255,158,203",
      heartShape: Math.random() > 0.82
    });
  }
}

function updateModalContent(index, direction = 1) {
  currentOpenIndex = (index + CONFIG.photos.length) % CONFIG.photos.length;
  const item = CONFIG.photos[currentOpenIndex];

  photoModal.classList.add("cinematic-switch");
  clearTimeout(modalTextSwapTimer);

  modalImg.animate([
    { opacity: 0.14, transform: `translateX(${direction * 36}px) scale(1.06)`, filter: 'blur(8px)' },
    { opacity: 1, transform: "translateX(0) scale(1)", filter: 'blur(0px)' }
  ], { duration: 520, easing: "cubic-bezier(.22,.8,.2,1)" });

  [modalDate, modalTitle, modalDesc].forEach((el, idx) => {
    el.animate([
      { opacity: 0, transform: `translateY(20px) translateX(${direction * 10}px)`, filter: 'blur(12px)' },
      { opacity: 1, transform: 'translateY(0) translateX(0)', filter: 'blur(0px)' }
    ], { duration: 430 + idx * 70, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });

  if (modalSticker) {
    modalSticker.animate([
      { opacity: .1, transform: `translateY(-10px) rotate(${direction * 12}deg) scale(.9)` },
      { opacity: 1, transform: 'translateY(0) rotate(-3deg) scale(1)' }
    ], { duration: 500, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }

  modalImg.src = item.src;
  if (modalCounter) modalCounter.textContent = `${String(currentOpenIndex + 1).padStart(2, "0")} / ${String(CONFIG.photos.length).padStart(2, "0")}`;
  modalTextSwapTimer = setTimeout(() => {
    modalDate.textContent = item.date;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    modalSticker.textContent = CONFIG.stickers[currentOpenIndex % CONFIG.stickers.length];
    setTimeout(() => photoModal.classList.remove("cinematic-switch"), 220);
  }, 110);
  showSubtitle(`切换到：${item.title}`, direction > 0 ? "下一张" : "上一张", 1700);
  showSfx(direction > 0 ? "▶ NEXT" : "◀ PREV");
}

function getCurrentSourceEl(index) {
  if (window.innerWidth <= 760 && mobileCards[index]) return mobileCards[index].querySelector("img");
  if (cards[index]) return cards[index].querySelector("img");
  return null;
}

function getModalImageTargetRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 760) {
    const left = 22;
    const top = Math.max(52, vh * 0.06);
    const width = vw - 44;
    const height = Math.min(vh * 0.5, 420);
    return { left, top, width, height };
  }
  const modalWidth = Math.min(vw * 0.96, 960);
  const modalHeight = Math.min(vh * 0.9, 760);
  const left = (vw - modalWidth) / 2 + 18;
  const top = (vh - modalHeight) / 2 + 18;
  return { left, top, width: modalWidth * 0.50, height: modalHeight - 36 };
}

function closePhoto() {
  photoModal.classList.remove("show", "flighting");
  document.body.classList.remove("modal-open");
}
modalClose.addEventListener("click", closePhoto);
modalBackdrop.addEventListener("click", closePhoto);
modalPrev.addEventListener("click", event => { event.stopPropagation(); updateModalContent(currentOpenIndex - 1, -1); });
modalNext.addEventListener("click", event => { event.stopPropagation(); updateModalContent(currentOpenIndex + 1, 1); });

function openTimeline() {
  document.body.classList.add("panel-open");
  timelinePanel.classList.add("show");
  showSubtitle("时间线展开中，看看这些值得保存的小节点。", "时间线", 2100);
  showSfx("📜 TIMELINE");
}
function closeTimeline() { timelinePanel.classList.remove("show"); document.body.classList.remove("panel-open"); }
function openLetter() {
  document.body.classList.add("panel-open");
  letterPanel.classList.add("show");
  updateStoryProgress("letter");
  showSubtitle("信纸展开中，这一页是专门写给你的。", "打开信纸", 2300);
  showSfx("💌 LETTER");
  startTypewriter();
}
function closeLetter() {
  letterPanel.classList.remove("show");
  stopTypewriter();
  if (!timelinePanel.classList.contains("show")) document.body.classList.remove("panel-open");
  if (screens.album.classList.contains("screen-active")) updateStoryProgress("album");
}

timelineBtn.addEventListener("click", openTimeline);
letterBtn.addEventListener("click", openLetter);
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.close;
    if (target === "letterPanel") closeLetter();
    else if (target === "timelinePanel") closeTimeline();
    else document.getElementById(target).classList.remove("show");
  });
});

function stopTypewriter() {
  if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
}
function startTypewriter() {
  stopTypewriter();
  const lines = Array.from(letterTypingArea.querySelectorAll(".type-line"));
  lines.forEach(line => { line.textContent = ""; line.classList.remove("typing", "done"); });
  let lineIndex = 0;
  function typeNextLine() {
    if (lineIndex >= lines.length) return;
    const line = lines[lineIndex];
    const fullText = line.dataset.text || "";
    let charIndex = 0;
    line.classList.add("typing");
    function step() {
      line.textContent = fullText.slice(0, charIndex);
      charIndex += 1;
      if (charIndex <= fullText.length) {
        typingTimer = setTimeout(step, line.classList.contains("signature") ? 55 : 32);
      } else {
        line.classList.remove("typing");
        line.classList.add("done");
        lineIndex += 1;
        typingTimer = setTimeout(typeNextLine, 180);
      }
    }
    step();
  }
  typingTimer = setTimeout(typeNextLine, 320);
}


function showAudioTip(text, isError = false) { /* clean mode: hidden */ return; }

function getAudioErrorMessage(error) {
  const msg = error && (error.message || error.name) ? (error.message || error.name) : String(error || "");
  if (/NotAllowedError|play\(\) failed|user didn't interact|gesture/i.test(msg)) {
    return "浏览器拦截了自动播放，请先点击右下角「启用声音」。";
  }
  if (/NotSupportedError|MEDIA_ERR_SRC_NOT_SUPPORTED/i.test(msg)) {
    return "音频格式或路径不支持，请确认 music 文件夹内文件名和格式正确。";
  }
  return "音频没有播放成功，请确认 MP3 文件已放入 music 文件夹，并且文件名为 1.mp3 到 5.mp3。";
}

async function unlockAudioAndPlay(index = activeSongIndex) {
  pendingSongIndex = index;
  if (CONFIG.songs && CONFIG.songs[index]) {
    const song = CONFIG.songs[index];
    if (!bgm.src || !bgm.src.endsWith(song.src)) {
      bgm.src = song.src;
      bgm.load();
      lastLyricIndex = -1;
    }
  }

  try {
    await ensureAudioAnalyser();
    bgm.muted = false;
    bgm.volume = 1;
    await bgm.play();
    audioUnlocked = true;
    activeSongIndex = index;
    if (soundEnableBtn) {
      soundEnableBtn.textContent = "声音已启用";
      soundEnableBtn.classList.add("enabled");
    }
    showAudioTip("声音已启用。按 1-5 可以切歌。");
    updateLyricByTime();
    return true;
  } catch (error) {
    audioUnlocked = false;
    lastAudioError = getAudioErrorMessage(error);
    if (soundEnableBtn) {
      soundEnableBtn.textContent = "启用声音";
      soundEnableBtn.classList.add("error");
    }
    showAudioTip(lastAudioError, true);
    return false;
  }
}

if (soundEnableBtn) {
  soundEnableBtn.addEventListener("click", () => unlockAudioAndPlay(pendingSongIndex || activeSongIndex));
}


async function ensureAudioAnalyser() {
  if (bgmLinked) return true;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();
    const source = audioCtx.createMediaElementSource(bgm);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.75;
    analyserData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    bgmLinked = true;
    return true;
  } catch (error) {
    console.warn("Audio analyser init failed:", error);
    return false;
  }
}



function buildLyricsFromText(text, step = 3.8) {
  return String(text || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map((text, index) => ({
      time: Number((index * step).toFixed(1)),
      text
    }));
}

function getSongOverride(index) {
  const key = String(index + 1);
  return window.CUSTOM_LYRICS && window.CUSTOM_LYRICS[key] ? window.CUSTOM_LYRICS[key] : null;
}

function normalizeSongsFromCustomLyrics() {
  if (!window.CUSTOM_LYRICS || !CONFIG.songs) return;
  CONFIG.songs = CONFIG.songs.map((song, index) => {
    const override = getSongOverride(index);
    if (!override) return song;
    const parsed = buildLyricsFromText(override.text, override.step || 3.8);
    return {
      ...song,
      title: override.title || song.title,
      src: override.file || song.src,
      lyrics: parsed.length ? parsed : song.lyrics
    };
  });
}



function showLayoutToast(text) { return; }


function loadLrcSongsIfAvailable() {
  if (!window.LRC_SONGS || !Array.isArray(window.LRC_SONGS) || !window.LRC_SONGS.length) return;
  CONFIG.songs = window.LRC_SONGS.map((song, index) => ({
    key: String(index + 1),
    title: song.title || `歌曲 ${index + 1}`,
    src: song.src || `music/${index + 1}.mp3`,
    lyrics: Array.isArray(song.lyrics) ? song.lyrics : []
  }));
}

function getActiveLyrics() {
  const song = CONFIG.songs && CONFIG.songs[activeSongIndex];
  return song && Array.isArray(song.lyrics) ? song.lyrics : [];
}

function findLyricIndexByCurrentTime(lyrics, currentTime) {
  if (!lyrics || !lyrics.length) return -1;

  let left = 0;
  let right = lyrics.length - 1;
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (Number(lyrics[mid].time) <= currentTime) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

async function switchSongByIndex(index) {
  if (!CONFIG.songs || !CONFIG.songs[index]) return;
  activeSongIndex = index;
  pendingSongIndex = index;
  const song = CONFIG.songs[index];
  lastLyricIndex = -1;
  bgm.pause();
  bgm.src = song.src;
  bgm.load();

  if (lyricLine) {
    lyricLine.textContent = song.lyrics?.[0]?.text || "点击右下角启用声音后开始播放。";
    if (lyricOverlay) lyricOverlay.classList.toggle("real-lyrics", (song.lyrics?.[0]?.text || "").length > 18);
    lyricLine.classList.remove("changed");
    void lyricLine.offsetWidth;
    lyricLine.classList.add("changed");
  }

  showSfx(`${song.key} · ${song.title}`);
  showLayoutToast(`BGM ${song.key}：${song.title}`);

  const ok = await unlockAudioAndPlay(index);
  if (!ok) {
    showLayoutToast("未播放：请点击右下角「启用声音」");
  }
}

function cycleLayoutByWheel(deltaY) {
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(() => wheelLock = false, 420);

  const modes = ["carousel", "heart", "grid", "galaxy", "film", "focus"];
  const current = Math.max(0, modes.indexOf(layoutMode));
  const next = deltaY > 0
    ? (current + 1) % modes.length
    : (current - 1 + modes.length) % modes.length;

  setLayoutMode(modes[next]);
  const names = { carousel: "环绕", heart: "心形", grid: "平铺", galaxy: "银河螺旋", film: "胶片回忆", focus: "主照片聚焦" };
  
}

window.addEventListener("wheel", event => {
  if (!screens.album.classList.contains("screen-active")) return;
  if (photoModal.classList.contains("show") || timelinePanel.classList.contains("show") || letterPanel.classList.contains("show")) return;
  event.preventDefault();
  if (layoutMode === "grid" && handleGridWheel(event.deltaY)) return;
  cycleLayoutByWheel(event.deltaY);
}, { passive: false });

document.addEventListener("keydown", event => {
  const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4 };
  if (Object.prototype.hasOwnProperty.call(keyMap, event.key)) {
    switchSongByIndex(keyMap[event.key]);
  }
});


if (musicBtn) musicBtn.addEventListener("click", async () => {
  try {
    await ensureAudioAnalyser();
    if (bgm.paused) {
      await bgm.play();
      musicBtn.textContent = "暂停音乐";
      showSubtitle("背景音乐已开启，页面会跟着节奏轻微闪光。", "BGM", 2300);
      showSfx("♪ MUSIC ON");
    } else {
      bgm.pause();
      musicBtn.textContent = "音乐";
      showSubtitle("背景音乐已暂停。", "BGM", 1700);
      showSfx("♪ MUSIC OFF");
    }
  } catch (error) {
    musicBtn.textContent = "请放入音乐";
    showSubtitle("请把你的音乐文件放到 music 文件夹，并命名为 bgm.mp3。", "BGM 提示", 2800);
  }
});

function updateBeatVisual(delta) {
  let pulse = 0;
  if (!bgm.paused && analyser && analyserData) {
    analyser.getByteFrequencyData(analyserData);
    const sum = analyserData.reduce((a, b) => a + b, 0);
    const avg = sum / analyserData.length / 255;
    pulse = Math.min(1, avg * 1.8);
  } else {
    fakeBeatT += delta * 0.0022;
    pulse = 0.18 + Math.max(0, Math.sin(fakeBeatT) * 0.22);
  }
  const scale = 1 + pulse * 0.08;
  const flash = Math.min(0.42, pulse * 0.34);
  document.documentElement.style.setProperty("--beat-scale", String(scale));
  document.documentElement.style.setProperty("--flash-alpha", String(flash));
  centerOrb.style.boxShadow = `0 16px 60px rgba(0,0,0,.28), 0 0 ${20 + pulse * 60}px rgba(255,210,138,.15), inset 0 1px 0 rgba(255,255,255,.18)`;
  beatHint.textContent = bgm.paused ? "BGM PULSE" : `BGM ${(pulse * 100).toFixed(0)}%`;
  updateBeatBars(pulse);
}

function updateBeatBars(pulse = 0) {
  if (!beatBars || !beatBars.length) return;
  beatBars.forEach((bar, index) => {
    let strength = pulse;
    if (!bgm.paused && analyser && analyserData && analyserData.length) {
      const ai = Math.floor(index / beatBars.length * analyserData.length);
      strength = Math.max(strength, (analyserData[ai] || 0) / 255);
    } else {
      const t = performance.now() * 0.0046 + index * 0.55;
      strength = 0.24 + Math.max(0, Math.sin(t) * 0.44) + pulse * 0.4;
    }
    const height = 10 + Math.min(1, strength) * (24 + (index % 3) * 4);
    const scale = 0.92 + Math.min(1, strength) * 0.22;
    bar.style.height = `${height}px`;
    bar.style.transform = `scaleY(${scale})`;
    bar.style.opacity = String(0.5 + Math.min(1, strength) * 0.5);
  });
}


function startPhotoDrag(event, index, card) {
  event.preventDefault();
  event.stopPropagation();

  if (event.button !== undefined && event.button !== 0) return;

  const rect = albumStage.getBoundingClientRect();
  const current = currentStates[index] || computeTargetStates(layoutMode, performance.now())[index];
  const pinned = pinnedCards.get(index);
  const startX = pinned ? pinned.x : current.x;
  const startY = pinned ? pinned.y : current.y;

  photoDrag = {
    index,
    card,
    pointerId: event.pointerId,
    startClientX: event.clientX,
    startClientY: event.clientY,
    startX,
    startY,
    moved: false
  };

  movedDuringDrag = false;
  card.classList.add("is-dragging", "is-pulling-out");
  emitPhotoLiftHearts(event.clientX, event.clientY);
  card.setPointerCapture(event.pointerId);
}

document.addEventListener("pointermove", event => {
  if (!photoDrag) return;
  const dx = event.clientX - photoDrag.startClientX;
  const dy = event.clientY - photoDrag.startClientY;
  if (Math.abs(dx) + Math.abs(dy) > 4) {
    photoDrag.moved = true;
    movedDuringDrag = true;
  }
  const rect = albumStage.getBoundingClientRect();
  const nextX = Math.max(60, Math.min(rect.width - 60, photoDrag.startX + dx));
  const nextY = Math.max(90, Math.min(rect.height - 90, photoDrag.startY + dy));
  pinnedCards.set(photoDrag.index, {
    x: nextX,
    y: nextY,
    scale: 1.166,
    rotateZ: Math.max(-8, Math.min(8, dx * 0.02))
  });
  renderLayout(performance.now(), true);
});

document.addEventListener("pointerup", event => {
  if (!photoDrag) return;
  try { photoDrag.card.releasePointerCapture(photoDrag.pointerId); } catch (error) {}
  const droppedCard = photoDrag.card;
  droppedCard.classList.remove("is-dragging", "is-pulling-out");
  droppedCard.classList.add("drop-settle");
  setTimeout(() => droppedCard.classList.remove("drop-settle"), 520);

  if (photoDrag.moved) {
    showSubtitle("这张照片已经被你取出来了，可以放在页面任意位置。", "照片已取出", 2000);
    showSfx("📌 PINNED");
  } else {
    // 单击时不固定，只打开照片
    if (!pinnedCards.has(photoDrag.index)) {
      movedDuringDrag = false;
    }
  }

  const wasMoved = photoDrag.moved;
  photoDrag = null;
  setTimeout(() => { movedDuringDrag = false; }, wasMoved ? 140 : 40);
});

if (resetDragBtn) {
  resetDragBtn.addEventListener("click", () => {
    pinnedCards.clear();
    showSubtitle("所有取出的照片已归位。", "照片归位", 1800);
    showSfx("↺ RESET");
    renderLayout(performance.now(), true);
  });
}

function updateLyricByTime() {
  const lyrics = getActiveLyrics();
  if (!lyricLine || !lyrics || !lyrics.length) return;

  if (!Number.isFinite(bgm.currentTime)) return;
  const t = bgm.currentTime;

  const idx = findLyricIndexByCurrentTime(lyrics, t);
  if (idx < 0) return;

  if (idx !== lastLyricIndex) {
    lastLyricIndex = idx;
    if (lyricPrev) lyricPrev.textContent = idx > 0 ? lyrics[idx - 1].text : "";
    if (lyricNext) lyricNext.textContent = idx < lyrics.length - 1 ? lyrics[idx + 1].text : "";
    lyricLine.textContent = lyrics[idx].text;
    if (lyricOverlay) lyricOverlay.classList.toggle("real-lyrics", lyrics[idx].text.length > 18);
    lyricLine.classList.remove("changed");
    void lyricLine.offsetWidth;
    lyricLine.classList.add("changed");

    for (let i = 0; i < 10; i++) {
      particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 260,
        y: window.innerHeight - 80 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -0.8 - Math.random() * 1.3,
        life: 0,
        ttl: 760 + Math.random() * 520,
        size: 2 + Math.random() * 4,
        color: Math.random() > 0.5 ? "255,158,203" : "255,210,138",
        heartShape: Math.random() > 0.55
      });
    }
  }
}


albumStage.addEventListener("pointerdown", event => {
  if (photoDrag || layoutMode !== "carousel" || transitionState) return;
  isDragging = true;
  movedDuringDrag = false;
  dragStartX = event.clientX;
  dragStartRotation = targetRotation;
  albumStage.setPointerCapture(event.pointerId);
});
albumStage.addEventListener("pointermove", event => {
  if (!isDragging || layoutMode !== "carousel" || transitionState) return;
  const deltaX = event.clientX - dragStartX;
  if (Math.abs(deltaX) > 4) movedDuringDrag = true;
  targetRotation = dragStartRotation + deltaX * 0.008;
});
albumStage.addEventListener("pointerup", event => {
  if (layoutMode !== "carousel") return;
  isDragging = false;
  try { albumStage.releasePointerCapture(event.pointerId); } catch (error) {}
  setTimeout(() => { movedDuringDrag = false; }, 80);
});
albumStage.addEventListener("pointercancel", () => {
  isDragging = false;
  setTimeout(() => { movedDuringDrag = false; }, 80);
});

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  fxCanvas.width = window.innerWidth * ratio;
  fxCanvas.height = window.innerHeight * ratio;
  fxCanvas.style.width = window.innerWidth + "px";
  fxCanvas.style.height = window.innerHeight + "px";
  fxCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createStars();
  createForegroundHearts();
  renderLayout(performance.now(), true);
}
function createStars() {
  const bgCount = Math.max(22, Math.floor(window.innerWidth * window.innerHeight / 32000));
  const sparkleCount = Math.max(34, Math.floor(window.innerWidth * window.innerHeight / 18000));
  stars = [];

  for (let i = 0; i < bgCount; i++) {
    const typeRoll = Math.random();
    const isBalloon = typeRoll > 0.55;
    stars.push({
      type: isBalloon ? "balloon" : "heart",
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: isBalloon ? (18 + Math.random() * 26) : (10 + Math.random() * 16),
      speed: 0.22 + Math.random() * 0.5,
      swayAmp: 8 + Math.random() * 18,
      swaySpeed: 0.001 + Math.random() * 0.0024,
      phase: Math.random() * Math.PI * 2,
      alpha: isBalloon ? (0.24 + Math.random() * 0.18) : (0.22 + Math.random() * 0.2),
      color: isBalloon
        ? [
            "255,170,207",
            "255,208,145",
            "157,224,255",
            "201,185,255",
            "255,150,166"
          ][Math.floor(Math.random() * 5)]
        : [
            "255,154,202",
            "255,185,214",
            "255,206,228",
            "255,199,169"
          ][Math.floor(Math.random() * 4)]
    });
  }

  for (let i = 0; i < sparkleCount; i++) {
    stars.push({
      type: "sparkle",
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.7 + 0.4,
      a: Math.random() * 0.55 + 0.12,
      speed: Math.random() * 0.18 + 0.05
    });
  }
}

function drawHeartShape(x, y, size, alpha, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(0, 1, -7, -4, -10, 1);
  ctx.bezierCurveTo(-13, 6, -9, 11, 0, 17);
  ctx.bezierCurveTo(9, 11, 13, 6, 10, 1);
  ctx.bezierCurveTo(7, -4, 0, 1, 0, 5);
  ctx.closePath();
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.shadowColor = `rgba(${color}, ${Math.min(alpha + 0.12, 0.42)})`;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

function drawBalloonShape(x, y, size, alpha, color) {
  const w = size * 0.78;
  const h = size * 0.98;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.shadowColor = `rgba(${color}, ${Math.min(alpha + 0.08, 0.34)})`;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.52);
  ctx.bezierCurveTo(w * 0.66, -h * 0.5, w * 0.62, h * 0.20, 0, h * 0.46);
  ctx.bezierCurveTo(-w * 0.62, h * 0.20, -w * 0.66, -h * 0.5, 0, -h * 0.52);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = `rgba(255,255,255, ${alpha * 0.35})`;
  ctx.beginPath();
  ctx.ellipse(-w * 0.14, -h * 0.16, w * 0.12, h * 0.22, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255,255,255, ${alpha * 0.44})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.42);
  ctx.quadraticCurveTo(-4, h * 0.72, 2, h * 1.22);
  ctx.stroke();
  ctx.restore();
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const t = performance.now();
  stars.forEach(item => {
    if (item.type === "sparkle") {
      item.y -= item.speed;
      if (item.y < -8) { item.y = window.innerHeight + 8; item.x = Math.random() * window.innerWidth; }
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 244, 226, ${item.a})`;
      ctx.fill();
      return;
    }

    item.y -= item.speed;
    if (item.y < -80) {
      item.y = window.innerHeight + 80;
      item.x = Math.random() * window.innerWidth;
    }
    const x = item.x + Math.sin(t * item.swaySpeed + item.phase) * item.swayAmp;

    if (item.type === "heart") {
      drawHeartShape(x, item.y, item.size, item.alpha, item.color);
    } else {
      drawBalloonShape(x, item.y, item.size, item.alpha, item.color);
    }
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePhoto(); closeTimeline(); closeLetter();
  }
  if (photoModal.classList.contains("show")) {
    if (event.key === "ArrowLeft") updateModalContent(currentOpenIndex - 1, -1);
    if (event.key === "ArrowRight") updateModalContent(currentOpenIndex + 1, 1);
  }
});


loadLrcSongsIfAvailable();
decorateSongsWithAudioCandidates();
if (CONFIG.songs && CONFIG.songs[activeSongIndex]) {
  bgm.src = CONFIG.songs[activeSongIndex].src;
}

bgm.addEventListener("timeupdate", updateLyricByTime);
bgm.addEventListener("seeked", () => {
  lastLyricIndex = -1;
  updateLyricByTime();
});
bgm.addEventListener("error", () => {
  showAudioTip("音频加载失败：请确认 music 文件夹内存在当前歌曲 MP3，文件名为 1.mp3 到 5.mp3。", true);
});
bgm.addEventListener("volumechange", () => {
  if (bgm.muted || bgm.volume === 0) {
    showAudioTip("当前音频被静音或音量为 0，请检查浏览器标签页和系统音量。", true);
  }
});
bgm.addEventListener("play", () => {
  updateLyricByTime();
});

resizeCanvas();
createStars();
drawStars();
updateBeatBars(0.25);
drawFx();
animateLayouts();
showSubtitle("准备拆开这份礼物。", "综艺字幕", 2600);
showAudioTip("提示：请先点击右下角「启用声音」，再按 1-5 切歌。");
updateDragTip();



/* ===== final-v8 audio hard fix overrides =====
   核心原则：音频播放优先，不再强制接 Web Audio 分析器。
   如果文件名不是 1.mp3，也会尝试常见中文文件名。
*/
function decorateSongsWithAudioCandidates() {
  if (!CONFIG.songs || !Array.isArray(CONFIG.songs)) return;

  const candidates = [
    ["music/1.mp3", "music/队长 - 予你.mp3", "music/队长 - 予你(1).mp3", "music/予你.mp3"],
    ["music/2.mp3", "music/汪苏泷 - 像晴天像雨天.mp3", "music/汪苏泷 - 像晴天像雨天(1).mp3", "music/像晴天像雨天.mp3"],
    ["music/3.mp3", "music/长岛加冰.mp3", "music/21. - 长岛加冰.mp3", "music/21. - 长岛加冰(1).mp3"],
    ["music/4.mp3", "music/朗杰 - bumola.mp3", "music/郎杰 - Bumola.mp3", "music/郎杰 - Bumola(1).mp3", "music/Bumola.mp3", "music/bumola.mp3"],
    ["music/5.mp3", "music/卓沅,Chris James - Not Angry (夏夜告别).mp3", "music/卓沅,Chris James - Not Angry (夏夜告别)(1).mp3", "music/Not Angry.mp3", "music/not angry.mp3"]
  ];

  CONFIG.songs = CONFIG.songs.map((song, index) => ({
    ...song,
    src: candidates[index]?.[0] || song.src,
    candidates: candidates[index] || [song.src]
  }));
}

function getSongCandidates(index) {
  const song = CONFIG.songs && CONFIG.songs[index];
  if (!song) return [];
  return Array.from(new Set([...(song.candidates || []), song.src].filter(Boolean)));
}

function setNativeAudioVisible() {
  if (!bgm) return;
  bgm.controls = false;
  bgm.classList.add("native-audio-player");
  bgm.muted = false;
  bgm.volume = 1;
  bgm.loop = true;
}

async function ensureAudioAnalyser() {
  // 不再把 audio 强制接入 Web Audio，避免本地文件环境无声。
  // 节奏闪光使用模拟 pulse，保证音频本身正常输出。
  return true;
}

function getAudioErrorMessage(error) {
  const msg = error && (error.message || error.name) ? (error.message || error.name) : String(error || "");
  if (/NotAllowedError|play\(\) failed|user didn't interact|gesture/i.test(msg)) {
    return "浏览器拦截播放：请点击右下角「启用声音」，或直接点原生播放器的播放键。";
  }
  if (/NotSupportedError|MEDIA_ERR_SRC_NOT_SUPPORTED|no supported source/i.test(msg)) {
    return "音频路径或格式不支持：请确认文件是 MP3，并放在 music 文件夹。";
  }
  return "音频仍未播放：请看页面右下的原生播放器是否能播放；如果显示不可播放，多半是文件名或格式问题。";
}

function waitForAudioReadyOrError(timeout = 1800) {
  return new Promise(resolve => {
    let done = false;
    const finish = ok => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      bgm.removeEventListener("canplay", onReady);
      bgm.removeEventListener("loadeddata", onReady);
      bgm.removeEventListener("error", onError);
      resolve(ok);
    };
    const onReady = () => finish(true);
    const onError = () => finish(false);
    const timer = setTimeout(() => finish(bgm.readyState >= 2), timeout);

    bgm.addEventListener("canplay", onReady, { once: true });
    bgm.addEventListener("loadeddata", onReady, { once: true });
    bgm.addEventListener("error", onError, { once: true });
    bgm.load();
  });
}

async function tryPlaySongSource(index, source) {
  const song = CONFIG.songs[index];
  bgm.pause();
  bgm.src = source;
  bgm.load();
  bgm.muted = false;
  bgm.volume = 1;

  if (lyricLine && song) {
    lyricLine.textContent = song.lyrics?.[0]?.text || "准备播放音乐。";
    if (lyricOverlay) lyricOverlay.classList.toggle("real-lyrics", (song.lyrics?.[0]?.text || "").length > 18);
  }

  const ready = await waitForAudioReadyOrError(1800);
  if (!ready && bgm.error) {
    throw new Error("SOURCE_NOT_READY");
  }

  await bgm.play();
  return true;
}

async function unlockAudioAndPlay(index = activeSongIndex) {
  setNativeAudioVisible();

  pendingSongIndex = index;
  activeSongIndex = index;
  lastLyricIndex = -1;

  const song = CONFIG.songs && CONFIG.songs[index];
  if (!song) {
    showAudioTip("没有找到当前歌曲配置。", true);
    return false;
  }

  const candidates = getSongCandidates(index);
  let lastError = null;

  for (const source of candidates) {
    try {
      await tryPlaySongSource(index, source);
      song.src = source;
      audioUnlocked = true;

      if (soundEnableBtn) {
        soundEnableBtn.textContent = "声音已启用";
        soundEnableBtn.classList.add("enabled");
        soundEnableBtn.classList.remove("error");
      }

      showAudioTip(`正在播放：${song.title} ｜ 文件：${source}`);
      showSfx(`${song.key || index + 1} · ${song.title}`);
      updateLyricByTime();
      return true;
    } catch (error) {
      lastError = error;
      // NotAllowedError 不继续换文件，先让用户点击
      if (String(error && (error.name || error.message || error)).includes("NotAllowedError")) {
        break;
      }
    }
  }

  audioUnlocked = false;
  const names = candidates.map(p => p.replace("music/", "")).join(" / ");
  const msg = `${getAudioErrorMessage(lastError)} 已尝试文件名：${names}`;
  if (soundEnableBtn) {
    soundEnableBtn.textContent = "启用声音";
    soundEnableBtn.classList.add("error");
  }
  showAudioTip(msg, true);
  return false;
}

async function switchSongByIndex(index) {
  if (!CONFIG.songs || !CONFIG.songs[index]) return;
  activeSongIndex = index;
  pendingSongIndex = index;
  lastLyricIndex = -1;
  const song = CONFIG.songs[index];

  showSfx(`${song.key || index + 1} · ${song.title}`);
  showLayoutToast(`BGM ${song.key || index + 1}：${song.title}`);

  if (lyricLine) {
    lyricLine.textContent = song.lyrics?.[0]?.text || "点击启用声音后开始播放。";
    if (lyricOverlay) lyricOverlay.classList.toggle("real-lyrics", (song.lyrics?.[0]?.text || "").length > 18);
    lyricLine.classList.remove("changed");
    void lyricLine.offsetWidth;
    lyricLine.classList.add("changed");
  }

  const ok = await unlockAudioAndPlay(index);
  if (!ok) showLayoutToast("未播放：请点「启用声音」或检查 MP3 文件名");
}

function updateBeatVisual(delta) {
  // 不再依赖 analyser，避免影响真实音频输出。
  fakeBeatT += delta * 0.0022;
  const playingBoost = bgm && !bgm.paused ? 0.22 : 0.08;
  const pulse = playingBoost + Math.max(0, Math.sin(fakeBeatT) * 0.22);
  const scale = 1 + pulse * 0.08;
  const flash = Math.min(0.28, pulse * 0.24);
  document.documentElement.style.setProperty("--beat-scale", String(scale));
  document.documentElement.style.setProperty("--flash-alpha", String(flash));
  if (centerOrb) {
    centerOrb.style.boxShadow = `0 16px 60px rgba(0,0,0,.28), 0 0 ${20 + pulse * 60}px rgba(255,210,138,.15), inset 0 1px 0 rgba(255,255,255,.18)`;
  }
  if (beatHint) beatHint.textContent = bgm && !bgm.paused ? "BGM PLAYING" : "BGM READY";
}

if (soundEnableBtn) { soundEnableBtn.textContent = "启用声音"; }

if (bgm) {
  setNativeAudioVisible();
  bgm.addEventListener("playing", () => {
    if (soundEnableBtn) {
      soundEnableBtn.textContent = "声音已启用";
      soundEnableBtn.classList.add("enabled");
      soundEnableBtn.classList.remove("error");
    }
    showAudioTip(`声音已播放：${CONFIG.songs?.[activeSongIndex]?.title || ""}`);
  });

  bgm.addEventListener("pause", () => {
    if (!bgm.ended) showAudioTip("音乐已暂停，可点原生播放器继续播放。");
  });
}



function silentUnlockAudioOnFirstInteraction() {
  if (hasFirstInteractionUnlockedAudio) return;
  hasFirstInteractionUnlockedAudio = true;
  unlockAudioAndPlay(activeSongIndex).catch(() => {});
}

window.addEventListener("pointerdown", silentUnlockAudioOnFirstInteraction, { once: true, passive: true });
window.addEventListener("keydown", silentUnlockAudioOnFirstInteraction, { once: true });



/* ===== final-v10 visual behavior ===== */
function applyV10VisualPolish() {
  const panels = [timelinePanel, letterPanel].filter(Boolean);
  panels.forEach(panel => {
    panel.addEventListener('click', (e) => {
      if (e.target === panel) panel.classList.remove('show');
    });
  });

  if (brandMark) {
    brandMark.addEventListener('click', () => {
      showSubtitle('MANGO ♥ PUDDING', '专属回忆', 1800);
    });
  }
}

function showV10WelcomeHints() {
  setTimeout(() => showSubtitle('点开礼物，让回忆慢慢亮起来。', '专属相册', 2200), 500);
  setTimeout(() => showSubtitle('按 1~5 切歌，歌词会跟着音乐同步出现。', '音乐互动', 2500), 3400);
}

applyV10VisualPolish();
showV10WelcomeHints();


/* ===== final-v12 visual pulse + burst hearts ===== */
function resetForegroundHeart(h, fromBottom = false) {
  const w = window.innerWidth;
  const hgt = window.innerHeight;
  h.x = Math.random() * w;
  h.y = fromBottom ? (hgt + Math.random() * hgt * 0.45) : (Math.random() * hgt);
  h.baseSize = 12 + Math.random() * 34;
  h.speed = 0.35 + Math.random() * 1.05;
  h.sway = 8 + Math.random() * 28;
  h.swaySpeed = 0.001 + Math.random() * 0.0028;
  h.phase = Math.random() * Math.PI * 2;
  h.depth = 0.45 + Math.random() * 1.5;
  h.alpha = 0.10 + Math.random() * 0.20;
  h.color = ["255,154,202", "255,187,216", "255,205,227", "255,210,168", "176,222,255"][Math.floor(Math.random() * 5)];
}

function createForegroundHearts() {
  const count = Math.max(34, Math.floor(window.innerWidth * window.innerHeight / 24000));
  foregroundHearts = Array.from({ length: count }, () => {
    const item = {};
    resetForegroundHeart(item, true);
    item.y = Math.random() * (window.innerHeight + 120);
    item.progress = Math.random();
    return item;
  });
}

function drawScreenHeart(x, y, size, alpha, color) {
  fxCtx.save();
  fxCtx.translate(x, y);
  fxCtx.scale(size / 18, size / 18);
  fxCtx.beginPath();
  fxCtx.moveTo(0, 5);
  fxCtx.bezierCurveTo(0, 1, -7, -4, -10, 1);
  fxCtx.bezierCurveTo(-13, 6, -9, 11, 0, 17);
  fxCtx.bezierCurveTo(9, 11, 13, 6, 10, 1);
  fxCtx.bezierCurveTo(7, -4, 0, 1, 0, 5);
  fxCtx.closePath();
  fxCtx.fillStyle = `rgba(${color}, ${alpha})`;
  fxCtx.shadowColor = `rgba(${color}, ${Math.min(alpha + 0.06, 0.34)})`;
  fxCtx.shadowBlur = Math.max(8, size * 0.28);
  fxCtx.fill();
  fxCtx.restore();
}

function drawForegroundHeartsLayer() {
  if (!foregroundHearts || !foregroundHearts.length) return;
  const tNow = performance.now();
  for (let i = 0; i < foregroundHearts.length; i++) {
    const item = foregroundHearts[i];
    item.y -= item.speed * item.depth;
    if (item.y < -100) {
      resetForegroundHeart(item, true);
      continue;
    }
    const progress = 1 - Math.max(0, Math.min(1, item.y / (window.innerHeight + 120)));
    const size = item.baseSize * (0.72 + progress * 2.7 * item.depth);
    const x = item.x + Math.sin(tNow * item.swaySpeed + item.phase) * item.sway + Math.sin(progress * 5 + item.phase) * 6;
    const alpha = Math.min(0.34, item.alpha + progress * 0.18);
    drawScreenHeart(x, item.y, size, alpha, item.color);

    if (progress > 0.62 && Math.random() > 0.92) {
      particles.push({
        x, y: item.y,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -0.25 - Math.random() * 0.65,
        life: 0,
        ttl: 280 + Math.random() * 220,
        size: 1.8 + Math.random() * 2.3,
        color: item.color,
        heartShape: Math.random() > 0.68
      });
    }
  }
}

function updateBeatBars(pulse = 0, delta = 16) {
  if (!beatBars || !beatBars.length) return;
  const now = performance.now();
  beatBars.forEach((bar, index) => {
    let strength = 0;
    if (!bgm.paused && analyser && analyserData && analyserData.length) {
      const start = Math.floor(index / beatBars.length * analyserData.length);
      const end = Math.min(analyserData.length, start + Math.max(2, Math.floor(analyserData.length / beatBars.length)));
      let sum = 0;
      for (let i = start; i < end; i++) sum += analyserData[i] || 0;
      strength = (sum / Math.max(1, end - start)) / 255;
    }
    if (strength < 0.06) {
      strength = 0.18 + Math.abs(Math.sin(now * 0.009 + index * 0.62)) * 0.38 + pulse * 0.45;
    } else {
      strength = Math.min(1, strength * 1.7 + pulse * 0.28);
    }
    const h = 8 + strength * (20 + ((index % 4) * 2.5));
    bar.style.height = `${h.toFixed(1)}px`;
    bar.style.transform = `translateY(${((1 - strength) * 1.5).toFixed(1)}px) scaleY(${(0.88 + strength * 0.26).toFixed(3)})`;
    bar.style.opacity = String((0.56 + strength * 0.44).toFixed(3));
  });
}

function updateBeatVisual(delta) {
  let pulse = 0;
  if (bgm && !bgm.paused && analyser && analyserData) {
    analyser.getByteFrequencyData(analyserData);
    let sum = 0;
    for (let i = 0; i < analyserData.length; i++) sum += analyserData[i];
    pulse = Math.min(1, (sum / analyserData.length / 255) * 2.1);
  } else {
    fakeBeatT += delta * 0.0026;
    pulse = 0.16 + Math.abs(Math.sin(fakeBeatT)) * 0.28;
  }

  const scale = 1 + pulse * 0.08;
  const flash = Math.min(0.42, pulse * 0.30);
  document.documentElement.style.setProperty("--beat-scale", String(scale));
  document.documentElement.style.setProperty("--flash-alpha", String(flash));
  if (centerOrb) {
    centerOrb.style.boxShadow = `0 16px 60px rgba(0,0,0,.28), 0 0 ${20 + pulse * 56}px rgba(255,210,138,.15), inset 0 1px 0 rgba(255,255,255,.18)`;
  }
  if (beatHint) beatHint.textContent = bgm && !bgm.paused ? "BGM PLAYING" : "BGM READY";
  updateBeatBars(pulse, delta);
}


/* ===== v13: subtle tunnel hearts background, no blocking overlay ===== */
function createForegroundHearts() {
  foregroundHearts = [];
}

function drawForegroundHeartsLayer() {
  return;
}

function createStars() {
  stars = [];
  const particleCount = Math.max(180, Math.floor(window.innerWidth * window.innerHeight / 5200));
  const balloonCount = Math.max(10, Math.floor(window.innerWidth / 190));

  for (let i = 0; i < particleCount; i++) {
    const roll = Math.random();
    const type = roll < 0.16 ? 'heart' : (roll < 0.88 ? 'sparkle' : 'glow');
    stars.push({
      type,
      nx: (Math.random() * 2 - 1) * 1.12,
      ny: (Math.random() * 2 - 1) * 1.85,
      z: 0.12 + Math.random() * 1.25,
      speed: 0.0035 + Math.random() * 0.0085,
      base: type === 'heart' ? (0.9 + Math.random() * 1.8) : (0.6 + Math.random() * 1.2),
      alpha: type === 'heart' ? (0.26 + Math.random() * 0.24) : (0.18 + Math.random() * 0.22),
      color: type === 'heart'
        ? [
            '255,154,193','255,179,202','255,198,217','255,202,159','255,169,189'
          ][Math.floor(Math.random() * 5)]
        : [
            '255,225,198','255,205,160','255,183,206','255,241,223'
          ][Math.floor(Math.random() * 4)],
      twinkle: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.002
    });
  }

  for (let i = 0; i < balloonCount; i++) {
    stars.push({
      type: 'balloon',
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 14 + Math.random() * 20,
      speed: 0.18 + Math.random() * 0.34,
      swayAmp: 6 + Math.random() * 16,
      swaySpeed: 0.001 + Math.random() * 0.0018,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.12 + Math.random() * 0.12,
      color: ['255,170,207','255,208,145','157,224,255','201,185,255','255,150,166'][Math.floor(Math.random() * 5)]
    });
  }
}

function drawHeartShape(x, y, size, alpha, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(0, 1, -7, -4, -10, 1);
  ctx.bezierCurveTo(-13, 6, -9, 11, 0, 17);
  ctx.bezierCurveTo(9, 11, 13, 6, 10, 1);
  ctx.bezierCurveTo(7, -4, 0, 1, 0, 5);
  ctx.closePath();
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.shadowColor = `rgba(${color}, ${Math.min(alpha + 0.05, 0.24)})`;
  ctx.shadowBlur = Math.max(4, size * 0.55);
  ctx.fill();
  ctx.restore();
}

function drawBalloonShape(x, y, size, alpha, color) {
  const w = size * 0.72;
  const h = size * 0.92;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.shadowColor = `rgba(${color}, ${Math.min(alpha + 0.05, 0.22)})`;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.52);
  ctx.bezierCurveTo(w * 0.66, -h * 0.5, w * 0.62, h * 0.20, 0, h * 0.46);
  ctx.bezierCurveTo(-w * 0.62, h * 0.20, -w * 0.66, -h * 0.5, 0, -h * 0.52);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255, ${alpha * 0.30})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.42);
  ctx.quadraticCurveTo(-4, h * 0.72, 2, h * 1.14);
  ctx.stroke();
  ctx.restore();
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const t = performance.now();
  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.5;
  const spread = Math.min(window.innerWidth, window.innerHeight) * 0.46;

  stars.forEach(item => {
    if (item.type === 'balloon') {
      item.y -= item.speed;
      if (item.y < -80) {
        item.y = window.innerHeight + 80;
        item.x = Math.random() * window.innerWidth;
      }
      const x = item.x + Math.sin(t * item.swaySpeed + item.phase) * item.swayAmp;
      drawBalloonShape(x, item.y, item.size, item.alpha, item.color);
      return;
    }

    item.z -= item.speed;
    item.nx += item.drift;
    if (item.z <= 0.03 || Math.abs(item.nx / item.z) > 2.4 || Math.abs(item.ny / item.z) > 2.6) {
      item.nx = (Math.random() * 2 - 1) * 1.12;
      item.ny = (Math.random() * 2 - 1) * 1.85;
      item.z = 1.15 + Math.random() * 0.55;
      item.twinkle = Math.random() * Math.PI * 2;
    }

    const perspective = 1 / item.z;
    const x = cx + item.nx * perspective * spread;
    const y = cy + item.ny * perspective * spread;
    const pulse = 0.82 + Math.sin(t * 0.004 + item.twinkle) * 0.18;
    const alpha = Math.min(0.5, item.alpha * perspective * 0.18 + item.alpha * 0.55) * pulse;

    if (item.type === 'heart') {
      const size = item.base * (1.9 + perspective * 4.8);
      drawHeartShape(x, y, size, alpha, item.color);
    } else if (item.type === 'glow') {
      const r = item.base * (0.9 + perspective * 2.6);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${item.color}, ${Math.min(0.5, alpha)})`;
      ctx.shadowColor = `rgba(${item.color}, ${Math.min(0.18, alpha)})`;
      ctx.shadowBlur = 10;
      ctx.fill();
    } else {
      const r = item.base * (0.7 + perspective * 2.0);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 242, 226, ${Math.min(0.62, alpha + 0.06)})`;
      ctx.fill();
    }
  });
  requestAnimationFrame(drawStars);
}


/* ===== v14 hotkeys: R/T/X replace top-right UI ===== */
document.addEventListener("keydown", event => {
  const key = String(event.key || "").toLowerCase();
  if (key === "r") {
    pinnedCards.clear();
    showSubtitle("照片已归位。", "快捷键 R", 1200);
    showSfx("↺ RESET");
    renderLayout(performance.now(), true);
  }
});


/* ===== v14.3 interaction polish ===== */
(function setupV143Polish(){
  const stage = albumStage;
  if (stage) {
    stage.addEventListener("pointermove", event => {
      const rect = stage.getBoundingClientRect();
      const mx = (event.clientX - rect.left) / rect.width;
      const my = (event.clientY - rect.top) / rect.height;
      stage.style.setProperty("--mx", mx.toFixed(3));
      stage.style.setProperty("--my", my.toFixed(3));
    });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--mx", ".5");
      stage.style.setProperty("--my", ".52");
    });
    stage.addEventListener("dblclick", () => {
      const modes = ["carousel", "heart", "grid", "galaxy", "film", "focus"];
      const idx = modes.indexOf(layoutMode);
      const next = modes[(idx + 1) % modes.length];
      setLayoutMode(next);
      const names = { carousel: "环绕", heart: "心形", grid: "平铺", galaxy: "银河螺旋", film: "胶片回忆", focus: "主照片聚焦" };
      
    });
  }

  document.addEventListener("keydown", event => {
    const key = String(event.key || "").toLowerCase();
    if (key === "escape") {
      if (photoModal.classList.contains("show")) { closePhoto(); return; }
      if (letterPanel.classList.contains("show")) { closeLetter(); return; }
      if (timelinePanel.classList.contains("show")) { closeTimeline(); return; }
    }
    if (photoModal.classList.contains("show")) {
      if (key === "arrowleft") { updateModalContent(currentOpenIndex - 1, -1); }
      if (key === "arrowright") { updateModalContent(currentOpenIndex + 1, 1); }
    }
    if (key === "t") {
      if (timelinePanel.classList.contains("show")) closeTimeline();
      else if (!letterPanel.classList.contains("show") && !photoModal.classList.contains("show")) openTimeline();
    }
    if (key === "x") {
      if (letterPanel.classList.contains("show")) closeLetter();
      else if (!timelinePanel.classList.contains("show") && !photoModal.classList.contains("show")) openLetter();
    }
  }, true);
})();


/* ===== v14.5 full polish: mouse heart field + refined details ===== */
function emitMouseHearts(x, y, amount = 2) {
  const now = performance.now();
  if (now - lastMouseHeartTime < 26 && amount <= 3) return;
  lastMouseHeartTime = now;

  const maxCount = 96;
  for (let i = 0; i < amount; i++) {
    if (mouseHearts.length > maxCount) mouseHearts.shift();
    const isFront = Math.random() > 0.52;
    const radius = isFront ? (10 + Math.random() * 24) : (14 + Math.random() * 30);
    const angle = Math.random() * Math.PI * 2;
    const size = isFront ? (10 + Math.random() * 12) : (5 + Math.random() * 6);
    const ttl = isFront ? (860 + Math.random() * 540) : (700 + Math.random() * 460);
    mouseHearts.push({
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * (isFront ? 0.24 : 0.16),
      vy: -(isFront ? (0.12 + Math.random() * 0.34) : (0.08 + Math.random() * 0.22)),
      sway: (Math.random() - 0.5) * (isFront ? 0.010 : 0.007),
      life: 0,
      ttl,
      size,
      layer: isFront ? "front" : "back",
      rotate: (Math.random() - 0.5) * 28,
      color: ["255,214,231", "255,193,215", "255,241,246", "255,225,184"][Math.floor(Math.random() * 4)]
    });
  }
}

function emitPhotoLiftHearts(x, y) {
  for (let i = 0; i < 16; i++) {
    const isFront = Math.random() > 0.4;
    mouseHearts.push({
      x: x + (Math.random() - 0.5) * 54,
      y: y + (Math.random() - 0.5) * 38,
      vx: (Math.random() - 0.5) * (isFront ? 0.9 : 0.55),
      vy: -(isFront ? (0.35 + Math.random() * 0.92) : (0.22 + Math.random() * 0.65)),
      sway: (Math.random() - 0.5) * (isFront ? 0.024 : 0.014),
      life: 0,
      ttl: isFront ? (680 + Math.random() * 480) : (540 + Math.random() * 360),
      size: isFront ? (9 + Math.random() * 10) : (5 + Math.random() * 5),
      layer: isFront ? "front" : "back",
      rotate: (Math.random() - 0.5) * 35,
      color: Math.random() > 0.38 ? "255,190,218" : "255,226,184"
    });
  }
}

function drawMouseHeartParticle(h) {
  const t = h.life / h.ttl;
  const alphaBase = h.layer === "front" ? 0.8 : 0.42;
  const alpha = Math.max(0, (1 - Math.pow(t, 1.9)) * alphaBase);
  const scaleBase = h.layer === "front" ? 1 : 0.72;
  const scale = (1 - t * (h.layer === "front" ? 0.22 : 0.16)) * scaleBase;
  const blur = h.layer === "front" ? (t * 0.35) : (0.25 + t * 0.65);

  fxCtx.save();
  fxCtx.translate(h.x, h.y);
  fxCtx.rotate((h.rotate + t * (h.layer === "front" ? 18 : 10)) * Math.PI / 180);
  fxCtx.scale((h.size / 18) * scale, (h.size / 18) * scale);
  fxCtx.filter = `blur(${blur}px)`;
  fxCtx.beginPath();
  fxCtx.moveTo(0, 5);
  fxCtx.bezierCurveTo(0, 1, -7, -4, -10, 1);
  fxCtx.bezierCurveTo(-13, 6, -9, 11, 0, 17);
  fxCtx.bezierCurveTo(9, 11, 13, 6, 10, 1);
  fxCtx.bezierCurveTo(7, -4, 0, 1, 0, 5);
  fxCtx.closePath();
  fxCtx.fillStyle = `rgba(${h.color}, ${alpha})`;
  fxCtx.shadowColor = "transparent";
  fxCtx.shadowBlur = 0;
  fxCtx.fill();
  fxCtx.restore();
}

function drawMouseHeartsLayer(delta = 16) {
  if (!mouseHearts.length) return;
  for (let i = mouseHearts.length - 1; i >= 0; i--) {
    const h = mouseHearts[i];
    h.life += delta;
    h.x += h.vx + Math.sin((h.life + i * 80) * h.sway) * 0.28;
    h.y += h.vy;
    h.vy -= 0.0015;
    const dx = h.x - mouseHeartPos.x;
    const dy = h.y - mouseHeartPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 86) {
      h.life += 28; // out of range fades faster, not instantly
    }
    if (h.life >= h.ttl) {
      mouseHearts.splice(i, 1);
      continue;
    }
    drawMouseHeartParticle(h);
  }
}

document.addEventListener("pointermove", event => {
  mouseHeartPos.x = event.clientX;
  mouseHeartPos.y = event.clientY;
  mouseHeartPos.active = true;
  emitMouseHearts(event.clientX, event.clientY, 2);
}, { passive: true });

document.addEventListener("pointerleave", () => {
  mouseHeartPos.active = false;
});


(function setupV145TimelineAndLetter() {
  if (timelinePanel) {
    timelinePanel.addEventListener("click", event => {
      if (event.target === timelinePanel) closeTimeline();
    });
  }
  if (letterPanel) {
    letterPanel.addEventListener("click", event => {
      if (event.target === letterPanel) closeLetter();
    });
  }
})();


/* ===== v15.1 focus arrows ===== */
document.addEventListener("keydown", event => {
  if (layoutMode !== "focus") return;
  if (photoModal.classList.contains("show") || timelinePanel.classList.contains("show") || letterPanel.classList.contains("show")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const auto = Math.floor(performance.now() / 4200) % Math.max(1, cards.length);
    const base = performance.now() < focusManualActiveUntil ? focusManualIndex : auto;
    focusManualIndex = (base + dir + cards.length) % cards.length;
    focusManualActiveUntil = performance.now() + 7000;
    renderLayout(performance.now(), true);
  }
}, true);
