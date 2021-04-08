var selectedRow = null;
let count = 0;


function validate() {
    var fullName = document.getElementById("fname");
    var degreeGrd = document.getElementById("degree");
    var subDegreeGrd = document.getElementById("subDegree");
    var dobVal = document.getElementById("dob");
    var mailId = document.getElementById("email");
    var phoneNo = document.getElementById("phone");

    // ReGex Check
    var regExp = /^[A-Za-z. ]+$/;
    var dobCheck = /^[0-9]+\-[0-9]+\-[0-9]+$/;
    var mailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneCheck = /^[0-9]{10}$/;


    if (regExp.test(fullName.value)) {
        document.getElementById("nameError").innerHTML = " ";
    } else {
        document.getElementById("nameError").innerHTML = " ** Username is Invalid ";
        return false;
    }

    if (regExp.test(degreeGrd.value)) {
        document.getElementById("degreeError").innerHTML = " ";
    } else {
        document.getElementById("degreeError").innerHTML = " ** Degree is Invalid ";
        return false;
    }

    if (regExp.test(subDegreeGrd.value)) {
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
        document.getElementById("phoneError").innerHTML = " ** Phone no is Invalid ";
        return false;
    }


}



function onFormSubmit() {

    if (readFormData()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
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
    return formData;
}

function rand() {
    return count = count + 1;
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
    cell7.innerHTML = rand();

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
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fname;
    selectedRow.cells[1].innerHTML = formData.degree;
    selectedRow.cells[2].innerHTML = formData.subDegree;
    selectedRow.cells[3].innerHTML = formData.dob;
    selectedRow.cells[4].innerHTML = formData.email;
    selectedRow.cells[5].innerHTML = formData.phone;
}

function onDelete(ta) {
    if (confirm('Are you sure to delete this record ?')) {
        row = ta.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function storeData() {

     var new_data = [
        {
        fname: document.getElementById("fname").value,
        degree: document.getElementById("degree").value,
        subDegree: document.getElementById("subDegree").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
      }
    ]; 

    // if there is nothing saved at the start then save an empty array. 
    if(localStorage.getItem('data') == null) {
        localStorage.setItem('data' , '[]');
    }

    // get the old data & slap it on to the new data.
    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);

    // saving the old data + new data to our local storage.
    localStorage.setItem('data' , JSON.stringify(old_data));
}

function viewData() {
    if(localStorage.getItem('data') != null) {
        console.log(JSON.parse(localStorage.getItem('data')));
    }
}


// Table sort based on name alphabetical order.

var th = document.getElementsByTagName("th");

for (let c = 0; c < th.length; c++) {
    th[c].addEventListener("click", item(c));
}

function item(c) {
    return function () {
        console.log(c);
        sortTable(c);
    };
}

function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("employeeList");
    switching = true;
    /*Make a loop that will continue until no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare, one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

/* End of name sorting */

