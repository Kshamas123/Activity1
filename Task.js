function disablebtn() {
    
    document.getElementById('maincontainer').classList.add('blur');
    document.getElementById('overlay').style.display = "flex";
}

function closeForm(event) {
    if (event) event.preventDefault();
    
    document.getElementById('overlay').style.display = "none";
    document.getElementById('maincontainer').classList.remove('blur');
}