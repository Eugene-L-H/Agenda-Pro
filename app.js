import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray
} from "/scripts/state.js";

import {
  addNewProjectPopup,
  closePopupButton,
  addProjectNameToSidebar,
  submitProjectButton
} from "/scripts/project-popup.js";

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
  submitProjectButton();

  console.log("projectsArray after submission", projectsArray);
});

// Main display area for the content.
const contentArea = document.querySelector("#content-area");

// Display the weather information.
fetchWeather();

// Check local storage for projects. Add them to the sidebar.
if (localStorage.getItem("projectsArray") !== null) {
  console.log(
    "local storage has projects: ",
    localStorage.getItem("projectsArray")
  );

  updateProjectsArray(JSON.parse(localStorage.getItem("projectsArray")));

  for (const project of projectsArray) {
    // Create list item dom object
    addProjectNameToSidebar(project.name);
  }
}
