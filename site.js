/* Lagari Games — site betiği */
(function () {
  var html = document.documentElement;
  html.classList.remove('no-js');

  // Dil
  var titles = { tr: html.getAttribute('data-title-tr'), en: html.getAttribute('data-title-en') };
  var descs = { tr: html.getAttribute('data-desc-tr'), en: html.getAttribute('data-desc-en') };
  function setLang(l) {
    html.setAttribute('data-lang', l);
    html.setAttribute('lang', l);
    if (titles[l]) document.title = titles[l];
    var m = document.querySelector('meta[name="description"]');
    if (m && descs[l]) m.setAttribute('content', descs[l]);
    try { localStorage.setItem('lagari_lang', l); } catch (e) {}
  }
  setLang(html.getAttribute('data-lang') || 'tr');
  document.querySelectorAll('[data-set]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set')); });
  });

  // Menü
  var nav = document.querySelector('.nav');
  if (nav) {
    var solidAlways = nav.hasAttribute('data-solid');
    var onScroll = function () { nav.classList.toggle('solid', solidAlways || window.scrollY > 30); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    var burger = nav.querySelector('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('.menu a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
      });
    }
  }

  // Kabarcıklar
  document.querySelectorAll('.bubbles').forEach(function (box) {
    var n = parseInt(box.getAttribute('data-n') || '14', 10);
    for (var i = 0; i < n; i++) {
      var b = document.createElement('i');
      b.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
      b.style.setProperty('--s', (6 + Math.random() * 18).toFixed(0) + 'px');
      b.style.setProperty('--d', (6 + Math.random() * 8).toFixed(1) + 's');
      b.style.setProperty('--dl', (-Math.random() * 12).toFixed(1) + 's');
      box.appendChild(b);
    }
  });

  // Kaydırınca beliren öğeler
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Yıl
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
