import { projectsArray, tasksArray } from "./helpers/state.js";

// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

// Flag to determine if project list is open or closed.
let projectsOpen = false;

// HTML for mobile menu.
function mobileMenuHTML() {
  const mobileMenuHTML = `
  <div id="mobile-menu">
  <span id="mobile-dates-label" class="mobile-label">Tasks:</span>
    <div class="mobile-dates">
      <button id="mobile-today" class="mobile-date-selector">Today</button>
      <button id="mobile-week" class="mobile-date-selector">This<br>Week</button>
      <button id="mobile-month" class="mobile-date-selector">This<br>Month</button>
      <button id="mobile-year" class="mobile-date-selector">This<br>Year</button>
    </div>
    <button id="mobile-projects-button">Projects</button>
    <div className="mobile-projects-container">
      <ul id="mobile-menu-projects">
      </ul>
    </div>
  </div>
  `;

  return mobileMenuHTML;
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
    alert("Today");
  });

  weekButton.addEventListener("click", () => {
    alert("This Week");
  });

  monthButton.addEventListener("click", () => {
    alert("This Month");
  });

  yearButton.addEventListener("click", () => {
    alert("This Year");
  });
}

/* Event listener for projects button. Populates the projects list with project names. */
function mobileMenuProjects() {
  const projectsLabel = document.querySelector("#mobile-projects-button");
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

/**
 * Add functionality to the hamburger icon (mobile menu).
 */
export function hamburgerFunctionality() {
  const hamburgerIcon = document.querySelector("#hamburger-icon");

  const taskList = document.querySelector("#mobile-menu-tasks");
  const projectList = document.querySelector("#mobile-menu-projects");

  hamburgerIcon.addEventListener("click", () => {
    mobileMenuToggle();
  });
}
