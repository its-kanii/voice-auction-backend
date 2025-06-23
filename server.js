require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const auctionRoutes = require("./routes/auctionRoutes"); // API routes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// API Routes
app.use(auctionRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🎯 Voice Auction API is Live!");
});

// Dashboard HTML
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Dashboard Data (used by dashboard.html)
app.get("/dashboard/data", async (req, res) => {
  try {
    const Auction = require("./models/Auction");
    const products = await Auction.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});









