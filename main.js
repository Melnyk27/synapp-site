// SynApp site: language switch (EN/UK) and the before/after sync demo.
(function () {
  'use strict';

  var UK = {
    'skip': 'Перейти до змісту',
    'nav.how': 'Як це працює', 'nav.features': 'Можливості', 'nav.pricing': 'Ціна', 'nav.faq': 'Питання', 'nav.download': 'Завантажити',
    'hero.eyebrow': 'Для multicam, інтерв’ю, кліпів і подкастів',
    'hero.title': 'Камери й звук — синхронно за секунди.',
    'hero.lead': 'Перетягніть папки з усіх камер і рекордера — SynApp вирівняє кліпи за звуком і віддасть готовий таймлайн у Premiere Pro, Final Cut Pro чи DaVinci Resolve. Без таймкоду, без хлопавки, без ручного підганяння хвиль.',
    'hero.mac': 'Завантажити для macOS',
    'hero.fine': 'Безкоштовна пробна версія на 7 днів · Разова покупка, без підписки',
    'hero.demoLabel': 'Три треки до і після синхронізації',
    'demo.before': 'До синхронізації', 'demo.synced': 'Синхронізовано за 4 с · точність до кадру',
    'strip.label': 'Куди експортує', 'strip.to': 'Експорт у', 'strip.files': 'WAV і відеофайли', 'strip.os': '· macOS і Windows',
    'how.kicker': 'ЯК ЦЕ ПРАЦЮЄ', 'how.title': 'Три кроки замість години ручного підганяння.',
    'how.s1t': 'Додайте медіа', 'how.s1': 'Перетягніть папки камер і рекордерів. Кожна папка стає треком; карти AVCHD, P2, XDCAM, DCIM і Canon XF розпізнаються самі.',
    'how.s2t': 'Синхронізуйте', 'how.s2': 'Одна кнопка. SynApp аналізує звук усіх кліпів, знаходить збіги між треками, розкладає дублі по подіях і виправляє дрейф рекордера.',
    'how.s3t': 'Експортуйте', 'how.s3': 'Готовий таймлайн у вашу монтажку — з окремою sequence, де звук камер уже замінено чистим звуком рекордера.',
    'feat.kicker': 'МОЖЛИВОСТІ', 'feat.title': 'Зроблено для реальних зйомок, а не ідеальних.',
    'feat.1tag': 'імпорт', 'feat.1t': 'Треки самі по папках', 'feat.1': 'Кожна папка або карта камери — окремий трек. Розбиті на частини довгі записи склеюються в один кліп.',
    'feat.2tag': 'синк', 'feat.2t': 'Кілька камер і подій', 'feat.2': 'Скільки завгодно треків. Різні сцени й повтори лягають окремими подіями, а не накладаються.',
    'feat.3tag': 'дрейф', 'feat.3t': 'Корекція дрейфу', 'feat.3': 'Рекордер біжить швидше за камеру? SynApp помітить розбіжність на довгому записі й вирівняє звук.',
    'feat.4tag': 'перевірка', 'feat.4t': 'Плеєр і таймлайн', 'feat.4': 'Хвилі, плейхед і відтворення всіх треків разом — перевірте синк на слух до експорту.',
    'feat.5tag': 'експорт', 'feat.5t': 'Звук уже замінено', 'feat.5': 'Окрема sequence зі звуком рекордера замість камерного. Або нові WAV і відеофайли для будь-якої монтажки.',
    'feat.6tag': 'приватність', 'feat.6t': 'Працює офлайн', 'feat.6': 'Усе рахується на вашому комп’ютері. Медіа нікуди не завантажується, оригінали не змінюються.',
    'why.title': 'Чому не вбудована синхронізація монтажки?',
    'why.lead': 'Вбудований синк за хвилею працює, коли кліпів кілька і звук чистий. Коли камер чотири, дублів двадцять, а рекордер писав годину без зупинки — починається ручна робота.',
    'why.1': '<b>Сотні кліпів за раз</b> — не треба виділяти пари вручну.',
    'why.2': '<b>Повтори й кілька подій</b> — кожна сцена лягає окремо, без хибних збігів.',
    'why.3': '<b>Дрейф на довгих записах</b> — виправляється автоматично.',
    'why.4': '<b>Одна програма для всіх монтажок</b> — синхронізуйте раз, експортуйте куди треба.',
    'price.kicker': 'ЦІНА', 'price.title': 'Купуєте раз — користуєтесь завжди.',
    'price.trial': 'Пробна версія', 'price.trialSub': 'Усі функції на 7 днів', 'price.download': 'Завантажити',
    'price.full': 'Повна ліцензія', 'price.fullSub': 'Разова оплата · 2 комп’ютери', 'price.once': 'разово',
    'price.l1': 'Усі формати експорту', 'price.l2': 'macOS і Windows', 'price.l3': 'Усі оновлення 1.x включено', 'price.buy': 'Купити SynApp',
    'faq.title': 'Питання',
    'faq.q1': 'Потрібен таймкод або хлопавка?', 'faq.a1': 'Ні. SynApp порівнює звук, записаний різними пристроями одночасно. Достатньо 5–10 секунд розбірливого звуку з перекриттям.',
    'faq.q2': 'Які формати підтримуються?', 'faq.a2': 'MOV, MP4, MTS/M2TS, MXF, WAV, AIFF, MP3, M4A та інші — усе, що читає ffmpeg. Структури карт AVCHD, P2, XDCAM, DCIM, Canon XF розпізнаються автоматично.',
    'faq.q3': 'Що робити з кліпом, який не синхронізувався?', 'faq.a3': 'Він позначається червоним. Зазвичай це запис, під час якого більше ніхто не писав, або надто тихий фрагмент. В експорті такі кліпи можна відправити в кінець таймлайну.',
    'faq.q4': 'Чи працює з Premiere Pro, Final Cut і Resolve?', 'faq.a4': 'Так: XML для Premiere Pro і DaVinci Resolve, fcpxml для Final Cut Pro, а також нові медіафайли для будь-якої іншої програми.',
    'faq.q5': 'Це підписка?', 'faq.a5': 'Ні. Ви платите один раз, і ліцензія ваша — разом з усіма оновленнями 1.x.',
    'final.title': 'Наступний multicam синхронізуйте за хвилину.', 'final.sub': 'Безкоштовно на 7 днів. Картка не потрібна.',
    'final.mac': 'macOS · Apple Silicon і Intel', 'final.win': 'Windows 10/11', 'final.req': 'Версія 0.1 · macOS 12+ · Windows 10+',
    'demo.camA': 'Камера A', 'demo.camB': 'Камера B', 'demo.rec': 'Рекордер',
    'foot.support': 'Підтримка', 'foot.privacy': 'Політика конфіденційності', 'foot.terms': 'Умови використання'
  };
  var TITLES = { en: document.title, uk: 'SynApp — синхронізація відео за звуком' };

  // ---- before / after demo ----
  function bars(seed, n, color) {
    var frag = document.createDocumentFragment();
    var r = seed;
    for (var i = 0; i < n; i++) {
      r = (r * 9301 + 49297) % 233280;
      var env = 0.25 + 0.75 * Math.abs(Math.sin(i / 4.3 + seed)) * (0.45 + 0.55 * (r / 233280));
      var b = document.createElement('i');
      b.style.height = Math.round(6 + env * 30) + 'px';
      b.style.background = color;
      frag.appendChild(b);
    }
    return frag;
  }
  function track(name, color, left, withPlayhead) {
    var row = document.createElement('div'); row.className = 'track';
    var label = document.createElement('span'); label.className = 'track-name'; label.setAttribute('data-i18n', name); label.textContent = ({ 'demo.camA': 'Cam A', 'demo.camB': 'Cam B', 'demo.rec': 'Recorder' })[name];
    var lane = document.createElement('div'); lane.className = 'lane';
    var wave = document.createElement('div'); wave.className = 'wave'; wave.style.left = left + '%';
    wave.appendChild(bars(7, 70, color));
    lane.appendChild(wave);
    if (withPlayhead) { var ph = document.createElement('span'); ph.className = 'playhead'; lane.appendChild(ph); }
    row.appendChild(label); row.appendChild(lane);
    return { row: row, wave: wave };
  }
  var before = document.getElementById('tracks-before');
  var after = document.getElementById('tracks-after');
  var spec = [['demo.camA', '#5b9cff', 4], ['demo.camB', '#5b9cff', 22], ['demo.rec', '#4fd58a', -14]];
  var afterWaves = [];
  spec.forEach(function (s) {
    before.appendChild(track(s[0], s[1], s[2], false).row);
    var t = track(s[0], s[1], s[2], true);
    after.appendChild(t.row);
    afterWaves.push(t.wave);
  });
  // animate the lower tracks into alignment when the demo scrolls into view
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function align() { afterWaves.forEach(function (w) { w.style.left = '4%'; }); }
  if (reduce || !('IntersectionObserver' in window)) { align(); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { setTimeout(align, 400); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(after);
  }

  // capture the English originals from the markup once
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { EN[el.getAttribute('data-i18n')] = el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { EN[el.getAttribute('data-i18n-html')] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    var spec = el.getAttribute('data-i18n-attr').split(':');
    EN[spec[1]] = el.getAttribute(spec[0]);
  });

  function setLang(lang) {
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
    try { localStorage.setItem('synapp-lang', lang); } catch (e) { /* storage unavailable */ }
  }

  var initial = 'en';
  try {
    var saved = localStorage.getItem('synapp-lang');
    if (saved === 'en' || saved === 'uk') initial = saved;
    else if (/^(uk|ru|be)/i.test(navigator.language || '')) initial = 'uk';
  } catch (e) {
    if (/^(uk|ru|be)/i.test(navigator.language || '')) initial = 'uk';
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  setLang(initial);

})();
