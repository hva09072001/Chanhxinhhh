/**
 * music.js – NHẠC NỀN CHO WEBSITE CHANH XINHHH (không cần sửa script.js / style.css)
 *
 * CÁCH DÙNG
 *  1. Tạo thư mục "music" cạnh index.html, bỏ file nhạc .mp3 vào (xem TRACKS bên dưới).
 *  2. Trong index.html, thêm 1 dòng NGAY TRƯỚC thẻ </body>:
 *         <script src="music.js"></script>
 *
 * LƯU Ý QUAN TRỌNG
 *  - Trình duyệt (Chrome, Safari, Edge, điện thoại) CHẶN tự phát nhạc có tiếng khi khách vừa mở web,
 *    không có cách hợp lệ nào vượt qua. Cách gần nhất: MÀN CHÀO "Vào shop 🎶" (WELCOME_SCREEN = true):
 *    khách chạm 1 lần là nhạc phát ngay lúc vào web. Tắt màn chào (= false) thì nhạc bắt đầu ở lần chạm đầu tiên bất kỳ.
 *  - Luôn có nút 🎵 góc phải để bật/tắt.
 *  - Khách đã bấm tắt thì lần sau vào web nhạc KHÔNG tự bật lại (tôn trọng lựa chọn của khách).
 *  - Mỗi giao diện (20/10, Noel, Tết) có thể có bài riêng, tự đổi khi giao diện đổi.
 *  - BẢN QUYỀN: chỉ dùng nhạc không bản quyền / royalty-free hoặc nhạc bạn có giấy phép.
 *    Dùng bài hát thương mại (nhạc Việt, nhạc Tết nổi tiếng...) có thể bị khiếu nại bản quyền, bị gỡ web.
 *  - Nên dùng file mp3 nhẹ (khoảng 1–3 MB, 128 kbps) để web không chậm. File chỉ tải khi khách bật nhạc.
 */
