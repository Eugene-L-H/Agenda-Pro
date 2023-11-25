// Global state variables, and helper functions
import * as imp from "./scripts/imports.js";

// Dark mode functionality.
imp.darkMode();

// Mobile menu functionality.
FUN.hamburgerFunctionality();

// Display the weather information.
imp.loadWeather();

// Mobile menu functionality.
imp.hamburgerFunctionality();


// Add functionality to the task date buttons.
imp.taskDateButtons();

// Add functionality to the Add Task button in the sidebar.
imp.taskPopupFunctionality();

// Add functionality to the Add Project button.
imp.addProjectPopupFunctionality();

// Check local storage for tasks.
imp.tasksStorageToDisplay();

// Check local storage for projects. Display in sidebar.
imp.projectsStorageToDisplay();
