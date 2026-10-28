/* 访客端内容加载：从 Supabase 读，读不到就用页面里内置的默认内容。
   只读，绝不写库（写权限由 Supabase 的行级策略拦死）。 */
(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const hasRemote = Boolean(cfg.url && cfg.anonKey && window.supabase);

  function fmtDate(value, index) {
    if (!value) return `MEMORY ${String(index + 1).padStart(2, "0")}`;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  function brandHtml(brand) {
    if (!brand) return "";
    return brand.replace(/♥/g, '<span class="brand-heart-inline">♥</span>');
  }

  function applySettings(s) {
    if (!s) return;
    if (s.site_title) document.title = s.site_title;
    if (s.brand) {
      document.querySelectorAll(".brand-title").forEach((el) => {
        el.innerHTML = brandHtml(s.brand);
      });
      const mobileBrand = document.querySelector(".m-status-brand");
      if (mobileBrand) mobileBrand.innerHTML = `<i>♥</i>${brandHtml(s.brand)}`;
    }
    if (s.love_start_at) CONFIG.loveStartAt = s.love_start_at;
    if (s.gift_password) CONFIG.password = String(s.gift_password);
    const letterTitle = document.querySelector("#letterPanel h2");
    if (letterTitle && s.letter_title) letterTitle.textContent = s.letter_title;
    const stamp = document.querySelector(".letter-signature-stamp");
    if (stamp && s.letter_sign) stamp.textContent = s.letter_sign;
  }

  function applyPhotos(rows) {
    if (!rows || !rows.length) return;
    CONFIG.photos = rows.map((row, index) => ({
      src: row.url,
      title: row.title || "",
      date: fmtDate(row.taken_on, index),
      desc: row.caption || "",
      sticker: row.sticker || ""
    }));
    CONFIG.photoCount = rows.length;
  }

  function applyTimeline(rows) {
    if (!rows || !rows.length) return;
    CONFIG.timeline = rows.map((row, index) => ({
      date: row.date_label || String(index + 1).padStart(2, "0"),
      title: row.title || "",
      text: row.body || ""
    }));
  }

  function applyLetter(rows) {
    const area = document.getElementById("letterTypingArea");
    if (!area || !rows || !rows.length) return;
    const stamp = area.querySelector(".letter-signature-stamp");
    const frag = document.createDocumentFragment();
    rows.forEach((row) => {
      const p = document.createElement("p");
      p.className = "type-line" + (row.emphasis ? " signature type-line-sign" : "");
      p.dataset.text = row.body || "";
      frag.appendChild(p);
    });
    if (stamp) frag.appendChild(stamp);
    area.innerHTML = "";
    area.appendChild(frag);
  }

  function applySongs(rows) {
    if (!rows || !rows.length) return;
    CONFIG.songs = rows.map((row, index) => ({
      key: String(index + 1),
      title: row.title || `歌曲 ${index + 1}`,
      src: row.url,
      lyrics: Array.isArray(row.lyrics) ? row.lyrics : []
    }));
    CONFIG.currentSongIndex = 0;
    if (window.LRC_SONGS) window.LRC_SONGS = null; // 别让本地歌词文件盖掉后台内容
  }

  async function load() {
    if (!hasRemote) {
      window.__CONTENT_SOURCE__ = 'builtin';
      return null;
    }
    const sb = window.supabase.createClient(cfg.url, cfg.anonKey);
    const [settings, photos, timeline, letter, songs] = await Promise.all([
      sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      sb.from("photos").select("*").order("position", { ascending: true }).order("created_at", { ascending: true }),
      sb.from("timeline_items").select("*").order("position", { ascending: true }),
      sb.from("letter_lines").select("*").order("position", { ascending: true }),
      sb.from("songs").select("*").eq("active", true).order("position", { ascending: true })
    ]);
    return {
      settings: settings.data,
      photos: photos.data,
      timeline: timeline.data,
      letter: letter.data,
      songs: songs.data,
      errors: [settings.error, photos.error, timeline.error, letter.error, songs.error].filter(Boolean)
    };
  }

  window.__CONTENT_READY__ = load()
    .then((data) => {
      if (!data) return false;
      if (data.errors.length) console.warn("[content] 读取有字段失败：", data.errors);
      applySettings(data.settings);
      applyPhotos(data.photos);
      applyTimeline(data.timeline);
      applyLetter(data.letter);
      applySongs(data.songs);
      window.__CONTENT_SOURCE__ = "supabase";
      return true;
    })
    .catch((error) => {
      console.warn("[content] 远端内容不可用，使用内置内容：", error);
      window.__CONTENT_SOURCE__ = "builtin";
      return false;
    });
})();
