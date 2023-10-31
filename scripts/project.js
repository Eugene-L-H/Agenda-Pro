import { tasksArray, projectsArray } from "/scripts/state.js";
import {
  closePopupButton,
  addNewTaskPopup,
  taskPopupFunctionality
} from "./popup-helpers/popup-helpers.js";

export class Project {
  constructor(name, description, deadline, priority, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.tasks = tasks;
  }
}

// HTML to display project in the main content area.
export function displayProject(project) {
  const tasks = project.tasks.map(task => {
    return `<li class="task-list-item">${task}</li>`;
  });
  const tasksHTML = `<ul class="task-list">${tasks.join("")}</ul>`;

  const projectHTML = `
    <div class="project-card">
      <div class="project-card-header">
        <h3 class="project-name">${project.name}</h3>
        <div class="project-priority">
          <span class="project-priority-label">Priority:</span>
          <span class="project-priority-value">${project.priority}</span>
        </div>
      </div>
      <div class="project-card-body">
        <p class="project-description">${project.description}</p>
        <div class="project-deadline">
          <span class="project-deadline-label">Deadline:</span>
          <span class="project-deadline-value">${project.deadline}</span>
        </div>
        <div class="project-tasks">
        <span class="project-tasks-label">Tasks:</span>
        ${tasksHTML}
        <div class="add-task-button">
          <span class="plus-sign">+</span>
          <span class="add-task-text">Add New Task</span>
        </div>
        </div>
      </div>
      <div class="project-card-footer">
      </div>
    </div>
  `;
  return projectHTML;
}

export function addProjectNameToSidebar(name) {
  // Unordered list that displays names of user-registered projects.
  const projectsNav = document.querySelector("#projects-nav");

  // Create list item dom object
  const projectListItem = document.createElement("li");
  projectListItem.classList.add("nav-item");
  projectListItem.textContent = name;

  // Add functionality for the projectListItem.
  projectListItem.addEventListener("click", () => {
    const contentArea = document.querySelector("#content-area");
    const project = projectsArray.find(project => project.name === name);
    contentArea.innerHTML = displayProject(project);

    // Add functionality for the "Add Task" button.
    taskPopupFunctionality();
  });

  // Add project title to main sidebar.
  projectsNav.append(projectListItem);
}
