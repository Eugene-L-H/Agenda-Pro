// Empty projects and tasks arrays to be populated.
export let tasksArray = [];
export let projectsArray = [];

/**
 * Updates the tasks array and saves it to localStorage.
 *
 * This function assigns the provided array to the global tasksArray variable.
 * It then serializes the updated tasksArray and stores it in localStorage under the key "tasksArray".
 * This ensures that the latest state of tasks is persistently saved and can be retrieved across sessions.
 *
 * @param {Array} array - An array of task objects to be stored in localStorage.
 */
export function updateTasksArray(array) {
  tasksArray = array;

  // Push new array to local storage.
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}

/**
 * Updates the projects array and saves it to localStorage.
 *
 * This function assigns the provided array to the global projectsArray variable.
 * It then serializes the updated projectsArray and stores it in localStorage under the key "projectsArray".
 * This ensures that the latest state of projects is persistently saved and can be retrieved across sessions.
 *
 * @param {Array} array - An array of project objects to be stored in localStorage.
 */
export function updateProjectsArray(array) {
  projectsArray = array;

  // Push new array to local storage.
  localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
}

/**
 * Deletes a task or a project from the respective array stored in localStorage.
 *
 * It then retrieves the relevant array from localStorage and performs the deletion if the specified item is found.
 * For project deletions, it also handles the removal of associated tasks.
 *
 * @param {number|string} cardId - The unique identifier for the task or project to be deleted.
 * @param {string} project - A string indicating the type of card to be deleted ('task' or 'project').
 *
 * If the card is a project, the function also iterates through all tasks to find and delete those associated with this project.
 * After deletion, the updated array is saved back to localStorage and the local state is updated.
 *
 * If the item to be deleted is not found, or if the localStorage does not contain the expected array, appropriate messages are logged to the console.
 */
export function deleteTaskOrProject(cardId, project) {
  // Check if the cardId is from a task or a project
  let cardType = "";
  cardType = project === "project" ? "project" : "task";

  // Retrieve the task array from localStorage
  const array = JSON.parse(localStorage.getItem(`${cardType}sArray`));

  // Check if array is not null and is an array
  if (Array.isArray(array)) {
    // Find task with the matching id.
    const cardIndex = array.findIndex(
      cardType => cardType.id === Number(cardId)
    );

    // If project is being deleted, delete tasks associated with the project.
    if (cardType === "project") {
      // Retrieve project name with matching id from projectsArray
      const projectName = array[cardIndex].name;

      tasksArray.forEach(task => {
        if (task.project === projectName) {
          // Delete the task from the tasksArray
          deleteTaskOrProject(task.id, "task");
        }
      });
    }

    // If the project, or Task is found, remove it from the array
    if (cardIndex !== -1) {
      array.splice(cardIndex, 1);

      // Save the updated array back to localStorage
      localStorage.setItem(`${cardType}Array`, JSON.stringify(array));

      // Update the array in the state
      cardType === "project"
        ? updateProjectsArray(array)
        : updateTasksArray(array);
    } else {
      console.log(`${cardType} not found`);
    }
  } else {
    console.log(`No ${cardType}s found in localStorage`);
  }
}
