// Remove popup window from the DOM.
export function closePopup() {
  const popup = document.querySelector(".popup");
  const main = document.querySelector("main");

  // Remove the popup, back to default view.
  popup.remove();
  // Remove the blur effect from the screen once popup disappears.
  main.classList.remove("blur");
}

// Add functionality for the close popup button.
export function closePopupButton() {
  const closeButton = document.querySelector(".close-popup");

  closeButton.addEventListener("click", () => {
    closePopup();
  });
}

// Blur the main content area.
export function blurMainToggle() {
  const main = document.querySelector("main");
  main.classList.toggle("blur");
}
