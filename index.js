document.getElementById('addTaskBtn').addEventListener('click', addTask);

let editingTask = null; // Variable to track the task being edited

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskList = document.getElementById('taskList');

    // Check if the input is empty
    if (!taskInput.value) {
        alert('Please enter a task');
        return;
    }

    if (editingTask) {
        // If editing a task, update its content
        editingTask.querySelector('span').innerHTML = `${taskInput.value} - ${taskDate.value}`;
        editingTask = null; // Reset editingTask
    } else {
        // Create a new list item if not editing
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskInput.value} - ${taskDate.value}</span>
            <div>
                <button class="complete" onclick="markCompleted(this)">Complete</button>
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button class="delete" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    // Clear the input fields
    taskInput.value = '';
    taskDate.value = '';
}

function markCompleted(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.querySelector('span').classList.toggle('completed');
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
    const [task, date] = taskText.split(' - '); // Split to get task and date

    // Fill the input fields with the task details
    document.getElementById('taskInput').value = task.trim(); // Trim whitespace
    document.getElementById('taskDate').value = date.trim();

    // Set editingTask to the current task item
    editingTask = taskItem; // Store the task being edited
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}
E