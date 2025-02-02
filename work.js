document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    let taskDate = document.getElementById("taskDate").value;

    if (taskText === "" || taskDate === "") {
        alert("Por favor, ingresa una tarea y una fecha.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, date: taskDate });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";

    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Ordenar tareas por fecha
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task";

        let taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = `${task.text} (Entrega: ${task.date})`;

        let buttonsDiv = document.createElement("div");
        buttonsDiv.className = "task-buttons";

        let editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = "✏️";
        editButton.onclick = function () {
            editTask(index);
        };

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "❌";
        deleteButton.onclick = function () {
            removeTask(index);
        };

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        li.appendChild(taskText);
        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    });
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newText = prompt("Editar tarea:", tasks[index].text);
    let newDate = prompt("Editar fecha de entrega (YYYY-MM-DD):", tasks[index].date);

    if (newText && newDate) {
        tasks[index].text = newText;
        tasks[index].date = newDate;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}
