// Download counter: the DMG link stays direct; a click only sends a beacon to the license service.
// ?r=<tag> (from an email link) is remembered so the later download is credited to it.
(function () {
  var ref = null;
  try {
    var r = new URLSearchParams(location.search).get('r');
    if (r) localStorage.setItem('takesync-ref', r);
    ref = localStorage.getItem('takesync-ref');
  } catch (e) { /* storage unavailable */ }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="TakeSync.dmg"]');
    if (!a || !navigator.sendBeacon) return;
    try { navigator.sendBeacon('https://license.takesync.uk/v1/hit?r=' + encodeURIComponent(ref || 'site'), 'dl'); } catch (err) { /* never block the download */ }
  });
})();
