/* ──────────────────────────────────────────────────────────
   The only two values that change at launch.
   Every download and source link on the page reads from here.
   ────────────────────────────────────────────────────────── */
const REPO_URL    = 'https://github.com/REPLACE_ME/waverr';
const RELEASE_URL = 'https://github.com/REPLACE_ME/waverr/releases';

(function applyLinks() {
  var map = { repo: REPO_URL, release: RELEASE_URL };
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var url = map[el.getAttribute('data-link')];
    if (url) el.href = url;
  });
})();
