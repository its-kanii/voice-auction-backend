const express = require('express');
const router = express.Router();

// In-memory product list
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

  // Convert to number (in case it's sent as a string)
  const numericBid = Number(bidAmount);

  const product = products.find(p => p.productId === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (!numericBid || isNaN(numericBid)) {
    return res.status(400).json({ message: "Invalid bid amount." });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({
      message: `Your bid must be higher than ₹${product.currentBid}.`
    });
  }

  product.currentBid = numericBid;

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

module.exports = router;










