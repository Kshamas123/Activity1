
function disablebtn() {
    document.getElementById('maincontainer').classList.add('blur');
    document.getElementById('overlay').style.display = "flex";
}

// Close Modal and Remove Blur
function closeForm(event) {
    if (event) event.preventDefault();
    document.getElementById('overlay').style.display = "none";
    document.getElementById('overlay_2').style.display = "none";
    document.getElementById('maincontainer').classList.remove('blur');
    sessionStorage.removeItem('current_edit_task_id')
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
    document.getElementById('task-counter').innerText = task_array.length
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

//function to filter task and display
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

//function that displays all task when window is loaded
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
                <button class="action-btn edit-btn" onclick="editTask(${task.id},this)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="action-btn done-btn" onclick="markcompleteTask(${task.id}, this)">${task.status === 'completed' ? 'Undo' : 'Mark Done'}</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id}, this)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `;

    taskList.appendChild(card);
}


//logic for task to mark complete
function markcompleteTask(taskid, task) {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            for (let i = 0; i < savedTasks.length; i++) {
                if (savedTasks[i].id === taskid) {
                    if (savedTasks[i].status === "pending") {
                        savedTasks[i].status = "completed"
                        task.innerText = "Undo"
                    }
                    else {
                        savedTasks[i].status = "pending"
                        task.innerText = "Mark Done"
                    }
                }
            }
        }
        localStorage.setItem(current_user.s_rollno, JSON.stringify(savedTasks))
    }
}

//logic to delete a task which user says
function deleteTask(taskid, task) {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    const ele = task.closest('.task-card')
    ele.remove()
    const savedtasks = JSON.parse(localStorage.getItem(current_user.s_rollno))
    const newtask = savedtasks.filter(obj => obj.id !== taskid)
    document.getElementById('task-counter').innerText = newtask.length
    localStorage.setItem(current_user.s_rollno, JSON.stringify(newtask))
}


function editTask(taskid, task) {
    console.log(taskid)
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    const savedtask = JSON.parse(localStorage.getItem(current_user.s_rollno))
    document.getElementById('maincontainer').classList.add('blur');
    document.getElementById('overlay_2').style.display = "flex";
    for (let i = 0; i< savedtask.length; i++) {
        if (savedtask[i].id === taskid) {
            document.getElementById('Task_name').value = savedtask[i].taskname
            document.getElementById('Task_Description').value = savedtask[i].taskdescription
            document.getElementById('Dead_line').value = savedtask[i].deadline
            document.getElementById('Priority_2').checked = savedtask[i].istaskimp
            sessionStorage.setItem('current_edit_task_id', savedtask[i].id)
        }
    }
}
function edit_task(event) {
    event.preventDefault();

    const taskname = document.getElementById('Task_name').value;
    const taskdescription = document.getElementById('Task_Description').value;
    const priority_value = document.getElementById('Priority_2').checked;
    const deadline = document.getElementById('Dead_line').value;

     const taskid = Number(sessionStorage.getItem('current_edit_task_id'));
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    const savedtask = JSON.parse(localStorage.getItem(current_user.s_rollno))

    const originalTask = savedtask.find(t => t.id === taskid);


    console.log(taskname)
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
        if (userDate < today && deadline !== originalTask.deadline) {
        alert("You cannot move a deadline to a past date.");
        return;
    }

    }

   

    for (let i = 0; i< savedtask.length; i++) {
        if (savedtask[i].id === taskid) {
            console.log(document.getElementById('Task_name').value)
            savedtask[i].taskname = document.getElementById('Task_name').value
            savedtask[i].taskdescription = document.getElementById('Task_Description').value
            savedtask[i].deadline = document.getElementById('Dead_line').value
            savedtask[i].istaskimp = document.getElementById('Priority_2').checked
        }
    }
    localStorage.setItem(current_user.s_rollno,JSON.stringify(savedtask))
    sessionStorage.removeItem('current_edit_task_id')
    document.getElementById('maincontainer').classList.remove('blur');
    document.getElementById('overlay_2').style.display = "none";
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        if (savedTasks.length > 0) {
            savedTasks.forEach(t => onloaddisplaytask(t));
        }
        document.getElementById('task-counter').innerText = savedTasks.length

}
}

function showremainder(tasks)
{
   // Only show once per session
    if (sessionStorage.getItem('notifShown')) return;

    const today = new Date().setHours(0, 0, 0, 0);
    const urgentTasks = tasks.filter(t => {
        if (t.status === 'completed' || !t.deadline) return false;
        const diff = (new Date(t.deadline) - today) / (1000 * 3600 * 24);
        return diff >= 0 && diff <= 2;
    });

    if (urgentTasks.length > 0) {
        // Create the element dynamically
        const notif = document.createElement('div');
        notif.className = 'wow-notification';
        notif.id = 'wow-notif';
        notif.innerHTML = `
            <button class="notif-close" onclick="closeNotif()"><i class="fa-solid fa-xmark"></i></button>
            <div class="notif-content">
                <div class="notif-icon"><i class="fa-solid fa-bolt"></i></div>
                <div class="notif-details">
                    <h4>Axis Priority Alert</h4>
                    <p>You have <strong>${urgentTasks.length}</strong> tasks due within 48 hours. Let's get to work!</p>
                </div>
            </div>
            <div class="notif-progress"></div>
        `;

        document.body.appendChild(notif);
        notif.style.display = 'block';
        sessionStorage.setItem('notifShown', 'true');

        // Auto-close after 15 seconds
        setTimeout(() => {
            closeNotif();
        }, 15000);
    }
}

function closeNotif() {
    const notif = document.getElementById('wow-notif');
    if (notif) {
        notif.style.animation = "slideInRight 0.5s reverse forwards";
        setTimeout(() => notif.remove(), 500);
    }

}
window.onload = function () {

    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
        const savedTasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
        showremainder(savedTasks)
        if (savedTasks.length > 0) {
            savedTasks.forEach(t => onloaddisplaytask(t));
        }
        document.getElementById('task-counter').innerText = savedTasks.length
    }
};