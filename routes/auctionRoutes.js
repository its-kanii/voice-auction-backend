const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");

// POST: Place a bid
router.post("/api/auctions/:id/bid", async (req, res) => {
  const { id } = req.params;
  const { user, amount } = req.body;

  try {
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    // Only accept higher bids
    if (amount <= auction.highestBid.amount) {
      return res.status(400).json({ message: "Bid too low" });
    }

    // Add to history and update highest
    auction.biddingHistory.push({ user, amount });
    auction.highestBid = { user, amount };

    await auction.save();
    res.json({ message: "Bid placed", auction });

  } catch (err) {
    res.status(500).json({ message: "Error placing bid" });
  }
});

module.exports = router;




