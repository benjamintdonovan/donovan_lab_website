(function () {
  function replayAutoplayVideos() {
    document.querySelectorAll("video[autoplay]").forEach((v) => {
      try {
        // Satisfy autoplay policies
        v.muted = true;
        v.playsInline = true;

        // If the browser restored from bfcache, the video may be "stuck"
        // Force a restart only if it's not currently playing
        if (v.paused) {
          v.load();
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        }
      } catch (e) {}
    });
  }

  // Normal page load
  document.addEventListener("DOMContentLoaded", replayAutoplayVideos);

  // Back/forward cache restore
  window.addEventListener("pageshow", replayAutoplayVideos);

  // In case any PJAX/Turbo-like navigation is enabled
  document.addEventListener("turbo:load", replayAutoplayVideos);
  document.addEventListener("turbolinks:load", replayAutoplayVideos);
})();
