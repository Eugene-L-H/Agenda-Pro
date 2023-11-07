import { tasksArray, updateTasksArray } from "./helpers/state.js";

// Task DOM object
function taskDOMobject(task) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-list-item");

  const taskHTML = `
  <div class="task-card" id="task-${task.name}">
    <div class="modify-tasks">
      <span class="edit-icon" data-info="${task.name}">✎</span>
      <span class="delete-icon" data-info="${task.name}">✖</span>
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

function deleteTask(taskName) {
  // Go into local storage, and delete the task from the array.
  // const tasks = JSON.parse(localStorage.getItem("tasksArray"));

  // // Find index of task in array.
  // const taskIndex = tasks.findIndex(task => task.name === taskName);

  // // Remove task from array.
  // tasks.splice(taskIndex, 1);

  // // Save updated array to local storage.
  // localStorage.setItem("tasksArray", JSON.stringify(tasks));

  // updateTasksArray(tasks);

  //************************** */

  // Retrieve the task array from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasksArray"));

  // Check if tasks array is not null and is an array
  if (Array.isArray(tasks)) {
    // Find the index of the task with the given name
    const taskIndex = tasks.findIndex(task => task.name === taskName);

    // If the task is found, remove it from the array
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);

      // Save the updated array back to localStorage
      localStorage.setItem("tasksArray", JSON.stringify(tasks));
    } else {
      console.log("Task not found");
    }
  } else {
    console.log("No tasks found in localStorage");
  }
}

// Functionality for task cards.
function taskCardFunctionality() {
  const editIcons = document.querySelectorAll(`.edit-icon`);
  editIcons.forEach(icon => {
    icon.addEventListener("click", event => {
      alert("edit functionality currently in development");
    });
  });

  // Add functionality to the task delete icons.
  const deleteIcons = document.querySelectorAll(`.delete-icon`);
  deleteIcons.forEach(icon => {
    icon.addEventListener("click", event => {
      // Retrieve name of task to be deleted.
      const taskName = event.target.getAttribute("data-info");

      // Confirm user wants to delete task.
      if (confirm(`Are you sure you want to delete task "${taskName}"?`)) {
        deleteTask(taskName);

        // Remove task from DOM.
        const taskCard = document.querySelector(`#task-${taskName}`);
        taskCard.remove();
      } else {
        console.log(`User cancelled deletion of task "${taskName}".`);
      }
    });
  });

  // Add functionality to the task checkboxes.
  const taskCheckboxes = document.querySelectorAll(`.task-checkbox`);
  taskCheckboxes.forEach(taskCheckbox => {
    taskCheckbox.addEventListener("click", event => {
      const taskCard = event.target.closest(".task-card");
      if (taskCard) {
        taskCard.classList.toggle("task-completed");
      }
    });
  });
}

// Display today's tasks in the main content area.
export function displayTasks(dateRange) {
  const contentArea = document.querySelector("#content-area");
  const taskList = document.querySelector("#task-list");

  // Display what span of tasks are being displayed.
  const title = document.createElement("h2");
  title.classList.add("list-range-title");
  const titleTextContent =
    dateRange[0].toUpperCase() + dateRange.slice(1, dateRange.length);
  title.textContent = `Tasks for: ${titleTextContent}`;
  contentArea.prepend(title);

  let today = new Date();
  // Convert date to ISO format so that it matches stored task deadlines.
  today = today.toISOString().split("T")[0];

  // Flag to see if a task matches the date range.
  let match = false;
  // Loop through tasksArray and display tasks that match date range.
  tasksArray.forEach(task => {
    if (task.dueDate === today) {
      taskList.appendChild(taskDOMobject(task));
      match = true;
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
  if (match) taskCardFunctionality();
}
