class ToDo {
  constructor(title, taskList) {
    this.id = '';
    this.title = title;
    this.urgent = false;
    this.tasks = taskList;
  }
  saveToStorage() {
    var stringifyToDo = JSON.stringify(this);
    console.log(stringifyToDo);
    localStorage.setItem('tasks', stringifyToDo);
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
  createToDoId() {
    var id = new Date().getTime();
    this.id = id;
  };
}
