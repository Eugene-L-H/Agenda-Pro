// Global state variables, and helper functions
import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray
} from "/scripts/helpers/state.js";

// Dark mode toggle.
import { darkMode } from "/scripts/helpers/dark-mode.js";

// For populating content area with tasks.
import {
  displayTasks,
  taskPopupFunctionality
} from "/scripts/helpers/tasks.js";

import { Project } from "/scripts/helpers/classes.js";

// Functions for handling the popups.
import {
  closePopupButton,
  addNewProjectPopup,
  submitProjectButton,
  addNewTaskPopup
} from "/scripts/popup.js";

import { addProjectNameToSidebar } from "/scripts/helpers/project.js";

import { fetchWeather } from "/scripts/weather.js";

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

// Dark mode functionality.
darkMode();

// Display the weather information.
fetchWeather();

// Unordered list that displays the nav menu for tasks.
const tasksNavMenu = document.querySelector(".tasks-nav-list");

const taskButtons = tasksNavMenu.querySelectorAll(".nav-item");

taskButtons.forEach(listItem => {
  // Make each list item clickable.
  listItem.addEventListener("click", () =>
    alert(`clicked ${listItem.textContent}`)
  );
});

// Add functionality to the Add Task button in the sidebar.
taskPopupFunctionality();

// Add functionality to the Add Project button.
const addNewProjectBtn = document.querySelector("#add-project-button");
addNewProjectBtn.addEventListener("click", () => {
  // Add the popup HTML to the DOM.
  const popupHTML = addNewProjectPopup();

  // Add the popup HTML to the DOM.
  body.insertAdjacentHTML("afterbegin", popupHTML);
  main.classList.add("blur");

  // Add functionality to the close popup button.
  closePopupButton();

  // Add functionality to the submit project button.
  submitProjectButton(Project);
});

// Check local storage for projects. Add them to the sidebar.
if (localStorage.getItem("projectsArray") !== null) {
  updateProjectsArray(JSON.parse(localStorage.getItem("projectsArray")));
  for (const project of projectsArray) {
    // Create list item dom object
    addProjectNameToSidebar(project.name);
  }
}

// Check local storage for tasks.
if (localStorage.getItem("tasksArray") !== null) {
  updateTasksArray(JSON.parse(localStorage.getItem("tasksArray")));
  console.log("Tasks array on page load: ", tasksArray);
  displayTasks("today");
}
