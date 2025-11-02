const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("contentWrapper");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");

function showSection(sectionId){
    const sections = ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"];

    sections.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = "none";
    });

    const target = document.getElementById(sectionId);
    if(target) target.style.display = "block";

    contentWrapper.scrollTop = 0;

    document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
    const navLink = document.getElementById(sectionId.replace("Section","_nav"));
    if(navLink) navLink.classList.add("active");

    if(window.innerWidth <= 992 && sidebar.classList.contains("show-sidebar")) toggleSidebar();
}
function toggleSidebar(){
    sidebar.classList.toggle("show-sidebar");
    contentWrapper.classList.toggle("sidebar-pushed");
}

// Event listeners
sidebarToggleBtn.addEventListener("click", toggleSidebar);
document.getElementById("home_nav").addEventListener("click", ()=>showSection("homeSection"));
document.getElementById("customer_nav").addEventListener("click", ()=>showSection("customerSection"));
document.getElementById("item_nav").addEventListener("click", ()=>showSection("itemSection"));
document.getElementById("order_nav").addEventListener("click", ()=>showSection("orderSection"));
document.getElementById("orderDetail_nav").addEventListener("click", ()=>showSection("orderDetailSection"));

window.showSection = showSection;

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn === 'true'){
        const username = localStorage.getItem('username') || '';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('contentWrapper').style.display = 'block';
        if(sidebar) sidebar.style.display = 'block';
        document.getElementById('username-display').textContent = `Welcome, ${username}!`;
        showSection("homeSection");
    } else {
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('contentWrapper').style.display = 'none';
        if(sidebar) sidebar.style.display = 'none';
    }
});