(function () {
  /* ================== CẤU HÌNH – SỬA Ở ĐÂY ================== */
  var TRACKS = {
    a: 'music/20-10.mp3',      // giao diện 20/10
    n: 'music/noel.mp3',       // giao diện Noel
    t: 'music/tet.mp3'         // giao diện Tết
  };
  var FALLBACK_TRACK = 'music/nhac-nen.mp3';   // dùng khi giao diện không có bài riêng hoặc file bị thiếu
  var VOLUME = 0.35;                           // 0 đến 1; để nhỏ cho dễ chịu
  var SHOW_HINT = true;                        // hiện bong bóng "Bật nhạc nhé" (chỉ khi KHÔNG dùng màn chào)

  var WELCOME_SCREEN = true;                   // true = hiện màn chào, khách chạm "Vào shop" là có nhạc ngay. false = tắt màn chào
  var ENTER_TEXT = 'Vào shop 🎶';              // chữ trên nút vào
  var SKIP_TEXT  = 'Vào không nhạc';           // chữ của nút bỏ qua nhạc
  var GREETING = {                             // câu chào theo giao diện (a = 20/10, n = Noel, t = Tết)
    a: 'Chị em xinh, vào shop 20/10 nào!',
    n: 'Noel rộn ràng, vào shop thôi!',
    t: 'Tết đến rồi, vào shop diện đẹp nào!',
    def: 'Chào bạn, vào shop xem váy xinh nhé!'
  };
  /* ========================================================== */

  var KEY = 'cx_music';        // 'off' = khách đã tắt
  var root = document.documentElement;
  var audio = new Audio();
  audio.loop = true; audio.preload = 'none'; audio.volume = VOLUME;

  var playing = false;         // đang phát
  var userOff = false;         // khách chủ động tắt
  var usedFallback = false;
  var btn, hint, fadeTimer, gate = null;

  try { userOff = localStorage.getItem(KEY) === 'off'; } catch (e) {}
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function trackFor(theme) { return TRACKS[theme] || FALLBACK_TRACK; }

  /* ---------- Giao diện nút ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.cx-music{position:fixed;right:16px;bottom:calc(142px + env(safe-area-inset-bottom,0px));z-index:29;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;' +
    'background:var(--primary,#E24C79);color:var(--on-primary,#fff);font-size:20px;line-height:1;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.28)}' +
    '.cx-music:focus-visible{outline:3px solid var(--accent,#FFE45C);outline-offset:3px}' +
    '.cx-music[data-on="1"] span{display:inline-block;animation:cxnote 1.6s ease-in-out infinite}' +
    '@keyframes cxnote{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-3px) rotate(8deg)}}' +
    '.cx-music-hint{position:fixed;right:70px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:29;background:var(--surface,#fff);color:var(--ink,#333);' +
    'border:1px solid var(--line,#eee);border-radius:14px;padding:6px 12px;font-size:13px;box-shadow:0 6px 18px rgba(0,0,0,.15);opacity:0;transform:translateX(8px);transition:.35s;pointer-events:none}' +
    '.cx-music-hint.on{opacity:1;transform:none}' +
    '@media(max-width:700px){.cx-music{right:12px;bottom:calc(180px + env(safe-area-inset-bottom,0px));width:42px;height:42px}.cx-music-hint{right:62px;bottom:calc(186px + env(safe-area-inset-bottom,0px))}}' +
    '.cx-gate{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:24px;text-align:center;background:var(--hero-bg,linear-gradient(160deg,#FFE6EE,#FFC7DA));color:var(--hero-ink,#4B2035);transition:opacity .5s,visibility .5s}' +
    '.cx-gate.out{opacity:0;visibility:hidden}' +
    '.cx-gate-card{max-width:440px}' +
    '.cx-gate-lemon{font-size:76px;line-height:1;display:inline-block;animation:cxbob 2.4s ease-in-out infinite}' +
    '@keyframes cxbob{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-8px) rotate(6deg)}}' +
    '.cx-gate h2{font-family:var(--font-display,inherit);font-size:clamp(34px,9vw,54px);line-height:1.1;margin:10px 0 8px;font-weight:800}' +
    '.cx-gate p{margin:0 0 24px;font-size:18px;opacity:.92}' +
    '.cx-gate-go{background:var(--cta-bg,#E24C79);color:var(--cta-ink,#fff);border:0;border-radius:999px;padding:15px 38px;font:600 18px/1 var(--font-body,inherit);cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.18)}' +
    '.cx-gate-go:active{transform:translateY(2px);box-shadow:0 4px 0 rgba(0,0,0,.18)}' +
    '.cx-gate-skip{display:block;margin:18px auto 0;background:none;border:0;color:inherit;opacity:.75;text-decoration:underline;cursor:pointer;font:14px/1.4 var(--font-body,inherit)}' +
    '.cx-gate button:focus-visible{outline:3px solid currentColor;outline-offset:3px}' +
    '@media(prefers-reduced-motion:reduce){.cx-music[data-on="1"] span,.cx-gate-lemon{animation:none}}';
  document.head.appendChild(css);

  btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'cx-music';
  btn.innerHTML = '<span aria-hidden="true">🎵</span>';
  document.body.appendChild(btn);

  /* ---------- Màn chào: 1 lần chạm = vào web + có nhạc ---------- */
  var gateSeen = false;
  try { gateSeen = sessionStorage.getItem('cx_gate') === '1'; } catch (e) {}
  var showGate = WELCOME_SCREEN && !userOff && !gateSeen;      // khách đã chọn tắt nhạc thì không làm phiền

  function closeGate() {
    if (!gate) return;
    var g = gate; gate = null;
    g.classList.add('out');
    document.body.style.overflow = g._prevOverflow || '';
    setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, 700);
    try { sessionStorage.setItem('cx_gate', '1'); } catch (e) {}
  }
  function enter(withMusic) {
    if (withMusic) { userOff = false; remember('on'); if (!playing) start(); }   // start() chạy ngay trong cú chạm -> được phép phát
    else { userOff = true; remember('off'); }
    closeGate();
  }
  function buildGate() {
    gate = document.createElement('div');
    gate.className = 'cx-gate'; gate.setAttribute('role', 'dialog'); gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-label', 'Chào mừng đến Chanh Xinhhh');
    var msg = GREETING[root.dataset.theme] || GREETING.def;
    gate.innerHTML = '<div class="cx-gate-card"><div class="cx-gate-lemon" aria-hidden="true">🍋</div>' +
      '<h2>Chanh Xinhhh</h2><p></p>' +
      '<button type="button" class="cx-gate-go"></button>' +
      '<button type="button" class="cx-gate-skip"></button></div>';
    gate.querySelector('p').textContent = msg;
    var go = gate.querySelector('.cx-gate-go'), skip = gate.querySelector('.cx-gate-skip');
    go.textContent = ENTER_TEXT; skip.textContent = SKIP_TEXT;
    go.addEventListener('click', function () { enter(true); });
    skip.addEventListener('click', function () { enter(false); });
    gate._prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(gate);
    go.focus();
  }
  document.addEventListener('keydown', function (e) { if (gate && e.key === 'Escape') enter(false); });
  if (showGate) buildGate();

  if (SHOW_HINT) {
    hint = document.createElement('div');
    hint.className = 'cx-music-hint'; hint.setAttribute('aria-hidden', 'true');
    hint.textContent = 'Bật nhạc nhé 🎶';
    document.body.appendChild(hint);
  }

  function paintBtn() {
    btn.dataset.on = playing ? '1' : '0';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
    btn.title = playing ? 'Tắt nhạc' : 'Bật nhạc';
    btn.firstChild.textContent = playing ? '🎵' : '🔇';
  }
  function hideHint() { if (hint) hint.classList.remove('on'); }
  paintBtn();
  if (hint && !userOff && !showGate) {
    setTimeout(function () { if (!playing) hint.classList.add('on'); }, 1200);
    setTimeout(hideHint, 7500);
  }

  /* ---------- Phát / dừng (có fade cho êm tai) ---------- */
  function fade(to, ms, done) {
    clearInterval(fadeTimer);
    var from = audio.volume, steps = Math.max(1, Math.round(ms / 40)), i = 0;
    fadeTimer = setInterval(function () {
      i++; audio.volume = Math.max(0, Math.min(1, from + (to - from) * (i / steps)));
      if (i >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, 40);
  }
  function start() {
    if (!audio.src) audio.src = trackFor(root.dataset.theme);
    audio.volume = 0;
    var p = audio.play();
    var ok = function () { playing = true; paintBtn(); hideHint(); fade(VOLUME, 600); };
    if (p && p.then) {
      return p.then(ok).catch(function () { playing = false; paintBtn(); });   // bị chặn: chờ lần chạm sau
    }
    ok(); return Promise.resolve();
  }
  function stop() {
    fade(0, 350, function () { audio.pause(); });
    playing = false; paintBtn();
  }

  btn.addEventListener('click', function () {
    if (playing) { userOff = true; remember('off'); stop(); }
    else { userOff = false; remember('on'); start(); }
  });

  /* ---------- Tự bắt đầu ở lần chạm đầu tiên (nếu khách chưa tắt) ---------- */
  function firstGesture(e) {
    if (gate) return;                                         // màn chào đang mở: để nút trong màn chào tự quyết định
    if (e && e.target && btn.contains(e.target)) return;      // chạm đúng nút thì để nút tự xử lý
    if (userOff || playing) { detach(); return; }
    start().then(function () { if (playing) detach(); });
  }
  function detach() {
    ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { document.removeEventListener(ev, firstGesture, true); });
  }
  if (!userOff) {
    // Chưa tải nhạc ngay (tiết kiệm dữ liệu 4G): chỉ bắt đầu khi khách chạm/nhấn lần đầu
    ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { document.addEventListener(ev, firstGesture, true); });
  }

  /* ---------- Đổi bài khi đổi giao diện 20/10 ⇄ Noel ⇄ Tết ---------- */
  var lastTheme = root.dataset.theme;
  new MutationObserver(function () {
    var t = root.dataset.theme;
    if (t === lastTheme) return;
    lastTheme = t; usedFallback = false;
    var next = trackFor(t);
    if (audio.src && audio.src.slice(-next.length) === next) return;   // cùng bài thì giữ nguyên
    var wasPlaying = playing;
    fade(0, 400, function () {
      audio.src = next;
      if (wasPlaying) { audio.volume = 0; var p = audio.play(); if (p && p.catch) p.catch(function () {}); fade(VOLUME, 600); }
    });
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  /* ---------- File thiếu: thử bài dự phòng, hết cách thì ẩn nút ---------- */
  audio.addEventListener('error', function () {
    if (!usedFallback && audio.src.slice(-FALLBACK_TRACK.length) !== FALLBACK_TRACK) {
      usedFallback = true; audio.src = FALLBACK_TRACK;
      if (playing || !userOff) { var p = audio.play(); if (p && p.catch) p.catch(function () {}); }
      return;
    }
    playing = false; btn.style.display = 'none'; hideHint();
    if (window.console) console.warn('[music.js] Không tìm thấy file nhạc. Kiểm tra thư mục "music/" và tên file trong TRACKS.');
  });

  /* ---------- Tạm dừng khi khách chuyển tab, tiếp tục khi quay lại ---------- */
  var resumeAfter = false;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { resumeAfter = playing; if (playing) audio.pause(); }
    else if (resumeAfter && !userOff) { var p = audio.play(); if (p && p.catch) p.catch(function () {}); }
  });
})();
