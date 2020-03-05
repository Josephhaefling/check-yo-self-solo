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

  deleteFromStorage(deletedTask) {
    localStorage.getItem('tasks');
    var unstringToDo = JSON.parse('tasks');
  }

  updateStorage(allToDos) {
    var stringifyToDo = JSON.stringify(allToDos);
    localStorage.setItem('tasks', stringifyToDo);
  }

  updateTask(target) {
      console.log(target);
      var taskList = allToDos.map(x => x.tasks);
      var uniqueIDList = taskList.map(y => y[0].uniqueID);
      // console.log(taskList[0].);
      for (var i = 0; i < uniqueIDList.length; i++){
        if (target.id === `js-${uniqueIDList[i]}`) {
          var indexOfTask = uniqueIDList.indexOf(uniqueIDList[i]);
          taskList[i][indexOfTask].complete = true;
          toggleCompleted(target, taskList[i][indexOfTask]);
      }
    }
  }
}
