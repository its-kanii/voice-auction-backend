require("dotenv").config();
const mongoose = require("mongoose");
const Auction = require("../models/Auction");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedAuctions = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 chip",
    highestBid: { user: "VoiceUser", amount: 90000 },
    biddingHistory: [
      { user: "VoiceUser", amount: 90000 }
    ],
    timeRemaining: "5d"
  },
  {
    name: "MacBook Air",
    description: "M2 chip, 8GB RAM, 256GB SSD",
    highestBid: { user: "Kanimozhi", amount: 85000 },
    biddingHistory: [
      { user: "Kanimozhi", amount: 85000 }
    ],
    timeRemaining: "3d"
  }
];

async function seed() {
  await Auction.deleteMany({});
  await Auction.insertMany(seedAuctions);
  console.log("✅ Seeded mock auction data");
  mongoose.disconnect();
}

seed();
