import { customer_array } from "../db/database.js";
import CustomerModel from "../models/CustomerModel.js";
import { DashboardController } from "./DashboardController.js";
let customerIndex = -1;

$(document).ready(function () {
    setCustomerId();
    loadCustomerTable();
    DashboardController.updateDashboard();
});

// ===== VALIDATE  =====
function validMobile(mobile) {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

// ===== LOAD CUSTOMER TABLE =====
function loadCustomerTable() {
    $("#customerTableBody").empty();
    customer_array.forEach((customer, index) => {
        const row = `<tr data-index="${index}">
                        <td class="cus_id_val">${customer._id}</td>
                        <td class="cus_name_val">${customer._name}</td>
                        <td class="cus_address_val">${customer._address}</td>
                        <td class="cus_telephone_val">${customer._telephone}</td>
                     </tr>`;
        $("#customerTableBody").append(row);
    });

    DashboardController.updateDashboard();
}

// ===== GENERATE CUSTOMER ID =====
function generatedId() {
    let maxId = 0;
    customer_array.forEach(c => {
        const num = parseInt(c._id.replace("C0", ""));
        if (num > maxId) maxId = num;
    });
    return "C0" + (maxId + 1);
}

function setCustomerId() {
    $("#inputCustomerId").val(generatedId());
}

function clearFields() {
    $("#inputCustomerName, #inputAddress, #inputTelephoneNo").val("");
}

// ===== SAVE CUSTOMER =====
$("#btn_save_customer").on('click', function () {
    const cusId = generatedId();
    const cusName = $("#inputCustomerName").val().trim();
    const cusAddress = $("#inputAddress").val().trim();
    const cusTelephone = $("#inputTelephoneNo").val().trim();

    if (!cusName) return Swal.fire({ icon: "error", title: "Not Saved", text: "Name field empty" });
    if (!cusAddress) return Swal.fire({ icon: "error", title: "Not Saved", text: "Address field empty" });
    if (!validMobile(cusTelephone)) return Swal.fire({ icon: "error", title: "Invalid Number", text: "Enter valid number" });

    const customer = new CustomerModel(cusId, cusName, cusAddress, cusTelephone);
    customer_array.push(customer);
    loadCustomerTable();
    Swal.fire({ position: "top-end", icon: "success", title: "Customer has been saved", showConfirmButton: false, timer: 1500 });
    clearFields();
    setCustomerId();
});

// ===== SELECT CUSTOMER =====
$("#customerTable").on('click', 'tr', function () {
    customerIndex = $(this).data("index");
    if (customerIndex === undefined) return;

    const customer = customer_array[customerIndex];
    $("#inputCustomerId").val(customer._id);
    $("#inputCustomerName").val(customer._name);
    $("#inputAddress").val(customer._address);
    $("#inputTelephoneNo").val(customer._telephone);
});

// ===== CLEAR =====
$("#btn_clear_customer").on('click', function () {
    clearFields();
    setCustomerId();
    customerIndex = -1;
});

// ===== UPDATE CUSTOMER =====
$("#btn_update_customer").on('click', function () {
    if (customerIndex === -1) return Swal.fire({ icon: "error", title: "Select Customer", text: "Please select a customer from the table" });

    const cusId = $("#inputCustomerId").val();
    const cusName = $("#inputCustomerName").val().trim();
    const cusAddress = $("#inputAddress").val().trim();
    const cusTelephone = $("#inputTelephoneNo").val().trim();

    if (!cusName) return Swal.fire({ icon: "error", title: "Not Saved", text: "Name field empty" });
    if (!cusAddress) return Swal.fire({ icon: "error", title: "Not Saved", text: "Address field empty" });
    if (!validMobile(cusTelephone)) return Swal.fire({ icon: "error", title: "Invalid Number", text: "Enter valid number" });

    customer_array[customerIndex] = new CustomerModel(cusId, cusName, cusAddress, cusTelephone);
    loadCustomerTable();
    clearFields();
    setCustomerId();
    customerIndex = -1;
});

// ===== DELETE CUSTOMER =====
$("#btn_delete_customer").on('click', function () {
    if (customerIndex === -1) return Swal.fire({ icon: "error", title: "Select Customer", text: "Please select a customer from the table" });

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
            customer_array.splice(customerIndex, 1);
            loadCustomerTable();
            clearFields();
            setCustomerId();
            customerIndex = -1;
            Swal.fire("Deleted!", "Customer has been deleted.", "success");
        }
    });
});

// ===== SEARCH CUSTOMER =====
$("#customerSearch").on("input", function () {
    const query = $(this).val().trim().toLowerCase();
    $("#customerTableBody").empty();

    if (!query) {
        loadCustomerTable();
        return;
    }

    const filteredCustomers = customer_array.filter(c =>
        c._name.toLowerCase().includes(query) || c._telephone.includes(query)
    );

    if (filteredCustomers.length === 0) {
        $("#customerTableBody").append(`<tr><td colspan="4" class="text-center">No matching customers found</td></tr>`);
        $("#inputCustomerName1").val("");
    } else {
        filteredCustomers.forEach((customer) => {
            const row = `<tr data-index="${customer_array.indexOf(customer)}">
                            <td>${customer._id}</td>
                            <td>${customer._name}</td>
                            <td>${customer._address}</td>
                            <td>${customer._telephone}</td>
                         </tr>`;
            $("#customerTableBody").append(row);
        });

        $("#inputCustomerName1").val(filteredCustomers.length === 1 ? filteredCustomers[0]._name : "");
    }
});

$("#customerTableBody").on("click", "tr", function () {
    const index = $(this).data("index");
    if (index === undefined) return;

    customerIndex = index;
    const customer = customer_array[index];
    $("#inputCustomerId").val(customer._id);
    $("#inputCustomerName").val(customer._name);
    $("#inputAddress").val(customer._address);
    $("#inputTelephoneNo").val(customer._telephone);
});
