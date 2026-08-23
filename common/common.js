document.addEventListener("DOMContentLoaded", () => {
  const markGameDirectory = () => {
    const isGameCategory = /^\/c\/5-category(?:\/|$)/.test(window.location.pathname);
    document.body.classList.toggle("game-directory-page", isGameCategory);
    if (isGameCategory) hydrateGameCovers();
  };
  markGameDirectory();
  const directoryObserver = new MutationObserver(markGameDirectory);
  directoryObserver.observe(document.body, { childList: true, subtree: true });

  const coverCache = new Map();
  async function hydrateGameCovers() {
    document.querySelectorAll(".game-directory-page .topic-list-item").forEach((item) => {
      if (item.querySelector(".game-topic-card__cover") || item.dataset.gameCoverLoading === "true") return;
      const link = item.querySelector("a.title, .main-link a, a[href*='/t/']");
      const match = link?.getAttribute("href")?.match(/\/t\/[^/]+\/(\d+)/);
      if (!match) return;
      const topicId = match[1];
      item.dataset.gameCoverLoading = "true";
      const load = coverCache.get(topicId) || fetch(`/t/topic/${topicId}.json`, { credentials: "same-origin" })
        .then((response) => response.ok ? response.json() : null)
        .then((data) => {
          const cooked = data?.post_stream?.posts?.[0]?.cooked || "";
          const parsed = new DOMParser().parseFromString(cooked, "text/html");
          return parsed.querySelector("img[src]")?.getAttribute("src") || null;
        })
        .catch(() => null);
      coverCache.set(topicId, load);
      load.then((src) => {
        if (!src || !item.isConnected || item.querySelector(".game-topic-card__cover")) return;
        const cover = document.createElement("img");
        cover.className = "game-topic-card__cover";
        cover.loading = "lazy";
        cover.decoding = "async";
        cover.alt = `${link.textContent.trim()}封面`;
        cover.src = src;
        item.prepend(cover);
      }).finally(() => { item.dataset.gameCoverLoading = "false"; });
    });
  }

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
