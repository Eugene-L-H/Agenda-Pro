// Global state variables, and helper functions
import * as FUN from "./scripts/imports.js";

// Dark mode functionality.
FUN.darkMode();

// Mobile menu functionality.
FUN.hamburgerFunctionality();

// Display the weather information.
FUN.loadWeather();

// Add functionality to the task date buttons.
FUN.taskDateButtons();

// Add functionality to the Add Task button in the sidebar.
FUN.taskPopupFunctionality();

// Add functionality to the Add Project button.
FUN.addProjectPopupFunctionality();

// Check local storage for projects. Add them to the sidebar.
if (localStorage.getItem("projectsArray") !== null) {
  FUN.updateProjectsArray(JSON.parse(localStorage.getItem("projectsArray")));
  for (const project of FUN.projectsArray) {
    // Create list item dom object
    FUN.addProjectNameToSidebar(project.name);
  }
}

// Check local storage for tasks.
FUN.tasksStorageToDisplay();
