window.onload = function () {
    displayTasks();
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;

    if (title === '' || priority === '') {
        alert('Task cannot be empty!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, priority, status: 'pending' });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskPriority').value = '';
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = task.title;
        row.appendChild(titleCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        priorityCell.className = task.priority;
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        const statusButton = document.createElement('button');
        statusButton.textContent = task.status;
        statusButton.className = `status-button ${task.status}`;
        statusButton.onclick = () => toggleStatus(index);
        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = () => removeTask(index);
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        taskTableBody.appendChild(row);
    });
}

function toggleStatus(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    if (task.status === 'pending') {
        task.status = 'in-progress';
    } else if (task.status === 'in-progress') {
        task.status = 'complete';
    } else if (task.status === 'complete') {
        task.status = 'pending';
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

    deletedTasks.push(tasks[index]);
    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    displayTasks();
}