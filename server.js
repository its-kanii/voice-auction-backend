// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http"); // New
const { Server } = require("socket.io"); // New

const auctionRoutes = require("./routes/auctionRoutes");
const Auction = require("./models/Auction");

const app = express();
const server = http.createServer(app); // New
const io = new Server(server); // New

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// Attach io to app for routes to use
app.set("io", io);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.use(auctionRoutes);

app.get("/", (req, res) => {
  res.send("🎯 Voice Auction API is Live!");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

server.listen(PORT, () => {
  console.log(`🚀 Auction server running at http://localhost:${PORT}`);
});








