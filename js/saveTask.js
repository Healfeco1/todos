$(document).ready(function () {
  $('.save-task').click(function (event) {
    event.preventDefault();
    let addTodo = {
      title: $('#saveTitle').val(),
      description: $('#saveDescription').val(),
      userId: 1
    };
    console.log(JSON.stringify(addTodo));
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      body: JSON.stringify(addTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    
      // Add to DOM
      $('.save-task').data('renderTodo')(addTodo);

    // Reset form
    $('#addTaskForm')[0].reset();

    // Close modal
    $('#addTaskModal').modal('hide');
  });

});



