/* ──────────────────────────────────────────────────────────
   The only two values that change at launch.
   Every download and source link on the page reads from them.

   Until they are filled in, the page says so rather than sending
   visitors to github.com's homepage, which looks like the product
   does not exist.
   ────────────────────────────────────────────────────────── */
const REPO_URL    = 'https://github.com/REPLACE_ME/waverr';
const RELEASE_URL = 'https://github.com/REPLACE_ME/waverr/releases';

(function applyLinks() {
  var map = { repo: REPO_URL, release: RELEASE_URL };

  document.querySelectorAll('[data-link]').forEach(function (el) {
    var key = el.getAttribute('data-link');
    var url = map[key];
    if (!url) return;

    if (url.indexOf('REPLACE_ME') !== -1) {
      /* Unresolved: neutralise the link and label it honestly. */
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
      el.classList.add('is-pending');
      if (!el.dataset.pendingApplied) {
        el.dataset.pendingApplied = '1';
        el.title = 'Link not configured yet';
      }
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
