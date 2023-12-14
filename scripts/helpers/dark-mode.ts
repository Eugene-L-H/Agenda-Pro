const body: HTMLElement | null = document.querySelector("body");
const darkModeIcon: HTMLElement | null =
  document.querySelector("#dark-mode-icon");

export function darkMode() {
  if (darkModeIcon) {
    darkModeIcon.addEventListener("click", () => {
      if (body) {
        body.classList.toggle("dark-mode");
      }
    });
  }
}
