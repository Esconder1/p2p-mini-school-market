document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isSeller = document.getElementById('isSeller').checked;

  if (!name || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  // Simulate backend logic here (e.g., storing user details)
  localStorage.setItem('user', JSON.stringify({ name, email, password, isSeller }));

  alert("Sign up successful!");
  window.location.href = "login.html"; // Redirect to login page
});
