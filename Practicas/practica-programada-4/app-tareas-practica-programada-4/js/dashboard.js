document.addEventListener('DOMContentLoaded', function () {
    const tasks = [
        { id: 1, title: "Completar práctica 4", description: "Avanzar el estudio de caso", dueDate: "2025-04-10" },
        { id: 2, title: "Revisar entregables", description: "Verificar archivos para entrega", dueDate: "2025-04-11" },
        { id: 3, title: "Estudiar para examen", description: "Repasar temas de estructuras", dueDate: "2025-04-12" }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
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
                        <ul class="list-group mb-2" id="lista-comentarios-${task.id}"></ul>
                        <input type="text" class="form-control mb-2" id="input-comentario-${task.id}" placeholder="Escribe un comentario...">
                        <button class="btn btn-primary btn-sm agregar-comentario" data-id="${task.id}">Agregar Comentario</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);

            // Cargar comentarios desde la BD
            cargarComentarios(task.id);
        });

        document.querySelectorAll('.comentario-task').forEach(btn => {
            btn.addEventListener('click', function () {
                const taskId = this.dataset.id;
                const contenedor = document.getElementById(`comentarios-${taskId}`);
                contenedor.classList.toggle('d-none');
            });
        });

        document.querySelectorAll('.agregar-comentario').forEach(btn => {
            btn.addEventListener('click', agregarComentario);
        });
    }

    function cargarComentarios(taskId) {
        fetch(`backend/api.php?accion=obtener&tarea_id=${taskId}`)
            .then(response => response.json())
            .then(comentarios => {
                const lista = document.getElementById(`lista-comentarios-${taskId}`);
                lista.innerHTML = '';
                comentarios.forEach(com => {
                    const item = document.createElement('li');
                    item.className = 'list-group-item d-flex justify-content-between align-items-center';
                    item.innerHTML = `
                        ${com.texto}
                        <button class="btn btn-danger btn-sm eliminar-comentario" data-id="${com.id}" data-tarea="${taskId}">Eliminar</button>
                    `;
                    lista.appendChild(item);
                });

                document.querySelectorAll(`#lista-comentarios-${taskId} .eliminar-comentario`).forEach(btn => {
                    btn.addEventListener('click', eliminarComentario);
                });
            });
    }

    function agregarComentario(e) {
        const taskId = e.target.dataset.id;
        const input = document.getElementById(`input-comentario-${taskId}`);
        const texto = input.value.trim();

        if (texto !== "") {
            fetch("backend/api.php?accion=agregar", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `tarea_id=${taskId}&texto=${encodeURIComponent(texto)}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        input.value = '';
                        cargarComentarios(taskId);
                    }
                });
        }
    }

    function eliminarComentario(e) {
        const comentarioId = e.target.dataset.id;
        const taskId = e.target.dataset.tarea;

        fetch("backend/api.php?accion=eliminar", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${comentarioId}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    cargarComentarios(taskId);
                }
            });
    }

    loadTasks();
});