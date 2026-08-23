document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-card img, .game-detail img").forEach((image) => {
    image.loading = "lazy";
    image.decoding = "async";
  });
  document.querySelectorAll(".game-download a[href]").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
});
