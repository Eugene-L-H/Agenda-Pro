import { tasksArray, projectsArray } from "/scripts/state.js";

class Project {
  constructor(name, description, deadline, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
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
        <label for="project-deadline">Deadline (Optional):</label>
        <input type="date" id="project-deadline" placeholder="Deadline" />
        <button id="submit-project">Add Project</button>
      </div>
    </div>
  `;

  return popupHTML;
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

// Add functionality for the "Add Project" button.
export function submitProjectButton() {
    // Create a new project.
    const project = new Project('', '', '', []);
  
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
    closePopup();
  });
}
