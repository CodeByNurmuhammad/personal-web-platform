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

  updateThemeLabel();
}());
