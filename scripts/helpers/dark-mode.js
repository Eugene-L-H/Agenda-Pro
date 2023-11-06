const body = document.querySelector("body");
const darkModeIcon = document.querySelector("#dark-mode-icon");

export function darkMode() {
  darkModeIcon.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });
}
