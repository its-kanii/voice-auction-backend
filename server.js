require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import auction routes
const auctionRoutes = require('./routes/auctionRoutes');

// ✅ Mount at root or preferred base path
app.use('/', auctionRoutes);  // So /products works
// OR
// app.use('/api', auctionRoutes); // Then you'd call /api/products

app.get('/', (req, res) => {
  res.send('Voice Auction Backend Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









