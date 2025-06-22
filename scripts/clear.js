const mongoose = require('mongoose');
const Auction = require('../models/Auction');
require('dotenv').config();

async function clearAuctions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const result = await Auction.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} auctions`);

    process.exit();
  } catch (err) {
    console.error('❌ Error deleting auctions:', err);
    process.exit(1);
  }
}

clearAuctions();
