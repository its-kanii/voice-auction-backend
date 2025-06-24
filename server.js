const express = require('express');
const path = require('path');
const auctionRoutes = require('./routes/auctionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve public dashboard
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', auctionRoutes);

// Default home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});













