
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("contentWrapper");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");


function showSection(sectionId) {
    const sections = ["homeSection", "customerSection", "itemSection", "orderSection", "orderDetailSection"];

    // Hide all sections
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";

    if (contentWrapper) contentWrapper.scrollTop = 0;

    document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
    const navLink = document.getElementById(sectionId.replace("Section", "_nav"));
    if (navLink) navLink.classList.add("active");

    if (window.innerWidth <= 992 && sidebar.classList.contains("show-sidebar")) toggleSidebar();
    if (sectionId === "homeSection" && window.DashboardController) {
        window.DashboardController.updateDashboard();
    }
}

function toggleSidebar() {
    sidebar.classList.toggle("show-sidebar");
    contentWrapper.classList.toggle("sidebar-pushed");
}

if (sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", toggleSidebar);

document.getElementById("home_nav")?.addEventListener("click", () => showSection("homeSection"));
document.getElementById("customer_nav")?.addEventListener("click", () => showSection("customerSection"));
document.getElementById("item_nav")?.addEventListener("click", () => showSection("itemSection"));
document.getElementById("order_nav")?.addEventListener("click", () => showSection("orderSection"));
document.getElementById("orderDetail_nav")?.addEventListener("click", () => showSection("orderDetailSection"));

window.showSection = showSection;


document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById('login-section');
    const usernameDisplay = document.getElementById('username-display');

    if (loginSection) loginSection.style.display = 'flex';
    if (contentWrapper) contentWrapper.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';

    ["homeSection", "customerSection", "itemSection", "orderSection", "orderDetailSection"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    if (usernameDisplay) usernameDisplay.textContent = '';
});

window.handleLoginSuccess = function (username) {
    const loginSection = document.getElementById('login-section');

    if (loginSection) loginSection.style.display = 'none';
    if (contentWrapper) contentWrapper.style.display = 'block';
    if (sidebar) sidebar.style.display = 'block';

    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) usernameDisplay.textContent = username;

    showSection("homeSection");
    if (window.DashboardController) {
        window.DashboardController.init();
    }
};
