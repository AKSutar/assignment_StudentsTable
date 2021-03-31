var selectedRow = null;

function validate() {
    var fullName = document.getElementById("fname");
    var degreeGrd = document.getElementById("degree");
    var subDegreeGrd = document.getElementById("subDegree");
    var dobVal = document.getElementById("dob");
    var mailId = document.getElementById("email");
    var phoneNo = document.getElementById("phone");
    var studentId = document.getElementById("student");

    // ReGex Check
    var nameCheck = /^[A-Za-z ]+$/;
    var degreeCheck = /^[A-Za-z ]+$/;
    var subdegreeCheck = /^[A-Za-z ]+$/;
    var dobCheck = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    var mailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneCheck = / ^[0-9]{0,10}$/;
    var stuIdCheck = / ^\d{10}$ /;

    if (nameCheck.test(fullName.value)) {
        document.getElementById("nameError").innerHTML = " ";
    } else {
        document.getElementById("nameError").innerHTML = " ** Username is Invalid ";
        return false;
    }

    if (degreeCheck.test(degreeGrd.value)) {
        document.getElementById("degreeError").innerHTML = " ";
    } else {
        document.getElementById("degreeError").innerHTML = " ** Degree is Invalid ";
        return false;
    }

    if (subdegreeCheck.test(subDegreeGrd.value)) {
        document.getElementById("subdegreeError").innerHTML = " ";
    } else {
        document.getElementById("subdegreeError").innerHTML =
            " ** Sub degree is Invalid ";
        return false;
    }

    if (dobCheck.test(dobVal.value)) {
        document.getElementById("dobError").innerHTML = " ";
    } else {
        document.getElementById("dobError").innerHTML = " ** DOB is Invalid ";
        return false;
    }

    if (mailCheck.test(mailId.value)) {
        document.getElementById("emailError").innerHTML = " ";
    } else {
        document.getElementById("emailError").innerHTML = " ** Email is Invalid ";
        return false;
    }

    if (phoneCheck.test(phoneNo.value)) {
        document.getElementById("phoneError").innerHTML = " ";
    } else {
        document.getElementById("phoneError").innerHTML =
            " ** Phone no is Invalid ";
        return false;
    }

    if (stuIdCheck.test(studentId.value)) {
        document.getElementById("idError").innerHTML = " ";
    } else {
        document.getElementById("idError").innerHTML = " ** Student Id is Invalid ";
        return false;
    }
}


function onFormSubmit() {
    if (readFormData()) {
        var formData = readFormData();
        if (selectedRow == null) insertNewRecord(formData);
        else updateRecord(formData);
        resetForm();
    }
}


function readFormData() {
    var formData = {};
    formData["fname"] = document.getElementById("fname").value;
    formData["degree"] = document.getElementById("degree").value;
    formData["subDegree"] = document.getElementById("subDegree").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["email"] = document.getElementById("email").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["student"] = document.getElementById("student").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fname;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.degree;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.subDegree;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.dob;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.email;

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.phone;

    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.student;

    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

}

function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("degree").value = "";
    document.getElementById("subDegree").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("student").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("degree").value = selectedRow.cells[1].innerHTML;
    document.getElementById("subDegree").value = selectedRow.cells[2].innerHTML;
    document.getElementById("dob").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[5].innerHTML;
    document.getElementById("student").value = selectedRow.cells[6].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fname;
    selectedRow.cells[1].innerHTML = formData.degree;
    selectedRow.cells[2].innerHTML = formData.subDegree;
    selectedRow.cells[3].innerHTML = formData.dob;
    selectedRow.cells[4].innerHTML = formData.email;
    selectedRow.cells[5].innerHTML = formData.phone;
    selectedRow.cells[6].innerHTML = formData.student;
}

function onDelete(ta) {
    if (confirm('Are you sure to delete this record ?')) {
        row = ta.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}