// /install page: language (same choice as the main page) and the Copy buttons.
(function () {
  var I18N = (window.TAKESYNC_I18N && window.TAKESYNC_I18N.langs) || {};
  var sections = document.querySelectorAll('[data-lang]');
  var codes = Array.prototype.map.call(sections, function (s) { return s.getAttribute('data-lang'); });
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { EN[el.getAttribute('data-i18n')] = el.textContent; });
  function pick(code) {
    code = String(code || '').toLowerCase();
    if (/^(ru|be)\b/.test(code)) return 'uk';
    var base = code.split('-')[0];
    return codes.indexOf(base) >= 0 ? base : null;
  }
  function setLang(lang) {
    sections.forEach(function (s) { s.hidden = s.getAttribute('data-lang') !== lang; });
    var d = I18N[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); el.textContent = d[k] != null ? d[k] : EN[k];
    });
    document.documentElement.lang = lang;
    var h1 = document.querySelector('[data-lang="' + lang + '"] h1');
    if (h1) document.title = h1.textContent + ' — TakeSync';
    select.value = lang;
    try { localStorage.setItem('takesync-lang', lang); } catch (e) { /* storage unavailable */ }
  }
  var select = document.getElementById('lang-select');
  var initial = null;
  try { initial = pick(localStorage.getItem('takesync-lang')); } catch (e) { /* storage unavailable */ }
  if (!initial) {
    var prefs = navigator.languages || [navigator.language];
    for (var i = 0; i < prefs.length && !initial; i++) initial = pick(prefs[i]);
  }
  select.addEventListener('change', function () { setLang(select.value); });
  setLang(initial || 'en');
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      navigator.clipboard.writeText(b.previousElementSibling.textContent).then(function () {
        var t = b.textContent; b.textContent = '✓'; setTimeout(function () { b.textContent = t; }, 1500);
      });
    });
  });
})();
