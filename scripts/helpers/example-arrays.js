export function populateExampleArray(type, numberOfObjects) {
  const exampleArray = [];

  for (let i = 0; i < numberOfObjects; i++) {
    // Populate the array with tasks, or projects, according ot type argument.
    const object = type === "task" ? exampleTask(i) : exampleProject(i);
    console.log("object", object);
    exampleArray.push(object);
  }

  return exampleArray;
}

function exampleTask(iteration) {
  const randomChecked = Math.floor(Math.random() * 4);

  let dateRange = returnDateRange(iteration);

  // let project = Math.floor(Math.random() * 5) + 1;

  const task = {};
  task.id = `id${Date.now() + iteration}`;
  task.checked = randomChecked === 3 ? true : false;
  task.name = generateRandomTask();
  task.description = generateLoremIpsumSentence();
  task.dueDate = randomDueDate(dateRange);
  task.priority = Math.floor(Math.random() * 3) + 1;
  task.project = projectNameGenerator(iteration, "task");

  return task;
}

function exampleProject(iteration) {
  const project = {};
  project.id = `id${Date.now() + iteration}`;
  project.name = projectNameGenerator(iteration, "project");
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

function generateRandomTask() {
  const exampleTasks = [
    "Order groceries online",
    "Schedule virtual fitness class",
    "Update LinkedIn profile",
    "Research online courses for skill development",
    "Plan a weekend hiking trip",
    "Book Airbnb for next vacation",
    "Start a personal blog",
    "Attend a networking event",
    "Prepare a healthy meal plan for the week",
    "Watch a webinar on investment strategies",
    "Clean out email inbox",
    "Organize a virtual game night with friends",
    "Research sustainable living tips",
    "Plan a budget for the month",
    "Write a journal entry",
    "Practice a new language on a learning app",
    "Backup digital photos and files",
    "Explore new music on streaming platforms",
    "Create a vision board",
    "Sign up for a creative writing workshop",
    "Do a DIY home decor project",
    "Plan a coffee catch-up over video call",
    "Try a new recipe",
    "Read a chapter of a self-help book",
    "Do a 10-minute meditation session",
    "Watch a trending documentary",
    "Start a 30-day fitness challenge",
    "Plan outfits for the week",
    "Learn a new song on a musical instrument",
    "Research local volunteer opportunities",
    "Organize a closet",
    "Plan a small balcony garden",
    "Create a playlist for different moods",
    "Look for new podcasts for the daily commute",
    "Update personal budget spreadsheet",
    "Try out a new coffee shop",
    "Plan a day trip to a nearby town",
    "Research meal prep ideas",
    "Work on a puzzle",
    "Look for online side gig opportunities",
    "Write a letter to a friend",
    "Plan a themed movie night",
    "Research the latest fashion trends",
    "Schedule a home spa day",
    "Create a list of goals for the year",
    "Check out a new restaurant in town",
    "Attend a virtual art class",
    "Explore a part of the city you've never been to",
    "Start a gratitude journal",
    "Make avocado toast",
    "Have existential crisis"
  ];

  const getRandomTask = () =>
    exampleTasks[Math.floor(Math.random() * exampleTasks.length)];

  return getRandomTask();
}

function projectNameGenerator(iteration, locationCall) {
  const projectNames = [
    "Wellness Expedition",
    "Lifestyle Navigator",
    "Adventure Blueprint",
    "Work/Life Balance",
    "Personal Growth"
  ];

  if (locationCall === "task") {
    return projectNames[Math.floor(Math.random() * projectNames.length)];
  } else if (locationCall === "project") {
    return projectNames[iteration];
  }
}
