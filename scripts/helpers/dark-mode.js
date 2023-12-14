"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkMode = void 0;
const body = document.querySelector("body");
const darkModeIcon = document.querySelector("#dark-mode-icon");
function darkMode() {
    if (darkModeIcon) {
        darkModeIcon.addEventListener("click", () => {
            if (body) {
                body.classList.toggle("dark-mode");
            }
        });
    }
}
exports.darkMode = darkMode;
