import { tasksArray } from "./helpers/state.js";

// Task DOM object
function taskDOMobject(task) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-list-item");

  const taskHTML = `
  <div class="task-card" id="task-${task.name}">
    <div class="modify-tasks">
      <span class="edit-icon">✎</span>
      <span class="delete-icon">✖</span>
    </div>
    <div class="task-card-content">
      <h3 class="task-name">${task.name}</h3>
      <h4 class="task-project-name">Project: ${task.project}</h4>
      <p class="task-description">${task.description}</p>
      <div class="task-deadline">
        <span class="task-deadline-label">Deadline:</span>
        <span class="task-deadline-value">${task.dueDate}</span>
      </div>
      <div class="task-priority">
        <span class="task-priority-label">Priority:</span>
        <span class="task-priority-value">${task.priority}</span>
      </div>
    </div>
    <input
      type="checkbox"
      class="task-checkbox"
      id="task${task.name}"
    />
  </div>
  `;

  listItem.innerHTML = taskHTML;
  return listItem;
}

// Functionality for task cards.
function taskCardFunctionality() {
  const editIcon = document.querySelector(`.edit-icon`);
  editIcon.addEventListener("click", () => {
    // TODO
    alert("Edit task functionality coming soon!");
  });

  const deleteIcon = document.querySelector(`.delete-icon`);
  deleteIcon.addEventListener("click", () => {
    // TODO
    alert("Delete task functionality coming soon!");
  });

  const taskCheckbox = document.querySelector(`.task-checkbox`);
  taskCheckbox.addEventListener("click", event => {
    const taskCard = event.target.parentElement;
    taskCard.classList.toggle("task-completed");
  });
}

// Display today's tasks in the main content area.
export function displayTasks(dateRange) {
  const contentArea = document.querySelector("#content-area");
  const taskList = document.querySelector("#task-list");

  // Display what span of tasks are being displayed.
  const title = document.createElement("h2");
  title.classList.add("list-range-title");
  title.textContent = dateRange;
  contentArea.prepend(title);

  let today = new Date();
  // Convert date to ISO format so that it matches stored task deadlines.
  today = today.toISOString().split("T")[0];

  tasksArray.forEach(task => {
    if (task.dueDate === today) {
      taskList.appendChild(taskDOMobject(task));
    } else {
      // Debugging.
      console.log(
        "No match for date. task.dueDate:",
        task.dueDate,
        "vs today: ",
        today
      );
    }
  });

  // Add functionality to task cards.
  taskCardFunctionality();
}
