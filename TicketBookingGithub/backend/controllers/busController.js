const Bus = require("../models/Bus");

//  get all buses

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({}).populate({
      path: "createdBy",
      select: "username email",
    });
    if (!buses) {
      return res.status(400).json({ error: "No buses Avaliable" });
    }
    return res.status(200).json({ buses });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create a bus

const createBus = async (req, res) => {
  try {
    const { busNumber, createdBy, totalSeats, ticketPrice } = req.body;
    if (!busNumber || !createdBy || !totalSeats || !ticketPrice) {
      return res.status(400).json({ error: "All fields required" });
    }
    const bus = await Bus.create({
      busNumber,
      createdBy,
      totalSeats,
      ticketPrice,
    });
    return res.status(200).json({ message: "New bus has been created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBus,
  getAllBuses,
};
