 window.onload = function () {
        const img = document.getElementById('img-display')
        const current_user = JSON.parse(localStorage.getItem('current_user'))
        img.src = current_user.s_img
        document.getElementById('student_name').innerText = current_user.s_name
        document.getElementById('student_email').innerText = current_user.s_email
        document.getElementById('student_phone').innerText = current_user.s_phone
        document.getElementById('student_dob').innerText = current_user.s_dob
        document.getElementById('student_rollno').innerText = current_user.s_rollno
        document.getElementById('student_college').innerText = current_user.c_name
        document.getElementById('profilesave').classList.toggle('notshow')
        document.getElementById('profilecancel').classList.toggle('notshow')
    }

    function changephoto(event){
        event.preventDefault()
        document.getElementById('change-photo-btn').classList.toggle('notshow')
        document.getElementById('pen-icon').classList.toggle('notshow')
        document.getElementById('change-photo-btn').classList.toggle('edit-photo-btn')
        document.getElementById('Student_Photo').classList.toggle('notshow')
        document.getElementById('edit-actions').classList.toggle('notshow')
        document.getElementById('profilesave').classList.toggle('notshow')
        document.getElementById('profilecancel').classList.toggle('notshow')

    }

    function savebtn2(event){
        event.preventDefault()
        const fileInput = document.getElementById('Student_Photo');
        const file = fileInput.files[0];
        if(fileInput.files.length === 0)
    {
        document.getElementById('change-photo-btn').classList.toggle('notshow')
        document.getElementById('pen-icon').classList.toggle('notshow')
        document.getElementById('change-photo-btn').classList.toggle('edit-photo-btn')
        document.getElementById('Student_Photo').classList.toggle('notshow')
        document.getElementById('edit-actions').classList.toggle('notshow')
        document.getElementById('profilesave').classList.toggle('notshow')
        document.getElementById('profilecancel').classList.toggle('notshow')
        return;
    }
        if (file) {
            const fileName = file.name;
            const fileType = file.type; // e.g., "image/jpeg"

            // Check by MIME type (more reliable than just the extension)
            if (fileType !== "image/jpeg" && fileType !== "image/jpg") {
                alert("Please upload a JPG or JPEG image only.");
                fileInput.value = ""; // Clear the invalid selection
                return false;
            }
    }
     const reader = new FileReader(); //file reader object
            reader.readAsDataURL(file); //scans the image

            //once the scanning is done this runs
            reader.onloadend = function () {
                const base64Image = reader.result;
                const student_list=JSON.parse(localStorage.getItem('Student_list'))
                
        const index = localStorage.getItem('index')
        student_list[index].s_img=base64Image
        const current_user=JSON.parse(localStorage.getItem('current_user'))
        current_user.s_img=base64Image
        localStorage.setItem('Student_list',JSON.stringify(student_list))
        localStorage.setItem('current_user',JSON.stringify(current_user))
            }

        document.getElementById('change-photo-btn').classList.toggle('notshow')
        document.getElementById('pen-icon').classList.toggle('notshow')
        document.getElementById('change-photo-btn').classList.toggle('edit-photo-btn')
        document.getElementById('Student_Photo').classList.toggle('notshow')
        document.getElementById('edit-actions').classList.toggle('notshow')
         document.getElementById('profilesave').classList.toggle('notshow')
        document.getElementById('profilecancel').classList.toggle('notshow')

}
    function cancelEdit()
    {
        event.preventDefault()
        document.getElementById('change-photo-btn').classList.toggle('notshow')
        document.getElementById('pen-icon').classList.toggle('notshow')
        document.getElementById('change-photo-btn').classList.toggle('edit-photo-btn')
        document.getElementById('Student_Photo').classList.toggle('notshow')
        document.getElementById('edit-actions').classList.toggle('notshow')
         document.getElementById('profilesave').classList.toggle('notshow')
        document.getElementById('profilecancel').classList.toggle('notshow')
    }

    function editbtn(event) {
        event.preventDefault()
        const student_name = document.getElementById('student_name').innerText
        document.getElementById('student_name').classList.toggle('notshow')
        document.getElementById('studentname').classList.toggle('notshow')

        const student_email = document.getElementById('student_email').innerText
        document.getElementById('student_email').classList.toggle('notshow')
        document.getElementById('studentemail').classList.toggle('notshow')

        const student_phone = document.getElementById('student_phone').innerText
        document.getElementById('student_phone').classList.toggle('notshow')
        document.getElementById('studentphone').classList.toggle('notshow')

        const student_dob = document.getElementById('student_dob').innerText
        document.getElementById('student_dob').classList.toggle('notshow')
        document.getElementById('studentdob').classList.toggle('notshow')

        const student_rollno = document.getElementById('student_rollno').innerText
        document.getElementById('student_rollno').classList.toggle('notshow')
        document.getElementById('studentrollno').classList.toggle('notshow')

        document.getElementById('studentname').value = document.getElementById('student_name').innerText
        document.getElementById('studentemail').value = document.getElementById('student_email').innerText
        document.getElementById('studentphone').value = document.getElementById('student_phone').innerText
        document.getElementById('studentdob').value = document.getElementById('student_dob').innerText
        document.getElementById('studentrollno').value = document.getElementById('student_rollno').innerText

        const savebtn = document.getElementById('save-btn')
        savebtn.classList.toggle('notshow')
        savebtn.classList.toggle('full-width')
        savebtn.classList.toggle('btn-secondary')

        const editbtn = document.getElementById('edit-btn')
        editbtn.classList.toggle('notshow')
        editbtn.classList.toggle('full-width')
        editbtn.classList.toggle('btn-secondary')
    }
    function savebtn(event) {
        event.preventDefault()
        
        const studentname = document.getElementById('studentname').value
        const studentemail = document.getElementById('studentemail').value
        const studentphone = document.getElementById('studentphone').value
        const studentdob = document.getElementById('studentdob').value
        const studentrollno = document.getElementById('studentrollno').value
        const normalizedphone = studentphone.replace(/[^0-9+]/g, '');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (studentname.length <= 0 || studentemail.length <= 0 || studentdob.length <= 0 || normalizedphone.length <= 0 ) {
            alert("All the Fields must be filled")
            return false;
        }
        if (normalizedphone.length < 10) {
            alert("Enter a valid number")
            return false;
        }
if (!emailPattern.test(studentemail)) {
            alert("Enter a valid email")
            return false;
        }


        document.getElementById('student_name').classList.toggle('notshow')
        document.getElementById('studentname').classList.toggle('notshow')

       
        document.getElementById('student_email').classList.toggle('notshow')
        document.getElementById('studentemail').classList.toggle('notshow')

       
        document.getElementById('student_phone').classList.toggle('notshow')
        document.getElementById('studentphone').classList.toggle('notshow')

        
        document.getElementById('student_dob').classList.toggle('notshow')
        document.getElementById('studentdob').classList.toggle('notshow')

        
        document.getElementById('student_rollno').classList.toggle('notshow')
        document.getElementById('studentrollno').classList.toggle('notshow')

        document.getElementById('student_name').innerText = document.getElementById('studentname').value
        document.getElementById('student_email').innerText = document.getElementById('studentemail').value
        document.getElementById('student_phone').innerText = document.getElementById('studentphone').value
        document.getElementById('student_dob').innerText = document.getElementById('studentdob').value
        document.getElementById('student_rollno').innerText = document.getElementById('studentrollno').value

        const student_list = JSON.parse(localStorage.getItem('Student_list'))
        const index = localStorage.getItem('index')
        student_list[index].s_name = studentname
        student_list[index].s_dob = studentdob
        student_list[index].s_email = studentemail
        student_list[index].s_phone = studentphone
        student_list[index].s_rollno = studentrollno

        localStorage.setItem('Student_list', JSON.stringify(student_list))
        const current_user = JSON.parse(localStorage.getItem('current_user'))
        current_user.s_name = studentname
        current_user.s_dob = studentdob
        current_user.s_email = studentemail
        current_user.s_phone = studentphone
        current_user.s_rollno = studentrollno

        localStorage.setItem('current_user', JSON.stringify(current_user))
        const savebtn = document.getElementById('save-btn')
        savebtn.classList.toggle('notshow')
        savebtn.classList.toggle('full-width')
        savebtn.classList.toggle('btn-secondary')

        const editbtn = document.getElementById('edit-btn')
        editbtn.classList.toggle('notshow')
        editbtn.classList.toggle('full-width')
        editbtn.classList.toggle('btn-secondary')
    }