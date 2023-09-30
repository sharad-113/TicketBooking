const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bus",
  },
});
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
