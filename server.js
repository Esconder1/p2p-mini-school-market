const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'max-age=3600, public');
  next();
});

app.use(express.static('public')); // Serve static files

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});