const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");

// GET all auctions
router.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching auctions" });
  }
});

// GET data for dashboard
router.get("/dashboard/data", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json({ products: auctions });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

// POST a new bid
router.post("/api/auctions/:id/bid", async (req, res) => {
  const { user, amount } = req.body;
  const { id } = req.params;

  try {
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    // Update bidding history
    auction.biddingHistory.push({ user, amount, time: new Date() });

    // Update highest bid if new amount is higher
    if (!auction.highestBid || amount > auction.highestBid.amount) {
      auction.highestBid = { user, amount };
    }

    await auction.save();

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (err) {
    res.status(500).json({ message: "Error placing bid", error: err.message });
  }
});

module.exports = router;
