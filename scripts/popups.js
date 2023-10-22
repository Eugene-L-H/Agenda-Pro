class Project {
  constructor(name, description, deadline, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.tasks = tasks;
  }
}

class Task {
  constructor(name, description, dueDate, priority, project) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
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

// Add functionality for the close popup button.
export function closePopup(popupType) {
  const closeButton = document.querySelector(".close-popup");

  if (popupType === "add-task-popup") {
    const popup = document.querySelector("#add-project-popup");

    // Will remove blur from <main> element.
    const main = document.querySelector("main");

    closeButton.addEventListener("click", () => {
      // Remove the popup, back to default view.
      popup.remove();
      // Remove the blur effect from the screen once popup disappears.
      main.classList.remove("blur");
    });
  }
}

export function submitProject(ProjectClass) {
  const submitButton = document.querySelector("#submit-project");

  submitButton.addEventListener("click", () => {
    // Get the values from the form.
    const projectName = document.querySelector("#project-name").value;
    const projectDescription = document.querySelector("#project-description")
      .value;
    let projectDeadline = document.querySelector("#project-deadline").value;

    if (projectDeadline === "") projectDeadline = null;

    // Create a new project.
    const project = new Project(
      projectName,
      projectDescription,
      projectDeadline,
      []
    );

    // ToDo: Add the project to the project list.
    alert("Project added!");
  });
}
