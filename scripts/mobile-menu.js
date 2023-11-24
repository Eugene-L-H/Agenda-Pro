import { projectsArray, tasksArray } from "./helpers/state.js";
import { displayTasks, taskPopupFunctionality } from "./tasks.js";

// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

// Flag to determine if project list is open or closed.
let projectsOpen = false;

// HTML for mobile menu.
function mobileMenuHTML() {
  // Check if projects present in projectsArray.
  const projectsPresent = projectsArray.length > 0 ? true : false;
  const noProjectsMessage = "No projects found.";

  const mobileMenuHTML = `
  <div id="mobile-menu">
  <span id="mobile-dates-label" class="mobile-label">TASKS</span>
    <div class="mobile-dates">
      <button id="mobile-today" class="mobile-date-selector">Today</button>
      <button id="mobile-week" class="mobile-date-selector">This<br>Week</button>
      <button id="mobile-month" class="mobile-date-selector">This<br>Month</button>
      <button id="mobile-year" class="mobile-date-selector">This<br>Year</button>
    </div>
    <button id="mobile-add-task" class="add-task-button">+<br>Add Task</button>
    <div id="mobile-project-button-container">
      <button id="mobile-view-projects-button" class="mobile-projects-button">Projects ↓</button>
      <button id="mobile-add-project-button" class="mobile-projects-button">+ Add Project</button>
    </div>
    <ul id="mobile-menu-projects">
      ${projectsPresent ? "" : noProjectsMessage}
    </ul>
  </div>
  `;

  return mobileMenuHTML;
}

/**
 * Add functionality to the hamburger icon (mobile menu).
 */
export function hamburgerFunctionality() {
  const hamburgerIcon = document.querySelector("#hamburger-icon");
  const mobileContent = document.querySelector("#mobile-content");

  hamburgerIcon.addEventListener("click", () => {
    mobileMenuToggle();
    mobileContent.innerHTML = "";
  });
}

// Toggle the mobile menu open/closed.
function mobileMenuToggle() {
  const body = document.querySelector("body");

  if (menuOpen) {
    // Delete Mobile Menu
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenu.remove();

    // Display the mobile menu. Add event listener for projects button.
  } else {
    body.insertAdjacentHTML("afterbegin", mobileMenuHTML());
    mobileMenuDates();
    mobileMenuAddTask();
    mobileMenuProjects();
  }

  // Toggle the menu open/closed.
  menuOpen ? (menuOpen = false) : (menuOpen = true);
}

// Event listeners for the task date-range buttons.
function mobileMenuDates() {
  // Get the date-range buttons.
  const todayButton = document.querySelector("#mobile-today");
  const weekButton = document.querySelector("#mobile-week");
  const monthButton = document.querySelector("#mobile-month");
  const yearButton = document.querySelector("#mobile-year");

  todayButton.addEventListener("click", () => {
    displayTasks("today", true);
    mobileMenuClose();
  });

  weekButton.addEventListener("click", () => {
    displayTasks("week", true);
    mobileMenuClose();
  });

  monthButton.addEventListener("click", () => {
    displayTasks("month", true);
    mobileMenuClose();
  });

  yearButton.addEventListener("click", () => {
    displayTasks("year", true);
    mobileMenuClose();
  });
}

// + Add Task button event listener. Calls popup.
function mobileMenuAddTask() {
  const addTaskButton = document.querySelector("#mobile-add-task");
  taskPopupFunctionality("mobile");

  addTaskButton.addEventListener("click", () => {
    mobileMenuClose();
  });
}

/* Event listener for projects button. Populates the projects list with project names. */
function mobileMenuProjects() {
  const projectsLabel = document.querySelector(".mobile-projects-button");
  const projectList = document.querySelector("#mobile-menu-projects");

  projectsLabel.addEventListener("click", () => {
    // If the projects list is open, close it.
    if (projectsOpen) {
      projectList.innerHTML = "";

      // Populate the projects list with project names.
    } else {
      projectsArray.forEach(project => {
        const projectName = document.createElement("li");
        projectName.textContent = project.name;
        projectList.appendChild(projectName);
      });
    }

    // Toggle the projects list open/closed.
    projectsOpen ? (projectsOpen = false) : (projectsOpen = true);
  });
}

// Remove mobile menu from DOM, reset flag
function mobileMenuClose() {
  const mobileMenu = document.querySelector("#mobile-menu");
  mobileMenu.remove();
  menuOpen = false;
}
