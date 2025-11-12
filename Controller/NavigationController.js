
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("contentWrapper");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");

function showSection(sectionId) {
    const sections = ["homeSection", "customerSection", "itemSection", "orderSection", "orderDetailSection"];

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";

    if (contentWrapper) contentWrapper.scrollTop = 0;

    document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
    const navLink = document.getElementById(sectionId.replace("Section", "_nav"));
    if (navLink) navLink.classList.add("active");

    if (window.innerWidth <= 992 && sidebar.classList.contains("show-sidebar")) {
        toggleSidebar();
    }

    if (sectionId === "homeSection" && window.DashboardController) {
        window.DashboardController.updateDashboard();
    }
}

// ------------------------- Toggle Sidebar -------------------------
function toggleSidebar() {
    sidebar.classList.toggle("show-sidebar");
    contentWrapper.classList.toggle("sidebar-pushed");

    if (sidebarToggleBtn) {
        const icon = sidebarToggleBtn.querySelector("i");
        if (icon) icon.classList.toggle("fa-bars");
        if (icon) icon.classList.toggle("fa-xmark");
    }
}

document.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
        if (sidebar.classList.contains("show-sidebar") &&
            !sidebar.contains(e.target) &&
            !sidebarToggleBtn.contains(e.target)) {
            toggleSidebar();
        }
    }
});

// ------------------------- Responsive Handling -------------------------
function handleResize() {
    if (!sidebar || !contentWrapper || !sidebarToggleBtn) return;

    const authSection = document.getElementById("auth-section");
    if (authSection && authSection.style.display !== "none") {
        sidebar.style.display = "none";
        contentWrapper.style.display = "none";
        sidebarToggleBtn.style.display = "none";
        return;
    }
    if (window.innerWidth > 992) {
        sidebar.classList.remove("show-sidebar");
        contentWrapper.classList.add("sidebar-pushed");
        sidebarToggleBtn.style.display = "none";
    } else {
        contentWrapper.classList.remove("sidebar-pushed");
        sidebar.classList.remove("show-sidebar");
        sidebarToggleBtn.style.display = "block";
    }
}
window.addEventListener("resize", handleResize);

if (sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", toggleSidebar);

// ------------------------- Navigation Links -------------------------
document.getElementById("home_nav")?.addEventListener("click", () => showSection("homeSection"));
document.getElementById("customer_nav")?.addEventListener("click", () => showSection("customerSection"));
document.getElementById("item_nav")?.addEventListener("click", () => showSection("itemSection"));
document.getElementById("order_nav")?.addEventListener("click", () => showSection("orderSection"));
document.getElementById("orderDetail_nav")?.addEventListener("click", () => showSection("orderDetailSection"));

window.showSection = showSection;

document.addEventListener("DOMContentLoaded", () => {
    const authSection = document.getElementById("auth-section");

    if (authSection && authSection.style.display !== "none") {
        if (sidebar) sidebar.style.display = "none";
        if (contentWrapper) contentWrapper.style.display = "none";
        if (sidebarToggleBtn) sidebarToggleBtn.style.display = "none";
    } else {
        if (sidebar) sidebar.style.display = "block";
        if (contentWrapper) contentWrapper.style.display = "block";
        handleResize();
        showSection("homeSection");
    }
});
