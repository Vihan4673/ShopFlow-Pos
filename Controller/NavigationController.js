const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("contentWrapper");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");

function showSection(sectionId){
    const sections = ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"];

    // Hide all sections
    sections.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = "none";
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if(target) target.style.display = "block";

    // Scroll to top
    contentWrapper.scrollTop = 0;

    // Activate nav link
    document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
    const navLink = document.getElementById(sectionId.replace("Section","_nav"));
    if(navLink) navLink.classList.add("active");

    // Auto-hide sidebar on small screens
    if(window.innerWidth <= 992 && sidebar.classList.contains("show-sidebar")) toggleSidebar();
}

function toggleSidebar(){
    sidebar.classList.toggle("show-sidebar");
    contentWrapper.classList.toggle("sidebar-pushed");
}

// Event listeners
if(sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", toggleSidebar);
document.getElementById("home_nav")?.addEventListener("click", ()=>showSection("homeSection"));
document.getElementById("customer_nav")?.addEventListener("click", ()=>showSection("customerSection"));
document.getElementById("item_nav")?.addEventListener("click", ()=>showSection("itemSection"));
document.getElementById("order_nav")?.addEventListener("click", ()=>showSection("orderSection"));
document.getElementById("orderDetail_nav")?.addEventListener("click", ()=>showSection("orderDetailSection"));

window.showSection = showSection;

// On page load, always show login first
document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById('login-section');
    const usernameDisplay = document.getElementById('username-display');

    if(loginSection) loginSection.style.display = 'flex';
    if(contentWrapper) contentWrapper.style.display = 'none';
    if(sidebar) sidebar.style.display = 'none';

    // Clear all sections
    ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = "none";
    });

    // Optional: clear username display
    if(usernameDisplay) usernameDisplay.textContent = '';
});
