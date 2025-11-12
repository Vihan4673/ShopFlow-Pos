import {customer_array, item_array} from "../db/database.js";
import ItemModel from "../models/ItemModel.js";
import {loadItemCbx} from "./OrderController.js";


$(document).ready(function (){
    $("#item_nav").on('click', function (){
        loadItemTable();
    })

    console.log(generateItemId());
    $("#inputItemId").val(generateItemId());
})


function validPrice(price){
    const doubleRegex = /^-?\d+(\.\d+)?$/;
    return doubleRegex.test(price);
}

// /*===save_item===*/

$("#btn_save_item").on('click',function (){
    let itemId = generateItemId();
    let itemDesc = $("#inputItemDesc").val();
    let itemPrice = $("#inputPrice").val();
    let itemQty = $("#inputQty").val();

    console.log(itemId+ itemDesc+ itemPrice+ itemQty);

    /*let item = {
        item_id :itemId,
        item_desc :itemDesc,
        item_price : itemPrice,
        item_qty : itemQty
    }*/

    if(itemDesc.length === 0){
        Swal.fire({
            icon: "error",
            title: "Not Saved",
            text: "Empty field description",

        });

    }else if(!validPrice(itemPrice)){
        Swal.fire({
            icon: "error",
            title: "Not saved",
            text: "Invalid price Format",

        });
    }else if(!validPrice(itemQty)){
        Swal.fire({
            icon: "error",
            title: "Not saved",
            text: "Invalid Qty Format",

        });
    }else{
        let item = new ItemModel(itemId, itemDesc, itemPrice, itemQty);

        item_array.push(item);
        loadItemTable();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        clearField();
        setId();
        loadItemCbx();
    }


});

function loadItemTable(){
    $("#itemTableBody").empty();
    item_array.map((item,number) => {
        let data =  `<tr>
            <td class="item_id_val">${item._code}</td>
            <td class="item_desc_val">${item._desc}</td>
            <td class="item_price_val">${item._price}</td>
            <td class="item_qty_val">${item._qty}</td>
          </tr>`

        $("#itemTableBody").append(data);
    })
}

function setId(){
    $("#inputItemId").val(generateItemId());
}

function generateItemId(){
    let nextId = item_array.length+1;
    return "I0" + nextId;
}

$("#itemTable").on('click','tr',function (){
    console.log("item row clicked")
    let id = $(this).find('.item_id_val').text();
    let desc = $(this).find('.item_desc_val').text();
    let price = $(this).find('.item_price_val').text();
    let qty = $(this).find('.item_qty_val').text();

    console.log(id);
    console.log(qty);

    $("#inputItemId").val(id);
    $("#inputItemDesc").val(desc);
    $("#inputPrice").val(price);
    $("#inputQty").val(qty);

});

/*====clear_item===*/
function clearField(){
    $("#inputItemDesc").val("");
    $("#inputPrice").val("");
    $("#inputQty ").val("");
}

$("#btn_clear_item").on('click',function (){
    $("#inputItemDesc").val("");
    $("#inputPrice").val("");
    $("#inputQty ").val("");

})

/*====update_item===*/
$("#btn_update_item").on('click', function (){
    let id = $("#inputItemId").val();
    let item = item_array.find(item => item._code === id);
    console.log(item);

    item._desc = $("#inputItemDesc").val();
    item._price = $("#inputPrice").val();
    item._qty= $("#inputQty").val();

    loadItemTable();
    clearField();
    setId();
});


/*====delete item====*/
$("#btn_delete_item").on('click', function (){


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
            let id = $("#inputItemId").val();
            let itemIndex = item_array.findIndex(item => item._code === id)
            item_array.splice(itemIndex,1);
            loadItemTable();
            clearField();
            setId();
            loadCustomerTable();
            clearFieldCustomer();
            setCustomerId();
            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
        }
    });



});

/*====Search Customer====*/
$("#inputItemCode").on('keypress', function (e){
    if(e.which === 13 ){
        let iCode = $(this).val();
        searchItem(iCode);
    }else{
        loadItemTable();
    }
});



function searchItem(iCode){

    $("#itemTableBody").empty()
    let item = item_array.find(item => item._code === iCode);
    let data = `<tr>
                           <td class="cus_id_val">${item._code}</td>
                           <td class="cus_name_val">${item._desc}</td>
                           <td class="cus_address_val">${item._price}</td>
                           <td class="cus_telephone_val">${item._qty}</td>
                           </tr>`
    $("#itemTableBody").append(data);
    $("#inputDesc").val(item._desc)

}


