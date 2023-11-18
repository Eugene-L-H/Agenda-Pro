/**
 *
 * @param {array} Accepts either the taskArray, or projectsArray.
 * @returns {array} Returns the array sorted by dueDate.
 */
export function sortArrayByDate(array) {
  // Sorts the array by date.
  let sortedArray = array.sort((a, b) => {
    if (a.dueDate > b.dueDate) {
      return 1;
    } else if (a.dueDate < b.dueDate) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedArray;
}

export function sortArrayByPriority(array) {
  // Sorts the array by priority, High to Low.
  let sortedArray = array.sort((a, b) => {
    if (a.priority > b.priority) {
      return -1;
    } else if (a.priority < b.priority) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedArray;
}
