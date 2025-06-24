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

router.post('/bid', (req, res) => {
  const { productId, bidAmount } = req.body;

  // 🔄 Convert bidAmount to number (even if it's a string)
  const numericBid = Number(bidAmount);

  console.log("📥 Incoming bid:", {
    productId,
    bidAmount,
    numericBid,
    type: typeof bidAmount
  });

  // Check if it's a valid number
  if (isNaN(numericBid)) {
    return res.status(400).json({ message: 'Invalid bid amount.' });
  }

  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({ message: 'Bid amount must be higher than current bid.' });
  }

  // ✅ Update the bid
  product.currentBid = numericBid;

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});
