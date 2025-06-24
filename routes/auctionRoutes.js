const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

// Utility to load products
function loadProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
}

// Utility to save products
function saveProducts(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// GET /products
router.get('/products', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// POST /bid
router.post('/bid', (req, res) => {
  const { productId, bidAmount } = req.body;
  const numericBid = parseFloat(bidAmount);

  if (!productId || isNaN(numericBid)) {
    return res.status(400).json({ message: 'Invalid request data.' });
  }

  const products = loadProducts();
  const product = products.find(p => p.productId === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({ message: 'Invalid bid amount.' });
  }

  product.currentBid = numericBid;
  saveProducts(products);

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

module.exports = router;







