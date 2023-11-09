import { tasksArray, updateTasksArray } from "./helpers/state.js";
import { Task } from "./helpers/classes.js";
import { closePopup, closePopupButton } from "./helpers/popup.js";

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
      class="task-checkbox task${task.name}"
    />
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
        <input type="text" class="task-name" placeholder="Task Name" />
        <label for="task-description">Description:</label>
        <textarea
          rows="4"
          class="task-description"
          placeholder="Task Description"
        ></textarea>
        <label for="task-priority">Priority:</label>
        <select class="task-priority">
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <label for="task-due-date">Due Date (Optional):</label>
        <input type="date" class="task-due-date" placeholder="Due Date" />
        <button class="submit-task" class="new-post-button">Add Task</button>
      </div>
    </div>
  `;
  return popupHTML;
}

function deleteTask(taskName) {
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
      // Update the tasks array in the state
      updateTasksArray(tasks);
    } else {
      console.log("Task not found");
    }
  } else {
    console.log("No tasks found in localStorage");
  }
}

// *Used in taskPopupFunctionality()*
function submitTaskButton(taskClass, locationCall) {
  const submitButton = document.querySelector(".submit-task");
  submitButton.addEventListener("click", () => {
    const name = document.querySelector(".task-name").value;
    const description = document.querySelector(".task-description").value;
    const dueDate = document.querySelector(".task-due-date").value;
    const priority = document.querySelector(".task-priority").value;

    // Project name is empty if the popup is from the sidebar.
    let projectName = "";
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

// Functionality for task cards. *Used in the displayTasks() function*.
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
        const taskCard = document.querySelector(`.task-${taskName}`);
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

  // Display what span of tasks that will be displayed.
  const title = document.createElement("h2");
  title.classList.add("list-range-title");
  const titleTextContent =
    dateRange[0].toUpperCase() + dateRange.slice(1, dateRange.length);
  title.textContent = `Tasks for: ${titleTextContent}`;
  contentArea.prepend(title);

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
    if (task.dueDate === today) {
      taskList.appendChild(taskDOMobject(task));
      match = true;
    } else {
      // Debugging.
      // console.log(
      //   "No match for date. task.dueDate:",
      //   task.dueDate,
      //   "vs today: ",
      //   today
      // );
    }
  });

  // Add functionality to task cards.
  if (match) taskCardFunctionality();
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
