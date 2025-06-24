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

// 🧾 Bid history tracking
let bidHistory = [];

// GET /products - List all products
router.get('/products', (req, res) => {
  res.json(products);
});

// POST /bid - Place a new bid
router.post('/bid', (req, res) => {
  const { productId, bidAmount } = req.body;

  // 🪵 Debug log
  const numericBid = Number(bidAmount);
  console.log("📥 Incoming bid:", {
    productId,
    bidAmount,
    numericBid,
    type: typeof bidAmount
  });

  // Input validation
  if (!productId || isNaN(numericBid) || numericBid <= 0) {
    return res.status(400).json({ message: "Invalid bid amount." });
  }

  const product = products.find(p => p.productId === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({
      message: `Your bid must be higher than ₹${product.currentBid}.`
    });
  }

  // ✅ Update bid
  product.currentBid = numericBid;

  // 🧾 Store in bid history
  bidHistory.push({
    productId,
    bidAmount: numericBid,
    timestamp: new Date().toISOString()
  });

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

// GET /bids - View bid history
router.get('/bids', (req, res) => {
  res.json(bidHistory);
});

module.exports = router;












