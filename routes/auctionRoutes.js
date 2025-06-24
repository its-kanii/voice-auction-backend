// routes/auctionRoutes.js
const express = require('express');
const router = express.Router();

// In-memory products list
let products = [
  {
    productId: "P001",
    name: "iPhone 15 Pro",
    description: "Latest Apple flagship phone",
    startingPrice: 75000,
    currentBid: 78000
  },
  {
    productId: "P002",
    name: "MacBook Pro",
    description: "Apple M2 13-inch laptop",
    startingPrice: 120000,
    currentBid: 124000
  }
];

// GET /products
router.get('/products', (req, res) => {
  res.json(products);
});

// POST /bid
router.post('/bid', (req, res) => {
  const { productId, bidAmount } = req.body;

  const product = products.find(p => p.productId === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (bidAmount <= product.currentBid) {
    return res.status(400).json({
      message: `Your bid must be higher than ₹${product.currentBid}.`
    });
  }

  product.currentBid = bidAmount;

  res.json({
    message: `✅ Your bid of ₹${bidAmount} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

module.exports = router;









