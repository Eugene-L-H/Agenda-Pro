export class Task {
  constructor(name, description, dueDate, priority, project) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

export class Project {
  constructor(name, description, deadline, priority, tasks) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.tasks = tasks;
  }
}
