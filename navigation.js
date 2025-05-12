const navBar = `
  <nav>
    <ul class="nav-buttons">
      <li><a href="index.html">Home</a></li>
      <li><a href="post.html">Post an Ad</a></li>
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Sign Up</a></li>
      <li><a href="terms.html">Terms & Legal</a></li>
    </ul>
    <div class="hamburger">☰</div>
  </nav>
`;

document.body.insertAdjacentHTML("afterbegin", navBar);

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navButtons = document.querySelector('.nav-buttons');
  const toggle = document.getElementById('themeToggle');

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navButtons.classList.toggle('active');
  });

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
