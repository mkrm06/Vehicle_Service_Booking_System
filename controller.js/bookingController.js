const Booking = require("../models/Booking");

// POST /api/bookings (customer)
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (date) filter.date = date;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bookings/:id/status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Status updated", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, getAllBookings, updateStatus, deleteBooking };
