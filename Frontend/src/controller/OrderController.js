var selectedItemId;
var selectedCustomerId;
$("#discount").val(0);
$("#cash").val(0);


$("#order-clicks").click(function (){
    generateOrderId();  //Generate Order Id
    disableEdit();  //Prevent Editing Input Fields
    setDate();  //Set Time
    loadAllCustomerIds();
    loadAllItemCodes();
    clearPurchaseFields();
    clearInputItems();
});

$("#btnAddToCart").click(function () {
    addItemToCart();
});

$("#btnPurchase").click(function () {
    purchaseOrder();
});

$("#idCmb").change(function () {
    selectedCustomerId = $('#idCmb').find(":selected").text();
    selectedCustomer(selectedCustomerId);
});

$("#itemIdCmb").change(function () {
    selectedItemId = $('#itemIdCmb').find(":selected").text();
    selectedItem(selectedItemId);
});

$("#discount").keyup(function (event) {
    discountCal();
});

$("#cash").keyup(function (event) {
    // if (event.key == "Enter") {
    let subTotal = parseInt($("#lblSubTotal").text());
    let cash = parseInt($("#cash").val());
    let balance = cash - subTotal;
    $("#balanceO").val(balance);
    // }

});


//------------------------------------------------------

/* Load Customer ID's to Combo Box - Function */
function loadAllCustomerIds() {
    $("#idCmb").empty();

    let cusHint = `<option disabled selected>Select Customer ID</option>`;
    $("#idCmb").append(cusHint);

    $.ajax({
        url: "http://localhost:8080/pos/order?option=LOAD_CUS_ID", method: "GET", success: function (resp) {
            if (resp.status == 200) {
                for (const customer of resp.data) {
                    let option = `<option value="${customer.id}">${customer.id}</option>`;
                    $("#idCmb").append(option);
                }
            } else {
                alert(resp.data);
            }
        }
    })

}

/* Load Item ID's to Combo Box - Function */
function loadAllItemCodes() {
    $("#itemIdCmb").empty();

    let itemHint = `<option disabled selected>Select Item ID</option>`;
    $("#itemIdCmb").append(itemHint);

    $.ajax({
        url: "http://localhost:8080/pos/order?option=LOAD_ITEM_ID", method: "GET", success: function (resp) {
            if (resp.status == 200) {
                for (const item of resp.data) {
                    let option = `<option value="${item.code}">${item.code}</option>`;
                    $("#itemIdCmb").append(option);
                }
            } else {
                alert(resp.data);
            }
        }
    })
}

/* Load Customer Data To input Fields */
function selectedCustomer(CustomerId) {

    $.ajax({
        url: `http://localhost:8080/pos/order?option=SELECTED_CUS&cusID=${CustomerId}`,
        method: "GET",
        success: function (resp) {
            if (resp.status == 200) {
                for (const customer of resp.data) {
                    $("#inCusName").val(customer.name);
                    $("#inCusSalary").val(customer.salary);
                    $("#inCusAddress").val(customer.address);
                }
            } else {
                alert(resp.data);
            }
        }
    });
}

/* Load Item Data To input Fields */
function selectedItem(ItemId) {

    $.ajax({
        url: `http://localhost:8080/pos/order?option=SELECTED_ITEM&itemID=${ItemId}`,
        method: "GET",
        success: function (resp) {
            if (resp.status == 200) {
                for (const item of resp.data) {
                    $("#itemNameO").val(item.description);
                    $("#qtyOnHandO").val(item.qtyOnHand);
                    $("#priceO").val(item.unitPrice);
                }
            } else {
                alert(resp.data);
            }
        }
    });
}

/* Prevent Clicking input Fields */
function disableEdit() {
    $("#oId,#inCusName,#inCusSalary,#inCusaddress,#iDate").css("pointer-events", "none");  //Invoice Details Section
    $("#itemNameO,#qtyOnHandO,#priceO").css("pointer-events", "none");  //Item Select Section
    $("#balanceO").css("pointer-events", "none");  //Total Section
}

function generateOrderId() {

    $.ajax({
        url: "http://localhost:8080/pos/order?option=GENERATED_OID", method: 'GET', success: function (resp) {
            if (resp.status == 200) {
                $("#oId").val(resp.data.oId);
            } else {
                alert(resp.data);
            }
        }

    });
}

/* Set Current Date to datepicker */
function setDate() {
    let d = new Date();
    let dd = d.toISOString().split("T")[0].split("-");
    $("#iDate").val(dd[0] + "-" + dd[1] + "-" + dd[2]);
    $("#hDate").text(dd[0] + "-" + dd[1] + "-" + dd[2]);
}

/* Add Item To Cart */
var fullTotal = 0;

