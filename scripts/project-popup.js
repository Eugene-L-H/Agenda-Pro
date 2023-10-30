import { tasksArray, projectsArray } from "/scripts/state.js";

class Project {
  constructor(name, description, deadline, priority, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.tasks = tasks;
  }
}

// Popup form for creating a new project.
export function addNewProjectPopup() {
  const popupHTML = `
    <div id="add-project-popup">
      <div class="popup-header">
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="project-name">Project Name:</label>
        <input type="text" id="project-name" placeholder="Project Name" />
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
        </div>
      </div>
      <div class="project-card-footer">
        
      </div>
    </div>
  `;
  return projectHTML;
}

// ToDo: make close popup function work for add-task-popup as well.
function closePopup() {
  const popup = document.querySelector("#add-project-popup");
  const main = document.querySelector("main");

  // Remove the popup, back to default view.
  popup.remove();
  // Remove the blur effect from the screen once popup disappears.
  main.classList.remove("blur");
}

// Add functionality for the close popup button.
export function closePopupButton() {
  const closeButton = document.querySelector(".close-popup");

  closeButton.addEventListener("click", () => {
    closePopup();
  });
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
  });

  // Add project title to main sidebar.
  projectsNav.append(projectListItem);
}

// Add functionality for the "Add Project" button.
export function submitProjectButton() {
  const submitButton = document.querySelector("#submit-project");
  submitButton.addEventListener("click", () => {
    // Create a new project.
    const project = new Project();

    // Get the values from the form.
    const projectName = document.querySelector("#project-name").value;
    const projectDescription = document.querySelector("#project-description")
      .value;
    let projectDeadline = document.querySelector("#project-deadline").value;
    if (projectDeadline === "") projectDeadline = null;

    project.name = projectName;
    project.description = projectDescription;
    project.deadline = document.querySelector("#project-deadline").value;
    project.tasks = [];

    // Add the project to the project list.
    projectsArray.push(project);
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));

    addProjectNameToSidebar(projectName);

    closePopup();
  });
}
