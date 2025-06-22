require('dotenv').config();
const mongoose = require('mongoose');
const Auction = require('../models/Auction');
const dotenv = require('dotenv');
dotenv.config();

const seedAuctions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    await Auction.deleteMany();

    await Auction.insertMany([
      {
        productName: 'iPhone 15',
        productDescription: 'Apple iPhone 15 - 128GB, Midnight Black',
        highestBid: { user: 'InitialUser', amount: 90000 },
        biddingHistory: [
          { user: 'InitialUser', amount: 90000 }
        ],
        timeRemaining: '5d'
      },
      {
        productName: 'MacBook Air',
        productDescription: 'Apple M2, 256GB SSD, 13.6" Display',
        highestBid: { user: 'InitialUser', amount: 105000 },
        biddingHistory: [
          { user: 'InitialUser', amount: 105000 }
        ],
        timeRemaining: '3d'
      },
      {
        productName: 'AirPods Pro',
        productDescription: 'Apple AirPods Pro with MagSafe Case',
        highestBid: { user: 'InitialUser', amount: 25000 },
        biddingHistory: [
          { user: 'InitialUser', amount: 25000 }
        ],
        timeRemaining: '2d'
      },
      {
        productName: 'Samsung TV 43"',
        productDescription: 'Samsung Smart LED TV - 43 inch UHD',
        highestBid: { user: 'InitialUser', amount: 48000 },
        biddingHistory: [
          { user: 'InitialUser', amount: 48000 }
        ],
        timeRemaining: '4d'
      },
      {
        productName: 'Canon DSLR',
        productDescription: 'Canon EOS 1500D Digital SLR Camera',
        highestBid: { user: 'InitialUser', amount: 60000 },
        biddingHistory: [
          { user: 'InitialUser', amount: 60000 }
        ],
        timeRemaining: '3d'
      }
    ]);

    console.log('✅ Auctions seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedAuctions();




