let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function login() {
    let username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter username");
        return;
    }

    document.getElementById("user").innerText = username;
    document.querySelector(".login-box").style.display = "none";
    document.getElementById("app").style.display = "block";

    displayTasks();
}

function addTask() {

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if (task === "") {
        alert("Enter task");
        return;
    }

    tasks.push({
        name: task,
        completed: false
    });

    saveTasks();

    input.value = "";

    displayTasks();
}

function displayTasks() {

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.name}</span>

            <div class="actions">

            <button onclick="completeTask(${index})">
            ✔
            </button>

            <button onclick="deleteTask(${index})">
            Delete
            </button>

            </div>
        `;

        list.appendChild(li);

    });

}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

function deleteTask(index) {

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

function searchTask() {

    let value = document
        .getElementById("search")
        .value
        .toLowerCase();

    let items = document.querySelectorAll("#taskList li");

    items.forEach(item => {

        if(item.innerText.toLowerCase().includes(value))
            item.style.display = "flex";
        else
            item.style.display = "none";

    });

}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}