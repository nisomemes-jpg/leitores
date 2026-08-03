(() => {
  const storageKey = "leitores-formacao-permanente";
  const cards = [...document.querySelectorAll("[data-resource-id]")];
  const readSaved = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { return []; }
  };
  const update = () => {
    const saved = readSaved();
    cards.forEach((card) => {
      const input = card.querySelector('input[type="checkbox"]');
      const checked = saved.includes(card.dataset.resourceId);
      input.checked = checked;
      card.classList.toggle("completed", checked);
      const label = input.parentElement;
      label.lastChild.textContent = checked ? "Estudado" : "Marcar como estudado";
    });
    const count = cards.filter((card) => saved.includes(card.dataset.resourceId)).length;
    const percent = cards.length ? Math.round((count / cards.length) * 100) : 0;
    const progress = document.querySelector(".progress-card");
    if (progress) {
      progress.querySelector("strong").textContent = percent + "%";
      progress.querySelector(".progress-track span").style.width = percent + "%";
      progress.querySelector("small").textContent = count + " de " + cards.length + " roteiros consultados neste aparelho";
    }
  };
  cards.forEach((card) => {
    const input = card.querySelector('input[type="checkbox"]');
    input.addEventListener("change", () => {
      const current = new Set(readSaved());
      if (input.checked) current.add(card.dataset.resourceId);
      else current.delete(card.dataset.resourceId);
      localStorage.setItem(storageKey, JSON.stringify([...current]));
      update();
    });
  });
  const mobileMenus = [...document.querySelectorAll(".mobile-menu")];
  document.querySelectorAll(".mobile-menu-panel a").forEach((link) => {
    link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
  });
  document.addEventListener("click", (event) => {
    mobileMenus.forEach((menu) => {
      if (!menu.contains(event.target)) menu.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") mobileMenus.forEach((menu) => menu.removeAttribute("open"));
  });
  document.querySelector(".print-button")?.addEventListener("click", () => window.print());
  update();
})();