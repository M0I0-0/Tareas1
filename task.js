const GIST_ID = "https://gist.github.com/M0I0-0/4d66b73d880272cd4716a3c1cd3c1542";
const GITHUB_TOKEN = "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";

async function fetchTasks() {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    const data = await response.json();
    return JSON.parse(data.files["tasks.json"].content);
}

async function updateTasks(tasks) {
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",
        headers: {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            files: {
                "tasks.json": {
                    content: JSON.stringify(tasks, null, 2)
                }
            }
        })
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("taskDate").value;
    const taskText = input.value.trim();
    if (!taskText) return;

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
