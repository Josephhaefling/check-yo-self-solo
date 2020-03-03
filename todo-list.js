class ToDo {
  constructor(title, taskList, uniqueId, completed) {
    this.title = title;
    this.tasks = taskList;
    this.uniqueId = uniqueId;
    this.urgent = false;
  }
  saveToStorage(allToDos) {
    var stringifyToDo = JSON.stringify(allToDos);
    localStorage.setItem('tasks', stringifyToDo);
  }

  deleteFromStorage(deletedTask) {
    localStorage.getItem('tasks');
    var unstringToDo = JSON.parse('tasks');
  }
  updateStorage(allToDos) {
    var stringifyToDo = JSON.stringify(allToDos);
    localStorage.setItem('tasks', stringifyToDo);
  }
  updateTask(newTask) {
    // this.tasks.push(newTask);
  }
  createToDoId() {
    var id = new Date().getTime();
    this.id = id;
  };
}
