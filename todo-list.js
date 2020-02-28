class ToDo {
  constructor(id) {
    this.id = id;
    this.title = '';
    this.urgent = false;
    this.tasks = [];
  }
  saveToStorage() {
    if (this.tasks.length)
    var stringifyToDo = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', newToDo);
  }
  deleteFromStorage(deletedTask) {
    localStorage.getItem('tasks');
    var unstringToDo = JSON.parse('tasks');
  }
  updateStorage() {

  }
  updateTask(newTask) {
    this.tasks.push(newTask);
  }
}
