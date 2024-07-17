function addTask() {
    const taskInput = document.getElementById("takeinput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => {
            li.classList.toggle("completed");
            filterTasks(currentFilter);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        document.getElementById("task-list").appendChild(li);
        taskInput.value = "";
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("#task-list li");
    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "incompleted":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
}

document.getElementById("addtaskbutton").addEventListener("click", addTask);
document.getElementById("takeinput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

const filterButtons = document.querySelectorAll(".filter-button");
let currentFilter = "all";
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.getAttribute("data-filter");
        filterTasks(currentFilter);
    });
});