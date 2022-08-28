const mongoose = require("mongoose");

const upcomingListingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  listingDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("UpcomingListings", upcomingListingsSchema);
