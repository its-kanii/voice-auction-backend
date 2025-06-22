router.post("/api/auctions/:id/bid", async (req, res) => {
  const { id } = req.params;
  const { user, amount } = req.body;
  const io = req.app.get("io");

  try {
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    // Update logic
    if (amount > auction.highestBid.amount) {
      auction.highestBid = { user, amount };
      auction.biddingHistory.push({ user, amount });
      await auction.save();

      io.emit("auctionUpdated", auction); // 🔥 Broadcast updated auction
      return res.json({ message: "Bid placed", auction });
    }

    return res.status(400).json({ message: "Bid too low" });
  } catch (err) {
    res.status(500).json({ message: "Error placing bid" });
  }
});


