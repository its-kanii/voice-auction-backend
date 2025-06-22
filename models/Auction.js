const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  user: String,
  amount: Number,
  time: {
    type: Date,
    default: Date.now
  }
});

const auctionSchema = new mongoose.Schema({
  name: String,
  description: String,
  highestBid: {
    user: String,
    amount: {
      type: Number,
      default: 0
    }
  },
  biddingHistory: [bidSchema],
  timeRemaining: String // e.g., "5d", "2h"
});

module.exports = mongoose.model("Auction", auctionSchema);



