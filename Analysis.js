window.onload = function() {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (!current_user) {
        window.location.href = "Login.html";
        return;
    }

    const tasks = JSON.parse(localStorage.getItem(current_user.s_rollno)) || [];
    renderAnalytics(tasks);
};

function renderAnalytics(tasks) {
    const today = new Date().setHours(0,0,0,0);
    
    // Data Calculations
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < today).length;
    const priority = tasks.filter(t => t.istaskimp).length;
    const normal = total - priority;

    // Update Text
    document.getElementById('total-tasks').innerText = total;
    document.getElementById('completed-tasks').innerText = completed;
    document.getElementById('overdue-tasks').innerText = overdue;


    new Chart(document.getElementById('distributionChart'), {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending', 'Overdue'],
            datasets: [{
                data: [completed, pending, overdue],
                backgroundColor: ['#00d26a', '#276ef1', '#ff4d4d'],
                hoverOffset: 20
            }]
        },
        options: { cutout: '70%', plugins: { legend: { position: 'bottom' } } }
    });

    // Chart 2: Priority (Bar)
    new Chart(document.getElementById('priorityChart'), {
        type: 'bar',
        data: {
            labels: ['Priority', 'Normal'],
            datasets: [{
                label: 'Count',
                data: [priority, normal],
                backgroundColor: ['#276ef1', '#d1d1d1'],
                borderRadius: 8
            }]
        },
        options: { 
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
            plugins: { legend: { display: false } }
        }
    });
}

