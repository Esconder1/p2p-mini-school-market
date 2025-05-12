document.addEventListener('DOMContentLoaded', () => {
  const navBar = `
    <nav class="navbar">
      <div class="nav-container">
        <a href="index.html" class="brand">OkoMarket</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="ads.html">Browse Ads</a></li>
          <li><a href="post.html">Post Ad</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="signup.html">Sign Up</a></li>
          <li><a href="dashboard.html">Dashboard</a></li>
        </ul>
        <div class="search-bar">
          <input type="text" placeholder="Search ads..." />
          <button>Search</button>
        </div>
      </div>
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
