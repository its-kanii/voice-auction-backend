const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, default: 'No description available' },
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
  timeRemaining: String
});

module.exports = mongoose.model('Auction', auctionSchema);









