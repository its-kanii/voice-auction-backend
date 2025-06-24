// routes/auctionRoutes.js
const express = require('express');
const router = express.Router();

// ✅ Define GET /products
router.get('/products', (req, res) => {
  res.json([
    {
      productId: 'P001',
      name: 'iPhone 15 Pro',
      description: 'Latest Apple flagship phone',
      startingPrice: 75000,
      currentBid: 78000
    },
    {
      productId: 'P002',
      name: 'MacBook Pro',
      description: 'Apple M2 13-inch laptop',
      startingPrice: 120000,
      currentBid: 124000
    }
  ]);
});

module.exports = router;







