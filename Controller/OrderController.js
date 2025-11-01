
import {order_array,orderDetail_array,customer_array,item_array} from "../db/database.js";
import OrderModel from "../models/OrderModel.js";
import OrderDetailsModel from "../models/OrderDetailsModel.js";
import {setOrdersTable,setOrderDetailsTable} from "./OrderDetailController.js";

//$("inputCode1")

let subTotal;
let cart_array = [];


$(document).ready(function (){
    setOrderId();

})

function generateNextOrderId(){
   let id =  order_array.length +1;
   return "O0" + id;
}

function setOrderId(){
    $("#inputOrderId").val(generateNextOrderId());
    console.log(generateNextOrderId());
}

$("#inputCustomerTelephone1").on('keypress', function (e){
    if(e.which == 13 ){
        let telephoneNo = $(this).val();

        if(!searchCustomer(telephoneNo)){
            alert("No customer found.")
        };

    }
});


function searchCustomer(telephoneNo){

    let customer = customer_array.find(customer => customer._telephone === telephoneNo);
    console.log(customer);
    if(customer !== undefined){
        $("#inputCustomerName2").val(customer._name);
        cusId = customer._id;
        return true;
    }else {
        return false;
    }


}

export function loadItemCbx(){
    console.log("2");
    $("#inputCode1").empty();
    $("#inputCode1").append(`<option>select a item</option>`);
    item_array.map((item, number) => {
        let data = ` <option>${item._code}</option>`

        console.log(data);
            $("#inputCode1").append(data);

    })
}


$("#inputCode1").on('input', function (){
    console.log("selected");
    let id = $(this).val();
    let codeId = item_array.findIndex(item => item._code === id);
    if(codeId !== 'code' ){
        $("#inputDesc1").val(item_array[codeId]._desc);
        $("#inputQtyOnHand").val(item_array[codeId]._qty);
        $("#inputUnitPrice").val(item_array[codeId]._price);
        $("#inputOrderQty").focus();

    }else{
        $("#inputDesc1").val("");
        $("#inputQtyOnHand").val("");
        $("#inputUnitPrice").val("");
    }

})



$("#btn_addCart").on('click', function (){
    let itemId = $("#inputCode1").val();
    let price = +$("#inputUnitPrice").val();
    let qty = +$("#inputOrderQty").val();
    let total = price * qty;

    let qtyOnHand = +$("#inputQtyOnHand").val();
    let orderQty = +$("#inputOrderQty").val();


    if (orderQty < qtyOnHand){
        let cartIndex = cart_array.findIndex(cartItem => cartItem.itemId === itemId);
        if(cartIndex < 0){
            let cart_item = {
                itemId: itemId,
                price: price,
                qty: qty,
                total: total
            }

            cart_array.push(cart_item);
            loadCart();
            setTotalValues();
            clearItemSection();
            $("#inputDiscount").focus();
        }else{
                cart_array[cartIndex].qty = qty;
                cart_array[cartIndex].total = cart_array[cartIndex].qty * price;
                loadCart();
                setTotalValues();
                clearItemSection();

        }
    }else{
        alert("Not enough qty on hand")
    }
});


function loadCart(){
    $("#cartTableBody").empty();
    cart_array.map((cartItem, number) => {
        let data = `<tr>
                                <td>${cartItem.itemId}</td>
                                <td>${cartItem.price}</td>
                                <td>${cartItem.qty}</td>
                                <td>${cartItem.total}</td>
                                <td><button class="cart_remove btn-danger" data-id="${cartItem.itemId}">Remove</button></td>
                            </tr>`

        $("#cartTableBody").append(data);
    })
}

$("#cartTableBody").on('click','button',function (){
    const itId = $(this).data("id");
    cart_array = cart_array.filter(cartItem => cartItem.itemId !== itId);
    loadCart();
    setTotalValues();
})


let netTotal=0;

function setTotalValues(){
     netTotal = calculateNetValue();
    $("#netTotal").text(`${netTotal}`);

    subTotal = netTotal;
    $("#subTotal").text(`${subTotal}`);
   /* let dis = +$("#inputDiscount").val()/100 ;
    if(dis == 0 ){
        dis =1;
    }

    let discount = netTotal * dis;
    let subTotal = netTotal - discount;
    $("#subTotal").text(`${subTotal}`);*/


}

function calculateNetValue(){
    let total = 0;
    cart_array.map((cartItem, number)=>{
       total += cartItem.total
    })

    return total;
}



