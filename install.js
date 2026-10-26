(function(){
  var l=(navigator.language||'en').toLowerCase();
  try{var s=localStorage.getItem('takesync-lang');if(s)l=s;}catch(e){}
  if(/^(uk|ru|be)/.test(l)){document.querySelector('[data-lang=en]').hidden=true;document.querySelector('[data-lang=uk]').hidden=false;document.documentElement.lang='uk';}
  document.querySelectorAll('.copy').forEach(function(b){b.onclick=function(){navigator.clipboard.writeText(b.previousElementSibling.textContent).then(function(){var t=b.textContent;b.textContent='✓';setTimeout(function(){b.textContent=t},1500)})}});
})();
