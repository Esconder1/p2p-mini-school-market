// theme-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
  
    // Set the initial theme from localStorage
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
  