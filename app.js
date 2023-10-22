import {
  addNewProjectPopup,
  closePopup,
  submitProject
} from "/scripts/project-popup.js";

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

// Main display area for the content.
const contentArea = document.querySelector("#content-area");

// Insert the popup HTML into the DOM.
addNewProjectBtn.addEventListener("click", () => {
  // Add the popup HTML to the DOM.
  const popupHTML = addNewProjectPopup();

  // Add the popup HTML to the DOM.
  body.insertAdjacentHTML("afterbegin", popupHTML);
  main.classList.add("blur");

  // Add functionality to the close popup button.
  closePopup();
  submitProject();
});
