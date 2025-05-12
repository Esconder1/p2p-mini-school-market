const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student-ads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Listing Schema
const ListingSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  category: String,
});

const Listing = mongoose.model('Listing', ListingSchema);

// Routes
app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// Optional: Add this to populate test data
app.post('/api/listings', async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save();
  res.json(listing);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
