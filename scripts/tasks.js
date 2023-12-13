import {
  Task,
  tasksArray,
  updateTasksArray,
  deleteIconFunctionality,
  populateExampleArray,
  sortArrayByDate,
  sortArrayByPriority,
  closePopup,
  closePopupButton,
  blurMainToggle,
  isDueInTimeFrame,
  getFormattedDate,
  projectDisplayTasks,
  sanitizeInput
} from "./imports.js";

export function tasksStorageToDisplay() {
  if (localStorage.getItem("tasksArray") !== null) {
    // Sort array by dueDate, and then by priority.
    let array = sortArrayByPriority(
      JSON.parse(localStorage.getItem("tasksArray"))
    );
    array = sortArrayByDate(array);
    updateTasksArray(array);
    displayTasks("today"); // Display tasks on desktop.
  } else {
    updateTasksArray(populateExampleArray("task", 16));
  }
}

// Functionality for task cards. *Used in the displayTasks() function*.
export function taskCardFunctionality() {
  editIconFunctionality();

  // Add functionality to the delete icons.
  deleteIconFunctionality();

  // Add functionality to the task checkboxes.
  checkboxFunctionality();
}

export function taskDOMobject(task) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-list-item");
  listItem.id = task.id;

  // Is task's dueDate in the past?
  const overdue = task.dueDate < getFormattedDate();

  // Convert the priority number to a description of priority.
  let priority = "Low";
  let taskPriority = Number(task.priority);
  switch (taskPriority) {
    case 3:
      priority = "High";
      break;
    case 2:
      priority = "Medium";
      break;
    default:
      break;
  }

  const taskHTML = `
  <div class="task-card-wrapper">
    <div class="task-card${task.checked ? " task-completed" : ""}${
    overdue ? " overdue" : ""
  }">
      <div class="task-card-content">
        <h3 class="task-name">${sanitizeInput(task.name)}</h3>
        <span class="task-description">${sanitizeInput(task.description)}</span>

        <p class="task-details">
          <span class="task-project">Project:</span> <span class="task-project-value">${sanitizeInput(
            task.project
          )}</span><br>
          <span class="task-priority">Priority:</span> <span class="task-priority-value ${priority.toLocaleLowerCase()}-priority ${
    task.checked ? " task-completed" : ""
  }">${priority}</span><br>
          <span class="task-deadline-label">Due-Date:</span>
          <span class="task-deadline-value">${sanitizeInput(
            task.dueDate
          )}</span>
        </p>

      </div>
      <div class="modify-tasks">
        <input type="checkbox" class="task-checkbox" ${
          task.checked ? "checked='true'" : ""
        }" data-id="${task.id}" />
        <span class="edit-icon ${
          task.checked ? " task-completed" : ""
        }" data-id="${task.id}">✎</span>
      </div>
    </div>
    <span class="delete-icon" data-name="${sanitizeInput(
      task.name
    )}" data-id="${task.id}">✖</span>
  `;

  listItem.innerHTML = taskHTML;
  return listItem;
}

