 function GoToProfilePage(event) {
            event.preventDefault()
            const Student_rollno = document.getElementById('Student_rollno').value
            const Student_password = document.getElementById('Student_password').value
            const arr = JSON.parse(localStorage.getItem('Student_list')) || []
            console.log(arr)
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].s_rollno.toLowerCase())
                console.log(Student_rollno.toLowerCase())
                if (Student_rollno.toLowerCase() == arr[i].s_rollno.toLowerCase()) {
                    console.log(arr[i].s_password)
                    if (Student_password == arr[i].s_password) {
                        alert("Login successful")
                        const temp = arr[i]
                        localStorage.setItem('current_user', JSON.stringify(temp))
                        localStorage.setItem('index',i)
                        location.href = 'Profile.html'
                        return;
                    }
                    else {
                        alert("Incorrect password")
                        document.getElementById('Student_rollno').value=""
                        document.getElementById('Student_password').value=""
                        return false;
                    }
                }
            }
            alert("No USN found")
            document.getElementById('Student_rollno').value=""
            document.getElementById('Student_password').value=""
            return false;
        }