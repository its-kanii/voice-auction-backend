require('dotenv').config();
const mongoose = require("mongoose");
const Auction = require("../models/Auction");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    return Auction.insertMany([
      {
        productId: "iPhone 14 Pro",
        highestBid: { user: "InitialUser", amount: 75000 },
        biddingHistory: [{ user: "InitialUser", amount: 75000, time: new Date() }],
        timeRemaining: "3d"
      },
      {
        productId: "MacBook Air M2",
        highestBid: { user: "InitialUser", amount: 95000 },
        biddingHistory: [{ user: "InitialUser", amount: 95000, time: new Date() }],
        timeRemaining: "5d"
      },
      {
        productId: "Sony Headphones",
        highestBid: { user: "InitialUser", amount: 9000 },
        biddingHistory: [{ user: "InitialUser", amount: 9000, time: new Date() }],
        timeRemaining: "1d"
      },
      {
        productId: "Nikon DSLR",
        highestBid: { user: "InitialUser", amount: 45000 },
        biddingHistory: [{ user: "InitialUser", amount: 45000, time: new Date() }],
        timeRemaining: "3d"
      }
    ]);
  })
  .then(() => {
    console.log("✅ Auctions seeded");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  });