function addItemToCart() {
    let id = selectedItemId;
    let iName = $("#itemNameO").val();
    let iQtyOnHand = parseInt($("#qtyOnHandO").val());
    let iPrice = $("#priceO").val();
    let iOrderQTY = parseInt($("#oQty").val());

    let total = 0;

    // Check Qty Availability
    /* if (iQtyOnHand >= iOrderQTY) {
        iQtyOnHand = iQtyOnHand - iOrderQTY;
    }else{
        alert("Enter Valid QTY");
        $("#oQty").val("");
        return;
    } */
    if (!iOrderQTY) {
        alert("Enter Item/QTY");
        return;
    }

    if (iQtyOnHand + 1 <= iOrderQTY) {
        alert("Enter Valid QTY");
        $("#oQty").val("");
        return;
    }
    iQtyOnHand = iQtyOnHand - iOrderQTY;

    //updateing qty
    for (let i = 0; i < itemDB.length; i++) {
        if (id == itemDB[i].getItemCode()) {
            itemDB[i].setItemQty(iQtyOnHand);
        }
    }

    let newQty = 0;
    let newTotal = 0;

    if (checkDuplicates(id) == -1) {
        total = iOrderQTY * iPrice;
        fullTotal = fullTotal + total;
        let row = `<tr><td>${id}</td><td>${iName}</td><td>${iPrice}</td><td>${iOrderQTY}<td>${total}</td></tr>`;
        $("#tbodyOrder").append(row);
        $("#lblFullTotal").text(fullTotal + " LKR");
        $("#lblSubTotal").text(fullTotal + " LKR");

        clearInputItems();

    } else {

        let rowNo = checkDuplicates(id);
        newQty = iOrderQTY;
        let oldQty = parseInt($($('#tbodyOrder>tr').eq(rowNo).children(":eq(3)")).text());
        let oldTotal = parseInt($($('#tbodyOrder>tr').eq(rowNo).children(":eq(4)")).text());

        fullTotal = fullTotal - oldTotal;
        newQty = parseInt(oldQty) + parseInt(newQty);
        newTotal = newQty * iPrice;
        fullTotal = fullTotal + newTotal;

        //Update row
        $('#tbodyOrder tr').eq(rowNo).children(":eq(3)").text(newQty);
        $('#tbodyOrder tr').eq(rowNo).children(":eq(4)").text(newTotal);

        $("#lblFullTotal").text(fullTotal + " LKR");
        $("#lblSubTotal").text(fullTotal + " LKR");
        clearInputItems();
    }

}

/* Check Duplicate Item */
function checkDuplicates(itemId) {
    for (let i = 0; i < $("#tbodyOrder > tr").length; i++) {
        if (itemId == $('#tbodyOrder').children().eq(i).children().eq(0).text()) {
            // alert(i);
            return i;
        }

    }
    return -1;
}

/* Clear Input Field on Selected Item Area */
function clearInputItems() {
    $("#itemIdCmb").val("Select Item ID");
    $("#itemNameO").val("");
    $("#qtyOnHandO").val("");
    $("#priceO").val("");
    $("#oQty").val("");
}

/* Clear Fields around Purchase btn */
function clearPurchaseFields() {
    $("#idCmb").val("Select Customer ID");
    $("#inCusName").val("");
    $("#inCusSalary").val("");
    $("#inCusAddress").val("");

    $("#cash").val("");
    $("#discount").val("0");
    $("#balanceO").val("");
    $("#lblFullTotal").text("0 LKR");
    $("#lblSubTotal").text("0 LKR");
    $("#tbodyOrder").children().remove();
    fullTotal = 0;
    clearInputItems();
}

function discountCal() {
    /* let discount = parseInt($("#cash").val());
    let discounted_price = parseInt((fullTotal - (total * discount / 100)));
    console.log(typeof discounted_price);
    // $("#lblSubTotal").text(discounted_price +" LKR");
    $("#lblSubTotal").text(discounted_price); */
    var discount = 0;
    var discounted_price = 0;
    var tempDiscount = 0;

    discount = parseInt($("#discount").val());
    tempDiscount = 100 - discount;
    discounted_price = (tempDiscount * fullTotal) / 100;
    console.log(typeof discounted_price);
    $("#lblSubTotal").text(discounted_price + " LKR");

}

function purchaseOrder() {

    var obj = {
        order: {
            orderId:$("#oId").val(),
            customer: selectedCustomerId,
            orderDate: $("#iDate").val(),
            discount: parseInt($("#discount").val()),
            total: $("#lblFullTotal").text().split(" ")[0],
            subTotal: $("#lblSubTotal").text().split(" ")[0]
        },
        orderDetail:[]
    }

    for (let i = 0; i < $('#tbodyOrder tr').length; i++) {

        tblItemId = $('#tbodyOrder').children().eq(i).children().eq(0).text();
        tblItemName = $('#tbodyOrder').children().eq(i).children().eq(1).text();
        tblItemPrice = $('#tbodyOrder').children().eq(i).children().eq(2).text();
        tblItemQty = $('#tbodyOrder').children().eq(i).children().eq(3).text();
        tblItemTotal = $('#tbodyOrder').children().eq(i).children().eq(4).text();

        var details = {
            itemCode:tblItemId,
            itemName:tblItemName,
            itemPrice:tblItemPrice,
            itemQty:tblItemQty,
            itemTotal:tblItemTotal
        }
        obj.orderDetail.push(details);

    }
    console.log(JSON.stringify(obj));
    $.ajax({
        url: "http://localhost:8080/pos/order",
        method: "POST",
        data: JSON.stringify(obj),
        success: function (resp) {
            if (resp.status==200){
                generateOrderId();
                clearPurchaseFields();
            }else {
                alert(resp.data);
            }
        }

    });

}