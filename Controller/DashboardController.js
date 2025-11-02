import { customer_array } from "./CustomerController.js";
import { order_array, orderDetail_array } from "./OrderController.js";
import { item_array } from "./ItemController.js";

export const DashboardController = {

    init() {
        this.updateDashboard();
        setInterval(() => this.updateDashboard(), 5000);
    },

    updateDashboard() {
        const today = new Date().toISOString().slice(0,10);

        const totalOrders = order_array.filter(o => o.date === today).length;
        const activeCustomerIds = order_array.filter(o => o.date === today).map(o => o.customerId);
        const activeCustomers = [...new Set(activeCustomerIds)].length;

        let totalIncome = 0;
        order_array.filter(o => o.date === today).forEach(o => {
            const details = orderDetail_array.filter(d => d.orderId === o.id);
            details.forEach(d => {
                const item = item_array.find(i => i.id === d.itemId);
                if(item) totalIncome += item.price * d.qty;
            });
        });

        const orderEl = document.getElementById("dashboardOrderCount");
        const customerEl = document.getElementById("dashboardCustomerCount");
        const incomeEl = document.getElementById("dashboardIncome");

        if(orderEl) orderEl.textContent = totalOrders;
        if(customerEl) customerEl.textContent = activeCustomers;
        if(incomeEl) incomeEl.textContent = totalIncome.toLocaleString('en-US');
    }
};
