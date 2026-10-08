/* =========================================================
   SITE SETTINGS — edit these two lines
   ========================================================= */

// Instagram username, without the @
const INSTAGRAM_HANDLE = "doubledsburgers"; // TODO: confirm real handle

// Live Instagram feed via Behold (free): create a feed at https://behold.so,
// connect the Instagram account, then paste the Feed ID here.
// Leave empty to show the placeholder tiles instead.
const BEHOLD_FEED_ID = "";

/* ========================================================= */

(function () {
  const igUrl = "https://www.instagram.com/" + INSTAGRAM_HANDLE + "/";

  // Point every Instagram link at the profile
  document.querySelectorAll(".js-ig-link").forEach(function (a) {
    a.href = igUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".ig-handle").forEach(function (a) {
    a.textContent = "@" + INSTAGRAM_HANDLE;
  });

  // Live feed
  if (BEHOLD_FEED_ID) {
    const feed = document.getElementById("ig-feed");
    const fallback = document.getElementById("ig-fallback");
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);

    const widget = document.createElement("behold-widget");
    widget.setAttribute("feed-id", BEHOLD_FEED_ID);
    feed.appendChild(widget);
    if (fallback) fallback.remove();
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
