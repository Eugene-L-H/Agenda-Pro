function mobileMenuHTML() {
  const mobileMenuHTML = `
  <div id="mobile-menu">
    <span id="mobile-dates-label">Dates:</span>
    <ul id="mobile-menu-dates">
    </ul>
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
  console.log("main: ", main);

  hamburgerIcon.addEventListener("click", () => {
    main.insertAdjacentHTML("afterbegin", mobileMenuHTML());
  });
}
