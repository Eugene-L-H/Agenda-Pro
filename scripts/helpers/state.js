// Global variables.

// Empty projects and tasks arrays to be populated.
export let tasksArray = [];
export let projectsArray = [];

export function updateTasksArray(array) {
  tasksArray = array;

  // Push new array to local storage.
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}

export function updateProjectsArray(array) {
  projectsArray = array;

  // Push new array to local storage.
  localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
}
