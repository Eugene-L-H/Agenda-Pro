import { Task } from "./classes.js";

// Add functionality for the close popup button.
export function closePopupButton() {
  const closeButton = document.querySelector(".close-popup");

  closeButton.addEventListener("click", () => {
    const popup = document.querySelector("#popup");
    const main = document.querySelector("main");

    // Remove the popup, back to default view.
    popup.remove();
    // Remove the blur effect from the screen once popup disappears.
    main.classList.remove("blur");
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

function submitTaskButton(taskClass) {
  const submitButton = document.querySelector("#submit-task");
  submitButton.addEventListener("click", () => {
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const dueDate = document.querySelector("#task-due-date").value;
    const priority = document.querySelector("#task-priority").value;
    const project = document.querySelector(".project-name").innerText;
    const task = new taskClass(name, description, dueDate, priority, project);
    console.log(task);
  });
}

export function taskPopupFunctionality() {
  const addTaskButton = document.querySelector(".add-task-button");
  addTaskButton.addEventListener("click", () => {
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const popupHTML = addNewTaskPopup();

    // Add the popup HTML to the DOM.
    body.insertAdjacentHTML("afterbegin", popupHTML);
    main.classList.add("blur");

    // Add functionality for the close popup button, on new popup.
    closePopupButton();

    // Add functionality for the "Add Task" button.
    submitTaskButton(Task);
  });
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
    project.tasks = [];

    // Add the project to the project list.
    projectsArray.push(project);
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));

    addProjectNameToSidebar(projectName);

    closePopup();
  });
}
