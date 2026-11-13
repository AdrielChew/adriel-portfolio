(function () {
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var links = menu.querySelectorAll('a');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Highlight the nav link for the section in view
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // Copy email button
  var copy = document.getElementById('copy');
  var email = '25011922@myrp.edu.sg';
  copy.addEventListener('click', function () {
    var label = copy.querySelector('span');
    function done(msg) { label.textContent = msg; setTimeout(function () { label.textContent = 'Copy email'; }, 2000); }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(function () { done('Email copied'); }, function () { done('Copy failed'); });
    } else { done('Copy failed'); }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
