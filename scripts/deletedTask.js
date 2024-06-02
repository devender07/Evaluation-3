window.onload = function() {
    displayDeletedTasks();
}

function displayDeletedTasks() {
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
    const deletedTaskTableBody = document.getElementById('deletedTaskTableBody');
    deletedTaskTableBody.innerHTML = '';

    deletedTasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = task.title;
        row.appendChild(titleCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        priorityCell.className = task.priority;
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status;
        row.appendChild(statusCell);

        const restoreCell = document.createElement('td');
        const restoreButton = document.createElement('button');
        restoreButton.textContent = 'Restore';
        restoreButton.className = 'restore-button';
        restoreButton.onclick = () => restoreTask(index);
        restoreCell.appendChild(restoreButton);
        row.appendChild(restoreCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteTask(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        deletedTaskTableBody.appendChild(row);
    });
}

function restoreTask(index) {
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(deletedTasks[index]);
    deletedTasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    displayDeletedTasks();
}

function deleteTask(index) {
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
    deletedTasks.splice(index, 1);

    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    displayDeletedTasks();
}

function filterTasks() {
    const filterPriority = document.getElementById('filterPriority').value;
    const filterStatus = document.getElementById('filterStatus').value;

    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

    const filteredTasks = deletedTasks.filter(task => {
        return (filterPriority === '' || task.priority === filterPriority) &&
               (filterStatus === '' || task.status === filterStatus);
    });

    const deletedTaskTableBody = document.getElementById('deletedTaskTableBody');
    deletedTaskTableBody.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = task.title;
        row.appendChild(titleCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        priorityCell.className = task.priority;
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status;
        row.appendChild(statusCell);

        const restoreCell = document.createElement('td');
        const restoreButton = document.createElement('button');
        restoreButton.textContent = 'Restore';
        restoreButton.className = 'restore-button';
        restoreButton.onclick = () => restoreTask(index);
        restoreCell.appendChild(restoreButton);
        row.appendChild(restoreCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteTask(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        deletedTaskTableBody.appendChild(row);
    });
}