$("#inputDiscount").on('keypress', function (e){
    if(e.which === 13 ){
        let dis = +$("#inputDiscount").val();
        if(!dis || dis == 0 ){
            subTotal = netTotal;
            $("#subTotal").text(`${subTotal}`);
        }else{
            dis = dis/100;
            let discount = netTotal * dis;
            subTotal = netTotal - discount;
            $("#subTotal").text(`${subTotal}`);
        }
    $("#inputCash").focus();


}});

function clearItemSection(){
    $("#inputDesc1").val("");
    $("#inputQtyOnHand").val("");
    $("#inputUnitPrice").val("");
    $("#inputUnitPrice").val("");
    $("#inputOrderQty").val("");

}

$("#inputCash").on('keypress', function (e){
    if (e.which == 13){
        let cash = $("#inputCash").val();
        if (cash>subTotal){
            let balance = cash - subTotal;
            $("#inputBalance").val(balance);
        }else{
            alert("insufficient input to cash");
        }
    }
})

$("#btn_placeOrder").on('click', function (){
    let cusNumber = $("#inputCustomerTelephone1").val();
    let date = $("#inputDate").val();
    let cusName = $("#inputCustomerName2").val();
    console.log(date)
    console.log(cusName);
    let itemDesc = $("#inputDesc1").val();
    let orderQty = $("#inputOrderQty").val();

    let cartItems = cart_array.length;
    let discount = $("#inputDiscount").val();
    let cash = $("#inputCash").val();


    if(!cusName){
        Swal.fire({
            icon: "error",
            title: "Customer Name Field empty",
            text: "Enter customer telephone number and press 'Enter Key' to search customer",

        });

    }else if(!date){
        Swal.fire({
            icon: "error",
            title: "Date Field empty",
            text: "Select a date from calendar",

        });
    }/*else if(!itemDesc){
        Swal.fire({
            icon: "error",
            title: "Items Fields empty",
            text: "Select a item from select box",

        });
    }*/else if(!discount){
        Swal.fire({
            icon: "error",
            title: "Discount Fields empty",
            text: "Enter discount amount",

        });

    }else if(cartItems == 0){
        Swal.fire({
            icon: "error",
            title: "No items added to the cart",
            text: "Add items to the cart",

        });
    }else if(!cash ){
        Swal.fire({
            icon: "error",
            title: "Cash field is empty",
            text: "Fill the cash field",

        });
    }else{
        saveOrder();
        saveOrderDetails();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Order has been placed",
            showConfirmButton: false,
            timer: 1500
        });
        setOrderId();
        clearInvoiceDetails();
        updateItem();
        blankCart();
        loadCart();
        clearPaymentDetails();
        console.log(order_array.length);
        console.log(orderDetail_array.length);
        setOrdersTable();
        setOrderDetailsTable();

    }



})


function updateItem(){
    cart_array.map((cartItem, number)=>{
       let itemNumber = cartItem.itemId;
       console.log(itemNumber);
       let itemQty = cartItem.qty;
        console.log(itemQty);

       let item = item_array.find(item => item._code === itemNumber)
        console.log(item._desc);
       item._qty  = item._qty-itemQty;

    })
}


let orderId ;
let date ;
let cusId;
let itemId = $("#inputItemId").val();
subTotal = $("#subTotal").val();

function saveOrder(){
    orderId = $("#inputOrderId").val()
    date = $("#inputDate").val();
    console.log(orderId);
    let order = new OrderModel(orderId,date,subTotal,cusId);
    order_array.push(order);
}

function saveOrderDetails(){
    cart_array.map((cartItem, number)=>{
        let orderRow = new OrderDetailsModel(orderId,cartItem.itemId, cartItem.qty);
        orderDetail_array.push(orderRow);
    })
}

function clearInvoiceDetails() {
    $("#inputCustomerTelephone1").val("");
    $("#inputCustomerName2").val("");
}

function blankCart(){
    cart_array = [];
}

function clearPaymentDetails(){
    $("#netTotal").text("--");
    $("#subTotal").text("--");
    $("#inputDiscount").val("");
    $("#inputCash").val("");
    $("#inputBalance").val("");

}

/*let orderId = $("#inputOrderId").val();
let date = $("#inputDate").val();
let cusId;
let itemId = $("#inputItemId").val();
let subTotal = $("#subTotal").val();
//cart_arrray

function saveOrder(){
    let order = new OrderModel(orderId,date,subTotal,cusId);
    order_array.push(order);
}

function saveOrderDetails(){
    cart_array.map((cartItem, number)=>{
        let orderRow = new OrderDetailsModel(orderId,cartItem.itemId, cartItem.qty);
        cart_array.push(orderRow);

    })

}*/


//net total sub total reset wenna
//itemCombox
//itemUpdate wenna ona


























