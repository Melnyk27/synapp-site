// Banners in the free app open /tools?ad=<id>: send the visitor straight on to the sponsor.
(function () {
  // aliexpress-cpa: countries the CPC programme does not pay for get the CPA (per sale) link.
  var LINKS = {
    'aliexpress-cpa': 'https://rzekl.com/g/1e8d1144944e5ba376aa16525dc3e8/',
    aliexpress: 'https://rzekl.com/c/1e8d1144944e5ba376aa16525dc3e8/'
  };
  var ad = new URLSearchParams(location.search).get('ad') || '';
  var to = LINKS[ad] || LINKS[ad.split('-')[0]];
  if (to) location.replace(to);
})();
