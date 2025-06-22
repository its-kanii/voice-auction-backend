require("dotenv").config();
const mongoose = require("mongoose");
const Auction = require("../models/Auction");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection error:", err));

const seedData = [
  {
    productName: "Mobile",
    productDescription: "Latest smartphone with powerful features.",
    highestBid: { user: "InitialUser", amount: 50000 },
    biddingHistory: [{ user: "InitialUser", amount: 50000 }],
    timeRemaining: "3d"
  },
  {
    productName: "Laptop",
    productDescription: "High-performance laptop for work and gaming.",
    highestBid: { user: "InitialUser", amount: 70000 },
    biddingHistory: [{ user: "InitialUser", amount: 70000 }],
    timeRemaining: "5d"
  }
];

const seedAuctions = async () => {
  await Auction.deleteMany();
  const auctions = await Auction.insertMany(seedData);
  console.log("✅ Auctions Seeded:", auctions.length);
  mongoose.disconnect();
};

seedAuctions();
