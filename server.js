require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Auction = require("./models/Auction");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// GET all auctions
app.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    console.error("❌ Fetch Error:", error.message);
    res.status(500).json({ message: "Error fetching auctions" });
  }
});

// GET auction by ID
app.get("/api/auction/:id", async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  auction ? res.json(auction) : res.status(404).send("Auction not found");
});

// POST a bid
app.post("/api/auction/:id/bid", async (req, res) => {
  const { user, amount } = req.body;
  const auction = await Auction.findById(req.params.id);

  if (!auction) return res.status(404).send("Auction not found");

  if (amount > auction.highestBid.amount) {
    auction.highestBid = { user, amount };
    auction.biddingHistory.push({ user, amount, time: new Date() });
    await auction.save();
    res.send({ message: "Bid placed successfully" });
  } else {
    res.status(400).send({ message: "Bid must be higher than current" });
  }
});

// Dashboard endpoint
app.get("/dashboard/data", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json({ products: auctions });
  } catch (error) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});



