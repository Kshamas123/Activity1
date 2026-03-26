
function disablebtn() {
    document.getElementById('maincontainer').classList.add('blur');
    document.getElementById('overlay').style.display = "flex";
}

// Close Modal and Remove Blur
function closeForm(event) {
    if (event) event.preventDefault();
    document.getElementById('overlay').style.display = "none";
    document.getElementById('maincontainer').classList.remove('blur');
}

// Save Task to LocalStorage
function Savetask(event) {
    event.preventDefault();

    const taskname = document.getElementById('Taskname').value;
    const taskdescription = document.getElementById('TaskDescription').value;
    const priority_value = document.getElementById('Priority').checked;
    const deadline = document.getElementById('Deadline').value;

    // Validation
    if (!taskname.trim()) {
        alert("Task title is required");
        return;
    }

    if (priority_value && !deadline) {
        alert("Priority tasks require a deadline for better productivity.");
        return;
    }

    // Date Validation
    if (deadline) {
        const userDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (userDate < today) {
            alert("Past days cannot be used as a deadline.");
            return;
        }
    }

    const current_user = JSON.parse(localStorage.getItem('current_user'));
    
    const newTask = {
        id: Date.now(),
        taskname,
        taskdescription,
        istaskimp: priority_value,
        deadline,
        status: 'pending'
    };

    const task_array = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
    task_array.push(newTask);
    localStorage.setItem(current_user.s_rollno, JSON.stringify(task_array));

    displaytask(newTask);
    document.getElementById('Form-element').reset();
    closeForm();
}

// Create and Display the Unique Task Card
function displaytask(task) {
    document.getElementById('Notaskdiv').classList.add('disabled-section');
    const taskList = document.getElementById('taskList');

    const card = document.createElement('div');
    card.className = 'task-card';
    if (task.istaskimp) card.classList.add('priority-task');

    // Inner HTML for clean structure
    card.innerHTML = `
        ${task.istaskimp ? '<span class="priority-badge">PRIORITY</span>' : ''}
        <h2 class="task-title">${task.taskname}</h2>
        ${task.taskdescription ? `<p class="task-desc">${task.taskdescription}</p>` : ''}
        <div class="task-footer">
            ${task.deadline ? `<span class="task-deadline">${task.deadline}</span>` : ''}
            <button class="delete-btn" onclick="deleteTask(${task.id}, this)">Mark Done</button>
        </div>
    `;

    taskList.appendChild(card);
}


window.onload = function() {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            savedTasks.forEach(t => displaytask(t));
        }
    }
};