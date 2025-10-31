

/*--------------------------------------------customer section----------------------------------------------------------------------*/

// customer array
import {customer_array} from "../db/database.js";
import CustomerModel from "../models/CustomerModel.js";
let customerIndex;

$(document).ready(function (){
    $("#inputCustomerId").val(generatedId());
})


function validEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validMobile(mobile){
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

let loadCustomerTable = () =>{
    $("#customerTableBody").empty()
    customer_array.map((customer,number) => {
        let data = `<tr>
                           <td class="cus_id_val">${customer._id}</td>
                           <td class="cus_name_val">${customer._name}</td>
                           <td class="cus_address_val">${customer._address}</td>
                           <td class="cus_telephone_val">${customer._telephone}</td>
                           </tr>`
        $("#customerTableBody").append(data);
    })



}

let generatedId = function generatedId(){
    console.log(customer_array.length + 1)
    let id = customer_array.length + 1;
    return "C0" + id;

}


let setCustomerId = () => {
    $("#inputCustomerId").val(generatedId());
}

/*===btn_save_customer===*/
$("#btn_save_customer").on('click', function (){
    console.log("clicked save customer");


    let cusId = generatedId();
    let cusName = $("#inputCustomerName").val();
    let cusAddress = $("#inputAddress").val();
    let cusTelephone = $("#inputTelephoneNo").val();


    if(cusName.length === 0){
        Swal.fire({
            icon: "error",
            title: "Not Saved",
            text: "Name field empty",

        });

    }else if(cusAddress.length === 0){
        Swal.fire({
            icon: "error",
            title: "Not Saved",
            text: "Address field empty",

        });
    }else if(!validMobile(cusTelephone)){
        Swal.fire({
            icon: "error",
            title: "Invalid Number",
            text: "Enter valid number",

        });
    }else{
        console.log("cusId ", cusId, "cusName", cusName,cusAddress, cusTelephone);

        let customer = new CustomerModel(cusId, cusName, cusAddress, cusTelephone);

        customer_array.push(customer);

        loadCustomerTable();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Customer has been saved",
            showConfirmButton: false,
            timer: 1500
        });

        clearFieldCustomer();
        setCustomerId();
    }



})


/*====details fill when table row clicked====*/
$("#customerTable").on('click','tr',function (){
    console.log("clicked");



    customerIndex = $(this).index();
    let testcustomer  = customer_array[customerIndex];

    let id = testcustomer._id;
    let name = testcustomer._name;
    let address = testcustomer._address;
    let telephone =  testcustomer._telephone;


    console.log("testId:" ,testcustomer);
    console.log("testId:" ,testcustomer.cus_id);
    console.log("testName:" ,testcustomer.cus_name);
    console.log("testAddress:" ,testcustomer.cus_address);

    $("#inputCustomerId").val(id);
    $("#inputCustomerName").val(name);
    $("#inputAddress").val(address);
    $("#inputTelephoneNo").val(telephone);


});

function clearFieldCustomer(){
    $("#inputCustomerName").val("");
    $("#inputAddress").val("");
    $("#inputTelephoneNo").val("");
}

/*====btn_clear_customer===*/
$("#btn_clear_customer").on('click',function (){
    clearFieldCustomer();
    setCustomerId();

})

/*====update customer=====*/

$("#btn_update_customer").on('click', function () {
    //

    let cusId = $("#inputCustomerId").val();
    let cusName = $("#inputCustomerName").val();
    let cusAddress = $("#inputAddress").val();
    let cusTelephone = $("#inputTelephoneNo").val();


    if (cusName.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Not Saved",
            text: "Name field empty",

        });

    } else if (cusAddress.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Not Saved",
            text: "Address field empty",

        });
    } else if (!validMobile(cusTelephone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Number",
            text: "Enter valid number",

        });
    } else {

        let customer = new CustomerModel(cusId, cusName, cusAddress, cusTelephone);

        customer_array[customerIndex] = customer;
        loadCustomerTable();
        clearFieldCustomer();
        setCustomerId();

    }
})


/*====delete customer=====*/
$("#btn_delete_customer").on('click', function (){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(customerIndex,1);
            loadCustomerTable();
            clearFieldCustomer();
            setCustomerId();
            Swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                icon: "success"
            });
        }
    });

});


/*====Search Customer====*/

$("#inputCustomerTel").on('keypress', function (e){
    if(e.which === 13 ){
        let telephoneNo = $(this).val();
        searchCustomer(telephoneNo);
    }else{
        loadCustomerTable();
    }
});


function searchCustomer(telephoneNo){
    $("#customerTableBody").empty()
    let customer = customer_array.find(customer => customer._telephone === telephoneNo);
    let data = `<tr>
                           <td class="cus_id_val">${customer._id}</td>
                           <td class="cus_name_val">${customer._name}</td>
                           <td class="cus_address_val">${customer._address}</td>
                           <td class="cus_telephone_val">${customer._telephone}</td>
                           </tr>`
    $("#customerTableBody").append(data);
    $("#inputCustomerName1").val(customer._name);
}



