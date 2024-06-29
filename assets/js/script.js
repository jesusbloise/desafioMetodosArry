let tareas = [];
let totalTareas = 0;
let tareasCompletadas = 0;

function agregarTarea() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName) {
        const taskId = tareas.length + 1;
        tareas.push({ id: taskId, name: taskName, completed: false });
        totalTareas++;
        renderizarTareas();
        actualizarContadores();
        taskInput.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
}

function cambiarEstadoTarea(taskId) {
    const tarea = tareas.find(t => t.id === taskId);
    if (tarea) {
        tarea.completed = !tarea.completed;
        tareasCompletadas += tarea.completed ? 1 : -1;
        actualizarContadores();
    }
}

function eliminarTarea(taskId) {
    const tarea = tareas.find(t => t.id === taskId);
    if (tarea && tarea.completed) {
        tareasCompletadas--;
    }
    tareas = tareas.filter(t => t.id !== taskId);
    totalTareas--;
    renderizarTareas();
    actualizarContadores();
}

function actualizarContadores() {
    document.getElementById('totalTareas').innerText = totalTareas;
    document.getElementById('tareasCompletadas').innerText = tareasCompletadas;
}

function renderizarTareas() {
    const listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.className = 'task';

        const tareaId = document.createElement('span');
        tareaId.innerText = tarea.id;

        const tareaNombre = document.createElement('span');
        tareaNombre.innerText = tarea.name;

        const tareaCheckbox = document.createElement('input');
        tareaCheckbox.type = 'checkbox';
        tareaCheckbox.checked = tarea.completed;
        tareaCheckbox.addEventListener('change', () => cambiarEstadoTarea(tarea.id));

        const eliminarBoton = document.createElement('button');
        eliminarBoton.innerText = 'X';
        eliminarBoton.addEventListener('click', () => eliminarTarea(tarea.id));

        tareaElemento.appendChild(tareaId);
        tareaElemento.appendChild(tareaNombre);
        tareaElemento.appendChild(eliminarBoton);
        tareaElemento.appendChild(tareaCheckbox);

        listaTareas.appendChild(tareaElemento);
    });
}
