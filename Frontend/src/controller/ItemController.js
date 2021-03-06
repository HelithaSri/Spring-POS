/**
 * @author : HelithaSri
 * @email : helitha.pravin@gmail.com
 * @create date : 2022-03-07  13:00
 * @modify date : 2022-03-07  23:24
 * @desc [ItemController]
 */

// let iBtns = "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='item-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";
let iBtns = "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-pencil-square'></i></button>";

//Item btn Click On Home Page
$("#item-clicks,#item-click").click(function () {
    loadAllItems(); //Load All items
    clearFieldsItem();
    disableEditFields();    //Prevent Editing Item Code
});

//Add Item Outside Btn Click
$("#addItemOutBtn").click(function (){
    generateItemId();
});

//Add Item btn Click
$("#btnAddItem").click(function () {
    addItem();
});

const itemBaseUrl = `http://localhost:8080/pos/api/item`;

//Search Item btn Click
$("#btn-item-search").click(function () {
    if (!$("#txt-item-search").val()) {
        loadAllItems();
        return false;
    }
    let code = $("#txt-item-search").val();
    $.ajax({
        url: itemBaseUrl+`/search?search=${code}`, method: "GET"
        , success: function (resp) {
            if (resp.code == 200) {
                $("#itemTblBody").empty();
                for (const item of resp.data) {
                    let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td><td style="text-align: center">${iBtns}</td></tr>`;
                    $("#itemTblBody").append(row);
                    bindItemRow();
                }
            } else {
                alert(resp.data);
                loadAllItems(); //load all Items
                clearFieldsItem()   //Clear Input Fields
            }
        }
    });
});

//Item Delete Btn Click
$(".item-delete").click(function () {
    deleteItem();
});

//Update Item Btn Click
$("#btnUpdateItem").click(function () {
    var itemObj = {
        code: $("#updateItemCode").val(),
        description: $("#updateItemName").val(),
        qtyOnHand: parseInt($("#updateItemQty").val()),
        unitPrice: parseInt($("#updateItemPrice").val())
    }

    $.ajax({
        url: itemBaseUrl, method: "PUT",contentType: "application/json", data: JSON.stringify(itemObj), success: function (resp) {
            if (resp.code == 200) {
                loadAllItems();
                clearFieldsItem() //Clear Input Fields
                $("#updateItem").modal('hide');
            } else if (resp.code == 400) {
                alert(resp.data);
            }
        }
    })
});

// Clear Search Btn Click
$("#clear-btn-item").click(function () {
    clearSearch();
});

// Item Add Function - Start
function addItem() {
    $.ajax({
        url: itemBaseUrl,
        method: "POST",
        data: $("#addItemForm").serialize(),
        success: function (res) {
            if (res.code == 200) {
                loadAllItems(); //load all Items
                clearFieldsItem();
                loadAllItemCodes();
                $("#addItem").modal('hide');
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

// Load All Items Function - Start
function loadAllItems() {
    $("#itemTblBody").empty(); //Duplicate Old rows remove
    console.log("hi");
    $.ajax({
        url: itemBaseUrl, method: "GET", success: function (resp) {
            console.log(resp.data);
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.description}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td><td style="text-align: center">${iBtns}</td></tr>`;
                console.log("hey1");
                $("#itemTblBody").append(row);
                console.log("hey");
                bindItemRow();
            }
        }
    });
}

// Bind Events Item Row Function - Start
function bindItemRow() {
    $("#itemTblBody > tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        $("#updateItemCode").val(itemId);
        $("#updateItemName").val(itemName);
        $("#updateItemQty").val(itemQty);
        $("#updateItemPrice").val(itemPrice);
    });
}

//clear search function - start
/*function clearSearch() {
    loadAllItems(); //load all Items
    $("#txt-item-search").val("");
}*/

// Delete Item function - start
function deleteItem() {
    let id = $("#updateItemCode").val();
    $.ajax({
        url: itemBaseUrl+`?code=${id}`,
        method: "DELETE",
        success: function (resp) {
            if (resp.code == 200) {
                loadAllItems();
                clearFieldsItem()   //Clear Input Fields
                $("#updateItem").modal('hide');
            } else{
                alert(resp.data);
            }
        }
    });
}

// Generate Item ID's function - start
function generateItemId() {
    $.ajax({
        url: itemBaseUrl+"/generate", method: "GET", success: function (resp) {
            if (resp.code == 200) {
                $("#itemCode").val(resp.data);
            } else {
                alert(resp.data);
            }
        }
    });
}

//Prevent Edit Item ID Input Fields
function disableEditFields() {
    $("#itemCode,#updateItemCode").css("pointer-events", "none");
}

//Clear All Input Fields
function clearFieldsItem() {
    $("#itemName,#itemQty,#itemPrice").val("");    // Clear input Fields (Add)
    $("#updateItemName,#updateItemQty,#updateItemPrice").val(""); // Clear input Fields (Update)
    $("#txt-item-search").val(""); //Clear input Field (Search)
}