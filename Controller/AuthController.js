class AuthController {
    #validCredentials = { username: 'vihan', password: '1234' };

    constructor() {
        this.loginForm = document.getElementById('login-form');
        this.loginSection = document.getElementById('login-section');
        this.contentWrapper = document.getElementById('contentWrapper');
        this.logoutButton = document.getElementById('logoutButton');
        this.usernameDisplay = document.getElementById('username-display');
        this.sidebar = document.getElementById('sidebar');

        this.init();
    }

    init() {
        if(this.loginForm) this.loginForm.addEventListener('submit', e => this.handleLogin(e));
        if(this.logoutButton) this.logoutButton.addEventListener('click', () => this.handleLogout());
        this.checkAuthStatus();
    }

    handleLogin(e){
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if(username === this.#validCredentials.username && password === this.#validCredentials.password){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            this.showPOS(username);
        } else {
            Swal.fire({ icon:'error', title:'Login Failed', text:'Invalid username or password!'});
        }
    }

    handleLogout(){
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        this.showLogin();
    }

    checkAuthStatus(){
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const username = localStorage.getItem('username');
        if(isLoggedIn === 'true' && username) this.showPOS(username);
        else this.showLogin();
    }

    showPOS(username){
        // Show dashboard
        this.loginSection.style.display = 'none';
        this.contentWrapper.style.display = 'block';
        if(this.sidebar) this.sidebar.style.display = 'block';
        this.contentWrapper.classList.add("sidebar-pushed");
        if(this.usernameDisplay) this.usernameDisplay.textContent = `Welcome, ${username}!`;

        // Show home section, hide others
        const sections = ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = id === "homeSection" ? "block" : "none";
        });

        // Activate home nav
        document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
        const homeNav = document.getElementById("home_nav");
        if(homeNav) homeNav.classList.add("active");
    }

    showLogin(){
        this.contentWrapper.style.display = 'none';
        this.loginSection.style.display = 'flex';
        if(this.loginForm) this.loginForm.reset();
        if(this.sidebar) this.sidebar.style.display = 'none';
        this.contentWrapper.classList.remove("sidebar-pushed");

        // Hide all sections
        const sections = ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = "none";
        });
    }
}

window.authController = new AuthController();
export { AuthController };
