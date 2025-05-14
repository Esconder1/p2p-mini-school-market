document.addEventListener('DOMContentLoaded', () => {
  const navBar = `
    <nav class="navbar">
      <div class="nav-container">
        <a href="index.html" class="brand">OkoMarket</a>
        <ul class="nav-links">
          <li><a href="index.html" class="${window.location.pathname.includes('index.html') ? 'active' : ''}">Home</a></li>
          <li><a href="ads.html" class="${window.location.pathname.includes('ads.html') ? 'active' : ''}">Browse Ads</a></li>
          <li><a href="post.html" class="${window.location.pathname.includes('post.html') ? 'active' : ''}">Post Ad</a></li>
          <li><a href="login.html" class="${window.location.pathname.includes('login.html') ? 'active' : ''}">Login</a></li>
          <li><a href="signup.html" class="${window.location.pathname.includes('signup.html') ? 'active' : ''}">Sign Up</a></li>
          <li><a href="dashboard.html" class="${window.location.pathname.includes('dashboard.html') ? 'active' : ''}">Dashboard</a></li>
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
});
