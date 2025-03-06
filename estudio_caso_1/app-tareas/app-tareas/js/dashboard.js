document.addEventListener('DOMContentLoaded', function(){

    const tasks = [{
        id: 1,
        title: "Complete project report",
        description: "Prepare and submit the project report",
        dueDate: "2024-12-01",
        comentarios: [] 
    },
    {
        id: 2,
        title: "Team Meeting",
        description: "Get ready for the season",
        dueDate: "2024-12-01",
        comentarios: []
    },
    {
        id: 3,
        title: "Code Review",
        description: "Check partners code",
        dueDate: "2024-12-01",
        comentarios: []
    }];

    function loadTasks(){
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function(task){
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    <button class="btn btn-info btn-sm comentario-task" data-id="${task.id}">Comentarios</button>
                </div>
                <div class="comentarios-container p-2 bg-light d-none" id="comentarios-${task.id}">
                    <ul class="list-group mb-2" id="lista-comentarios-${task.id}">
                    </ul>
                    <input type="text" class="form-control mb-2" id="input-comentario-${task.id}" placeholder="Escribe un comentario...">
                    <button class="btn btn-primary btn-sm agregar-comentario" data-id="${task.id}">Agregar Comentario</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);

            actualizarListaComentarios(task.id);
        });

        document.querySelectorAll('.edit-task').forEach(function(button){
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function(button){
            button.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.comentario-task').forEach(function(button){
            button.addEventListener('click', handleComentarios);
        });

        document.querySelectorAll('.agregar-comentario').forEach(function(button){
            button.addEventListener('click', agregarComentario);
        });
    }

    function handleEditTask(event){
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            // Cargar datos en cada campo del formulario
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('due-date').value = task.dueDate;

            // Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        }
    }

    function handleDeleteTask(event){
        const taskId = parseInt(event.target.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        // Eliminar la tarea del array y recargarlas
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            loadTasks();
        }
    }

    function handleComentarios(event) {
        const taskId = event.target.dataset.id;
        const contenedorComentarios = document.getElementById(`comentarios-${taskId}`);
        contenedorComentarios.classList.toggle('d-none');
    }

    function agregarComentario(event) {
        const taskId = parseInt(event.target.dataset.id);
        const inputComentario = document.getElementById(`input-comentario-${taskId}`);
        const textoComentario = inputComentario.value.trim();

        if (textoComentario) {
            const tarea = tasks.find(t => t.id === taskId);
            tarea.comentarios.push(textoComentario);
            inputComentario.value = '';
            actualizarListaComentarios(taskId);
        }
    }

    function actualizarListaComentarios(taskId) {
        const tarea = tasks.find(t => t.id === taskId);
        const lista = document.getElementById(`lista-comentarios-${taskId}`);

        lista.innerHTML = tarea.comentarios.map((comentario, index) => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${comentario}
                <button class="btn btn-danger btn-sm eliminar-comentario" data-task-id="${taskId}" data-comment-index="${index}">Eliminar</button>
            </li>
        `).join('');

        document.querySelectorAll(`#lista-comentarios-${taskId} .eliminar-comentario`).forEach(button => {
            button.addEventListener('click', eliminarComentario);
        });
    }

    function eliminarComentario(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commentIndex = parseInt(event.target.dataset.commentIndex);

        const tarea = tasks.find(t => t.id === taskId);
        if (tarea) {
            tarea.comentarios.splice(commentIndex, 1);
            actualizarListaComentarios(taskId);
        }
    }

    document.getElementById('task-form').addEventListener('submit', function(e){
        e.preventDefault();

        let currentTaskId = document.getElementById('task-id').value;
        const taskTitle = document.getElementById('task-title').value;
        const taskDesc = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if (currentTaskId) {
            // Editar tarea existente
            const taskIndex = tasks.findIndex(t => t.id === parseInt(currentTaskId));
            tasks[taskIndex] = {
                id: parseInt(currentTaskId),
                title: taskTitle,
                description: taskDesc,
                dueDate: dueDate
            };
        } else {
            // Agregar la tarea al array
            const newTask = {
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                title: taskTitle,
                description: taskDesc,
                dueDate: dueDate
            };
            tasks.push(newTask);
        }

        document.getElementById('task-id').value = '';
        currentTaskId = null;
        e.target.reset();

        // Recargar las tareas
        loadTasks();

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
    });



    loadTasks();

});