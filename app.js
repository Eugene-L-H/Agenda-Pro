import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray
} from "/scripts/helpers/state.js";

import { Project } from "/scripts/helpers/classes.js";

import {
  closePopupButton,
  addNewProjectPopup,
  submitProjectButton
} from "/scripts/helpers/popup-helpers.js";

import { addProjectNameToSidebar } from "/scripts/project.js";

import { fetchWeather } from "/scripts/weather.js";

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

// Unordered list that displays the nav menu for tasks.
const tasksNavMenu = document.querySelector(".tasks-nav-list");

const taskButtons = tasksNavMenu.querySelectorAll(".nav-item");

taskButtons.forEach(listItem => {
  // Make each list item clickable.
  listItem.addEventListener("click", () =>
    alert(`clicked ${listItem.textContent}`)
  );
});

// Add new-project button.
const addNewProjectBtn = document.querySelector("#add-project-button");

// Insert the popup HTML into the DOM.
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

  console.log("projectsArray after submission", projectsArray);
});

// Display the weather information.
fetchWeather();

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

  // TODO: remove this console.log
} else {
  console.log("No tasks found in local storage.");
}
