const express = require("express");
const router = express.Router(); // ✅ Define router first

const Auction = require("../models/Auction");

// Get all auctions
router.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching auctions" });
  }
});

// Place a bid
router.post("/api/auctions/:id/bid", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    const { user, amount } = req.body;

    // Check if new bid is higher
    if (amount <= auction.highestBid.amount) {
      return res.status(400).json({ message: "Bid must be higher than current highest bid" });
    }

    // Update auction
    auction.highestBid = { user, amount };
    auction.biddingHistory.push({ user, amount });
    await auction.save();

    res.json({ message: "Bid placed successfully", auction });
  } catch (err) {
    res.status(500).json({ message: "Error placing bid" });
  }
});

// Export the router
module.exports = router;



