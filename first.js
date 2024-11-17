document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const studentTable = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Load students from local storage
    loadStudents();

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const studentName = document.getElementById("studentName").value.trim();
        const studentID = document.getElementById("studentID").value.trim();
        const emailID = document.getElementById("emailID").value.trim();
        const contactNo = document.getElementById("contactNo").value.trim();

        // Validate input fields
        if (!validateInputs(studentName, studentID, emailID, contactNo)) {
            alert("Please provide valid inputs.");
            return;
        }

        // Create a new student object
        const student = { studentName, studentID, emailID, contactNo };

        // Add student to the list and local storage
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));

        // Add student to the table
        addStudentToTable(student);

        // Reset the form
        registrationForm.reset();
    });

    function loadStudents() {
        students.forEach(student => addStudentToTable(student));
    }

    function addStudentToTable(student) {
        const newRow = studentTable.insertRow();

        const nameCell = newRow.insertCell(0);
        const idCell = newRow.insertCell(1);
        const emailCell = newRow.insertCell(2);
        const contactCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);

        nameCell.textContent = student.studentName;
        idCell.textContent = student.studentID;
        emailCell.textContent = student.emailID;
        contactCell.textContent = student.contactNo;

        // Add edit and delete buttons
        actionsCell.innerHTML = `
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        `;
    }

    window.editStudent = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.getElementsByTagName("td");

        const studentName = cells[0].textContent;
        const studentID = cells[1].textContent;
        const emailID = cells[2].textContent;
        const contactNo = cells[3].textContent;

        document.getElementById("studentName").value = studentName;
        document.getElementById("studentID").value = studentID;
        document.getElementById("emailID").value = emailID;
        document.getElementById("contactNo").value = contactNo;

        // Remove the student from the list and local storage
        students = students.filter(student => student.studentID !== studentID);
        localStorage.setItem("students", JSON.stringify(students));

        // Remove the row from the table
        row.remove();
    };

    window.deleteStudent = function(button) {
        const row = button.parentElement.parentElement;
        const studentID = row.getElementsByTagName("td")[1].textContent;

        // Remove the student from the list and local storage
        students = students.filter(student => student.studentID !== studentID);
        localStorage.setItem("students", JSON.stringify(students));

        // Remove the row from the table
        row.remove();
    };

    function validateInputs(studentName, studentID, emailID, contactNo) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const idRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^[0-9]+$/;

        return nameRegex.test(studentName) &&
               idRegex.test(studentID) &&
               emailRegex.test(emailID) &&
               contactRegex.test(contactNo);
    }
});

