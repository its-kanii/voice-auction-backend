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
  productId: {
    type: String, // matches with your product API (_id or id)
    required: true
  },
  highestBid: {
    user: String,
    amount: {
      type: Number,
      default: 0
    }
  },
  biddingHistory: [bidSchema],
  timeRemaining: {
    type: String,
    default: "3d"
  }
});

module.exports = mongoose.model("Auction", auctionSchema);





