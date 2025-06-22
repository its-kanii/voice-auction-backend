require('dotenv').config();
const mongoose = require("mongoose");
const axios = require("axios");
const Auction = require("../models/Auction");

const MONGO_URI = process.env.MONGO_URI;
const PRODUCT_API = "http://localhost:8000/api/items"; // Replace with your actual deployed URL if needed

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Clear existing auctions
    await Auction.deleteMany({});

    // Fetch products from external API
    const { data: products } = await axios.get(PRODUCT_API);

    const auctionDocs = products.map((item, index) => ({
      productId: item._id || item.id,
      highestBid: {
        user: "InitialUser",
        amount: 50000 + index * 5000
      },
      biddingHistory: [
        {
          user: "InitialUser",
          amount: 50000 + index * 5000
        }
      ],
      timeRemaining: `${3 + index}d`
    }));

    await Auction.insertMany(auctionDocs);
    console.log("✅ Seeded Auctions:", auctionDocs.length);

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Seeding Error:", err);
    mongoose.disconnect();
  });
