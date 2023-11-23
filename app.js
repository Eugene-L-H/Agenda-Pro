// Global state variables, and helper functions
import * as FUN from "./scripts/imports.js";

// DOM objects
const body = document.querySelector("body");

const main = document.querySelector("main");

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
  // Sort array by dueDate, and then by priority.
  let array = FUN.sortArrayByPriority(
    JSON.parse(localStorage.getItem("tasksArray"))
  );
  array = FUN.sortArrayByDate(array);
  FUN.updateTasksArray(array);
  FUN.displayTasks("today");
}
