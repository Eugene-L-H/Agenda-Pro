// Flag to determine if the mobile menu is open or closed.
let menuOpen = false;

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

/**
 * Toggle the mobile menu open/closed.
 */
function mobileMenuToggle() {
  const main = document.querySelector("main");

  if (menuOpen) {
    // Delete Mobile Menu
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenu.remove();
  } else {
    main.insertAdjacentHTML("afterbegin", mobileMenuHTML());
  }

  // Toggle the menu open/closed.
  menuOpen ? (menuOpen = false) : (menuOpen = true);
}

/**
 * Add functionality to the hamburger icon (mobile menu).
 */
export function hamburgerFunctionality() {
  const hamburgerIcon = document.querySelector("#hamburger-icon");

  const taskList = document.querySelector("#mobile-menu-tasks");
  const projectList = document.querySelector("#mobile-menu-projects");

  hamburgerIcon.addEventListener("click", () => {
    mobileMenuToggle();
  });
}
