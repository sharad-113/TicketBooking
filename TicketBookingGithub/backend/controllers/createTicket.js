const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Bus = require("../models/Bus");
const mongoose = require("mongoose");

//  create a new ticket
const createTicket = async function (req, res) {
  const { description, price, date, time } = req.body;
  console.log("by request body", req.body);
  console.log(req.params);
  try {
    if (!description || !price || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const { userId, busId } = req.params;
    console.log("here is user Id and bus Id", userId, busId);
    // myDataBase.find({ _id: new ObjectId(req.query.userId) });
    // await User.findOne({ _id: mongoose.Types.ObjectId(id) });

    const bus = await Bus.findById(busId);
    console.log("Bus is ", bus);
    const user = await User.findById(userId);
    console.log("User is ", user);
    if (!user) {
      return res.status(400).json({ error: "Unauthorized user" });
    } else if (!bus) {
      return res.status(400).json({ error: "Invalid Bus id" });
    } else if (Number(bus.seatBooked.length) >= Number(bus.totalSeats)) {
      return res.status(400).json({ error: "Seats are full" });
    }
    console.log(user._id, bus._id, description, price, date, time);

    const ticket = await Ticket.create({
      user: user._id,
      busId: bus._id,
      description,
      price,
      date,
      time,
    });
    user.tickets.push(ticket._id);
    await user.save();
    bus.seatBooked.push(ticket._id);
    await bus.save();
    const newUser = await user.populate({
      path: "tickets",
      populate: {
        path: "busId",
      },
    });
    console.log(newUser);
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        tickets: newUser.tickets,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTicket;
