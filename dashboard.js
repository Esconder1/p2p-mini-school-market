// Simulate fetching user data from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const listings = JSON.parse(localStorage.getItem('listings')) || [];

window.onload = () => {
  // Display profile data
  if (user) {
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-course').textContent = `${user.course}, ${user.school}`;
    document.getElementById('verified-badge').style.display = 'inline-block';
  } else {
    // If no user is logged in, redirect to login page
    window.location.href = 'login.html';
  }

  // Render active listings
  renderListings();
};

// Render the user's listings on the dashboard
function renderListings() {
  const listingGrid = document.getElementById('listing-grid');
  listingGrid.innerHTML = ''; // Clear any existing listings

  if (listings.length > 0) {
    listings.forEach(listing => {
      const listingCard = document.createElement('div');
      listingCard.classList.add('listing-card');

      listingCard.innerHTML = `
        <img src="${listing.image}" alt="Listing Image" />
        <div class="listing-content">
          <h3>${listing.title}</h3>
          <p>$${listing.price}</p>
          <span class="badge ${listing.status.toLowerCase()}">${listing.status}</span>
          <small>${listing.category}</small>
          <div class="listing-actions">
            <button class="secondary-btn" onclick="editListing('${listing.id}')">Edit</button>
            <button class="secondary-btn" onclick="deleteListing('${listing.id}')">Delete</button>
          </div>
        </div>
      `;
      listingGrid.appendChild(listingCard);
    });
  } else {
    listingGrid.innerHTML = '<p>No active listings found. Start posting!</p>';
  }
}

// Handle deleting a listing
function deleteListing(id) {
  const index = listings.findIndex(listing => listing.id === id);
  if (index !== -1) {
    listings.splice(index, 1);
    localStorage.setItem('listings', JSON.stringify(listings)); // Save updated listings
    renderListings(); // Re-render the listings
  }
}

// Handle editing a listing
function editListing(id) {
  // Simulate navigating to edit page (use real navigation in production)
  alert(`Redirecting to edit page for listing ${id}`);
  // You can implement an actual edit page with pre-filled data here
}