// Popup form for creating a new task.
export function addNewTaskPopup() {
  const popupHTML = `
    <div class="popup">
      <div class="popup-header add">
        <span class="popup-title add">ADD TASK</span>
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="task-name">Task Name:</label>
        <input type="text" id="task-name" placeholder="Task Name" maxlength="45" />
        <label for="task-description">Description:</label>
        <textarea
          rows="4"
          id="task-description"
          placeholder="Task Description"
          maxlength="100"
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

/**
 * Display tasks in the task list.
 * @param {String} dateRange - The date range of tasks to display.
 * @returns {void}
 */
export function displayTasks(dateRange, task) {
  const contentArea = document.querySelector("#content-area");

  // Clear the content area.
  contentArea.innerHTML = "";

  // Create a container to hold the tasks.
  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  // Create a list to hold the tasks.
  const taskList = document.createElement("ul");
  taskList.id = "task-list";

  // Display what span of tasks that will be displayed.
  const title = document.createElement("span");
  title.classList.add("list-range-title");

  // Display newly created task, in the app, on it's own.
  if (dateRange === "new") {
    title.textContent = "New Task:";
    taskList.appendChild(taskDOMobject(task));

    tasksContainer.appendChild(title);
    tasksContainer.appendChild(taskList);
    return contentArea.appendChild(tasksContainer);
  }

  const titleTextContent =
    dateRange[0].toUpperCase() + dateRange.slice(1, dateRange.length);

  // Display 'Tasks for Today', or 'Tasks for This Week', or 'Tasks for This Month'.
  title.textContent =
    dateRange === "today"
      ? `Tasks for: Today`
      : `Tasks for: This ${titleTextContent}`;

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

  // Tasks later than the current year are displayed as 'Future Tasks' on the "This Year" tab.

  // If there are tasks that match the date range, display them.
  if (match) {
    tasksContainer.appendChild(taskList); // Add tasks to container.
    contentArea.appendChild(tasksContainer); // Add container to DOM.

    taskCardFunctionality();
  } else {
    // If there are no tasks that match the date range, display a message.
    const noTasksMessage = document.createElement("h2");
    noTasksMessage.classList.add("no-tasks-message");
    if (dateRange === "today") {
      noTasksMessage.textContent = `No tasks for ${dateRange}.`;
    } else {
      noTasksMessage.textContent = `No tasks for this ${dateRange}.`;
    }
    contentArea.appendChild(noTasksMessage);
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

/**
 * Display the add task popup.
 * @param {String} locationCall - The location of the popup.
 */
export function taskPopupFunctionality(locationCall, project) {
  let addTaskButton;
  if (locationCall === "main-menu") {
    addTaskButton = document.querySelector("#mobile-add-task");
  } else {
    addTaskButton = document.querySelector("#add-task-project");
  }

  addTaskButton.addEventListener("click", () => {
    const body = document.querySelector("body");
    const popupHTML = addNewTaskPopup();

    // Add the popup HTML to the DOM.
    body.insertAdjacentHTML("afterbegin", popupHTML);
    // Add functionality for the close popup button, on new popup.
    closePopupButton();

    blurMainToggle(); // Blur the main screen.

    // Add functionality for the "Add Task" button.
    submitTaskButton(Task, locationCall, project);
  });
}

function editIconFunctionality() {
  const body = document.querySelector("body");
  const editIcons = document.querySelectorAll(`.edit-icon`);

  editIcons.forEach(icon => {
    icon.addEventListener("click", event => {
      const taskCard = event.target.closest("li");
      const taskInfo = getTaskCardInfo(taskCard, taskCard.id);

      const popup = editTaskPopupHTML(taskInfo);
      body.insertAdjacentHTML("afterbegin", popup);

      closePopupButton();
      blurMainToggle(); // Blur the main screen.
      updateTaskButton(taskInfo.id, tasksArray);
    });
  });
}

function editTaskPopupHTML(taskInfo) {
  const priority = taskInfo.priority.toLowerCase();

  const popup = `
    <div class="popup">
      <div class="popup-header edit">
        <span class="popup-title edit">EDIT TASK</span>
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="task-name">Task Name:</label>
        <input type="text" id="task-name" value="${sanitizeInput(
          taskInfo.name
        )}" maxlength="45" />
        <label for="task-description">Description:</label>
        <textarea
          rows="4"
          id="task-description"
          maxlength="100"
        >${sanitizeInput(taskInfo.description)}</textarea>
        <label for="task-priority">Priority:</label>
        <select id="task-priority" def>
          <option value="1" ${priority === "low" ? "selected" : ""}>Low</option>
          <option value="2" ${
            priority === "medium" ? "selected" : ""
          }>Medium</option>
          <option value="3" ${
            priority === "high" ? "selected" : ""
          }>High</option>
        </select>
        <label for="task-due-date">Due Date (Optional):</label>
        <input type="date" id="task-due-date" value="${sanitizeInput(
          taskInfo.dueDate
        )}" />
        <button id="update-task" class="new-post-button">Update Task</button>
      </div>
    </div>
    `;

  return popup;
}

function checkTask(taskId) {
  // Retrieve task from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasksArray"));
  tasks.forEach(task => {
    if (task.id === taskId) {
      // Update the task's completed status
      task.checked === false ? (task.checked = true) : (task.checked = false);
    }
  });
  localStorage.setItem("tasksArray", JSON.stringify(tasks));
  updateTasksArray(tasks);
}

// *Used in taskPopupFunctionality()*
function submitTaskButton(taskClass, locationCall, project) {
  const submitButton = document.querySelector("#submit-task");

  submitButton.addEventListener("click", () => {
    // Generate a unique id for the task.
    const id = `id${Date.now()}`;
    const name = sanitizeInput(document.querySelector("#task-name").value);

    const description = sanitizeInput(
      document.querySelector("#task-description").value
    );

    let dueDate = sanitizeInput(document.querySelector("#task-due-date").value);

    // If no due date is entered, set dueDate to 'None'.
    if (dueDate === "") dueDate = "None";

    const priority = document.querySelector("#task-priority").value;

    // Project name is empty if the popup is from the sidebar.
    let projectName = "Unassigned";
    if (locationCall === "project") {
      projectName = project.name;
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
    sortArrayByPriority(tasksArray);
    sortArrayByDate(tasksArray);
    closePopup();

    // Display new task in the task list. Under a project, or on it's own.
    locationCall === "project"
      ? projectDisplayTasks(project, tasksArray)
      : displayTasks("new", task);
  });
}

// Functionality for the checkbox used in taskCardFunctionality
function checkboxFunctionality() {
  const taskCheckboxes = document.querySelectorAll(`.task-checkbox`);
  taskCheckboxes.forEach(taskCheckbox => {
    taskCheckbox.addEventListener("click", event => {
      const taskCard = event.target.closest(".task-card");
      if (taskCard) {
        // Toggle the task's completed status.
        taskCard.classList.toggle("task-completed");

        taskCard.querySelector(".edit-icon").classList.toggle("task-completed");
        taskCard
          .querySelector(".task-priority-value")
          .classList.toggle("task-completed");

        // Retrieve the task id.
        const taskId = event.target.getAttribute("data-id");

        // Change tasks "checked" status in localStorage.
        checkTask(taskId);
      }
    });
  });
}

function updateTaskButton(taskId, tasksArray) {
  const updateTaskButton = document.querySelector("#update-task");

  updateTaskButton.addEventListener("click", () => {
    const editedTaskInfo = getEditedTaskInfo(taskId);

    // Find task in local storage that matches taskInfo.id, change properties to those from taskInfo.
    const taskIndex = tasksArray.findIndex(
      task => task.id === editedTaskInfo.id
    );
    tasksArray[taskIndex].name = editedTaskInfo.name;
    tasksArray[taskIndex].description = editedTaskInfo.description;
    tasksArray[taskIndex].dueDate = editedTaskInfo.dueDate;
    tasksArray[taskIndex].priority = editedTaskInfo.priority;

    updateTasksArray(tasksArray);

    let editedPriority = Number(editedTaskInfo.priority);
    if (editedPriority === 1) {
      editedPriority = "Low";
    } else if (editedPriority === 2) {
      editedPriority = "Medium";
    } else {
      editedPriority = "High";
    }

    // Update taskCard properties to match editedTaskInfo.
    const taskCard = document.querySelector(`#${taskId}`);
    taskCard.querySelector(".task-name").textContent = editedTaskInfo.name;
    taskCard.querySelector(".task-description").textContent =
      editedTaskInfo.description;
    taskCard.querySelector(".task-deadline-value").textContent =
      editedTaskInfo.dueDate;
    const priorityValue = taskCard.querySelector(".task-priority-value");
    priorityValue.textContent = editedPriority;
    priorityValue.classList.remove(...priorityValue.classList);
    priorityValue.classList.add(
      "task-priority-value",
      `${editedPriority.toLowerCase()}-priority`
    );
    // taskCard.querySelector(".task-project").textContent =
    //   editedTaskInfo.project;

    closePopup();
  });
}

function getTaskCardInfo(taskCard, taskId) {
  const name = taskCard.querySelector(".task-name").textContent;
  const description = taskCard.querySelector(".task-description").textContent;
  const dueDate = taskCard.querySelector(".task-deadline-value").textContent;
  const priority = taskCard.querySelector(".task-priority-value").textContent;
  const project = taskCard.querySelector(".task-project").textContent;
  const id = taskId;

  const taskInfo = {
    name,
    description,
    dueDate,
    priority,
    project,
    id
  };

  return taskInfo;
}

function getEditedTaskInfo(taskId) {
  const updatedInfo = document.querySelector(".popup");
  const name = sanitizeInput(updatedInfo.querySelector("#task-name").value);
  const description = sanitizeInput(
    updatedInfo.querySelector("#task-description").value
  );
  const priority = updatedInfo.querySelector("#task-priority").value;
  const dueDate = updatedInfo.querySelector("#task-due-date").value;
  const id = taskId;

  const editedTaskInfo = {
    name,
    description,
    priority,
    dueDate,
    id
  };

  return editedTaskInfo;
}
