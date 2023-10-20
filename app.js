// Import the popup function into the app.js file.
import addNewProjectPopup from "/scripts/popups.js";

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

// Unordered list that displays the nav menu for tasks.
const tasksNavMenu = document.querySelector("#tasks-nav");
console.log("tasksNavMenu: ", tasksNavMenu);

const taskButtons = tasksNavMenu.querySelectorAll(".nav-item");
console.log("taskButtons: ", taskButtons);

// Unordered list that displays the nav menus for user-registered projects.
const projectsNav = document.querySelector("#projects-nav");
console.log("projectsNav: ", projectsNav);

taskButtons.forEach(listItem => {
  // Make each list item clickable.
  console.log("listItem: ", listItem);
  listItem.addEventListener("click", () =>
    alert(`clicked ${listItem.textContent}`)
  );
});

// Add new-project button.
const addNewProjectBtn = document.querySelector("#add-project-button");
console.log("addNewProjectBtn: ", addNewProjectBtn);

// Main display area for the content.
const contentArea = document.querySelector("#content-area");
console.log("contentArea: ", contentArea);

// Insert the popup HTML into the DOM.
addNewProjectBtn.addEventListener("click", () => {
  // Add the popup HTML to the DOM.
  const popupHTML = addNewProjectPopup();
  console.log("popupHTML: ", popupHTML);
  // Add the popup HTML to the DOM.
  body.insertAdjacentHTML("afterbegin", popupHTML);
  main.classList.add("blur");
});
