const express = require('express');
const router = express.Router();

// 🛠 Mock DB — replace with your actual data store
const placedBids = []; // Add this at the top of the file if needed

// 🛠 Existing POST /bid route (update it to push into placedBids)
router.post('/bid', (req, res) => {
  const { productId, bidAmount, user = 'VoiceUser' } = req.body;
  const numericBid = Number(bidAmount);

  if (!productId || isNaN(numericBid)) {
    return res.status(400).json({ message: "Invalid bid amount." });
  }

  const product = products.find(p => p.productId === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (numericBid <= product.currentBid) {
    return res.status(400).json({ message: "Bid must be higher than current bid." });
  }

  product.currentBid = numericBid;

  // 🆕 Store the bid
  placedBids.push({ productId, user, amount: numericBid, time: new Date().toISOString() });

  res.json({
    message: `✅ Your bid of ₹${numericBid} for ${product.name} has been placed successfully.`,
    updatedProduct: product
  });
});

// 🆕 New Route: GET /bids?user=VoiceUser
router.get('/bids', (req, res) => {
  const { user = 'VoiceUser' } = req.query;
  const userBids = placedBids.filter(bid => bid.user === user);
  res.json(userBids);
});

module.exports = router;


