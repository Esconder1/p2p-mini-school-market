document.addEventListener('DOMContentLoaded', () => {
  const navBar = `
    <nav class="navbar">
      <a href="index.html" class="logo">
        <img src="cd.jpg" alt="Student Classifieds Logo" class="logo-image" />
        Student Classifieds
      </a>
      <div class="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul class="nav-buttons">
        <li><a href="index.html">Home</a></li>
        <li><a href="post.html">Post an Ad</a></li>
        <li><a href="login.html">Log In</a></li>
        <li><a href="signup.html">Sign Up</a></li>
        <li><a href="dashboard.html">My Dashboard</a></li>
      </ul>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navBar);

  const hamburger = document.querySelector('.hamburger');
  const navButtons = document.querySelector('.nav-buttons');

  if (!navButtons) {
    console.error('Error: .nav-buttons element not found in the DOM.');
    return;
  }

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navButtons.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  const toggle = document.getElementById('themeToggle');

  // Theme toggle
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggle.checked = savedTheme === 'dark';
  }

  toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
});
