// TakeSync site: 11 languages (strings in i18n.js), local-currency prices, the scroll-synced hero timeline,
// light scroll parallax, and the overview video (shown once media/ has it).
(function () {
  'use strict';

  var I18N = (window.TAKESYNC_I18N && window.TAKESYNC_I18N.langs) || {};
  var EXTRA_EN = {
    'hero.synced': 'All in sync',
    'price.noteEur': 'Prices in euros. Taxes are added at checkout where they apply.',
    'price.noteLocal': 'Prices in US dollars; the amount in your currency is approximate, at today’s rate. Tax is calculated at checkout based on your country.',
    'files.total': 'Example, 500 files:', 'files.camA': 'Cam A', 'files.camB': 'Cam B', 'files.drone': 'Drone', 'files.phone': 'Phone', 'files.rec': 'Recorder', 'files.lav': 'Lav mics',
    'lane.camA': 'Cam A', 'lane.camB': 'Cam B', 'lane.drone': 'Drone', 'lane.rec': 'Recorder', 'lane.lav1': 'Lav 1', 'lane.lav2': 'Lav 2'
  };
  var EN = { _title: document.title };
  var lang = 'en';
  function dictFor(l) { return l === 'en' ? EN : (I18N[l] || EN); }
  function t(key) { var d = dictFor(lang); return d[key] != null ? d[key] : (EN[key] != null ? EN[key] : (EXTRA_EN[key] || key)); }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- hero timeline ----------
  // One shared "sound" for the whole scene: every clip shows its own slice of
  // it, so when the clips line up their peaks line up too.
  var N = 900;
  var signal = (function () {
    var s = new Array(N), r = 11;
    function rnd() { r = (r * 16807) % 2147483647; return r / 2147483647; }
    var i = 0;
    while (i < N) {
      var burst = 3 + Math.floor(rnd() * 14), gap = 1 + Math.floor(rnd() * 6), amp = 0.25 + rnd() * 0.75;
      for (var k = 0; k < burst && i < N; k++, i++) s[i] = amp * (0.55 + 0.45 * Math.sin(k / burst * Math.PI)) * (0.7 + 0.3 * rnd());
      for (k = 0; k < gap && i < N; k++, i++) s[i] = 0.04 + 0.05 * rnd();
    }
    return s;
  })();
  function wavePath(start, width) {
    // start/width in % of the scene; 3 samples per bar
    var a = Math.floor(start / 100 * N), b = Math.floor((start + width) / 100 * N);
    var bars = Math.max(4, Math.floor((b - a) / 3)), w = 100 / bars, d = '';
    for (var j = 0; j < bars; j++) {
      var v = 0;
      for (var k = 0; k < 3; k++) v = Math.max(v, signal[Math.min(N - 1, a + j * 3 + k)] || 0);
      var h = Math.max(1.5, v * 30);
      d += 'M' + (j * w + w * 0.18).toFixed(2) + ' ' + (17 - h / 2).toFixed(2) + 'h' + (w * 0.64).toFixed(2) + 'v' + h.toFixed(2) + 'h-' + (w * 0.64).toFixed(2) + 'z';
    }
    return d;
  }
  // [name key, colour, clips: [start %, width %, start offset %, badge]]
  var LANES = [
    ['lane.camA', 'var(--video)', [[6, 24, 11], [36, 22, -9], [66, 26, 14]]],
    ['lane.camB', 'var(--video)', [[12, 34, -16], [54, 30, 8]]],
    ['lane.drone', 'var(--clock)', [[31, 13, 19, '±1']]],
    ['lane.rec', 'var(--audio)', [[2, 92, -7]]],
    ['lane.lav1', 'var(--audio)', [[8, 40, 15], [57, 36, -12]]],
    ['lane.lav2', 'var(--audio)', [[16, 28, -20], [62, 30, 10]]]
  ];
  var lanesEl = document.getElementById('tl-lanes');
  var timeline = document.getElementById('timeline');
  var hero = document.getElementById('stage');
  var status = document.getElementById('tl-status');
  var tc = document.getElementById('tl-tc');
  var flash = document.getElementById('tl-flash');
  var laneEls = [], clipEls = [];
  LANES.forEach(function (L, li) {
    var lane = document.createElement('div'); lane.className = 'lane';
    var name = document.createElement('span'); name.className = 'lane-name'; name.setAttribute('data-i18n', L[0]); name.textContent = EXTRA_EN[L[0]];
    lane.appendChild(name);
    L[2].forEach(function (c) {
      var el = document.createElement('div'); el.className = 'tl-clip';
      el.style.setProperty('--c', L[1]);
      el.style.left = c[0] + '%'; el.style.width = c[1] + '%';
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 34'); svg.setAttribute('preserveAspectRatio', 'none');
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', wavePath(c[0], c[1]));
      svg.appendChild(p); el.appendChild(svg);
      if (c[3]) { var b = document.createElement('span'); b.className = 'badge'; b.textContent = c[3]; el.appendChild(b); }
      lane.appendChild(el);
      clipEls.push({ el: el, off: c[2] });
    });
    lanesEl.appendChild(lane);
    laneEls.push({ el: lane, spread: (li - 2.5) * 8 });
  });
  // the moment everybody heard: a loud peak inside the recorder's clip
  (function () {
    var best = 0, at = 0;
    for (var i = Math.floor(0.2 * N); i < Math.floor(0.45 * N); i++) if (signal[i] > best) { best = signal[i]; at = i; }
    flash.style.left = (at / N * 100) + '%';
  })();

  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; } // ease in-out
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var synced = null;
  function setSynced(on) {
    if (synced === on) return;
    synced = on;
    timeline.classList.toggle('is-synced', on);
    var key = on ? 'hero.synced' : 'hero.unsynced';
    status.setAttribute('data-i18n', key);
    status.textContent = t(key);
  }
  function renderHero(p) {
    var e = ease(Math.min(1, Math.max(0, (p - 0.04) / 0.78)));
    var vw = lanesEl.clientWidth || window.innerWidth;
    clipEls.forEach(function (c) { c.el.style.transform = 'translate3d(' + (c.off * (1 - e) / 100 * vw).toFixed(1) + 'px,0,0)'; });
    laneEls.forEach(function (l) { l.el.style.transform = 'translate3d(0,' + (l.spread * (1 - e)).toFixed(1) + 'px,0)'; });
    var frames = Math.floor(p * 24 * 40); // 40 s of picture over the scroll
    var s = 7 + Math.floor(frames / 24);
    tc.textContent = '16:42:' + pad(s % 60) + ':' + pad(frames % 24);
    setSynced(e > 0.998);
  }

  // ---------- file wall ----------
  // 500 files from several devices, shuffled; as the timeline syncs they sort
  // themselves into one run per device.
  var DEVICES = [
    ['files.camA', '#5b9cff', 210], ['files.camB', '#9cc2ff', 140], ['files.drone', '#b48cff', 30],
    ['files.phone', '#6fd3e6', 34], ['files.rec', '#4fd58a', 6], ['files.lav', '#8fe3b0', 80]
  ];
  var FILE_COUNT = DEVICES.reduce(function (a, d) { return a + d[2]; }, 0);
  var walls = [].slice.call(document.querySelectorAll('[data-files]')).map(function (root) {
    var legend = root.querySelector('.files-legend');
    var total = document.createElement('li'); total.className = 'total';
    total.setAttribute('data-i18n', 'files.total'); total.textContent = EXTRA_EN['files.total'];
    legend.appendChild(total);
    DEVICES.forEach(function (d) {
      var li = document.createElement('li'); li.style.setProperty('--c', d[1]);
      var n = document.createElement('span'); n.setAttribute('data-i18n', d[0]); n.textContent = EXTRA_EN[d[0]];
      var b = document.createElement('b'); b.textContent = d[2];
      li.appendChild(n); li.appendChild(document.createTextNode(' ')); li.appendChild(b);
      legend.appendChild(li);
    });
    return { root: root, canvas: root.querySelector('canvas'), cols: 0, last: -1 };
  });
  // device per sorted slot, and a fixed shuffle + stagger per file
  var fileDev = [], shuffle = [], delay = [];
  DEVICES.forEach(function (d, di) { for (var k = 0; k < d[2]; k++) fileDev.push(di); });
  (function () {
    var r = 7; function rnd() { r = (r * 48271) % 2147483647; return r / 2147483647; }
    for (var i = 0; i < FILE_COUNT; i++) { shuffle.push(i); delay.push(rnd()); }
    for (i = FILE_COUNT - 1; i > 0; i--) { var k = Math.floor(rnd() * (i + 1)), t = shuffle[i]; shuffle[i] = shuffle[k]; shuffle[k] = t; }
  })();
  function drawWall(w, p) {
    var c = w.canvas, cw = c.clientWidth;
    if (!cw) return;
    var small = cw < 600, tw = small ? 7 : 10, th = small ? 9 : 13, gap = small ? 2 : 3;
    var cols = Math.max(10, Math.floor((cw + gap) / (tw + gap)));
    var rows = Math.ceil(FILE_COUNT / cols), hgt = rows * (th + gap) - gap;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    if (w.cols !== cols || c.width !== Math.round(cw * dpr)) {
      w.cols = cols; w.last = -1;
      c.style.setProperty('--h', hgt + 'px');
      c.width = Math.round(cw * dpr); c.height = Math.round(hgt * dpr);
    }
    w.root.classList.toggle('is-sorted', p > 0.97);
    if (Math.abs(p - w.last) < 0.001) return;
    w.last = p;
    var ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, hgt);
    var step = tw + gap, sth = th + gap;
    for (var i = 0; i < FILE_COUNT; i++) {
      var from = shuffle[i];                                   // where file i starts
      var q = Math.min(1, Math.max(0, (p * 1.5 - delay[i] * 0.5)));
      q = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      var x = (from % cols) * step + ((i % cols) - (from % cols)) * step * q;
      var y = Math.floor(from / cols) * sth + (Math.floor(i / cols) - Math.floor(from / cols)) * sth * q;
      ctx.globalAlpha = 0.55 + 0.45 * q;
      ctx.fillStyle = DEVICES[fileDev[i]][1];
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, tw, th, 2); else ctx.rect(x, y, tw, th);
      ctx.fill();
    }
  }
  function wallProgress(w) { // the pinned wall follows the hero, the other one its own scroll position
    if (w.root.classList.contains('files-pinned')) return Math.min(1, Math.max(0, (current - 0.1) / 0.8));
    var r = w.root.getBoundingClientRect(), h = window.innerHeight;
    return Math.min(1, Math.max(0, (h - r.top) / (h * 0.75)));
  }

  // ---------- parallax helpers ----------
  var mocks = [].slice.call(document.querySelectorAll('.mock'));
  var featureClips = [].slice.call(document.querySelectorAll('.feature .clip'));
  var syncBar = document.querySelector('.mock-sync');
  function visible(el) { // 0 when the top enters the bottom of the screen, 1 when it reaches 35%
    var r = el.getBoundingClientRect(), h = window.innerHeight;
    return Math.min(1, Math.max(0, (h - r.top) / (h * 0.65)));
  }

  // The hero follows the scroll through a short low-pass, so wheel steps and
  // trackpad flicks turn into one smooth glide instead of jumps.
  var target = 0, current = -1, running = false;
  function heroTarget() {
    var nav = 64; // the pin sits under the sticky header
    var r = hero.getBoundingClientRect();
    var total = hero.offsetHeight - (window.innerHeight - nav);
    return total > 0 ? Math.min(1, Math.max(0, (nav - r.top) / total)) : 1;
  }
  function loop() {
    var d = target - current;
    current = Math.abs(d) < 0.0005 || current < 0 ? target : current + d * 0.14;
    renderHero(current);
    walls.forEach(function (w) { if (w.root.offsetParent) drawWall(w, wallProgress(w)); });
    if (current !== target) requestAnimationFrame(loop); else running = false;
  }
  function parallax() {
    var h = window.innerHeight;
    mocks.forEach(function (m) {
      var b = m.getBoundingClientRect();
      var rel = (b.top + b.height / 2 - h / 2) / h; // -0.5..0.5 around the centre
      m.style.transform = 'translate3d(0,' + (rel * -36).toFixed(1) + 'px,0)';
    });
    featureClips.forEach(function (c, i) {
      var v = visible(c.parentNode);
      c.style.setProperty('--shift', ((1 - v) * (i % 2 ? -48 : 48)).toFixed(1) + 'px');
    });
    if (syncBar) syncBar.style.setProperty('--fill', visible(syncBar).toFixed(3));
    walls.forEach(function (w) { if (w.root.offsetParent) drawWall(w, wallProgress(w)); });
  }
  var ticking = false;
  function frame() {
    ticking = false;
    target = heroTarget();
    if (!running) { running = true; requestAnimationFrame(loop); }
    parallax();
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  if (reduce) {
    synced = null; // rendered after the language is set
    setTimeout(function () { renderHero(1); walls.forEach(function (w) { drawWall(w, 1); }); }, 0);
    window.addEventListener('resize', function () { walls.forEach(function (w) { w.cols = 0; drawWall(w, 1); }); });
    if (syncBar) syncBar.style.setProperty('--fill', '1');
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  // ---------- hero background loop: muted, starts only when heroVis, skipped on Save-Data / reduced motion ----------
  var hv = document.getElementById('hero-video');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (hv && !reduce && !saveData) {
    var started = false;
    var heroVis = false;
    var play = function () { if (!heroVis) return; var p = hv.play(); if (p && p.catch) p.catch(function () {}); };
    hv.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) play(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          heroVis = e.isIntersecting;
          if (heroVis) { if (!started) { started = true; hv.preload = 'auto'; hv.load(); } play(); }
          else hv.pause();
        });
      }, { threshold: 0.05 }).observe(hv);
    } else { heroVis = true; hv.preload = 'auto'; play(); }
  }

  // ---------- overview video: the button appears once the file is published ----------
  var VIDEO = 'media/takesync-overview.mp4';
  var watch = document.getElementById('watch');
  var dialog = document.getElementById('video-dialog');
  var video = document.getElementById('overview');
  if (window.fetch && dialog && dialog.showModal) {
    fetch(VIDEO, { method: 'HEAD' }).then(function (res) {
      if (res.ok && /video/.test(res.headers.get('content-type') || '')) watch.hidden = false;
    }).catch(function () { /* no video yet */ });
    watch.addEventListener('click', function () {
      if (!video.getAttribute('src')) video.src = VIDEO;
      dialog.showModal();
      video.play().catch(function () {});
    });
    dialog.addEventListener('close', function () { video.pause(); });
  }

  // ---------- language ----------
  document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (EN[k] == null) EN[k] = el.textContent; });
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    var spec = el.getAttribute('data-i18n-attr').split(':');
    EN[spec[1]] = el.getAttribute(spec[0]);
  });
  Object.keys(EXTRA_EN).forEach(function (k) { EN[k] = EXTRA_EN[k]; });

  function setLang(next) {
    lang = I18N[next] || next === 'en' ? next : 'en';
    var dict = dictFor(lang);
    function get(k) { return dict[k] != null ? dict[k] : EN[k]; }
    document.documentElement.lang = lang;
    document.title = get('_title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = get(el.getAttribute('data-i18n')); if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr').split(':');
      var v = get(spec[1]); if (v != null) el.setAttribute(spec[0], v);
    });
    if (select) select.value = lang;
    renderPrices();
    try { localStorage.setItem('takesync-lang', lang); } catch (e) { /* storage unavailable */ }
  }

  // ---------- prices in the visitor's currency ----------
  // Eurozone: the same numbers in euros. Elsewhere: the dollar price, with an
  // approximate amount in the local currency underneath. Rates are refreshed
  // from open.er-api.com; the numbers below are the fallback (22 Oct 2026).
  var RATES = { EUR: 0.86, UAH: 45.03, GBP: 0.747, PLN: 3.88, HUF: 325.1, TRY: 49.64, KRW: 1326, CNY: 6.69, CHF: 0.825, CZK: 21.61, SEK: 9.89, NOK: 9.37, DKK: 6.66, RON: 4.75, CAD: 1.405, AUD: 1.423, NZD: 1.756, MXN: 18.63, BRL: 5.02, ARS: 1527, CLP: 975, COP: 3174, PEN: 3.43, JPY: 158.1, INR: 94.6, TWD: 32.41, HKD: 7.85, SGD: 1.277, ILS: 3.09, AED: 3.67, ZAR: 16.37, MDL: 17.96, GEL: 2.60, KZT: 448.6, RSD: 104.6 };
  var EURO = 'AT BE BG CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK ME XK AD MC SM VA'.split(' ');
  var BY_COUNTRY = { UA: 'UAH', GB: 'GBP', PL: 'PLN', HU: 'HUF', TR: 'TRY', KR: 'KRW', CN: 'CNY', CH: 'CHF', LI: 'CHF', CZ: 'CZK', SE: 'SEK', NO: 'NOK', DK: 'DKK', RO: 'RON', CA: 'CAD', AU: 'AUD', NZ: 'NZD', MX: 'MXN', BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', JP: 'JPY', IN: 'INR', TW: 'TWD', HK: 'HKD', SG: 'SGD', IL: 'ILS', AE: 'AED', ZA: 'ZAR', MD: 'MDL', GE: 'GEL', KZ: 'KZT', RS: 'RSD' };
  var BY_ZONE = {
    'Europe/Kyiv': 'UA', 'Europe/Kiev': 'UA', 'Europe/Uzhgorod': 'UA', 'Europe/Zaporozhye': 'UA', 'Europe/Simferopol': 'UA',
    'Europe/London': 'GB', 'Europe/Warsaw': 'PL', 'Europe/Budapest': 'HU', 'Europe/Istanbul': 'TR', 'Asia/Istanbul': 'TR', 'Asia/Seoul': 'KR',
    'Asia/Shanghai': 'CN', 'Asia/Chongqing': 'CN', 'Asia/Harbin': 'CN', 'Asia/Urumqi': 'CN', 'Asia/Hong_Kong': 'HK', 'Asia/Taipei': 'TW', 'Asia/Tokyo': 'JP',
    'Europe/Zurich': 'CH', 'Europe/Prague': 'CZ', 'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO', 'Europe/Copenhagen': 'DK', 'Europe/Bucharest': 'RO',
    'Europe/Chisinau': 'MD', 'Asia/Tbilisi': 'GE', 'Asia/Almaty': 'KZ', 'Asia/Qostanay': 'KZ', 'Asia/Aqtobe': 'KZ', 'Europe/Belgrade': 'RS',
    'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Singapore': 'SG', 'Asia/Jerusalem': 'IL', 'Asia/Tel_Aviv': 'IL', 'Asia/Dubai': 'AE', 'Africa/Johannesburg': 'ZA',
    'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/St_Johns': 'CA', 'America/Regina': 'CA',
    'Pacific/Auckland': 'NZ', 'America/Mexico_City': 'MX', 'America/Monterrey': 'MX', 'America/Tijuana': 'MX', 'America/Cancun': 'MX', 'America/Sao_Paulo': 'BR',
    'America/Argentina/Buenos_Aires': 'AR', 'America/Buenos_Aires': 'AR', 'America/Santiago': 'CL', 'America/Bogota': 'CO', 'America/Lima': 'PE',
    'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES', 'Europe/Rome': 'IT', 'Europe/Vienna': 'AT', 'Europe/Amsterdam': 'NL',
    'Europe/Brussels': 'BE', 'Europe/Lisbon': 'PT', 'Europe/Dublin': 'IE', 'Europe/Helsinki': 'FI', 'Europe/Athens': 'GR', 'Europe/Tallinn': 'EE', 'Europe/Riga': 'LV',
    'Europe/Vilnius': 'LT', 'Europe/Bratislava': 'SK', 'Europe/Ljubljana': 'SI', 'Europe/Zagreb': 'HR', 'Europe/Luxembourg': 'LU', 'Europe/Malta': 'MT',
    'Asia/Nicosia': 'CY', 'Europe/Nicosia': 'CY', 'Europe/Sofia': 'BG', 'Europe/Podgorica': 'ME', 'Europe/Monaco': 'MC', 'Europe/Andorra': 'AD'
  };
  function visitorCountry() {
    var zone = '';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
    if (BY_ZONE[zone]) return BY_ZONE[zone];
    if (/^Australia\//.test(zone)) return 'AU';
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var m = /^[a-z]{2,3}-([A-Z]{2})\b/.exec(langs[i] || '');
      if (m) return m[1];
    }
    return '';
  }
  var country = visitorCountry();
  var currency = EURO.indexOf(country) >= 0 ? 'EUR' : (BY_COUNTRY[country] || 'USD');
  var numberLocale = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  function money(v, cur, exact) {
    try {
      var digits = exact ? (v % 1 ? 2 : 0) : (v >= 20 ? 0 : 2);
      return new Intl.NumberFormat(numberLocale, { style: 'currency', currency: cur, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
    } catch (e) { return cur + ' ' + v; }
  }
  function renderPrices() {
    document.querySelectorAll('.amt[data-usd]').forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-usd'));
      el.textContent = '$' + el.getAttribute('data-usd'); // one price everywhere: USD, as charged by Paddle
    });
    var local = currency !== 'USD' && RATES[currency];
    document.querySelectorAll('.price-local').forEach(function (el) {
      if (!local) { el.hidden = true; return; }
      var v = parseFloat(el.getAttribute('data-usd')) * RATES[currency];
      el.textContent = '≈ ' + money(v >= 1000 ? Math.round(v / 10) * 10 : v, currency, false);
      el.hidden = false;
    });
    var note = document.getElementById('price-note');
    if (note) {
      var key = local ? 'price.noteLocal' : 'price.noteUsd';
      note.setAttribute('data-i18n', key);
      note.textContent = t(key);
    }
  }
  if (currency !== 'USD' && window.fetch) {
    fetch('https://open.er-api.com/v6/latest/USD').then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      var r = d && d.rates && d.rates[currency];
      if (typeof r === 'number' && r > 0) { RATES[currency] = r; renderPrices(); }
    }).catch(function () { /* keep the fallback rate */ });
  }

  var select = document.getElementById('lang-select');
  var supported = ['en'].concat(Object.keys(I18N));
  function pick(code) {
    code = String(code || '').toLowerCase();
    if (/^(ru|be)\b/.test(code)) return 'uk';
    var base = code.split('-')[0];
    return supported.indexOf(base) >= 0 ? base : null;
  }
  var initial = null;
  try { initial = pick(localStorage.getItem('takesync-lang')); } catch (e) { /* storage unavailable */ }
  if (!initial) {
    var prefs = navigator.languages || [navigator.language];
    for (var i = 0; i < prefs.length && !initial; i++) initial = pick(prefs[i]);
  }
  if (select) select.addEventListener('change', function () { setLang(select.value); });
  setLang(initial || 'en');
  if (!reduce) frame();
})();
