document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <div>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    });

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    window.editTask = (index) => {
        const newTask = prompt("Edit your task:", tasks[index]);
        if (newTask) {
            tasks[index] = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    renderTasks();
});
