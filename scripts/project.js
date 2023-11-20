import { projectsArray } from "./helpers/state.js";
import {
  taskPopupFunctionality,
  taskDOMobject,
  taskCardFunctionality
} from "./tasks.js";
import { closePopup } from "./helpers/popup.js";
import { tasksArray } from "./imports.js";

// Popup form for creating a new project.
export function addNewProjectPopup() {
  const popupHTML = `
    <div class="popup">
      <div class="popup-header">
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
              <h3 id="project-name">
                  <span class="project-name-prefix">Project:&nbsp;</span>
                  ${project.name}
              </h3>
              <span class="delete-icon" data-name="${project.name}" data-id="${project.id}" data-project="project">✖</span>
          </div>
          <div class="project-card-body">
              <p class="project-description">
                  <span>Description:&nbsp;</span>
                  ${project.description}
              </p>
              <div class="project-deadline">
                  <span class="project-deadline-label">Deadline:</span>
                  <span class="project-deadline-value">${project.deadline}</span>
              </div>
              <div class="project-priority">                
                <span class="project-priority-label">Priority:</span>
                <span class="project-priority-value">${priority}</span>
              </div>
          </div>
      </div>

      <div id="project-tasks">
          <div class="project-task-label-line">
            <span class="project-tasks-label">Tasks:</span>
            <div id="add-task-project" class="new-post-button add-task-button">
                <span class="plus-sign">+</span><span>&nbsp;Add Task</span>
            </div>
          </div>
          <div class="tasks-container tasks-container-project">
              <ul id="task-list"></ul>
          </div>
      </div>
  </div>
  `;

  return projectHTML;
}

// In the project card, displays tasks that match that project.
function projectDisplayTasks(projectName, tasks) {
  const taskListHTML = document.querySelector("#task-list");

  let tasksFound = false; // Flag to check if tasks were found.

  // Loop through tasksArray and find tasks that match the project name.
  tasks.forEach(task => {
    if (projectName.name === task.project) {
      taskListHTML.appendChild(taskDOMobject(task));
      // Set flag to true.
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
    taskListHTML.innerHTML = noTasksHTML;
    taskListHTML.classList.add("no-tasks");
  } else {
    // Add functionality to task cards.
    taskCardFunctionality();
  }
}

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

// Add functionality for the "Add Project" button.
export function submitProjectButton(projectClass) {
  const submitButton = document.querySelector("#submit-project");
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

    // Add the project to the project list.
    projectsArray.push(project);
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));

    addProjectNameToSidebar(projectName);

    closePopup();
  });
}
