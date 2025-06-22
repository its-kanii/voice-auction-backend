require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Auction = require("./models/Auction");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("🎯 Voice Auction API is Live!");
});

// Get all auctions
app.get("/api/auctions", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching auctions" });
  }
});

// Dashboard data route
app.get("/dashboard/data", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json({ products: auctions });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

// Serve dashboard HTML
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});






