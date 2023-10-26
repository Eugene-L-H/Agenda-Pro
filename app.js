import { tasksArray, projectsArray } from "/scripts/state.js";

import {
  addNewProjectPopup,
  closePopupButton,
  submitProjectButton
} from "/scripts/project-popup.js";

import { fetchWeather } from "/scripts/weather.js";

console.log('projectsArray at start: ', projectsArray);

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

// Unordered list that displays the nav menu for tasks.
const tasksNavMenu = document.querySelector(".tasks-nav-list");

const taskButtons = tasksNavMenu.querySelectorAll(".nav-item");

// Unordered list that displays the nav menus for user-registered projects.
const projectsNav = document.querySelector("#projects-nav");

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

  console.log('projectsArray', projectsArray);
});

// Main display area for the content.
const contentArea = document.querySelector("#content-area");

// Display the weather information.
fetchWeather();


