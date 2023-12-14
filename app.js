import {
  darkMode,
  updateWeather,
  menuFunctionality,
  tasksStorageToDisplay,
  populateLocalProjectsArray
} from "./scripts/imports.js";

// Add page reload to title in the header.
const siteTitle = document.querySelector("#site-title");
siteTitle.addEventListener("click", () => {
  location.reload();
});

// Dark mode functionality.
darkMode();

// Display the weather information.
updateWeather();

// Mobile menu functionality.
menuFunctionality();

// Check local storage for tasks.
tasksStorageToDisplay();

// Check local storage for projects.Populate local variable.
populateLocalProjectsArray();
