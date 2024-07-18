
// Helper function to get users from localStorage
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to localStorage
function saveUsersToStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registration
document.addEventListener('DOMContentLoaded', function() {
    let registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let nameInput = document.getElementById('name');
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');

            let name = nameInput.value.trim();
            let email = emailInput.value.trim();
            let password = passwordInput.value.trim();

            // Validate name
            let nameValid = name.length > 0;
            nameInput.style.borderColor = nameValid ? 'green' : 'red';

            // Validate email
            let emailValid = /\S+@\S+\.\S+/.test(email);
            emailInput.style.borderColor = emailValid ? 'green' : 'red';

            // Validate password
            let passwordValid = password.length >= 8 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
            passwordInput.style.borderColor = passwordValid ? 'green' : 'red';

            // Check if all fields are valid
            if (nameValid && emailValid && passwordValid) {
                let users = getUsersFromStorage();

                // Check if email is already registered
                if (users.find(user => user.email === email)) {
                    document.getElementById('registrationMessage').textContent = 'This email is already registered.';
                    emailInput.style.borderColor = 'red';
                } else {
                    // Register user
                    users.push({ name, email, password });
                    saveUsersToStorage(users);
                    document.getElementById('registrationMessage').textContent = 'Registration successful!';
                    emailInput.style.borderColor = 'green';
                    // Redirect to login page
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }
            } else {
                document.getElementById('registrationMessage').textContent = 'Please fix the errors in the form.';
            }
        });
    }

    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;

            let users = getUsersFromStorage();

            // Check user credentials
            let user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // Store user session
                localStorage.setItem('user', JSON.stringify(user));
                // Redirect to home page
                window.location.href = 'home.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Invalid email or password.';
            }
        });
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        let usernameSpan = document.getElementById('username');
        if (usernameSpan) {
            usernameSpan.textContent = user.name;
        }

        let logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                // Clear user session
                localStorage.removeItem('user');
                // Redirect to login
                window.location.href = 'login.html';
            });
        }
    } else {
        if (window.location.pathname.endsWith('home.html')) {
            // Redirect to login if not logged in
            window.location.href = 'login.html';
        }
    }
});

