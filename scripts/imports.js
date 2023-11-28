import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray,
  deleteIconFunctionality
} from "./helpers/state.js";

// For populating tasks/projects array with examples.
import { populateExampleArray } from "./helpers/example-arrays.js";

// Dark mode toggle.
import { darkMode } from "./helpers/dark-mode.js";

import { hamburgerFunctionality } from "./mobile-menu.js";

// For populating content area with tasks.
import {
  tasksStorageToDisplay,
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality
} from "./tasks.js";

import {
  projectsStorageToDisplay,
  addProjectNameToSidebar,
  addProjectPopupFunctionality,
  submitProjectButton
} from "./project.js";

import { Project } from "./helpers/classes.js";

// Functions for handling the popups.
import { closePopup, closePopupButton } from "./helpers/popup.js";

import { loadWeather } from "./helpers/weather.js";

// Functions for sorting arrays by due date, and priority.
import { sortArrayByDate, sortArrayByPriority } from "./helpers/sortArrays.js";

export {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray,
  deleteIconFunctionality,
  populateExampleArray,
  darkMode,
  hamburgerFunctionality,
  tasksStorageToDisplay,
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality,
  projectsStorageToDisplay,
  addProjectNameToSidebar,
  addProjectPopupFunctionality,
  submitProjectButton,
  Project,
  closePopup,
  closePopupButton,
  loadWeather,
  sortArrayByDate,
  sortArrayByPriority
};
