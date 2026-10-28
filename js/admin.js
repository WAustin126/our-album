/* 相册后台：登录 → 编辑 → 立即生效（没有草稿/发布流程） */
(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const BUCKET = cfg.bucket || "album";
  const $ = (id) => document.getElementById(id);
  const esc = (v) =>
    String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let sb = null;
  const state = { settings: {}, photos: [], timeline: [], letter: [], songs: [] };

  /* ---------------- 小工具 ---------------- */
  let toastTimer = 0;
  function toast(msg, isError) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.toggle("err", Boolean(isError));
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }
  const pad = (n) => String(n).padStart(2, "0");
  function isoToInput(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function inputToIso(v) {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  const rand = () => Math.random().toString(36).slice(2, 8);

  async function patch(table, id, values) {
    const { error } = await sb.from(table).update(values).eq("id", id);
    if (error) toast("保存失败：" + error.message, true);
    return !error;
  }

  /* ---------------- 登录 ---------------- */
  async function boot() {
    if (!cfg.url || !cfg.anonKey) {
      $("loginError").textContent = "还没配置 Supabase：把 js/config/supabase.js 里的 url 和 anonKey 填上。";
      $("loginBtn").disabled = true;
      return;
    }
    sb = window.supabase.createClient(cfg.url, cfg.anonKey);
    const { data } = await sb.auth.getSession();
    if (data && data.session) enterApp();
    else showLogin();
    sb.auth.onAuthStateChange((_event, session) => {
      if (!session) showLogin();
    });
  }
  function showLogin() {
    $("appView").hidden = true;
    $("loginView").style.display = "";
  }
  async function enterApp() {
    $("loginView").style.display = "none";
    $("appView").hidden = false;
    await loadAll();
  }

  $("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!sb) return;
    $("loginBtn").disabled = true;
    $("loginError").textContent = "";
    const { error } = await sb.auth.signInWithPassword({
      email: $("email").value.trim(),
      password: $("password").value
    });
    if (error) {
      $("loginError").textContent =
        /invalid/i.test(error.message) ? "邮箱或密码不对。" : "登录失败：" + error.message;
    }
    $("loginBtn").disabled = false;
  });

  $("logoutBtn").addEventListener("click", async () => {
    await sb.auth.signOut();
    showLogin();
  });

  /* ---------------- 标签切换 ---------------- */
  $("tabs").addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-tab]");
    if (!btn) return;
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === "tab-" + btn.dataset.tab));
  });

  /* ---------------- 读取 ---------------- */
  async function loadAll() {
    const [st, ph, tl, le, so] = await Promise.all([
      sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      sb.from("photos").select("*").order("position").order("created_at"),
      sb.from("timeline_items").select("*").order("position"),
      sb.from("letter_lines").select("*").order("position"),
      sb.from("songs").select("*").order("position")
    ]);
    [st, ph, tl, le, so].forEach((r) => {
      if (r.error) toast("读取失败：" + r.error.message, true);
    });
    state.settings = st.data || {};
    state.photos = ph.data || [];
    state.timeline = tl.data || [];
    state.letter = le.data || [];
    state.songs = so.data || [];
    fillSite();
    renderPhotos();
    renderTimeline();
    renderLetter();
    renderMusic();
  }

  /* ---------------- 站点设置 ---------------- */
  function fillSite() {
    const s = state.settings || {};
    $("s-brand").value = s.brand || "";
    $("s-title").value = s.site_title || "";
    $("s-love").value = isoToInput(s.love_start_at);
    $("s-pass").value = s.gift_password || "";
    $("s-letter-title").value = s.letter_title || "";
    $("s-letter-sign").value = s.letter_sign || "";
  }

  $("saveSite").addEventListener("click", async () => {
    const payload = {
      id: 1,
      brand: $("s-brand").value.trim() || "MANGO PUDDING",
      site_title: $("s-title").value.trim() || "送给你的云端相册",
      love_start_at: inputToIso($("s-love").value),
      gift_password: $("s-pass").value.trim() || "520",
      letter_title: $("s-letter-title").value.trim() || "写给你",
      letter_sign: $("s-letter-sign").value.trim() || "",
      updated_at: new Date().toISOString()
    };
    const { error } = await sb.from("site_settings").upsert(payload);
    toast(error ? "保存失败：" + error.message : "站点设置已保存", Boolean(error));
  });

  /* ---------------- 照片 ---------------- */
  function renderPhotos() {
    $("photoCount").textContent = state.photos.length ? `共 ${state.photos.length} 张` : "";
    $("photoList").innerHTML = state.photos
      .map(
        (p, i) => `
      <div class="item" data-id="${esc(p.id)}">
        <img class="thumb" src="${esc(p.url)}" alt="" loading="lazy" />
        <div class="fields">
          <input data-field="title" value="${esc(p.title)}" placeholder="标题（可留空）" />
          <textarea data-field="caption" placeholder="关于这张的一句话">${esc(p.caption)}</textarea>
          <input type="date" data-field="taken_on" value="${esc(p.taken_on || "")}" />
        </div>
        <div class="tools">
          <button class="btn" data-act="up" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn" data-act="down" ${i === state.photos.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn danger" data-act="del">删除</button>
        </div>
      </div>`
      )
      .join("");
  }

  $("photoList").addEventListener("change", async (event) => {
    const item = event.target.closest(".item");
    if (!item) return;
    const field = event.target.dataset.field;
    if (!field) return;
    const row = state.photos.find((p) => p.id === item.dataset.id);
    if (!row) return;
    const value = event.target.value;
    row[field] = value || (field === "taken_on" ? null : "");
    await patch("photos", row.id, { [field]: row[field] });
  });

  $("photoList").addEventListener("click", async (event) => {
    const btn = event.target.closest("button[data-act]");
    if (!btn) return;
    const item = btn.closest(".item");
    const id = item.dataset.id;
    const index = state.photos.findIndex((p) => p.id === id);
    if (index < 0) return;
    const act = btn.dataset.act;

    if (act === "up" || act === "down") {
      const target = act === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= state.photos.length) return;
      const a = state.photos[index];
      const b = state.photos[target];
      [state.photos[index], state.photos[target]] = [b, a];
      renderPhotos();
      await Promise.all([
        patch("photos", a.id, { position: target }),
        patch("photos", b.id, { position: index })
      ]);
      return;
    }

    if (act === "del") {
      if (!confirm("删掉这张照片？")) return;
      const row = state.photos[index];
      if (row.storage_path) await sb.storage.from(BUCKET).remove([row.storage_path]);
      const { error } = await sb.from("photos").delete().eq("id", id);
      if (error) return toast("删除失败：" + error.message, true);
      state.photos.splice(index, 1);
      renderPhotos();
      toast("已删除");
    }
  });

  async function compress(file, max = 1600, quality = 0.82) {
    if (!/^image\//.test(file.type)) return file;
    try {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const w = Math.max(1, Math.round(bmp.width * scale));
      const h = Math.max(1, Math.round(bmp.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
      const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
      return blob || file;
    } catch (_) {
      return file;
    }
  }

  async function uploadPhotos(files) {
    const list = [...files].filter((f) => /^image\//.test(f.type));
    if (!list.length) return;
    const bar = $("photoProgress").firstElementChild;
    let done = 0;
    for (const file of list) {
      try {
        const blob = await compress(file);
        const path = `photos/${Date.now()}-${rand()}.jpg`;
        const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg" });
        if (up.error) throw up.error;
        const url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        const position = (state.photos.length ? state.photos[state.photos.length - 1].position : -1) + 1;
        const ins = await sb.from("photos").insert({ url, storage_path: path, title: "", caption: "", position }).select().single();
        if (ins.error) throw ins.error;
        state.photos.push(ins.data);
      } catch (e) {
        toast("上传失败：" + (e.message || e), true);
      }
      done++;
      bar.style.width = Math.round((done / list.length) * 100) + "%";
    }
    bar.style.width = "0%";
    renderPhotos();
    toast(`已上传 ${done} 张`);
  }

  /* ---------------- 时间轴 ---------------- */
  function renderTimeline() {
    $("timelineList").innerHTML = state.timeline
      .map(
        (t, i) => `
      <div class="item plain" data-id="${esc(t.id)}">
        <div class="fields">
          <div class="row grid-2">
            <input data-field="date_label" value="${esc(t.date_label)}" placeholder="日期/编号，如 2025.05.20" />
            <input data-field="title" value="${esc(t.title)}" placeholder="这一章的标题" />
          </div>
          <textarea data-field="body" placeholder="写几句">${esc(t.body)}</textarea>
        </div>
        <div class="tools">
          <button class="btn" data-act="up" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn" data-act="down" ${i === state.timeline.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn danger" data-act="del">删除</button>
        </div>
      </div>`
      )
      .join("");
  }

  function bindList(listId, table, key, render) {
    const el = $(listId);
    el.addEventListener("change", async (event) => {
      const item = event.target.closest(".item");
      const field = event.target.dataset.field;
      if (!item || !field) return;
      const row = state[key].find((r) => r.id === item.dataset.id);
      if (!row) return;
      row[field] = event.target.value;
      await patch(table, row.id, { [field]: row[field] });
    });
    el.addEventListener("click", async (event) => {
      const btn = event.target.closest("button[data-act]");
      if (!btn) return;
      const item = btn.closest(".item");
      const id = item.dataset.id;
      const index = state[key].findIndex((r) => r.id === id);
      if (index < 0) return;

      if (btn.dataset.act === "del") {
        if (!confirm("删掉这一条？")) return;
        const { error } = await sb.from(table).delete().eq("id", id);
        if (error) return toast("删除失败：" + error.message, true);
        state[key].splice(index, 1);
        render();
        return;
      }

      const target = btn.dataset.act === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= state[key].length) return;
      const a = state[key][index];
      const b = state[key][target];
      [state[key][index], state[key][target]] = [b, a];
      render();
      await Promise.all([patch(table, a.id, { position: target }), patch(table, b.id, { position: index })]);
    });
  }

  async function addRow(table, values) {
    const position = state[tableKey(table)].length;
    const { data, error } = await sb.from(table).insert({ ...values, position }).select().single();
    if (error) return toast("添加失败：" + error.message, true);
    state[tableKey(table)].push(data);
    return data;
  }
  function tableKey(table) {
    return table === "timeline_items" ? "timeline" : table === "letter_lines" ? "letter" : "songs";
  }

  bindList("timelineList", "timeline_items", "timeline", renderTimeline);

  $("addTimeline").addEventListener("click", async () => {
    await addRow("timeline_items", { date_label: "", title: "新的回忆", body: "" });
    renderTimeline();
  });

  /* ---------------- 信 ---------------- */
  function renderLetter() {
    $("letterList").innerHTML = state.letter
      .map(
        (l, i) => `
      <div class="item plain" data-id="${esc(l.id)}">
        <div class="fields">
          <textarea data-field="body" placeholder="写一段">${esc(l.body)}</textarea>
          <label class="mini"><input type="checkbox" data-field="emphasis" style="width:auto;margin-right:6px" ${l.emphasis ? "checked" : ""}/>这是署名段（手写体）</label>
        </div>
        <div class="tools">
          <button class="btn" data-act="up" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn" data-act="down" ${i === state.letter.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn danger" data-act="del">删除</button>
        </div>
      </div>`
      )
      .join("");
  }

  $("letterList").addEventListener("change", async (event) => {
    const item = event.target.closest(".item");
    const field = event.target.dataset.field;
    if (!item || !field) return;
    const row = state.letter.find((r) => r.id === item.dataset.id);
    if (!row) return;
    row[field] = field === "emphasis" ? event.target.checked : event.target.value;
    await patch("letter_lines", row.id, { [field]: row[field] });
  });

  $("addLetter").addEventListener("click", async () => {
    await addRow("letter_lines", { body: "", emphasis: false });
    renderLetter();
  });

  /* ---------------- 音乐 ---------------- */
  function parseLyrics(text) {
    const out = [];
    String(text || "")
      .split(/\r?\n/)
      .forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        const m = trimmed.match(/^\[?(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?\]?\s*(.*)$/);
        if (m && m[4].trim()) {
          const sec = Number(m[1]) * 60 + Number(m[2]) + (m[3] ? Number("0." + m[3]) : 0);
          out.push({ time: Number(sec.toFixed(2)), text: m[4].trim() });
        } else {
          out.push({ time: out.length ? Number((out[out.length - 1].time + 4).toFixed(2)) : 0, text: trimmed });
        }
      });
    return out;
  }
  function lyricsToText(lyrics) {
    if (!Array.isArray(lyrics)) return "";
    return lyrics
      .map((l) => `${pad(Math.floor((l.time || 0) / 60))}:${pad(Math.floor((l.time || 0) % 60))} ${l.text || ""}`)
      .join("\n");
  }

  function renderMusic() {
    $("musicList").innerHTML = state.songs
      .map(
        (s, i) => `
      <div class="item plain" data-id="${esc(s.id)}">
        <div class="fields">
          <div class="row grid-2">
            <input data-field="title" value="${esc(s.title)}" placeholder="歌名" />
            <input data-field="artist" value="${esc(s.artist)}" placeholder="歌手（可留空）" />
          </div>
          <textarea data-field="lyrics_text" placeholder="00:12 这一句歌词">${esc(lyricsToText(s.lyrics))}</textarea>
          <label class="mini"><input type="checkbox" data-field="active" style="width:auto;margin-right:6px" ${s.active ? "checked" : ""}/>在访客页播放</label>
        </div>
        <div class="tools">
          <button class="btn" data-act="up" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn" data-act="down" ${i === state.songs.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn danger" data-act="del">删除</button>
        </div>
      </div>`
      )
      .join("");
  }

  $("musicList").addEventListener("change", async (event) => {
    const item = event.target.closest(".item");
    const field = event.target.dataset.field;
    if (!item || !field) return;
    const row = state.songs.find((r) => r.id === item.dataset.id);
    if (!row) return;
    if (field === "lyrics_text") {
      row.lyrics = parseLyrics(event.target.value);
      await patch("songs", row.id, { lyrics: row.lyrics });
      return;
    }
    if (field === "active") {
      row.active = event.target.checked;
      await patch("songs", row.id, { active: row.active });
      return;
    }
    row[field] = event.target.value;
    await patch("songs", row.id, { [field]: row[field] });
  });

  $("musicList").addEventListener("click", async (event) => {
    const btn = event.target.closest("button[data-act]");
    if (!btn) return;
    const item = btn.closest(".item");
    const id = item.dataset.id;
    const index = state.songs.findIndex((r) => r.id === id);
    if (index < 0) return;
    if (btn.dataset.act === "del") {
      if (!confirm("删掉这首歌？")) return;
      const row = state.songs[index];
      if (row.storage_path) await sb.storage.from(BUCKET).remove([row.storage_path]);
      const { error } = await sb.from("songs").delete().eq("id", id);
      if (error) return toast("删除失败：" + error.message, true);
      state.songs.splice(index, 1);
      renderMusic();
      return;
    }
    const target = btn.dataset.act === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= state.songs.length) return;
    const a = state.songs[index];
    const b = state.songs[target];
    [state.songs[index], state.songs[target]] = [b, a];
    renderMusic();
    await Promise.all([patch("songs", a.id, { position: target }), patch("songs", b.id, { position: index })]);
  });

  async function uploadAudio(file) {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) return toast("这首歌超过 20MB，换个小一点的", true);
    const bar = $("audioProgress").firstElementChild;
    bar.style.width = "30%";
    try {
      const ext = (file.name.split(".").pop() || "mp3").toLowerCase();
      const path = `audio/${Date.now()}-${rand()}.${ext}`;
      const up = await sb.storage.from(BUCKET).upload(path, file, { contentType: file.type || "audio/mpeg" });
      if (up.error) throw up.error;
      bar.style.width = "80%";
      const url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      const position = state.songs.length;
      const ins = await sb
        .from("songs")
        .insert({ url, storage_path: path, title: file.name.replace(/\.[^.]+$/, ""), artist: "", lyrics: [], position, active: true })
        .select()
        .single();
      if (ins.error) throw ins.error;
      state.songs.push(ins.data);
      renderMusic();
      toast("已添加，记得填歌词");
    } catch (e) {
      toast("上传失败：" + (e.message || e), true);
    }
    bar.style.width = "0%";
  }

  /* ---------------- 拖拽 / 选择 ---------------- */
  function wireDropzone(zoneId, inputId, handler) {
    const zone = $(zoneId);
    const input = $(inputId);
    zone.addEventListener("click", (event) => {
      if (event.target !== input) input.click();
    });
    input.addEventListener("change", () => {
      handler(input.files);
      input.value = "";
    });
    ["dragover", "dragenter"].forEach((evt) =>
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        zone.classList.add("over");
      })
    );
    ["dragleave", "drop"].forEach((evt) =>
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        zone.classList.remove("over");
      })
    );
    zone.addEventListener("drop", (e) => {
      if (e.dataTransfer && e.dataTransfer.files) handler(e.dataTransfer.files);
    });
  }
  wireDropzone("photoDrop", "photoInput", uploadPhotos);
  wireDropzone("audioDrop", "audioInput", (files) => uploadAudio(files && files[0]));

  boot();
})();
