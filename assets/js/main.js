(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menu = document.querySelector("#site-navigation");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const savedTheme = window.localStorage.getItem("site-theme");

  if (savedTheme === "dark") root.dataset.theme = "dark";

  function updateThemeLabel() {
    if (!themeToggle) return;
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "☼ Light" : "☾ Night";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to night theme");
  }

  themeToggle?.addEventListener("click", function () {
    const isDark = root.dataset.theme === "dark";
    if (isDark) delete root.dataset.theme;
    else root.dataset.theme = "dark";
    window.localStorage.setItem("site-theme", isDark ? "light" : "dark");
    updateThemeLabel();

  });

  menuToggle?.addEventListener("click", function () {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menu?.classList.toggle("show", !isExpanded);
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (typeof SITE_CONFIG === "undefined") return;

    document.querySelectorAll("[data-site-name]").forEach((element) => {
      element.textContent = SITE_CONFIG.identity.name;
    });

    document.querySelectorAll("[data-site-role]").forEach((element) => {
      element.textContent = SITE_CONFIG.identity.title;
    });

    document.querySelectorAll("[data-site-location]").forEach((element) => {
      element.textContent = SITE_CONFIG.identity.location;
    });

    document.querySelectorAll("[data-site-introduction]").forEach((element) => {
      element.textContent = SITE_CONFIG.identity.introduction;
    });

    document.querySelectorAll("[data-site-tagline]").forEach((element) => {
      element.textContent = SITE_CONFIG.website.tagline;
    });

    document.querySelectorAll("[data-social-link]").forEach((element) => {
      const profile = SITE_CONFIG.social[element.dataset.socialLink];
      if (profile) element.href = profile;
    });

    document.querySelectorAll("[data-email-link]").forEach((element) => {
      element.href = `mailto:${SITE_CONFIG.contact.email}`;
    });
  });

  function initFeaturedCarousel() {
    const carousel = document.querySelector("[data-carousel]");
    const viewport = carousel?.querySelector(".carousel-viewport");
    const track = carousel?.querySelector("[data-carousel-track]");
    const previousButton = carousel?.querySelector("[data-carousel-prev]");
    const nextButton = carousel?.querySelector("[data-carousel-next]");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!carousel || !viewport || !track || track.children.length < 2) return;

    const pauseReasons = new Set();
    let offset = 0;
    let lastTimestamp = 0;
    let pointerStartX = 0;
    let pointerStartOffset = 0;
    let activePointerId = null;
    let dragged = false;
    let suppressClick = false;

    function getStep() {
      const firstSlide = track.firstElementChild;
      if (!firstSlide) return 0;
      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return firstSlide.getBoundingClientRect().width + gap;
    }

    function render() {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    function normalizeOffset() {
      const step = getStep();
      if (!step) return;
      while (offset >= step) {
        offset -= step;
        track.append(track.firstElementChild);
      }
      while (offset < 0) {
        track.prepend(track.lastElementChild);
        offset += step;
      }
    }

    function move(direction) {
      offset += direction * getStep();
      normalizeOffset();
      render();
    }

    function animate(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = Math.min(timestamp - lastTimestamp, 100) / 1000;
      lastTimestamp = timestamp;

      if (pauseReasons.size === 0) {
        offset += elapsed * 14;
        normalizeOffset();
        render();
      }

      window.requestAnimationFrame(animate);
    }

    function pause(reason) {
      pauseReasons.add(reason);
    }

    function resume(reason) {
      pauseReasons.delete(reason);
    }

    carousel.addEventListener("mouseenter", () => pause("hover"));
    carousel.addEventListener("mouseleave", () => resume("hover"));
    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartOffset = offset;
      dragged = false;
      pause("drag");
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener("pointermove", (event) => {
      if (event.pointerId !== activePointerId) return;
      const distance = event.clientX - pointerStartX;
      if (Math.abs(distance) > 6) dragged = true;
      offset = Math.max(0, pointerStartOffset - distance);
      render();
    });
    viewport.addEventListener("pointerup", (event) => {
      if (event.pointerId !== activePointerId) return;
      const distance = event.clientX - pointerStartX;
      if (dragged && Math.abs(distance) > 40) move(distance > 0 ? -1 : 1);
      suppressClick = dragged;
      activePointerId = null;
      viewport.classList.remove("is-dragging");
      resume("drag");
    });
    viewport.addEventListener("pointercancel", () => {
      activePointerId = null;
      viewport.classList.remove("is-dragging");
      resume("drag");
    });
    carousel.addEventListener("click", (event) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }, true);
    previousButton?.addEventListener("click", () => move(-1));
    nextButton?.addEventListener("click", () => move(1));
    carousel.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      pause("keyboard");
      move(event.key === "ArrowLeft" ? -1 : 1);
      window.setTimeout(() => resume("keyboard"), 600);
    });
    motionQuery.addEventListener?.("change", (event) => {
      if (event.matches) pause("reduced");
      else resume("reduced");
    });
    if (motionQuery.matches) pause("reduced");
    window.addEventListener("resize", render);
    window.requestAnimationFrame(animate);
  }

  initFeaturedCarousel();
  updateThemeLabel();
}());
