$("#btnAddCus").prop('disabled', true);

// let btns = "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger cus-delete'><i class='bi bi-trash'></i></button>";
let btns = "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-pencil-square'></i></button>";
let clickedRowCId;

//Customer Btn Click On Home Page
$("#customer-clicks").click(function () {
    validationStaff() // Staff required for validation
    loadAllCustomers(); //load all customers
    clearFields()   //Clear Input Fields
    clearSearch();
    disableEdit();  //Prevent Editing Customer ID
})

//Add Customer Outside Btn Click
$("#addCusModelPop").click(function () {
    generateId();
});

//Add Customer Btn Click
$("#btnAddCus").click(function () {
    addCustomer();
});

//Clear Search Btn Click
$("#clear-btn-cus").click(function () {
    loadAllCustomers(); //load all customers
    clearFields()   //Clear Input Fields
});

//Search Btn Click
$("#button-cus-search").click(function () {
    if (!$("#txt-cus-search").val()) {
        loadAllCustomers();
        return;
    }

    // let btns = "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger cus-delete'><i class='bi bi-trash'></i></button>";
    $.ajax({
        url: "http://localhost:8080/pos/customer?option=SEARCH", method: "GET", data: {
            id: $("#txt-cus-search").val()
        }, success: function (resp) {
            if (resp.status == 200) {
                $("#cusTblBody").empty();
                for (const customer of resp.data) {
                    let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td><td style="text-align: center">${btns}</td></tr>`;
                    $("#cusTblBody").append(row);
                    bindCustomerRow();
                }
            } else {
                alert(resp.data);
                loadAllCustomers(); //load all customers
                clearFields()   //Clear Input Fields
            }
        }
    });
});

//Update Customer Btn Click
$("#btnUpdateCus").click(function () {
    var cusOb = {
        id: $("#cusIdUpdate").val(),
        name: $("#cusNameUpdate").val(),
        address: $("#cusAddressUpdate").val(),
        salary: $("#cusSalaryUpdate").val()
    }

    $.ajax({
        url: "http://localhost:8080/pos/customer", method: "PUT", // contentType: "application/json",
        data: JSON.stringify(cusOb), success: function (resp) {
            if (resp.status == 200) {
                loadAllCustomers();
                clearFields()   //Clear Input Fields
                $("#updateCustomer").modal('hide');
            } else if (resp.status == 400) {
                alert(resp.data);
            }
        }
    });
});

//Delete Customer Btn Click
$(".cus-delete").click(function () {
    deleteCustomer();
});

//Generate Customer ID
function generateId() {
    $.ajax({
        url: "http://localhost:8080/pos/customer?option=GENERATED_ID", method: "GET", success: function (resp) {
            if (resp.status == 200) {
                $("#cusIdAdd").val(resp.data.id);
            } else {
                alert(resp.data);
            }
        }
    });
}

// Customer Add Function - Start
function addCustomer() {
    $.ajax({
        url: "http://localhost:8080/pos/customer",
        method: "POST",
        data: $("#addCusForm").serialize(),
        success: function (res) {
            if (res.status == 200) {
                loadAllCustomers();
                clearFields()   //Clear Input Fields
                loadAllCustomerIds();
                $("#addCustomer").modal('hide');
            } else {
                alert(res.data);
            }

        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
}

// Load All Customers Function - Start
function loadAllCustomers() {
    $("#cusTblBody").empty(); //Duplicate Old rows remove
    $.ajax({
        url: "http://localhost:8080/pos/customer?option=GETALL", method: "GET", success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td><td style="text-align: center">${btns}</td></tr>`;
                $("#cusTblBody").append(row);
                bindCustomerRow();
            }
        }
    });
}

// Bind Events Customer Row Function - Start
function bindCustomerRow() {
    $("#cusTblBody>tr").click(function () {
        let custID=$(this).children(":eq(0)").text();
        let custName = $(this).children(":eq(1)").text();
        let custAddress = $(this).children(":eq(2)").text();
        let custSalary = $(this).children(":eq(3)").text();

        $("#cusIdUpdate").val(custID);
        $("#cusNameUpdate").val(custName);
        $("#cusAddressUpdate").val(custAddress);
        $("#cusSalaryUpdate").val(custSalary);
    });
}

//Delete Customer Function - Start
function deleteCustomer() {
    let id = $("#cusIdUpdate").val();
    $.ajax({
        url: `http://localhost:8080/pos/customer?customerID=${id}`,
        method: "DELETE",
        success: function (resp) {
            if (resp.status == 200) {
                loadAllCustomers();
                clearFields()   //Clear Input Fields
                $("#updateCustomer").modal('hide');
            } else if (resp.status == 400) {
                alert(resp.data);
            }
        }
    });
}

// Customer Validation Function - Start
function validation(regEx, id, error, nextId, btn) {
    $(id).keyup(function (event) {
        let input = $(id).val();
        if (regEx.test(input)) {
            $(id).css({'border': '2px solid green', 'background-color': '#fff'});
            $(error).css({"display": "none"});
            if (event.key == "Enter") {
                $(btn).prop('disabled', false);
                $(nextId).focus();
            }
        } else {
            $(id).css({'border': '2px solid red', 'background-color': '#ffe6e6'});
            $(error).css({"color": "red", "display": "block"});
            $(btn).prop('disabled', true);
        }
    });
}

//Prevent Edit Customer ID Input Fields
function disableEdit() {
    $("#cusIdAdd,#cusIdUpdate").css("pointer-events", "none");
}

//Clear Input All Fields
function clearFields() {
    $("#cusNameAdd,#cusAddressAdd,#cusSalaryAdd").val("");    // Clear input Fields (Add)
    $("#cusNameUpdate,#cusAddressUpdate,#cusSalaryUpdate").val(""); // Clear input Fields (Update)
    $("#txt-cus-search").val(""); //Clear input Field (Search)
}

// Staff required for validation
function validationStaff() {
    var RegExCusName = /^[A-z ]{5,20}$/;
    var RegExCusAddress = /^[0-9/A-z. ,]{7,}$/;
    var RegExCusSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

    $('#error1').css({"display": "none"});
    $('#error2').css({"display": "none"});
    $('#error3').css({"display": "none"});
    $('#error4').css({"display": "none"});

    $('#error01').css({"display": "none"});
    $('#error02').css({"display": "none"});
    $('#error03').css({"display": "none"});
    $('#error04').css({"display": "none"});

    // Customer Validation Function Call - Start
    validation(RegExCusName, '#cusNameAdd', '#error2', '#cusAddressAdd', '#btnAddCus');
    validation(RegExCusAddress, '#cusAddressAdd', '#error3', '#cusSalaryAdd', '#btnAddCus');
    validation(RegExCusSalary, '#cusSalaryAdd', '#error4', "#btnAddCus", '#btnAddCus');

    validation(RegExCusName, '#cusNameUpdate', '#error02', '#cusAddressUpdate', '#btnUpdateCus');
    validation(RegExCusAddress, '#cusAddressUpdate', '#error03', '#cusSalaryUpdate', '#btnUpdateCus');
    validation(RegExCusSalary, '#cusSalaryUpdate', '#error04', '#btnUpdateCus', '#btnUpdateCus');
}