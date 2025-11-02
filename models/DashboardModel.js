
export const DashboardModel = {
    totalOrders: 0,
    activeCustomers: 0,
    totalIncome: 0,

    loadData() {
        this.totalOrders = Math.floor(Math.random() * 100) + 20;
        this.activeCustomers = Math.floor(Math.random() * 200) + 50;
        this.totalIncome = Math.floor(Math.random() * 500000) + 100000;
    }
};
