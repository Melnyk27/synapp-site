// TakeSync site: language switch (EN/UK), the scroll-synced hero timeline,
// light scroll parallax, and the overview video (shown once media/ has it).
(function () {
  'use strict';

  var UK = {
    'skip': 'Перейти до змісту',
    'nav.features': 'Що вміє', 'nav.how': 'Як це працює', 'nav.compat': 'Сумісність', 'nav.pricing': 'Ціна', 'nav.faq': 'Питання', 'nav.download': 'Завантажити',
    'hero.title': 'Кинь футаж. Отримай таймлайн.',
    'hero.lead': 'TakeSync зводить усі камери, рекордери й петлички за звуком — без таймкоду, хлопавки чи плескання. А потім віддає синхронізований таймлайн у Premiere Pro.',
    'hero.cta': 'Завантажити пробну версію',
    'hero.watch': 'Подивитися огляд за 30 секунд',
    'hero.fine': 'Версія 1.0 для Mac на Apple Silicon. 7 днів безкоштовно, працює офлайн.',
    'hero.tlLabel': 'Шість треків весілля, що стають у синхрон', 'hero.stage': 'Демонстрація синхронізації',
    'hero.unsynced': '6 пристроїв, не синхронізовано',
    'hero.synced': '6 пристроїв у синхроні',
    'hero.hint': 'Прокрути, щоб синхронізувати',
    'files.total': '500 файлів:', 'files.camA': 'Камера A', 'files.camB': 'Камера B', 'files.drone': 'Дрон', 'files.phone': 'Телефон', 'files.rec': 'Рекордер', 'files.lav': 'Петлички',
    'lane.camA': 'Камера A', 'lane.camB': 'Камера B', 'lane.drone': 'Дрон', 'lane.rec': 'Рекордер', 'lane.lav1': 'Петличка 1', 'lane.lav2': 'Петличка 2',
    'pain.title': 'Весілля — це 500 файлів і шість пристроїв.',
    'pain.text': 'Дві камери, дрон, рекордер на пульті діджея, чотири петлички на нареченому, ведучому й батьках. Звести це вручну — це перший вечір кожного монтажу. TakeSync робить це, поки ти вариш каву.',
    'feat.title': 'Що він робить за тебе',
    'feat.1t': 'Синхрон за звуком', 'feat.1': 'Кожен кліп зводиться з іншими за його звуком. Підходить будь-яка камера, телефон, рекордер чи петличка — таймкод і хлопавка не потрібні.',
    'feat.2t': 'Нічого не губиться', 'feat.2': 'У B-roll з камери, що писала сама, немає пари за звуком. TakeSync ставить його за годинником камери — на той час дня, коли його зняли.',
    'feat.3t': 'Хибні збіги відсіюються', 'feat.3': 'Пісня, зіграна двічі, чи інтерв’ю поверх церемонії можуть здатися збігом. Кожен збіг перевіряється за годинниками пристроїв, і неможливі відкидаються.',
    'feat.4t': 'День — по порядку', 'feat.4': 'Таймлайн іде за реальним часом дня: церемонія, фотосесія, тости, перший танець. Довгі проміжки, коли ніхто не писав, стиснуті.',
    'feat.5t': 'Звук рекордера — одразу на місці', 'feat.5': 'Одна галочка додає другу секвенцію, де звук камери замінено рекордером чи петличкою. Кліпи, що накладаються, отримують окремі доріжки — нічого не ховається.',
    'feat.6t': 'Приватно й офлайн', 'feat.6': 'Твій футаж не покидає Mac. Без завантаження в хмару, без акаунта, інтернет для синхрону не потрібен.',
    'feat.7t': 'Швидко на будь-якому диску', 'feat.7': 'TakeSync визначає, де лежить футаж — на SSD, звичайному HDD чи мережевому диску, — і читає кожен так, як йому найшвидше: з SSD усіма ядрами, з HDD по два файли, кілька дисків одночасно. Уже проаналізований футаж повторно не декодується.',
    'feat.8t': 'Просто, і нічого не зависає', 'feat.8': 'Три кроки, одна кнопка Sync, нічого не треба налаштовувати. Аналіз іде у фоні, тож вікно не підвисає, поки TakeSync працює.',
    'how.title': 'Три кроки',
    'how.s1t': 'Кинь папки', 'how.s1': 'Кожна папка камери, рекордера чи мікрофона стає треком. Проксі розпізнаються — додай або пропусти.',
    'how.s2t': 'Натисни Sync', 'how.s2': 'TakeSync слухає кожен кліп, знаходить, де вони перетинаються, і будує таймлайн — спершу за звуком, решту за годинником.',
    'how.s3t': 'Відкрий у Premiere Pro', 'how.s3': 'Панель TakeSync усередині Premiere показує всі експорти. Один клік — і синхронізована секвенція у твоєму відкритому проєкті, на тих самих медіа. Без дублів.',
    'mock.drop': 'Перетягни сюди папки камер і рекордерів',
    'mock.synced': 'Синхронізовано · груп: 9',
    'mock.p1': 'Весілля — церемонія', 'mock.p2': 'Весілля — банкет', 'mock.p3': 'Інтерв’ю, замінений звук', 'mock.import': 'Імпорт',
    'compat.title': 'На чому працює TakeSync 1.0',
    'compat.lead': 'Версія 1.0 повністю підтримується на Mac з Apple Silicon і з Adobe Premiere Pro. Інші монтажні програми й Windows з’являться в безкоштовних оновленнях, щойно ми їх протестуємо.',
    'compat.what': 'Платформа чи програма', 'compat.state': 'Стан у 1.0',
    'compat.mac': 'Mac з Apple Silicon (M1 і новіші)', 'compat.ok': 'Підтримується', 'compat.okPanel': 'Підтримується, з панеллю TakeSync',
    'compat.testing': 'Тестується', 'compat.intel': 'Mac з Intel', 'compat.notYet': 'Поки не підтримується', 'compat.dev': 'У розробці',
    'who.title': 'Для довгих і складних днів з багатьма пристроями',
    'who.1': 'Весілля', 'who.2': 'Івенти й конференції', 'who.3': 'Інтерв’ю й подкасти', 'who.4': 'Документальне кіно', 'who.5': 'Жива музика',
    'price.title': 'Обери, як платити',
    'price.lead': 'У кожному плані — усі функції, на 2 комп’ютери. Почни з 7 безкоштовних днів, картка не потрібна.',
    'price.monthly': 'Щомісяця', 'price.perMonth': '/міс', 'price.monthlySub': 'На гарячий сезон. Скасувати можна будь-коли.',
    'price.yearly': 'Щороку', 'price.perYear': '/рік', 'price.yearlySub': '$5 на місяць — приблизно на 28% дешевше, ніж щомісяця.',
    'price.lifetime': 'Назавжди', 'price.lifetimeSub': 'Платиш раз і користуєшся завжди, з усіма оновленнями.',
    'price.subscribe': 'Підписатися', 'price.buy': 'Купити довічну ліцензію',
    'price.note': 'Ціни в доларах США. Податки, де вони діють, додаються при оплаті.',
    'faq.title': 'Питання',
    'faq.q1': 'Потрібен таймкод чи хлопавка?', 'faq.a1': 'Ні. TakeSync порівнює звук, записаний різними пристроями одночасно. Камери без таймкоду й телефони підходять.',
    'faq.q2': 'Які формати читає?', 'faq.a2': 'MP4, MOV, WAV, AIFF, M4A і MP3 — одразу. MXF, MTS та інші — після встановлення FFmpeg у Налаштуваннях.',
    'faq.q3': 'Що з кліпом, у якого немає пари за звуком?', 'faq.a3': 'Якщо годинник його камери надійний, кліп стає на таймлайн у той час, коли його записали, і позначається, щоб ти міг перевірити. Інакше він позначається як несинхронізований, і при експорті такі кліпи можна відправити в кінець.',
    'faq.q4': 'Чи виправляє дрейф на довгих записах?', 'faq.a4': 'Так. TakeSync помічає, коли рекордер іде трохи швидше чи повільніше за камери, і вирівнює звук.',
    'faq.q5': 'А Final Cut Pro, DaVinci Resolve і Windows?', 'faq.a5': 'Експорт у Final Cut Pro і DaVinci Resolve зараз тестується. Windows — у розробці. Усе це прийде безкоштовними оновленнями.',
    'faq.q6': 'Щомісяця, щороку чи назавжди — у чому різниця?', 'faq.a6': 'Лише в тому, як платиш. Підписка тримає TakeSync робочим, поки вона активна, і її можна скасувати будь-коли. Довічна ліцензія оплачується раз і не закінчується. У кожному плані — усі функції й оновлення.',
    'final.title': 'Вечір — для монтажу, а не для зведення кліпів.',
    'final.sub': 'Безкоштовно на 7 днів. Картка не потрібна.',
    'final.mac': 'Завантажити для Mac (Apple Silicon)',
    'final.req': 'TakeSync 1.0 · Mac з Apple Silicon · Adobe Premiere Pro. Windows у розробці.',
    'foot.support': 'Підтримка', 'foot.privacy': 'Політика конфіденційності', 'foot.terms': 'Умови використання',
    'video.close': 'Закрити'
  };
  var EXTRA_EN = {
    'hero.synced': '6 devices in sync',
    'files.total': '500 files:', 'files.camA': 'Cam A', 'files.camB': 'Cam B', 'files.drone': 'Drone', 'files.phone': 'Phone', 'files.rec': 'Recorder', 'files.lav': 'Lav mics',
    'lane.camA': 'Cam A', 'lane.camB': 'Cam B', 'lane.drone': 'Drone', 'lane.rec': 'Recorder', 'lane.lav1': 'Lav 1', 'lane.lav2': 'Lav 2'
  };
  var TITLES = { en: document.title, uk: 'TakeSync — синхронізація multicam за звуком для Premiere Pro' };
  var EN = {};
  var lang = 'en';
  function t(key) { var d = lang === 'uk' ? UK : EN; return d[key] != null ? d[key] : (EXTRA_EN[key] || key); }

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
  // 500 files from six devices, shuffled; as the timeline syncs they sort
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
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { EN[el.getAttribute('data-i18n-html')] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    var spec = el.getAttribute('data-i18n-attr').split(':');
    EN[spec[1]] = el.getAttribute(spec[0]);
  });
  Object.keys(EXTRA_EN).forEach(function (k) { EN[k] = EXTRA_EN[k]; });

  function setLang(next) {
    lang = next;
    var dict = lang === 'uk' ? UK : EN;
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')]; if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-html')]; if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr').split(':');
      var v = dict[spec[1]]; if (v != null) el.setAttribute(spec[0], v);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    try { localStorage.setItem('takesync-lang', lang); } catch (e) { /* storage unavailable */ }
  }

  var initial = 'en';
  try {
    var saved = localStorage.getItem('takesync-lang');
    if (saved === 'en' || saved === 'uk') initial = saved;
    else if (/^(uk|ru|be)/i.test(navigator.language || '')) initial = 'uk';
  } catch (e) {
    if (/^(uk|ru|be)/i.test(navigator.language || '')) initial = 'uk';
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  setLang(initial);
  if (!reduce) frame();
})();
