const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  highestBid: {
    user: String,
    amount: Number
  },
  biddingHistory: [
    {
      user: String,
      amount: Number,
      time: { type: Date, default: Date.now }
    }
  ],
  timeRemaining: String // e.g., "3d"
});

module.exports = mongoose.model("Auction", auctionSchema);






