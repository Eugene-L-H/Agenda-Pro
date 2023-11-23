function mobileMenuHTML() {
  const mobileMenuHTML = `
  <div id="mobile-menu">
    <span id="mobile-dates-label">Dates:</span>
    <span id="mobile-today">Today</span>
    <span id="mobile-week">This Week</span>
    <span id="mobile-month">This Month</span>
    <span id="mobile-year">This Year</span>
    <span id="mobile-projects-label">Projects:</span>
    <ul id="mobile-menu-projects">
    </ul>
  </div>
  `;

  return mobileMenuHTML;
}

export function hamburgerFunctionality() {
  const hamburgerIcon = document.querySelector("#hamburger-icon");
  const main = document.querySelector("main");

  const taskList = document.querySelector("#mobile-menu-tasks");
  const projectList = document.querySelector("#mobile-menu-projects");

  hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("menu-open");
    main.insertAdjacentHTML("afterbegin", mobileMenuHTML());
  });
}
