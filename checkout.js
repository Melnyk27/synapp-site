// Paddle checkout for the pricing buttons (data-plan="monthly|yearly|lifetime").
// Fill PADDLE below from Paddle → Developer tools → Authentication (client-side token) and Catalog (price ids).
// Until the token is set, the buttons keep scrolling to #pricing / download as before.
const PADDLE = {
  env: 'production',         // 'sandbox' only for testing with a sandbox token and sandbox price ids
  token: '',                 // test_… (sandbox) or live_…
  prices: { monthly: 'pri_01m5n0mc6zkazzzfcz201sdet1', yearly: 'pri_01m5n0n2zkmmb41egqb0ftem4x', lifetime: 'pri_01m5n0njrzk0h0rd71rf49j1bb' },
};

(function () {
  if (!PADDLE.token) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
  s.onload = () => {
    if (PADDLE.env === 'sandbox') Paddle.Environment.set('sandbox');
    Paddle.Initialize({
      token: PADDLE.token,
      eventCallback(ev) {
        if (ev.name === 'checkout.completed' && ev.data && ev.data.transaction_id) {
          location.href = '/thanks.html?txn=' + encodeURIComponent(ev.data.transaction_id);
        }
      },
    });
    document.querySelectorAll('[data-plan]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const priceId = PADDLE.prices[a.dataset.plan];
        if (!priceId || priceId.includes('…')) return;
        e.preventDefault();
        Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          settings: { displayMode: 'overlay', theme: 'dark', locale: (document.documentElement.lang || 'en').slice(0, 2), allowLogout: true },
        });
      });
    });
  };
  document.head.appendChild(s);
})();
