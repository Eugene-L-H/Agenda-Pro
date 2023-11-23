import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray
} from "./helpers/state.js";

// Dark mode toggle.
import { darkMode } from "./helpers/dark-mode.js";

import { hamburgerFunctionality } from "./mobile-menu.js";

// For populating content area with tasks.
import {
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality
} from "./tasks.js";

import {
  addProjectNameToSidebar,
  addNewProjectPopup,
  submitProjectButton
} from "./project.js";

import { Project } from "./helpers/classes.js";

// Functions for handling the popups.
import { closePopupButton } from "./helpers/popup.js";

import { loadWeather } from "./helpers/weather.js";

// Functions for sorting arrays by due date, and priority.
import { sortArrayByDate, sortArrayByPriority } from "./helpers/sortArrays.js";

export {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray,
  darkMode,
  hamburgerFunctionality,
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality,
  addProjectNameToSidebar,
  addNewProjectPopup,
  submitProjectButton,
  Project,
  closePopupButton,
  loadWeather,
  sortArrayByDate,
  sortArrayByPriority
};
