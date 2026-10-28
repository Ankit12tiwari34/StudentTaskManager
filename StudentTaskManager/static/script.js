
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

function updateSummary() {
    const tasks = Array.from(taskList.querySelectorAll(".task-item"));

    const completed = tasks.filter(task =>
        task.classList.contains("completed")
    ).length;

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("pendingTasks").textContent =
        tasks.length - completed;
    document.getElementById("completedTasks").textContent = completed;

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskInput.value.trim();
    if (!title) return;

    const formData = new FormData(taskForm);

    fetch(taskForm.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            window.location.reload();
        }
    })
    .catch(() => {
        alert("Task add nahi hua. Please dobara try karein.");
    });
});

updateSummary();
