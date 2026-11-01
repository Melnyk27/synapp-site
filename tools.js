// Banners in the free app open /tools?ad=<id>: send the visitor straight on to the sponsor.
(function () {
  var LINKS = { aliexpress: 'https://rzekl.com/c/1e8d1144944e5ba376aa16525dc3e8/' };
  var ad = new URLSearchParams(location.search).get('ad') || '';
  var to = LINKS[ad.split('-')[0]];
  if (to) location.replace(to);
})();
