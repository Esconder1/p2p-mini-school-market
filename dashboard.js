// Simulate fetching user data from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const listings = JSON.parse(localStorage.getItem('listings')) || [];

window.onload = () => {
  // Display profile data
  if (user) {
    document.getElementById('profile-name').textContent = user.name || 'Unknown User';
    document.getElementById('profile-course').textContent = `${user.course || 'N/A'}, ${user.school || 'N/A'}`;
    document.getElementById('verified-badge').style.display = 'inline-block';
  } else {
    // If no user is logged in, redirect to login page
    window.location.href = 'login.html';
  }

  // Render active listings
  renderListings();

  // Check notifications
  checkNotifications();

  // Render analytics
  renderAnalytics();

  // Simulate a new message
  simulateMessageStats();

  // Render saved ads
  renderSavedAds();
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
            <button class="secondary-btn" onclick="saveAdToFavorites('${listing.id}')">Save</button>
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
fetch('http://localhost:5000/api/listings')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.dashboard-content');
    container.innerHTML = '';
    data.forEach(listing => {
      container.innerHTML += `
        <div class="dashboard-item">
          <img src="${listing.image}" alt="${listing.title}" />
          <h3>${listing.title}</h3>
          <p>$${listing.price}</p>
          <span>${listing.category}</span>
          <em>${listing.status || 'Available'}</em>
        </div>
      `;
    });
  })
  .catch(err => console.error('Error fetching listings:', err));

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  if (!email || !password) {
    alert('All fields are required!');
    return;
  }
  // Submit to backend here...
});

// Simulate notifications for messages, promotions, and ad activity
function checkNotifications() {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

  // Display notifications
  const notificationContainer = document.getElementById('notification-container');
  notificationContainer.innerHTML = '';

  if (notifications.length > 0) {
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notification-item');
      notificationItem.innerHTML = `
        <p>${notification.message}</p>
        <small>${new Date(notification.timestamp).toLocaleString()}</small>
      `;
      notificationContainer.appendChild(notificationItem);
    });
  } else {
    notificationContainer.innerHTML = '<p>No new notifications.</p>';
  }
}

// Simulate adding a new notification
function addNotification(message) {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.push({ message, timestamp: Date.now() });
  localStorage.setItem('notifications', JSON.stringify(notifications));
  checkNotifications();
}

// Example: Add a notification for a price drop
function simulatePriceDropNotification() {
  addNotification('Price drop alert: Your saved item "Laptop" is now $50 cheaper!');
}

// Example: Add a notification for ad approval
function simulateAdApprovalNotification() {
  addNotification('Your ad "Room for Rent" has been approved!');
}

// Example: Add a notification for a new message
function simulateNewMessageNotification() {
  addNotification('You have a new message from Jane Doe.');
}

// Call these functions to simulate notifications
simulatePriceDropNotification();
simulateAdApprovalNotification();
simulateNewMessageNotification();

// Render analytics for the user
function renderAnalytics() {
  const totalViews = listings.reduce((sum, listing) => sum + (listing.views || 0), 0);
  const totalMessages = JSON.parse(localStorage.getItem('messages'))?.length || 0;
  const promotedAds = listings.filter(listing => listing.isPromoted).length;

  document.getElementById('analytics-container').innerHTML = `
    <p>Total Ad Views: ${totalViews}</p>
    <p>Total Messages: ${totalMessages}</p>
    <p>Promoted Ads: ${promotedAds}</p>
  `;
}

// Increment views for a specific ad
function incrementAdViews(adId) {
  const ad = listings.find(listing => listing.id === adId);
  if (ad) {
    ad.views = (ad.views || 0) + 1;
    localStorage.setItem('listings', JSON.stringify(listings));
    renderAnalytics();
  }
}

// Simulate message statistics
function simulateMessageStats() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push({ sender: 'Jane Doe', content: 'Is this still available?', timestamp: Date.now() });
  localStorage.setItem('messages', JSON.stringify(messages));
  renderAnalytics();
}

// Render saved ads in the dashboard
function renderSavedAds() {
  const savedAds = JSON.parse(localStorage.getItem('savedAds')) || [];
  const savedAdsContainer = document.getElementById('saved-ads-grid');
  savedAdsContainer.innerHTML = '';

  if (savedAds.length > 0) {
    savedAds.forEach(ad => {
      const adCard = document.createElement('div');
      adCard.classList.add('listing-card');
      adCard.innerHTML = `
        <img src="${ad.image || 'placeholder.jpg'}" alt="Ad Image" />
        <div class="listing-content">
          <h3>${ad.title}</h3>
          <p>$${ad.price}</p>
          <small>${ad.category || 'Uncategorized'} - ${ad.condition || 'Unknown'}</small>
          <p>${ad.location || 'No location specified'}</p>
          <button class="secondary-btn" onclick="removeFromSavedAds('${ad.id}')">Remove</button>
        </div>
      `;
      savedAdsContainer.appendChild(adCard);
    });
  } else {
    savedAdsContainer.innerHTML = '<p>No saved ads yet. Start saving your favorite ads!</p>';
  }
}

// Save an ad to favorites
function saveAdToFavorites(adId) {
  const ad = listings.find(listing => listing.id === adId);
  if (ad) {
    const savedAds = JSON.parse(localStorage.getItem('savedAds')) || [];
    if (!savedAds.some(savedAd => savedAd.id === adId)) {
      savedAds.push(ad);
      localStorage.setItem('savedAds', JSON.stringify(savedAds));
      alert('Ad saved to favorites!');
    } else {
      alert('This ad is already in your favorites.');
    }
  }
}

// Remove an ad from favorites
function removeFromSavedAds(adId) {
  let savedAds = JSON.parse(localStorage.getItem('savedAds')) || [];
  savedAds = savedAds.filter(ad => ad.id !== adId);
  localStorage.setItem('savedAds', JSON.stringify(savedAds));
  renderSavedAds();
}
