import {
  projectsArray,
  tasksArray,
  updateTasksArray
} from "./helpers/state.js";

// Remove popup window from the DOM.
function closePopup() {
  const popup = document.querySelector("#popup");
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

// Popup form for creating a new project.
export function addNewProjectPopup() {
  const popupHTML = `
    <div id="popup">
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

// Popup form for creating a new task.
export function addNewTaskPopup() {
  const popupHTML = `
    <div id="popup">
      <div class="popup-header">
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="task-name">Task Name:</label>
        <input type="text" id="task-name" placeholder="Task Name" />
        <label for="task-description">Description:</label>
        <textarea
          rows="4"
          id="task-description"
          placeholder="Task Description"
        ></textarea>
        <label for="task-priority">Priority:</label>
        <select id="task-priority">
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <label for="task-due-date">Due Date (Optional):</label>
        <input type="date" id="task-due-date" placeholder="Due Date" />
        <button id="submit-task">Add Task</button>
      </div>
    </div>
  `;
  return popupHTML;
}

function submitTaskButton(taskClass, locationCall) {
  const submitButton = document.querySelector("#submit-task");
  submitButton.addEventListener("click", () => {
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const dueDate = document.querySelector("#task-due-date").value;
    const priority = document.querySelector("#task-priority").value;

    // Project name is empty if the popup is from the sidebar.
    const projectName = "";
    if (locationCall === "project") {
      projectName = document.querySelector(".project-name").innerText;
    }

    // Create new task object from user info.
    const task = new taskClass(
      name,
      description,
      dueDate,
      priority,
      projectName
    );

    // Add task to the tasksArray.
    updateTasksArray([...tasksArray, task]);

    closePopup();
  });
}

function addProjectNameToSidebar(name) {
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
    const projectName = document.querySelector("#project-name").value;
    const projectDescription = document.querySelector("#project-description")
      .value;
    let projectDeadline = document.querySelector("#project-deadline").value;
    if (projectDeadline === "") projectDeadline = null;

    project.name = projectName;
    project.description = projectDescription;
    project.deadline = document.querySelector("#project-deadline").value;

    // Add the project to the project list.
    projectsArray.push(project);
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));

    addProjectNameToSidebar(projectName);

    closePopup();
  });
}
