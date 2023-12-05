import {
  deleteIconFunctionality,
  projectsArray,
  updateProjectsArray,
  closePopup,
  tasksArray,
  populateExampleArray,
  blurMainToggle
} from "./imports.js";

import {
  taskPopupFunctionality,
  taskDOMobject,
  taskCardFunctionality
} from "./tasks.js";

// Check local storage for projects. Add them to the sidebar.
export function populateLocalProjectsArray() {
  // Update local projects array with projects from local storage.
  if (localStorage.getItem("projectsArray") !== null) {
    updateProjectsArray(JSON.parse(localStorage.getItem("projectsArray")));

    // If local storage is empty, populate with example projects.
  } else {
    updateProjectsArray(populateExampleArray("project", 5));
    location.reload();
  }
}

// Popup form for creating a new project.
export function addNewProjectPopup() {
  const popupHTML = `
    <div class="popup">
      <div class="popup-header project">
       <span class="popup-title project">NEW PROJECT</span>
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="project-name-popup">Project Name:</label>
        <input type="text" id="project-name-popup" placeholder="Project Name" />
        <label for="project-description">Description:</label>
        <textarea
          rows="4" 
          id="project-description"
          placeholder="Project Description"
        ></textarea>
        <label for="project-priority">Priority:</label>
        <select id="project-priority">
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <label for="project-deadline">Deadline (Optional):</label>
        <input type="date" id="project-deadline" placeholder="Deadline" />
        <button id="submit-project">Add Project</button>
      </div>
    </div>
  `;

  return popupHTML;
}

// HTML to display project in the main content area.
export function displayProject(project) {
  // Get the priority of the project.
  let priority = "Low";
  switch (project.priority) {
    case "3":
      priority = "High";
      break;
    case "2":
      priority = "Medium";
      break;
    default:
      break;
  }

  const projectHTML = `
  <div class="project-card">
    <div class="project-info">
      <div class="project-card-header">
        <h3 id="project-name" data-name="${project.name}">
          <span class="project-name-prefix">Project:&nbsp;</span>
          ${project.name}
        </h3>
      </div>
      <div class="project-card-body">
        <span class="project-description">
          ${project.description}
        </span>
        <div class="deadline-priority">
          <div class="project-deadline">
            <span class="project-deadline-label">Deadline:</span>
            <span class="project-deadline-value">${project.deadline}</span>
          </div>
          <div class="project-priority">
            <span class="project-priority-label">Priority:</span>
            <span class="project-priority-value">&nbsp;${priority}</span>
          </div>
        </div>
      </div>
      <div class="modify-project">
        <button id="add-task-project" class="new-post-button">+<br>Add<br>Task</button>
        <span class="project-delete-icon delete-icon" data-name="${project.name}" data-id="${project.id}"
          data-project="project">✖</span>
      </div>
    </div>
    <div id="project-tasks">
      <div class="project-task-label-line">
      </div>
      <div class="tasks-container tasks-container-project">
        <ul id="task-list"></ul>
      </div>
    </div>
  </div>
  `;

  return projectHTML;
}

/**
 * Displays tasks for a project.
 * @param {Object} project - Project object.
 * @param {Array} tasks - Tasks array.
 * @returns {String} inserts HTML for the tasks.
 */
export function projectDisplayTasks(project, tasks) {
  const taskListHTML = document.querySelectorAll("#task-list");

  taskListHTML.forEach(list => (list.innerHTML = ""));

  let tasksFound = false; // Flag to check if tasks were found.

  // Loop through tasksArray and find tasks that match the project name.
  tasks.forEach(task => {
    if (project.name === task.project) {
      taskListHTML.forEach(list => list.appendChild(taskDOMobject(task)));
      // Set flag to true
      tasksFound = true;
    }
  });

  // If no tasks were found, display message.
  if (!tasksFound) {
    const noTasksHTML = `
      <li class="task-list-item">
        <p class="no-tasks">No tasks found for this project.</p>
      </li>
    `;

    // Add message to each project task list, mobile and and desktop app.
    taskListHTML.forEach(taskList => (taskList.innerHTML = noTasksHTML));
    taskListHTML.forEach(taskList => taskList.classList.add("no-tasks"));

    // Add functionality to the delete icon for the project card.
    deleteIconFunctionality();
  } else {
    // Add functionality to task cards.
    taskCardFunctionality();
  }
}

/**
 * Adds project name to the sidebar.
 * @param {String} name - Project name.
 * @returns {String} inserts HTML for the project name.
 */
export function addProjectNameToSidebar(name) {
  // Unordered list that displays names of user-registered projects.
  const projectsNav = document.querySelector("#projects-nav");

  // Create list item dom object
  const projectListItem = document.createElement("li");
  projectListItem.classList.add("nav-item");
  projectListItem.textContent = name;

  // Add functionality for the projectListItem.
  projectListItem.addEventListener("click", event => {
    const name = event.target.textContent;
    const contentArea = document.querySelector("#content-area");
    const project = projectsArray.find(project => project.name === name);
    contentArea.innerHTML = displayProject(project);

    // Display tasks for that project.
    projectDisplayTasks(project, tasksArray);

    // Add functionality for the "Add Task" button.
    taskPopupFunctionality("project");
  });

  // Add project title to main sidebar.
  projectsNav.append(projectListItem);
}

export function submitProjectButton(projectClass) {
  const submitButton = document.querySelector("#submit-project");
  const contentArea = document.querySelector("#content-area");

  submitButton.addEventListener("click", () => {
    // Create a new project.
    const project = new projectClass();

    // Get the values from the form.
    const id = Date.now();
    const projectName = document.querySelector("#project-name-popup").value;
    const projectDescription = document.querySelector("#project-description")
      .value;
    const projectPriority = document.querySelector("#project-priority").value;
    let projectDeadline = document.querySelector("#project-deadline").value;
    if (projectDeadline === "") projectDeadline = null;

    project.id = id;
    project.name = projectName;
    project.description = projectDescription;
    project.priority = projectPriority;
    project.deadline = document.querySelector("#project-deadline").value;

    // Add the project to the projects array.
    projectsArray.push(project);
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));

    // Display new project in main area.
    // Clear the mobile div, load project card, and associated tasks.
    contentArea.innerHTML = "";
    blurMainToggle(); // Remove blur from the main screen.
    contentArea.insertAdjacentHTML("afterbegin", displayProject(project));
    taskPopupFunctionality("project"); // Add task popup functionality.
    projectDisplayTasks(project, tasksArray);

    closePopup();
  });
}
