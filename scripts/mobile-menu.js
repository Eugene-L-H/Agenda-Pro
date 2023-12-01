import { projectsArray, tasksArray } from "./helpers/state.js";
import { displayTasks, taskPopupFunctionality } from "./tasks.js";
import { displayProject, projectDisplayTasks } from "./project.js";

// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

// Last task range opened by user.
let lastTaskRange = "today";

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
    <button id="mobile-add-task" class="add-task-button">+<br>Add<br>Task</button>
    <div id="mobile-project-button-container">
      <button id="mobile-view-projects-button" class="mobile-projects-button">Projects</button>
      <button id="mobile-add-project-button" class="mobile-projects-button">+ Add&nbsp;<br>Project</button>
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

  hamburgerIcon.addEventListener("click", () => mobileMenuToggle());
}

// Toggle the mobile menu open/closed.
function mobileMenuToggle() {
  const body = document.querySelector("body");

  if (menuOpen) {
    // Delete Mobile Menu
    clearMobileContent();
    displayTasks(lastTaskRange, true);
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenu.remove();

    // Display the mobile menu. Add event listener for projects button.
  } else {
    clearMobileContent();

    body.insertAdjacentHTML("afterbegin", mobileMenuHTML());
    mobileMenuDates();
    mobileMenuAddTask();
    mobileMenuProjects();
  }

  // Toggle the menu open/closed.
  menuOpen ? (menuOpen = false) : (menuOpen = true);
}

function clearMobileContent() {
  const mobileContent = document.querySelector("#content-area");
  mobileContent.innerHTML = "";
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
    lastTaskRange = "today";
  });

  weekButton.addEventListener("click", () => {
    displayTasks("week", true);
    mobileMenuClose();
    lastTaskRange = "week";
  });

  monthButton.addEventListener("click", () => {
    displayTasks("month", true);
    mobileMenuClose();
    lastTaskRange = "month";
  });

  yearButton.addEventListener("click", () => {
    displayTasks("year", true);
    mobileMenuClose();
    lastTaskRange = "year";
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

// Flag to determine if project list is open or closed.
let projectsOpen = false;

/* Event listener for projects button. Populates the projects list with project names. */
function mobileMenuProjects() {
  const projectsButton = document.querySelector(".mobile-projects-button");
  const projectList = document.querySelector("#mobile-menu-projects");
  console.log("projectList: ", projectList);
  console.log("projectsButton: ", projectsButton);

  projectsButton.addEventListener("click", () => {
    // If the projects list is open, close it.
    if (projectsOpen) {
      projectList.innerHTML = "";

      projectsButton.textContent = "Projects";

      // Populate the projects list with project names.
    } else {
      // Target the mobile div in the body.
      const mobileDiv = document.querySelector("#mobile-content");
      console.log("projectsArray: ", projectsArray);

      projectsArray.forEach(project => {
        // Create a list item element for each project name.
        const projectName = document.createElement("li");
        projectName.classList.add("mobile-project");
        projectName.textContent = project.name;

        // Add name as list item to the projects list.
        projectList.appendChild(projectName);

        // Add event listener for each project name.
        projectName.addEventListener("click", () => {
          // Clear the mobile div, load project card, and associated tasks.
          mobileDiv.innerHTML = "";
          mobileMenuClose();
          mobileDiv.insertAdjacentHTML("afterbegin", displayProject(project));
          taskPopupFunctionality("project"); // Add task popup functionality.
          projectDisplayTasks(project, tasksArray);
        });
      });

      // Change the projects button text upon clicking.
      projectsButton.textContent = "^ ^";
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
