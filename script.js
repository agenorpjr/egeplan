const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const ano = document.querySelector("#ano");


if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".visually-hidden").textContent = "Abrir menu";
  };


  menuToggle.addEventListener("click", () => {
    const menuAberto = mainNav.classList.contains("is-open");


    if (menuAberto) {
      closeMenu();
    } else {
      mainNav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.querySelector(".visually-hidden").textContent = "Fechar menu";
    }
  });


  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}


if (ano) {
  ano.textContent = new Date().getFullYear();
}

/* Animações de entrada e cabeçalho */
(() => {
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll([
    ".solutions-heading", ".section-heading", ".solution-card",
    ".about-label", ".about-copy", ".stat", ".about-timeline li",
    ".service-row", ".project-card", ".projects-footer",
    ".contact-copy", ".contact-card",
    ".portfolio-group-head", ".portfolio-item", ".portfolio-cta-inner"
  ].join(","));

  document.documentElement.classList.add("js-reveal");
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    let k = 0;
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.style.setProperty("--reveal-delay", Math.min(k, 4) * 90 + "ms");
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
        k += 1;
      });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  targets.forEach((el) => observer.observe(el));
})();