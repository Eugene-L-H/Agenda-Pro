export function populateExampleArray(type, numberOfObjects) {
  const exampleArray = [];

  for (let i = 0; i < numberOfObjects; i++) {
    const object = type === "task" ? exampleTask(i) : exampleProject(i);

    console.log(object);
    exampleArray.push(object);
  }

  return exampleArray;
}

function exampleTask(iteration) {
  const randomChecked = Math.floor(Math.random() * 4);

  let dateRange = returnDateRange(iteration);

  let project = Math.floor(Math.random() * 5) + 1;

  const task = {};
  task.id = Date.now() + iteration;
  task.checked = randomChecked === 3 ? true : false;
  task.name = `Task ${iteration + 1}`;
  task.description = generateLoremIpsumSentence();
  task.dueDate = randomDueDate(dateRange);
  task.priority = Math.floor(Math.random() * 3) + 1;
  task.project = `Project ${project}`;

  console.log(task.priority);
  return task;
}

function exampleProject(iteration) {
  const project = {};
  project.id = Date.now() + iteration;
  project.name = `Project ${iteration + 1}`;
  project.description = generateLoremIpsumSentence();
  project.priority = Math.floor(Math.random() * 3) + 1;
  project.deadline = "None";

  return project;
}

// Helper functions ---------------------------------------------- //

function returnDateRange(iteration) {
  let dateRange = "";

  // Assign date range to task, based on iteration.
  if (iteration < 3) {
    dateRange = "today";
  } else if (iteration < 8) {
    dateRange = "week";
  } else if (iteration < 12) {
    dateRange = "month";
  } else if (iteration < 16) {
    dateRange = "year";
  }

  return dateRange;
}

function generateSpecificDate(daysFromToday) {
  const date = new Date(); // Today's date
  date.setDate(date.getDate() + daysFromToday); // Add 'daysFromToday' to the current date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function randomDueDate(dateRange) {
  let days = 0;

  switch (dateRange) {
    case "today":
      days = 0;
      break;
    case "week":
      days = 7;
      break;
    case "month":
      days = 30;
      break;
    case "year":
      days = 365;
      break;
    default:
      days = 0;
      break;
  }

  const random = Math.floor(Math.random() * days);

  return generateSpecificDate(random);
}

// Lorem sentences for task descriptions
function generateLoremIpsumSentence() {
  const loremIpsumSentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui of.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    "Nullam varius, turpis et commodo pharetra, est eros bibendum elit.",
    "Integer in mauris eu nibh euismod gravida.",
    "Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor.",
    "Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis.",
    "Maecenas fermentum consequat mi. Donec fermentum.",
    "Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec.",
    "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing.",
    "Cras mollis scelerisque nunc. Nullam arcu."
  ];

  const randomIndex = Math.floor(Math.random() * loremIpsumSentences.length);
  return loremIpsumSentences[randomIndex];
}
