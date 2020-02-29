class Task {
  constructor(taskName) {
    this.uniqueID = '';
    this.complete = false;
    this.taskName = taskName;
  }
  createTaskId() {
    var id = new Date().getTime();
    this.uniqueID = id;
  }
}
