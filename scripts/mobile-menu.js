import { projectsArray, tasksArray } from "./helpers/state.js";

// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

// Flag to determine if project list is open or closed.
let projectsOpen = false;

// HTML for mobile menu.
function mobileMenuHTML() {
  const mobileMenuHTML = `
  <div id="mobile-menu">
    <span id="mobile-dates-label">Dates:</span>
    <span id="mobile-today">Today</span>
    <span id="mobile-week">This Week</span>
    <span id="mobile-month">This Month</span>
    <span id="mobile-year">This Year</span>
    <span id="mobile-projects-label">Projects</span>
    <ul id="mobile-menu-projects">
    </ul>
  </div>
  `;

  return mobileMenuHTML;
}

// Toggle the mobile menu open/closed.
function mobileMenuToggle() {
  const main = document.querySelector("main");

  if (menuOpen) {
    // Delete Mobile Menu
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenu.remove();

    // Display the mobile menu. Add event listener for projects button.
  } else {
    main.insertAdjacentHTML("afterbegin", mobileMenuHTML());
    mobileMenuProjects();
  }

  // Toggle the menu open/closed.
  menuOpen ? (menuOpen = false) : (menuOpen = true);
}

/* Event listener for projects button. Populates the projects list with project names. */
function mobileMenuProjects() {
  const projectsLabel = document.querySelector("#mobile-projects-label");
  const projectList = document.querySelector("#mobile-menu-projects");

  console.log("projectsOpen before: ", projectsOpen);
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
