$("#btn-order-search").click(function () {
    $("#orderDetailsTblBody").children().remove();
    let result = $("#txt-order-search").val();
    searchOrderDetails(result);

});

$("#clear-btn-order,#orderDetails-click").click(function () {
    $("#orderDetailsTblBody").children().remove();
    $("#lblCusId").text("");
    $("#lblDate").text("");
    $("#lblSTotal").text("");
    $("#lblOrderId").text("");
    $("#txt-order-search").val("");
});

function searchOrderDetails(result) {
    // let oid = $("#txt-order-search").val();
    $.ajax({
        url:`http://localhost:8080/pos/api/orderDetails?oid=${result}`,
        method:"GET",
        success:function (resp) {
            console.log(resp.data);
            if (resp.code == 200) {
                $("#orderDetailsTblBody").empty();

                $("#lblOrderId").text(resp.data.oid);
                $("#lblCusId").text(resp.data.customerId.name);
                $("#lblDate").text(resp.data.date);
                $("#lblSTotal").text(resp.data.subTotal);

                for (const fetch of resp.data.orderDetails) {
                    let row = `<tr><td>${fetch.itemCode}</td><td>${fetch.itemName}</td><td>${fetch.unitPrice}</td><td>${fetch.qty}</td><td>${fetch.total}</td></tr>`;
                    $("#orderDetailsTblBody").append(row);
                    bindCustomerRow();
                }
            } else {
                alert(resp.data)
            }
        }
    })
}
