import { customer_array, order_array } from "db/database.js";

export const DashboardModel = {
    totalOrders: 0,
    activeCustomers: 0,
    totalIncome: 0,

    loadData() {
        const today = new Date().toISOString().split("T")[0];

        this.totalOrders = order_array.filter(order => order._date === today).length;

        this.activeCustomers = [...new Set(order_array.map(order => order._customerId))].length;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        this.totalIncome = order_array.reduce((sum, order) => {
            const orderDate = new Date(order._date);
            if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
                return sum + parseFloat(order._total || 0);
            }
            return sum;
        }, 0);
    }
};
