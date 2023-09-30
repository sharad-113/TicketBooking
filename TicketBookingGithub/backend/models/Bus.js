const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalSeats: {
    type: String,
    required: true,
  },
  seatBooked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
