// Popup form for creating a new project.
export function addNewProjectPopup() {
  const popupHTML = `
    <div class="add-project-popup">
      <div class="popup-header">
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="project-name">Project Name:</label>
        <input type="text" id="project-name" placeholder="Project Name" />
        <label for="project-description">Description:</label>
        <textarea
          rows="4" 
          id="project-description"
          placeholder="Project Description"
        ></textarea>
        <label for="project-deadline">Deadline:</label>
        <input type="date" id="project-deadline" placeholder="Deadline" />
      </div>
    </div>
  `;

  return popupHTML;
}

// Add functionality for the close popup button
export function closePopup(popupType) {
  // const closeButton = document.querySelector(".close-popup");
  // if (popupType === "add-task") {
  //   closeButton.addEventListener("click", () => {});
  // }
}

// export const popups = { addNewProjectPopup, closePopup };
