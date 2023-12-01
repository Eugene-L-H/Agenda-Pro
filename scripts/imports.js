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

import { menuFunctionality } from "./mobile-menu.js";

// For populating content area with tasks.
import {
  tasksStorageToDisplay,
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality
} from "./tasks.js";

import {
  populateLocalProjectsArray,
  addProjectNameToSidebar,
  addProjectPopupFunctionality,
  submitProjectButton
} from "./project.js";

import { Project, Task } from "./helpers/classes.js";

// Functions for handling the popups.
import { closePopup, closePopupButton } from "./helpers/popup.js";

import { updateWeather } from "./helpers/weather.js";

// Functions for sorting arrays by due date, and priority.
import { sortArrayByDate, sortArrayByPriority } from "./helpers/sortArrays.js";

import {
  isDueInTimeFrame,
  getFormattedDate,
  isThisYear
} from "./helpers/compare-dates.js";

export {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray,
  deleteIconFunctionality,
  populateExampleArray,
  darkMode,
  menuFunctionality,
  tasksStorageToDisplay,
  displayTasks,
  taskDateButtons,
  taskPopupFunctionality,
  populateLocalProjectsArray,
  addProjectNameToSidebar,
  addProjectPopupFunctionality,
  submitProjectButton,
  Project,
  Task,
  closePopup,
  closePopupButton,
  updateWeather,
  sortArrayByDate,
  sortArrayByPriority,
  isDueInTimeFrame,
  getFormattedDate,
  isThisYear
};
