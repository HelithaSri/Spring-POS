$("#btn-order-search").click(function () {
    $("#orderDetailsTblBody").children().remove();
    let result = $("#txt-order-search").val();
    searchOrderDetails(result);

});

$("#clear-btn-order").click(function () {
    $("#orderDetailsTblBody").children().remove();
    $("#lblCusId").text("");
    $("#lblDate").text("");
    $("#lblSTotal").text("");
    $("#lblOrderId").text("");
    $("#txt-order-search").val("");
});

function searchOrderDetails(result) {
    let oid = $("#txt-order-search").val();
    $.ajax({
        url:`http://localhost:8080/pos/oDetails?orderID=${oid}`,
        method:"GET",
        success:function (resp) {
            if (resp.status == 200) {
                $("#orderDetailsTblBody").empty();
                for (const fetch of resp.data) {
                    let row = `<tr><td>${fetch.itemCode}</td><td>${fetch.itemName}</td><td>${fetch.unitPrice}</td><td>${fetch.qty}</td><td>${fetch.total}</td></tr>`;
                    $("#orderDetailsTblBody").append(row);
                    bindCustomerRow();

                    $("#lblOrderId").text(fetch.oID);
                    $("#lblCusId").text(fetch.cusID);
                    $("#lblDate").text(fetch.date);
                    $("#lblSTotal").text(fetch.subTotal);
                }
            } else {
                alert(resp.data)
            }
        }
    })
}
