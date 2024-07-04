$(document).ready(function() {
  $('.tasks').on('click', '.trash-icon', function(e) {
    e.preventDefault();
    // let id = $(this).parent().parent().attr('id');
    let id = Number($(this).closest('.task').attr('id'));
    console.log(id);
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    $(this).closest('.task').remove();
    let todos = JSON.parse(sessionStorage.getItem('todos'));
    deletTask(id, todos);
  });

  function deletTask(id, tasks) {
    let taskIndex = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskIndex, 1);

    let randomIndex = Math.floor(Math.random() * tasks.length);
    let randomTask = tasks[randomIndex];
    sessionStorage.setItem('todos', JSON.stringify(tasks));
    renderTodo(randomTask);
  }

  // TODO: Render API data
  function renderTodo(todo) {
    let taskBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna';
    let allTasksHTML = '';
    // $('.tasks').empty();
    // console.log(todo);
    let taskElement = `
      <div class="task" id="${todo.id}">
        <h2 class="task-title col-11">${todo.title}</h2>
        <div class="task-content d-flex">
          <p class="task-description col-10 text-justify">${taskBody}</p>
          <div class="div-trash-ico col-2">
            <img class="trash-icon" alt="Trash Icon">
          </div>
        </div>
      </div>
    `;
    allTasksHTML += taskElement;
    $('.tasks').append(allTasksHTML);
  }
});



