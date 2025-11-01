import {customer_array, order_array, orderDetail_array} from "../db/database.js";


export function setOrdersTable(){
    $("#orderTableBody").empty()
    order_array.map((order,number) => {
        let data = `<tr>
                           <td >${order._id}</td>
                           <td >${order._cusId}</td>
                           <td >${order._total}</td>
                           <td >${order._date}</td>
                           
                           </tr>`
        $("#orderTableBody").append(data);
    })
}

export function setOrderDetailsTable(){
    $("#orderDetailsTableBody").empty()


    orderDetail_array.map((orderDetail,number) => {
        let data = `<tr>
                           <td >${orderDetail._orderId}</td>
                           <td >${orderDetail._itemId}</td>
                           <td >${orderDetail._qty}</td>
                          
                           
                           </tr>`
        $("#orderDetailsTableBody").append(data);
    })
}