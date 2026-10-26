(function () {
  const txn = new URLSearchParams(location.search).get('txn');
  const msg = document.getElementById('msg');
  if (!txn) { msg.textContent = 'No order found. Your key was sent by email — check your inbox (and spam).'; return; }
  let tries = 0;
  async function poll() {
    tries++;
    try {
      const r = await fetch('https://license.takesync.uk/v1/key?txn=' + encodeURIComponent(txn));
      const v = await r.json();
      if (v.status === 'ready') {
        msg.hidden = true;
        document.getElementById('ready').hidden = false;
        document.getElementById('key').textContent = v.key;
        document.getElementById('email').textContent = v.email;
        document.getElementById('copy').onclick = async (e) => {
          await navigator.clipboard.writeText(v.key); e.target.textContent = 'Copied ✓';
        };
        return;
      }
    } catch (e) { /* retry */ }
    if (tries < 30) setTimeout(poll, 2000);
    else msg.textContent = 'Payment received. The key is taking longer than usual — it will arrive by email within a few minutes. If not, write to support@takesync.uk with your order number: ' + txn;
  }
  poll();
})();
