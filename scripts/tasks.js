import { tasksArray, updateTasksArray } from "./helpers/state.js";
import { Task } from "./helpers/classes.js";
import { closePopup, closePopupButton } from "./helpers/popup.js";
import { isDueInTimeFrame } from "./helpers/compare-dates.js";

export function taskDOMobject(task) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-list-item");

  // Convert the priority number to a description of priority.
  let priority = "Low";
  switch (task.priority) {
    case "3":
      priority = "High";
      break;
    case "2":
      priority = "Medium";
      break;
    default:
      break;
  }

  const taskHTML = `
  <div class="task-card" id="${task.id}">
    <div class="task-card-content ${task.checked ? "task-completed" : ""}">
      <h3 class="task-name">${task.name}</h3>
      <p class="task-description">${task.description}</p>
      <span class="task-project-name">Project: ${task.project}</span>
      <div class="task-priority">
      <span class="task-priority-label">Priority:</span>
      <span class="task-priority-value">${priority}</span>
      </div>
      <div class="task-deadline">
        <span class="task-deadline-label">Deadline:</span>
        <span class="task-deadline-value">${task.dueDate}</span>
      </div>
    </div>
    <div class="modify-tasks">
      <input
        type="checkbox"
        class="task-checkbox"
        ${task.checked ? "checked='true'" : ""}"'}"
      />
      <span class="edit-icon ${
        task.checked ? "task-completed" : ""
      }" data-id="${task.id}" data-name="${task.name}">✎</span>
      <span class="delete-icon" data-id="${task.id}" data-name="${
    task.name
  }">✖</span>
    </div>
  </div>
  `;

  listItem.innerHTML = taskHTML;
  return listItem;
}

// Popup form for creating a new task.
export function addNewTaskPopup() {
  const popupHTML = `
    <div class="popup">
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
        <button id="submit-task" class="new-post-button">Add Task</button>
      </div>
    </div>
  `;
  return popupHTML;
}

// Delete task from localStorage and state using X on the task card.
function deleteTask(taskId) {
  // Retrieve the task array from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasksArray"));

  // Check if tasks array is not null and is an array
  if (Array.isArray(tasks)) {
    // Find task with the matching id.
    const taskIndex = tasks.findIndex(task => task.id === Number(taskId));

    // If the task is found, remove it from the array
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);

      // Save the updated array back to localStorage
      localStorage.setItem("tasksArray", JSON.stringify(tasks));
      // Update the tasks array in the state
      updateTasksArray(tasks);
    } else {
      console.log("Task not found");
    }
  } else {
    console.log("No tasks found in localStorage");
  }
}

function checkTask(taskId) {
  // Retrieve task from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasksArray"));
  tasks.forEach(task => {
    if (task.id === Number(taskId)) {
      // Update the task's completed status
      task.checked === false ? (task.checked = true) : (task.checked = false);
    }
  });
  localStorage.setItem("tasksArray", JSON.stringify(tasks));
  updateTasksArray(tasks);
}

// *Used in taskPopupFunctionality()*
function submitTaskButton(taskClass, locationCall) {
  const submitButton = document.querySelector("#submit-task");
  submitButton.addEventListener("click", () => {
    const id = Date.now(); // Generate a unique id for the task.
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const dueDate = document.querySelector("#task-due-date").value;
    const priority = document.querySelector("#task-priority").value;

    // Project name is empty if the popup is from the sidebar.
    let projectName = "None";
    if (locationCall === "project") {
      projectName = document
        .querySelector("#project-name")
        .getAttribute("data-info");
    }

    // Create new task object from user info.
    const task = new taskClass(
      id,
      name,
      description,
      dueDate,
      priority,
      projectName
    );

    // Add task to the tasksArray.
    updateTasksArray([...tasksArray, task]);

    closePopup();

    // Update window to display new task.
    location.reload();
  });
}

// Functionality for task cards. *Used in the displayTasks() function*.
export function taskCardFunctionality() {
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
      // Retrieve name, and id, of task to be deleted.
      const taskName = event.target.getAttribute("data-name");
      const taskId = event.target.getAttribute("data-id");
      console.log("TaskName, taskId: ", taskName, taskId);

      // Confirm user wants to delete task.
      if (confirm(`Are you sure you want to delete task "${taskName}"?`)) {
        deleteTask(taskId);

        // Remove task from DOM.
        const taskCard = document.getElementById(`${taskId}`);
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
        taskCard
          .querySelector(".task-card-content")
          .classList.toggle("task-completed");

        taskCard.querySelector(".edit-icon").classList.toggle("task-completed");

        // Retrieve the task id.
        const taskId = taskCard.getAttribute("id");

        // Change tasks "checked" status in localStorage.
        checkTask(taskId);
      }
    });
  });
}

// Display today's tasks in the main content area.
export function displayTasks(dateRange) {
  const contentArea = document.querySelector("#content-area");
  // Clear the content area.
  contentArea.innerHTML = "";

  // Create a container to hold the tasks.
  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  // Create a list to hold the tasks.
  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  // Display what span of tasks that will be displayed.
  const title = document.createElement("h2");
  title.classList.add("list-range-title");
  const titleTextContent =
    dateRange[0].toUpperCase() + dateRange.slice(1, dateRange.length);
  title.textContent = `Tasks for: ${titleTextContent}`;
  tasksContainer.prepend(title);

  let today = new Date();
  // Convert date to ISO format so that it matches stored task deadlines.
  today = today
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .replace(/\//g, "-");

  // Flag to see if a task matches the date range.
  let match = false;

  // Loop through tasksArray and display tasks that match date range.
  tasksArray.forEach(task => {
    // Display task in DOM if task's due date is in the date range.
    if (isDueInTimeFrame(task.dueDate, dateRange)) {
      taskList.appendChild(taskDOMobject(task));
      match = true;
    }
  });

  // If there are tasks that match the date range, display them.
  if (match) {
    tasksContainer.appendChild(taskList); // Add tasks to container.
    contentArea.appendChild(tasksContainer); // Add container to DOM.

    // Add functionality to the task cards.
    taskCardFunctionality();
  }
}

// Event listener for the date range buttons.
export function taskDateButtons() {
  // Get date buttons from sidebar
  const dateButtons = document.querySelectorAll(".date-button");

  dateButtons.forEach(dateButton => {
    dateButton.addEventListener("click", () => {
      // Get the date from the date button
      const dateRange = dateButton.getAttribute("data-date");
      displayTasks(dateRange);
    });
  });
}

export function taskPopupFunctionality(locationCall) {
  let addTaskButton;
  if (locationCall === "project") {
    addTaskButton = document.querySelector("#add-task-project");
  } else {
    addTaskButton = document.querySelector("#add-task-sidebar");
  }

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
    submitTaskButton(Task, locationCall);
  });
}
