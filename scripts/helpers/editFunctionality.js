function editPopupHTML(taskInfo) {
  const priority = taskInfo.priority.toLowerCase();
  console.log(priority);

  const popup = `
    <div class="popup">
      <div class="popup-header">
        <span class="close-popup">&times;</span>
      </div>
      <div class="popup-body">
        <label for="task-name">Task Name:</label>
        <input type="text" id="task-name" value="${taskInfo.name}" />
        <label for="task-description">Description:</label>
        <textarea
          rows="4"
          id="task-description"
          value="${taskInfo.description}"
        ></textarea>
        <label for="task-priority">Priority:</label>
        <select id="task-priority" def>
          <option value="1" ${priority === "low" ? "selected" : ""}>Low</option>
          <option value="2" ${
            priority === "medium" ? "selected" : ""
          }>Medium</option>
          <option value="3" ${
            priority === "high" ? "selected" : ""
          }>High</option>
        </select>
        <label for="task-due-date">Due Date (Optional):</label>
        <input type="date" id="task-due-date" value="${taskInfo.dueDate}" />
        <button id="submit-task" class="new-post-button">Update Task</button>
      </div>
    </div>
    `;

  return popup;
}

export function editIconFunctionality() {
  const editIcons = document.querySelectorAll(`.edit-icon`);
  editIcons.forEach(icon => {
    icon.addEventListener("click", event => {
      const taskCard = event.target.closest(".task-card");
      console.log(taskCard);

      const name = taskCard.querySelector(".task-name").textContent;
      const description = taskCard.querySelector(".task-description")
        .textContent;
      const dueDate = taskCard.querySelector(".task-deadline-value")
        .textContent;
      const priority = taskCard.querySelector(".task-priority").textContent;
      const project = taskCard.querySelector(".task-project").textContent;
      const id = event.target.closest("li").id;

      const taskInfo = {
        name,
        description,
        dueDate,
        priority,
        project,
        id
      };

      const popup = editPopupHTML(taskInfo);
      console.log(popup);
    });
  });
}
