require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const Auction = require("./models/Auction");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// 🟩 GET all auctions with external product info
app.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    const productRes = await axios.get('https://product-api-slik.onrender.com/api/items');

    const products = productRes.data;

    const result = auctions.map(auction => {
      const product = products.find(p =>
        p._id === auction.productId || p.id === auction.productId
      );

      return {
        _id: auction._id,
        productId: auction.productId,
        productName: product?.name || "Unknown Product",
        productDescription: product?.description || "No description available",
        highestBid: auction.highestBid,
        biddingHistory: auction.biddingHistory,
        timeRemaining: auction.timeRemaining,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching auctions:", error.message);
    res.status(500).json({ message: "Error fetching auctions or products" });
  }
});

// 🟨 GET auction by ID
app.get("/api/auction/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    auction ? res.json(auction) : res.status(404).send("Auction not found");
  } catch (error) {
    res.status(500).send("Error retrieving auction");
  }
});

// 🟦 POST bid
app.post("/api/auction/:id/bid", async (req, res) => {
  const { user, amount } = req.body;

  try {
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
  } catch (error) {
    console.error("❌ Bid error:", error.message);
    res.status(500).json({ message: "Error placing bid" });
  }
});

// 🟧 Dashboard Endpoint
app.get("/dashboard/data", async (req, res) => {
  try {
    const auctions = await Auction.find();
    const productRes = await axios.get('https://product-api-slik.onrender.com/api/items');
    const products = productRes.data;

    const result = auctions.map(auction => {
      const product = products.find(p =>
        p._id === auction.productId || p.id === auction.productId
      );

      return {
        _id: auction._id,
        productId: auction.productId,
        productName: product?.name || "Unknown Product",
        productDescription: product?.description || "No description available",
        highestBid: auction.highestBid,
        biddingHistory: auction.biddingHistory,
        timeRemaining: auction.timeRemaining,
      };
    });

    res.json({ products: result });
  } catch (error) {
    console.error("❌ Dashboard error:", error.message);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

// 🟫 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});


