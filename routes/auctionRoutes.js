const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

// Helper to read products from JSON
function loadProducts() {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
}

// Helper to write updated products to JSON
function saveProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}

// GET all products
router.get('/products', (req, res) => {
  const products = loadProducts();
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

  const products = loadProducts();
  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({ message: 'Bid amount must be higher than current bid.' });
  }

  product.currentBid = numericBid;
  saveProducts(products);

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

module.exports = router;

