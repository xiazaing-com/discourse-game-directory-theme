document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-card img, .game-detail img, .topic-post img").forEach((image) => {
    const isCover = image.alt?.includes("封面") || image.classList.contains("game-detail__cover");
    image.loading = isCover ? "eager" : "lazy";
    image.decoding = "async";
  });
  document.querySelectorAll(".game-download a[href], .topic-post a[href*='pan.']").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
});
