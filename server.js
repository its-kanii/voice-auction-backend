require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Auction = require("./models/Auction");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Needed to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// GET all auctions
app.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// GET single auction by ID
app.get("/api/auction/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    auction ? res.json(auction) : res.status(404).send("Auction not found");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// POST a new bid
app.post("/api/auction/:id/bid", async (req, res) => {
  const { user, amount } = req.body || {}; // 🛡 Safety check

  if (!user || !amount) {
    return res.status(400).send({ message: "Missing user or amount" });
  }

  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).send("Auction not found");

    if (amount > auction.highestBid.amount) {
      auction.highestBid = { user, amount };
      auction.biddingHistory.push({ user, amount, time: new Date() });
      await auction.save();

      console.log("🎯 Received Bid:", { user, amount });

      return res.send({ message: "Bid placed successfully" });
    } else {
      return res.status(400).send({ message: "Bid must be higher than current" });
    }
  } catch (err) {
    console.error("❌ Error processing bid:", err);
    res.status(500).send("Server Error");
  }
});


// GET dashboard data
app.get("/dashboard/data", async (req, res) => {
  try {
    const products = await Auction.find();
    res.json({ products });
  } catch (err) {
    res.status(500).send("Error fetching dashboard data");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});


