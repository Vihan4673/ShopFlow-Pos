import { order_array, customer_array } from "../db/database.js";

export const DashboardController = {
    init() {
        this.updateDashboard();
    },

    updateDashboard() {
        const now = new Date();
        const todayStr = now.toISOString().split("T")[0]; // yyyy-mm-dd

        // ===== Total Orders Today =====
        const todayOrders = order_array.filter(order => {
            const orderDate = new Date(order._date);
            return orderDate.toISOString().split("T")[0] === todayStr;
        }).length;

        const orderElem = document.getElementById("dashboardOrderCount");
        if (orderElem) orderElem.textContent = todayOrders;

        // ===== Active Customers =====
        const customerElem = document.getElementById("dashboardCustomerCount");
        if (customerElem) customerElem.textContent = customer_array.length;

        // ===== Monthly Income (LKR) =====
        const monthlyIncome = order_array.reduce((sum, order) => {
            const orderDate = new Date(order._date);
            if (
                orderDate.getMonth() === now.getMonth() &&
                orderDate.getFullYear() === now.getFullYear()
            ) {
                return sum + (parseFloat(order._total) || 0);
            }
            return sum;
        }, 0);

        const incomeElem = document.getElementById("dashboardIncome");
        if (incomeElem) incomeElem.textContent = monthlyIncome.toFixed(2);
    }
};
