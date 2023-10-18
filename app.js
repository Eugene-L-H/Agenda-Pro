// DOM objects

// Main display area for the content
const contentArea = document.querySelector("#content-area");
console.log("contentArea: ", contentArea);

// Unordered list that displays the nav menu for tasks
const tasksNavMenu = document.querySelector("#tasks-nav");
console.log("tasksNavMenu: ", tasksNavMenu);

const taskButtons = tasksNavMenu.querySelectorAll(".nav-item");
console.log("taskButtons: ", taskButtons);

// Unordered list that displays the nav menus for user-registered projects
const projectsNav = document.querySelector("#projects-nav");
console.log("projectsNav: ", projectsNav);

taskButtons.forEach(listItem => {
  console.log("listItem: ", listItem);
  listItem.addEventListener("click", () =>
    alert(`clicked ${listItem.textContent}`)
  );
});
