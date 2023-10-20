export class Project {
  constructor(name, description, deadline, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.tasks = tasks;
  }
}

export class Task {
  constructor(name, description, dueDate, priority, project) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}
