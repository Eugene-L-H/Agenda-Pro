export function displayTasksByDate() {
  // Get date buttons from sidebar
  const dateButtons = document.querySelectorAll(".date-button");

  dateButtons.forEach(dateButton => {
    dateButton.addEventListener("click", () => {
      // Get the date from the date button
      const dateRange = dateButton.getAttribute("data-date");
      alert(dateRange);
    });
  });
}
