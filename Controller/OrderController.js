import {order_array, orderDetail_array, customer_array, item_array} from "../db/database.js";
import OrderModel from "../models/OrderModel.js";
import OrderDetailsModel from "../models/OrderDetailsModel.js";
import {setOrdersTable, setOrderDetailsTable} from "./OrderDetailController.js";
import { DashboardController } from "./DashboardController.js";

let cart_array = [];
let netTotal = 0;
let subTotal = 0;
let cusId;
let orderId;

$(document).ready(function (){
    setOrderId();
    loadItemCbx();
    DashboardController.updateDashboard();
});

// ====================== ORDER ID ======================
function generateNextOrderId(){
    return "O0" + (order_array.length + 1);
}

function setOrderId(){
    orderId = generateNextOrderId();
    $("#inputOrderId").val(orderId);
}

// ====================== CUSTOMER SEARCH ======================
$("#inputCustomerTelephone1").on('keypress', function (e){
    if(e.which === 13 ){
        const telephoneNo = $(this).val();
        if(!searchCustomer(telephoneNo)){
            alert("No customer found.");
        }
    }
});

function searchCustomer(telephoneNo){
    const customer = customer_array.find(c => c._telephone === telephoneNo);
    if(customer){
        $("#inputCustomerName2").val(customer._name);
        cusId = customer._id;
        return true;
    }
    return false;
}

// ====================== LOAD ITEM COMBOBOX ======================
export function loadItemCbx(){
    $("#inputCode1").empty();
    $("#inputCode1").append(`<option>Select an item</option>`);
    item_array.forEach(item => {
        $("#inputCode1").append(`<option>${item._code}</option>`);
    });
}

// ====================== ITEM SELECTION ======================
$("#inputCode1").on('input', function (){
    const id = $(this).val();
    const item = item_array.find(i => i._code === id);
    if(item){
        $("#inputDesc1").val(item._desc);
        $("#inputQtyOnHand").val(item._qty);
        $("#inputUnitPrice").val(item._price);
        $("#inputOrderQty").focus();
    } else {
        clearItemSection();
    }
});

// ====================== ADD TO CART ======================
$("#btn_addCart").on('click', function (){
    const itemId = $("#inputCode1").val();
    const price = parseFloat($("#inputUnitPrice").val());
    const qty = parseInt($("#inputOrderQty").val());
    const qtyOnHand = parseInt($("#inputQtyOnHand").val());

    if(qty <= 0) return alert("Enter a valid quantity!");
    if(qty > qtyOnHand) return alert("Not enough quantity in stock!");

    const cartIndex = cart_array.findIndex(c => c.itemId === itemId);

    if(cartIndex < 0){
        cart_array.push({itemId, price, qty, total: price * qty});
    } else {
        cart_array[cartIndex].qty = qty;
        cart_array[cartIndex].total = price * qty;
    }

    loadCart();
    calculateNetTotal();
    clearItemSection();
    $("#inputDiscount").focus();
});

// ====================== LOAD CART ======================
function loadCart(){
    $("#cartTableBody").empty();
    cart_array.forEach(cartItem => {
        $("#cartTableBody").append(`
            <tr>
                <td>${cartItem.itemId}</td>
                <td>${cartItem.price.toFixed(2)}</td>
                <td>${cartItem.qty}</td>
                <td>${cartItem.total.toFixed(2)}</td>
                <td><button class="cart_remove btn-danger" data-id="${cartItem.itemId}">Remove</button></td>
            </tr>
        `);
    });
}

// ====================== REMOVE ITEM ======================
$("#cartTableBody").on('click','button.cart_remove', function (){
    const id = $(this).data("id");
    cart_array = cart_array.filter(c => c.itemId !== id);
    loadCart();
    calculateNetTotal();
});

// ====================== TOTALS ======================
function calculateNetTotal(){
    netTotal = cart_array.reduce((sum, c) => sum + c.total, 0);
    $("#netTotal").text(netTotal.toFixed(2));
    updateSubTotal();
}

function updateSubTotal(){
    let discount = parseFloat($("#inputDiscount").val()) || 0;
    subTotal = discount > 0 ? netTotal * (1 - discount / 100) : netTotal;
    $("#subTotal").text(subTotal.toFixed(2));
    updateBalance();
}

// ====================== DISCOUNT ======================
$("#inputDiscount").on('input keyup', function (){
    updateSubTotal();
});

// ====================== CASH & BALANCE ======================
$("#inputCash").on('input keyup', function (){
    updateBalance();
});

function updateBalance(){
    const cash = parseFloat($("#inputCash").val()) || 0;
    if(cash >= subTotal){
        $("#inputBalance").val((cash - subTotal).toFixed(2));
    } else {
        $("#inputBalance").val("0.00");
    }
}

// ====================== CLEAR ITEM SECTION ======================
function clearItemSection(){
    $("#inputCode1").val("");
    $("#inputDesc1").val("");
    $("#inputQtyOnHand").val("");
    $("#inputUnitPrice").val("");
    $("#inputOrderQty").val("");
}

// ====================== PLACE ORDER ======================
$("#btn_placeOrder").on('click', function (){
    if(!cusId) return Swal.fire("Error","Select a customer first!","error");
    if(cart_array.length === 0) return Swal.fire("Error","Cart is empty!","error");

    const cash = parseFloat($("#inputCash").val()) || 0;
    if(cash < subTotal) return Swal.fire("Error","Cash is insufficient!","error");

    saveOrder();
    saveOrderDetails();
    updateItemStock();

    DashboardController.updateDashboard();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order has been placed",
        showConfirmButton: false,
        timer: 1500
    });

    setOrderId();
    clearInvoiceDetails();
    blankCart();
    loadCart();
    clearPaymentDetails();
    setOrdersTable();
    setOrderDetailsTable();
});

// ====================== SAVE ORDER ======================
function saveOrder(){
    const date = $("#inputDate").val() || new Date().toISOString().split('T')[0];
    const order = new OrderModel(orderId, date, subTotal, cusId);
    order_array.push(order);
}

function saveOrderDetails(){
    cart_array.forEach(cartItem => {
        orderDetail_array.push(new OrderDetailsModel(orderId, cartItem.itemId, cartItem.qty));
    });
}

// ====================== UPDATE ITEM STOCK ======================
function updateItemStock(){
    cart_array.forEach(cartItem => {
        const item = item_array.find(i => i._code === cartItem.itemId);
        if(item) item._qty -= cartItem.qty;
    });
}

// ====================== CLEAR FUNCTIONS ======================
function clearInvoiceDetails(){
    $("#inputCustomerTelephone1").val("");
    $("#inputCustomerName2").val("");
    cusId = null;
}

function blankCart(){
    cart_array = [];
}

function clearPaymentDetails(){
    $("#netTotal").text("0.00");
    $("#subTotal").text("0.00");
    $("#inputDiscount").val("0");
    $("#inputCash").val("");
    $("#inputBalance").val("0.00");
}
