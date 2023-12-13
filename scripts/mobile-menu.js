import {
  blurMainToggle,
  projectsArray,
  tasksArray,
  displayTasks,
  taskPopupFunctionality,
  displayProject,
  projectDisplayTasks,
  addNewProjectPopup,
  closePopupButton,
  submitProjectButton,
  Project
} from "./imports.js";

// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

// Flag to determine if project list is open or closed.
let projectsOpen = false;

// HTML for mobile menu.
function mobileMenuHTML() {
  const mobileMenuHTML = `
  <div id="mobile-menu">
  <span id="mobile-dates-label" class="mobile-label">TASKS</span>
  <button id="mobile-menu-close">X</button>
    <div class="mobile-dates">
      <button id="mobile-today" class="mobile-date-selector">Today</button>
      <button id="mobile-week" class="mobile-date-selector">This<br>Week</button>
      <button id="mobile-month" class="mobile-date-selector">This<br>Month</button>
      <button id="mobile-year" class="mobile-date-selector">This<br>Year</button>
    </div>
    <button id="mobile-add-task" class="add-task-button">+<br>Add<br>Task</button>
    <span class="mobile-label project">PROJECTS</span>
    <div id="mobile-project-button-container">
      <button id="mobile-view-projects-button" class="mobile-projects-button">Projects</button>
      <button id="mobile-add-project-button" class="mobile-projects-button">+ Add&nbsp;<br>Project</button>
    </div>
    <ul id="mobile-menu-projects" class="hidden">
    </ul>
  </div>
  `;

  return mobileMenuHTML;
}

/**
 * Add functionality to the hamburger icon (mobile menu).
 */
export function menuFunctionality() {
  const hamburgerIcon = document.querySelector("#hamburger-icon");
  const wideScreenMenu = document.querySelector("#wide-screen-menu");
  // const mobileMenuClose = document.querySelector("#mobile-menu-close");

  hamburgerIcon.addEventListener("click", () => {
    toggleBlurAndPopups();
  });

  wideScreenMenu.addEventListener("click", () => {
    toggleBlurAndPopups();
  });

  projectsOpen = false;
}

function toggleBlurAndPopups() {
  removePopup();
  blurMainToggle(); // Blur the main screen.
  mobileMenuToggle();
}

// Toggle the mobile menu open/closed.
function mobileMenuToggle() {
  const body = document.querySelector("body");

  if (menuOpen) {
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenu.remove();

    // Display the mobile menu. Add event listener for projects button.
  } else {
    body.insertAdjacentHTML("afterbegin", mobileMenuHTML());
    // Add event listeners for the menu buttons.
    mobileMenuCloseButton();
    mobileMenuDates();
    mobileMenuAddTask();
    mobileMenuProjects();
    mobileMenuAddProject();
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
    blurMainToggle(); // Remove blur from the main screen.
  });

  weekButton.addEventListener("click", () => {
    displayTasks("week", true);
    mobileMenuClose();
    blurMainToggle(); // Remove blur from the main screen.
  });

  monthButton.addEventListener("click", () => {
    displayTasks("month", true);
    mobileMenuClose();
    blurMainToggle(); // Remove blur from the main screen.
  });

  yearButton.addEventListener("click", () => {
    displayTasks("year", true);
    mobileMenuClose();
    blurMainToggle(); // Remove blur from the main screen.
  });
}

function mobileMenuCloseButton() {
  const closeButton = document.querySelector("#mobile-menu-close");
  closeButton.addEventListener("click", () => {
    toggleBlurAndPopups();
  });
}

// + Add Task button event listener. Calls popup.
function mobileMenuAddTask() {
  const addTaskButton = document.querySelector("#mobile-add-task");
  taskPopupFunctionality("main-menu");

  addTaskButton.addEventListener("click", () => {
    mobileMenuClose();
    blurMainToggle(); // Remove blur from the main screen.
  });
}

/* Event listener for projects button. Populates the projects list with project names. */
function mobileMenuProjects() {
  const projectsButton = document.querySelector(".mobile-projects-button");
  const projectList = document.querySelector("#mobile-menu-projects");

  // Check if projects present in projectsArray.
  const projectsPresent = projectsArray.length > 0 ? true : false;
  const noProjectsMessage = "No projects found.";

  projectsButton.addEventListener("click", () => {
    // If the projects list is open, close it.
    if (projectsOpen) {
      projectList.classList.toggle("hidden");
      projectList.innerHTML = "";
      projectsButton.textContent = "Projects";

      // Populate the projects list with project names.
    } else {
      // Target the mobile div in the body.
      const contentArea = document.querySelector("#content-area");

      // If no projects present, display message.
      if (!projectsPresent) {
        projectList.classList.toggle("hidden");
        projectList.insertAdjacentHTML(
          "afterbegin",
          `<p class="no-projects-message">${noProjectsMessage}</p>`
        );
      } else {
        projectList.classList.toggle("hidden");

        // If projects present, display projects list.
        projectsArray.forEach(project => {
          // Create a list item element for each project name.
          const projectName = document.createElement("li");
          const button = document.createElement("button");
          button.classList.add("mobile-project-button");
          button.textContent = project.name;
          projectName.appendChild(button);

          // Add name as list item to the projects list.
          projectList.appendChild(projectName);

          // Add event listener for each project name.
          projectName.addEventListener("click", () => {
            // Clear the mobile div, load project card, and associated tasks.
            contentArea.innerHTML = "";
            mobileMenuClose();
            blurMainToggle(); // Remove blur from the main screen.
            contentArea.insertAdjacentHTML(
              "afterbegin",
              displayProject(project)
            );
            console.log("Project: ", project);
            taskPopupFunctionality("project", project); // Add task popup functionality.
            projectDisplayTasks(project, tasksArray);
          });
        });
      }

      // Change the projects button text upon clicking.
      projectsButton.textContent = "^ ^";
    }

    // Toggle the projects list open/closed.
    projectsOpen ? (projectsOpen = false) : (projectsOpen = true);
  });
}

function mobileMenuAddProject() {
  const body = document.querySelector("body");
  const addNewProjectButton = document.querySelector(
    "#mobile-add-project-button"
  );

  addNewProjectButton.addEventListener("click", () => {
    // Add the popup HTML to the DOM.
    const popupHTML = addNewProjectPopup();
    body.insertAdjacentHTML("afterbegin", popupHTML);

    // Add functionality to the close popup button.
    closePopupButton();

    // Add functionality to the submit project button.
    submitProjectButton(Project);
    mobileMenuClose(); // Close the mobile menu.
  });
}

// Remove mobile menu from DOM, reset flag
export function mobileMenuClose() {
  const mobileMenu = document.querySelector("#mobile-menu");

  mobileMenu.remove();
  menuOpen = false;
}

function removePopup() {
  const popup = document.querySelector(".popup");
  if (popup !== null) {
    popup.remove();
    blurMainToggle();
  }
}
