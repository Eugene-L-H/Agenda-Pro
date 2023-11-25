// Global state variables, and helper functions
import * as fun from "./scripts/imports.js";

// Dark mode functionality.
fun.darkMode();

// Display the weather information.
fun.loadWeather();

// Mobile menu functionality.
fun.hamburgerFunctionality();

// Add functionality to the task date buttons.
fun.taskDateButtons();

// Add functionality to the Add Task button in the sidebar.
fun.taskPopupFunctionality();

// Add functionality to the Add Project button.
fun.addProjectPopupFunctionality();

// Check local storage for tasks.
fun.tasksStorageToDisplay();

// Check local storage for projects. Display in sidebar.
fun.projectsStorageToDisplay();
