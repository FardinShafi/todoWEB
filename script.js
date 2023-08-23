
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("addTaskForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        addTask(formData);
    });
});

function addTask(formData) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                loadTasks();
            } else {
                console.error("Error adding task: " + xhr.statusText);
            }
        }
    };
    xhr.send(formData);
}

function loadTasks() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_tasks.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var tasks = JSON.parse(xhr.responseText);
                displayTasks(tasks);
            } else {
                console.error("Error fetching tasks: " + xhr.statusText);
            }
        }
    };
    xhr.send();
}

function displayTasks(tasks) {
    var taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    tasks.forEach(function (task) {
        var card = document.createElement("div");
        card.className = "card w-75 m-3";

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        var title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = task.title;

        var date = document.createElement("h6");
        date.className = "card-subtitle mb-2 text-body-secondary";
        date.textContent = task.date;

        var description = document.createElement("p");
        description.className = "card-text";
        description.textContent = task.description;

        var removeButton = document.createElement("a");
        removeButton.className = "btn btn-danger";
        removeButton.href = "#";
        removeButton.textContent = "remove";

        cardBody.appendChild(title);
        cardBody.appendChild(date);
        cardBody.appendChild(description);
        cardBody.appendChild(removeButton);

        card.appendChild(cardBody);
        taskContainer.appendChild(card);
    });
}