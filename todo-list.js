class ToDo {
  constructor(uniqueID, title, taskList) {
    this.uniqueID = uniqueID;
    this.title = title;
    this.tasks = taskList;
    this.urgent = false;
  }

  saveToStorage(allToDos) {
    var stringifyToDo = JSON.stringify(allToDos);
    localStorage.setItem('tasks', stringifyToDo);
  }

  deleteFromStorage(deleteToDo) {
    localStorage.getItem('tasks');
    var unstringToDo = JSON.parse('tasks');
  }

  updateStorage(toDoList) {
    var stringifyToDo = JSON.stringify(allToDos);
    localStorage.setItem('tasks', stringifyToDo);
  }

  updateTask(toDoList, target) {
    for (var i = 0; i < toDoList.tasks.length; i++) {
      if (`js-${toDoList.tasks[i].uniqueID}` === target.id && !toDoList.tasks[i].complete) {
        toDoList.tasks[i].complete = true;
        this.updateStorage(toDoList);
    } else if (`js-${toDoList.tasks[i].uniqueID}` === target.id && toDoList.tasks[i].complete) {
        toDoList.tasks[i].complete = false;
        this.updateStorage(toDoList);
      }
    }
  }
}
