 function GotoLoginPage(event) {
        event.preventDefault();
        const Student_name = document.getElementById('Student_name').value
        const Student_rollno = document.getElementById('Student_rollno').value
        const Student_email = document.getElementById('Student_email').value
        const Student_no = document.getElementById('Student_no').value
        const Student_dob = document.getElementById('Student_dob').value
        const file_count = document.getElementById('Student_img')
        const Student_password = document.getElementById('Student_password').value
        const College_name = document.getElementById('College_name').value

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const normalizedphone = Student_no.replace(/[^0-9+]/g, '');
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const date = new Date();
        date.setHours(0, 0, 0, 0)
        const inputdate = new Date(Student_dob)
        inputdate.setHours(0, 0, 0, 0)






        //check for empty fields
        if (Student_name.length <= 0 || Student_email.length <= 0 || Student_dob.length <= 0 || normalizedphone.length <= 0 || Student_rollno.length <= 0 || file_count.files.length === 0 || Student_password.length <= 0) {
            alert("All the Fields must be filled")
            return false;
        }

        //check for whether the college is selected
        if (College_name === "Select a College") {
            alert("Select a college")
            return false;
        }

        //check for valid email
        if (!emailPattern.test(Student_email)) {
            alert("Enter a valid email")
            return false;
        }

        //check for valid phone number
        if (normalizedphone.length < 10) {
            alert("Enter a valid number")
            return false;
        }

        //check for valid password
        if (!regex.test(Student_password)) {
            alert("The password is not valid , should be atleast of 8 characters having at least one lower case letter ,uppercase ,digits and special symbol")
            return false;
        }

        //check if dob is valid 
        if (date.getTime() === inputdate.getTime() || date.getFullYear() - inputdate.getFullYear() < 18) {
            alert("Age should be atleast 18")
            return false;
        }

        // const filename=document.getElementById('Student_img').value
        // const lastDotIndex = filename.lastIndexOf('.');
        // const extension = filename.substring(lastDotIndex + 1).toLowerCase();
        //check for file format
        // if(extension!="jpg" && extension!="jpeg")
        // {
        //     alert("file can be in jpg or jpeg format only")
        //     return false;
        // }

        const fileInput = document.getElementById('Student_img');
        const file = fileInput.files[0]; // Get the actual file object

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

            //  const file = file_count.files[0]
            const reader = new FileReader(); //file reader object
            reader.readAsDataURL(file); //scans the image

            //once the scanning is done this runs
            reader.onloadend = function () {
                const base64Image = reader.result;


                const newStudent = {
                    s_name: Student_name,
                    s_rollno: Student_rollno,
                    s_email: Student_email,
                    s_phone: Student_no,
                    s_dob: Student_dob,
                    c_name: College_name,
                    s_password: Student_password,
                    s_img: base64Image
                };
                const studentList = JSON.parse(localStorage.getItem('Student_list')) || [];
                studentList.push(newStudent);
                localStorage.setItem('Student_list', JSON.stringify(studentList));

                alert("Registration successful!");
                window.location.href = 'Login.html';
            }

        }
