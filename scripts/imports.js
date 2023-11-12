import {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray
} from "/scripts/helpers/state.js";

// Dark mode toggle.
import { darkMode } from "/scripts/helpers/dark-mode.js";

// For populating content area with tasks.
import { displayTasks, taskPopupFunctionality } from "/scripts/tasks.js";

import {
  addProjectNameToSidebar,
  addNewProjectPopup,
  submitProjectButton
} from "/scripts/project.js";

import { Project } from "/scripts/helpers/classes.js";

// Functions for handling the popups.
import { closePopupButton } from "/scripts/helpers/popup.js";

import { fetchWeather } from "/scripts/helpers/weather.js";

import { displayTasksByDate } from "./helpers/task-date-display.js";

export {
  projectsArray,
  tasksArray,
  updateProjectsArray,
  updateTasksArray,
  darkMode,
  displayTasks,
  taskPopupFunctionality,
  addProjectNameToSidebar,
  addNewProjectPopup,
  submitProjectButton,
  Project,
  closePopupButton,
  fetchWeather,
  displayTasksByDate
};
