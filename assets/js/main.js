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

  updateThemeLabel();
}());
