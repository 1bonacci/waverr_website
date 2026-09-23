/* ──────────────────────────────────────────────────────────
   The only two values that change at launch.
   Every download and source link on the page reads from them.

   Until they are filled in, the page says so rather than sending
   visitors to github.com's homepage, which looks like the product
   does not exist.
   ────────────────────────────────────────────────────────── */
const REPO_URL    = 'https://github.com/1bonacci/waverr';
const RELEASE_URL = 'https://github.com/1bonacci/waverr/releases';

(function applyLinks() {
  var map = { repo: REPO_URL, release: RELEASE_URL };

  document.querySelectorAll('[data-link]').forEach(function (el) {
    var key = el.getAttribute('data-link');
    var url = map[key];
    if (!url) return;

    if (url.indexOf('REPLACE_ME') !== -1) {
      /* Unresolved: neutralise the link but keep it reachable. Removing href
         would drop it out of the tab order while still announcing it as
         disabled, so a keyboard user hears about a control they cannot
         reach. Intercepting the click keeps it focusable and honest. */
      el.setAttribute('aria-disabled', 'true');
      el.classList.add('is-pending');
      el.title = 'Link not configured yet';
      el.addEventListener('click', function (e) { e.preventDefault(); });
      return;
    }

    el.href = url;
  });
})();

/* Each bar gets its own rhythm; a synchronized block reads as a loading
   animation rather than audio. Skipped under reduced motion so no inline
   duration outlives the CSS that freezes it. */
(function seedVisualizer() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.device__viz i').forEach(function (bar) {
    bar.style.animationDuration = (460 + Math.random() * 620).toFixed(0) + 'ms';
    bar.style.animationDelay = '-' + (Math.random() * 900).toFixed(0) + 'ms';
  });
})();

/* The device turns to the pointer. It is the page's one authored moment: the
   single physical object responds to the one thing the visitor is moving, and
   nothing else on the page animates on approach.

   Reads as a rest pose with no JS and under reduced motion — the CSS default
   is already a settled three-quarter angle, so this only ever adds. */
(function tiltDevice() {
  var device = document.querySelector('.device');
  var stage = document.querySelector('.stage');
  if (!device || !stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  /* A tilt driven by pointer position has no meaning on a touch screen, where
     there is no hover and the finger is usually over the object itself. */
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var REST_X = 6, REST_Y = -13;   /* must match the CSS rest pose */
  var RANGE  = 11;                /* degrees of travel either side of rest */
  var frame = null;

  function settle() {
    device.classList.remove('is-live');
    device.style.removeProperty('--rx');
    device.style.removeProperty('--ry');
  }

  window.addEventListener('pointermove', function (e) {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = null;
      var box = device.getBoundingClientRect();
      if (!box.width) return;

      /* Distance from the device's own centre, normalised and clamped, so the
         object keeps facing the pointer even once it has left the stage. */
      var dx = (e.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
      var dy = (e.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2);
      dx = Math.max(-1, Math.min(1, dx));
      dy = Math.max(-1, Math.min(1, dy));

      device.classList.add('is-live');
      device.style.setProperty('--ry', (REST_Y + dx * RANGE).toFixed(2) + 'deg');
      device.style.setProperty('--rx', (REST_X - dy * RANGE).toFixed(2) + 'deg');
    });
  }, { passive: true });

  /* Leaving the window returns it to rest rather than freezing mid-turn. */
  document.addEventListener('pointerleave', settle);
  window.addEventListener('blur', settle);
})();

/* The masthead floats over whichever band is beneath it. Its translucent mix
   and its bottom rule are inherited from the page root, so on a light band it
   would keep painting a near-black blur over ivory. This hands it the band's
   own role tokens as it crosses each boundary. */
(function bandAwareMasthead() {
  var masthead = document.querySelector('.masthead');
  var bands = Array.prototype.slice.call(document.querySelectorAll('.band--lit'));
  if (!masthead || !bands.length || !('IntersectionObserver' in window)) return;

  function sync() {
    var edge = masthead.getBoundingClientRect().bottom;
    var lit = bands.some(function (band) {
      var box = band.getBoundingClientRect();
      return box.top <= edge && box.bottom >= edge;
    });
    masthead.classList.toggle('band--lit', lit);
  }

  sync();
  window.addEventListener('scroll', function () {
    requestAnimationFrame(sync);
  }, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
})();
