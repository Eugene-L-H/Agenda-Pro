// Global state variables, and helper functions
import * as FUN from "/scripts/imports.js";

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

// Dark mode functionality.
FUN.darkMode();

// Display the weather information.
FUN.fetchWeather();

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
FUN.taskPopupFunctionality();

// Add functionality to the Add Project button.
const addNewProjectBtn = document.querySelector("#add-project-button");
addNewProjectBtn.addEventListener("click", () => {
  // Add the popup HTML to the DOM.
  const popupHTML = FUN.addNewProjectPopup();

  // Add the popup HTML to the DOM.
  body.insertAdjacentHTML("afterbegin", popupHTML);
  main.classList.add("blur");

  // Add functionality to the close popup button.
  FUN.closePopupButton();

  // Add functionality to the submit project button.
  FUN.submitProjectButton(FUN.Project);
});

// Check local storage for projects. Add them to the sidebar.
if (localStorage.getItem("projectsArray") !== null) {
  FUN.updateProjectsArray(JSON.parse(localStorage.getItem("projectsArray")));
  for (const project of FUN.projectsArray) {
    // Create list item dom object
    FUN.addProjectNameToSidebar(project.name);
  }
}

// Check local storage for tasks.
if (localStorage.getItem("tasksArray") !== null) {
  FUN.updateTasksArray(JSON.parse(localStorage.getItem("tasksArray")));
  console.log("Tasks array on page load: ", FUN.tasksArray);
  FUN.displayTasks("today");
}
