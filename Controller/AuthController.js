class AuthController {
    #users = [];

    constructor() {
        this.loginForm = document.getElementById('login-form');
        this.signupForm = document.getElementById('signup-form');
        this.loginSection = document.getElementById('auth-section'); // login/signup card
        this.contentWrapper = document.getElementById('contentWrapper');
        this.logoutButton = document.getElementById('logoutButton');
        this.usernameDisplay = document.getElementById('username-display');
        this.sidebar = document.getElementById('sidebar');
        this.authMsg = document.getElementById('auth-msg');

        this.init();
    }

    init() {
        if(this.loginForm) this.loginForm.addEventListener('submit', e => this.handleLogin(e));
        if(this.signupForm) this.signupForm.addEventListener('submit', e => this.handleSignup(e));

        // login/signup links
        document.getElementById('showSignup')?.addEventListener('click', e => this.showSignup(e));
        document.getElementById('showLogin')?.addEventListener('click', e => this.showLogin(e));

        // Logout
        if(this.logoutButton) this.logoutButton.addEventListener('click', () => this.handleLogout());

        this.contentWrapper.style.display = 'none';
        if(this.sidebar) this.sidebar.style.display = 'none';
        this.showLogin();
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const user = this.#users.find(u => u.username === username && u.password === password);

        if(user) {
            Swal.fire("Success", `Welcome ${username}!`, "success")
                .then(() => this.showPOS(username));
        } else {
            Swal.fire({ icon:'error', title:'Login Failed', text:'Invalid username or password!'});
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirm = document.getElementById('signup-confirm-password').value.trim();

        if(password !== confirm) return Swal.fire("Error","Passwords do not match","error");
        if(this.#users.some(u => u.username === username)) return Swal.fire("Error","Username already exists","error");

        this.#users.push({ username, password });
        Swal.fire("Success","Account created! You can now login","success");
        this.signupForm.reset();
        this.showLogin();
    }

    showLogin(e) {
        e?.preventDefault();

        this.loginForm.style.display = 'block';
        this.signupForm.style.display = 'none';
        this.authMsg.textContent = "Please sign in to continue";

        this.loginForm.reset();

        this.contentWrapper.style.display = 'none';
        if(this.sidebar) this.sidebar.style.display = 'none';

        this.loginSection.style.display = 'flex';
        this.loginSection.classList.add('d-flex', 'vh-100');
    }


    showPOS(username) {
        this.loginSection.style.display = 'none';
        this.loginSection.classList.remove('d-flex', 'vh-100');
        this.contentWrapper.style.display = 'block';
        if(this.sidebar) this.sidebar.style.display = 'block';

        // Display username
        if(this.usernameDisplay) this.usernameDisplay.textContent = `Welcome, ${username}!`;

        const sections = ["homeSection","customerSection","itemSection","orderSection","orderDetailSection"];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = id === "homeSection" ? "block" : "none";
        });

        document.querySelectorAll("#sidebar .nav-link").forEach(link => link.classList.remove("active"));
        const homeNav = document.getElementById("home_nav");
        if(homeNav) homeNav.classList.add("active");
    }

    handleLogout() {
        this.contentWrapper.style.display = 'none';
        if(this.sidebar) this.sidebar.style.display = 'none';

        this.loginSection.style.display = 'flex';
        this.loginSection.classList.add('d-flex', 'vh-100');
        this.loginForm.reset();
        this.showLogin();
    }


    showSignup(e) {
        e.preventDefault();
        this.loginForm.style.display = 'none';
        this.signupForm.style.display = 'block';
        this.authMsg.textContent = "Create a new account";
    }
}

window.authController = new AuthController();
export { AuthController };
