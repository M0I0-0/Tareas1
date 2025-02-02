

    let tasks = await fetchTasks();
    tasks.push({ text: taskText, date });
    await updateTasks(tasks);
    renderTasks();
    input.value = "";
}

async function renderTasks() {
    const tasks = await fetchTasks();
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.text} - ${task.date}`;
        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", renderTasks);
