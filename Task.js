
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

    //Date Validation
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

function displaytask(task) {
    document.getElementById('Notaskdiv').classList.add('disabled-section');


    const card = document.createElement('div');
    card.className = 'task-card';
    if (task.istaskimp) card.classList.add('priority-task');

    card.innerHTML = `
        ${task.istaskimp ? '<span class="priority-badge">PRIORITY</span>' : ''}
        <h2 class="task-title">${task.taskname}</h2>
        ${task.taskdescription ? `<p class="task-desc">${task.taskdescription}</p>` : ''}
        <div class="task-footer">
            <div class="footer-left">
                ${task.deadline ? `<span class="task-deadline">${task.deadline}</span>` : ''}
            </div>
            <div class="footer-actions">
                <button class="action-btn edit-btn" onclick="editTask(${task.id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="action-btn done-btn" onclick="markcompleteTask(${task.id}, this)">
                    Mark Done
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id}, this)">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `;

    taskList.appendChild(card);
}
function alltaskdisplay() {
    const ele = document.getElementById('view-all')
    ele.classList.add('active')
    document.getElementById('view-active').classList.remove('active')
    document.getElementById('view-completed').classList.remove('active')
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            savedTasks.forEach(t => onloaddisplaytask(t));
        }
        document.getElementById('task-counter').innerText = savedTasks.length
    }

}
function filterTasks(taskstatus) {
    let count = 0;
    if (taskstatus === "pending") {
        const ele = document.getElementById('view-active')
        ele.classList.add('active')
        document.getElementById('view-all').classList.remove('active')
        document.getElementById('view-completed').classList.remove('active')
    }
    if (taskstatus === "completed") {
        const ele = document.getElementById('view-completed')
        ele.classList.add('active')
        document.getElementById('view-active').classList.remove('active')
        document.getElementById('view-all').classList.remove('active')
    }
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            for (let i = 0; i < savedTasks.length; i++) {
                if (savedTasks[i].status === taskstatus) {
                    onloaddisplaytask(savedTasks[i])
                    count++;
                }
            }
            if (count == 0) {
                document.getElementById('Notaskdiv').classList.remove('disabled-section');
            }
            else {
                document.getElementById('task-counter').innerText = count
            }
        }
        else {
            document.getElementById('Notaskdiv').classList.remove('disabled-section');
        }
    }
}

function onloaddisplaytask(task) {
    document.getElementById('Notaskdiv').classList.add('disabled-section');
    const taskList = document.getElementById('taskList');

    const card = document.createElement('div');
    card.className = 'task-card';

    // --- OVERDUE LOGIC ---
    if (task.deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
        const taskDeadline = new Date(task.deadline);

        // If deadline is before today and status isn't 'completed'
        if (taskDeadline < today && task.status !== 'completed') {
            card.classList.add('overdue-task');
        }
    }

    if (task.istaskimp) card.classList.add('priority-task');

    card.innerHTML = `
        <div class="card-header">
            ${task.istaskimp ? '<span class="priority-badge">PRIORITY</span>' : ''}
            ${card.classList.contains('overdue-task') ? '<span class="overdue-badge">OVERDUE</span>' : ''}
        </div>
        <h2 class="task-title">${task.taskname}</h2>
        ${task.taskdescription ? `<p class="task-desc">${task.taskdescription}</p>` : ''}
        <div class="task-footer">
            <div class="footer-left">
                ${task.deadline ? `<span class="task-deadline">${task.deadline}</span>` : ''}
            </div>
            <div class="footer-actions">
                <button class="action-btn edit-btn" onclick="editTask(${task.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="action-btn done-btn" onclick="markcompleteTask(${task.id}, this)">${task.status === 'completed' ? 'Undo' : 'Mark Done'}</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id}, this)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `;

    taskList.appendChild(card);
}

function markcompleteTask(taskid, task) {

    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            for (let i = 0; i < savedTasks.length; i++) {
                if (savedTasks[i].id === taskid) {
                    if(savedTasks[i].status==="pending")
                      {
                        savedTasks[i].status="completed"
                        task.innerText="Undo"
                      }
                    else
                    {
                        savedTasks[i].status="pending"
                        task.innerText="Mark Done"
                    }
                }
            }
        }
        localStorage.setItem(current_user.s_rollno,JSON.stringify(savedTasks))
    }
}
window.onload = function () {

    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            savedTasks.forEach(t => onloaddisplaytask(t));
        }
        document.getElementById('task-counter').innerText = savedTasks.length
    }
};