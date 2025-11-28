const BASE_URL = "http://localhost:3000/api/v1";

function updateNav() {
    const navLinks = document.getElementById('nav-links');
    const token = localStorage.getItem('token');

    if (token) {
        // Check if admin or user (simple check, ideally decode token or store role)
        // For now, we'll just show "Logout" and maybe "My Courses"
        // Since we don't store role in localStorage, we might need to infer or just show generic links

        // Let's assume if they are on admin pages they are admin, but for the main nav:
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="purchases.html">My Purchases</a>
            <a href="#" onclick="logout()">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="user-signin.html">User Login</a>
            <a href="user-signup.html">User Signup</a>
            <a href="admin-signin.html">Admin Login</a>
            <a href="admin-signup.html">Admin Signup</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
