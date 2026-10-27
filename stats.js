// Hidden stats page: the admin token is asked once and kept in this browser only.
(function () {
  var API = 'https://license.takesync.uk/admin/stats?days=30';
  var $ = function (id) { return document.getElementById(id); };
  var KEY = 'takesync-admin-token';
  function getToken() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setToken(t) { try { t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch (e) { /* storage unavailable */ } }
  function show(id) { ['login', 'data'].forEach(function (x) { $(x).hidden = x !== id; }); }
  function load() {
    var t = getToken();
    if (!t) return show('login');
    $('status').textContent = '…';
    fetch(API, { headers: { authorization: 'Bearer ' + t }, cache: 'no-store' })
      .then(function (r) {
        if (r.status === 403) { setToken(null); $('err').textContent = 'Wrong token'; show('login'); throw 0; }
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (s) {
        show('data');
        $('total').textContent = s.all_time;
        $('today').textContent = s.today;
        $('month').textContent = s.downloads;
        $('trials').textContent = s.trials;
        $('clicks').textContent = s.email_clicks;
        var tb = $('refs'); tb.textContent = '';
        s.by_ref.forEach(function (x) {
          var tr = document.createElement('tr');
          [x.ref, x.downloads, x.email_clicks].forEach(function (v) { var td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
          tb.appendChild(tr);
        });
        $('status').textContent = 'Updated ' + new Date().toLocaleTimeString();
      })
      .catch(function (e) { if (e) { show('data'); $('status').textContent = 'Error: ' + (e.message || e); } });
  }
  $('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); $('err').textContent = ''; setToken($('token').value.trim()); load();
  });
  $('refresh').addEventListener('click', load);
  $('logout').addEventListener('click', function () { setToken(null); show('login'); });
  load();
  setInterval(function () { if (!$('data').hidden) load(); }, 60000);
})();
