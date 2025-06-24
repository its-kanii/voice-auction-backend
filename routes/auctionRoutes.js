const express = require('express');
const router = express.Router();

const products = [
  {
    productId: 'P001',
    name: 'iPhone 15 Pro',
    description: 'Latest Apple flagship phone',
    startingPrice: 75000,
    currentBid: 78000,
  },
  {
    productId: 'P002',
    name: 'MacBook Pro',
    description: 'Apple M2 13-inch laptop',
    startingPrice: 120000,
    currentBid: 124000,
  }
];

// GET all products
router.get('/products', (req, res) => {
  res.json(products);
});

// POST a bid
router.post('/bid', (req, res) => {
  const { productId, bidAmount } = req.body;
  const numericBid = Number(bidAmount);

  console.log("📥 Incoming bid:", {
    productId,
    bidAmount,
    numericBid,
    type: typeof bidAmount,
  });

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

  product.currentBid = numericBid;

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

module.exports = router;

