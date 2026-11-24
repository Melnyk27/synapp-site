// "Get TakeSync" window: every [data-get] button (and ?get=1 in the address) opens it.
// $0  -> POST license.takesync.uk/v1/get-key  -> the key goes to the email, the DMG link is shown here.
// $5+ -> POST license.takesync.uk/v1/checkout -> Paddle transaction with that amount -> Paddle overlay
//        -> /thanks.html?txn=… shows the key (also emailed).
// Without JS the buttons keep going to /install.
(function () {
  var API = 'https://license.takesync.uk';
  var MIN = 5, MAX = 500;
  var PADDLE = { env: 'production', token: 'live_cb9b5b64a1090211c70eb7b3297' }; // public client-side token

  var dlg = document.getElementById('get-dialog');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var form = document.getElementById('get-form'), done = document.getElementById('get-done');
  var email = document.getElementById('get-email'), custom = document.getElementById('get-custom');
  var err = document.getElementById('get-err'), go = document.getElementById('get-go'), note = document.getElementById('get-note');
  var amts = Array.prototype.slice.call(dlg.querySelectorAll('[data-amt]'));
  var amount = 0, busy = false;

  // translated strings live in hidden [data-i18n] spans of the dialog (main.js fills them)
  function s(key, vars) {
    var el = dlg.querySelector('[data-i18n="' + key + '"]');
    var t = el ? el.textContent : key;
    Object.keys(vars || {}).forEach(function (k) { t = t.split('{' + k + '}').join(vars[k]); });
    return t;
  }
  function render() {
    amts.forEach(function (b) { b.setAttribute('aria-checked', String(!custom.value && Number(b.dataset.amt) === amount)); });
    go.textContent = amount > 0 ? s('get.btnPay', { n: amount }) : s('get.btnFree');
    note.textContent = amount > 0 ? s('get.notePay') : s('get.noteFree');
  }
  function fail(key) { err.textContent = key ? s(key) : ''; }
  function setBusy(b) { busy = b; go.disabled = b; go.style.opacity = b ? '.6' : ''; }

  amts.forEach(function (b) { b.addEventListener('click', function () { custom.value = ''; amount = Number(b.dataset.amt); fail(); render(); }); });
  custom.addEventListener('input', function () {
    var n = Math.round(Number(custom.value));
    if (custom.value === '') amount = 0; else if (n >= MIN) amount = Math.min(n, MAX);
    fail(); render();
  });
  email.addEventListener('input', function () { fail(); });

  function open() {
    form.hidden = false; done.hidden = true; fail(); setBusy(false); render();
    dlg.showModal();
    setTimeout(function () { email.focus(); }, 30);
  }
  function close() { dlg.close(); }
  document.getElementById('get-close').addEventListener('click', close);
  document.getElementById('get-close2').addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); }); // click on the backdrop
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-get]');
    if (!a) return;
    e.preventDefault(); open();
  });
  try { if (new URLSearchParams(location.search).get('get')) open(); } catch (e) { /* old browser */ }

  function post(path, body) {
    return fetch(API + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (v) { v._status = r.status; return v; }); });
  }

  var paddleReady = null;
  function loadPaddle() {
    if (paddleReady) return paddleReady;
    paddleReady = new Promise(function (resolve, reject) {
      var sc = document.createElement('script');
      sc.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      sc.onload = function () {
        if (PADDLE.env === 'sandbox') Paddle.Environment.set('sandbox');
        Paddle.Initialize({
          token: PADDLE.token,
          eventCallback: function (ev) {
            if (ev.name === 'checkout.completed' && ev.data && ev.data.transaction_id) {
              location.href = '/thanks.html?txn=' + encodeURIComponent(ev.data.transaction_id);
            }
          },
        });
        resolve();
      };
      sc.onerror = function () { paddleReady = null; reject(new Error('paddle')); };
      document.head.appendChild(sc);
    });
    return paddleReady;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    var mail = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail)) { fail('get.errEmail'); email.focus(); return; }
    if (custom.value !== '' && Math.round(Number(custom.value)) < MIN) { fail('get.errMin'); custom.focus(); return; }
    setBusy(true);
    var errFor = function (v) { return v.error === 'email_invalid' ? 'get.errEmail' : v.error === 'email_disposable' ? 'get.errDisposable' : v.error === 'amount' ? 'get.errMin' : 'get.errNet'; };
    if (amount === 0) {
      post('/v1/get-key', { email: mail }).then(function (v) {
        setBusy(false);
        if (!v.ok) return fail(errFor(v));
        document.getElementById('get-done-text').textContent = s('get.doneText', { email: v.email || mail });
        form.hidden = true; done.hidden = false;
      }).catch(function () { setBusy(false); fail('get.errNet'); });
      return;
    }
    Promise.all([post('/v1/checkout', { email: mail, amount: amount }), loadPaddle()]).then(function (r) {
      var v = r[0];
      setBusy(false);
      if (!v.txn) return fail(errFor(v));
      close();
      Paddle.Checkout.open({
        transactionId: v.txn,
        customer: { email: mail },
        settings: { displayMode: 'overlay', theme: 'dark', locale: (document.documentElement.lang || 'en').slice(0, 2), allowLogout: true },
      });
    }).catch(function () { setBusy(false); fail('get.errNet'); });
  });
})();
