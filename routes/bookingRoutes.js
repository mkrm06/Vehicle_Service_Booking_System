const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  updateStatus,
  deleteBooking,
} = require("../controllers/bookingController");

// public booking create
router.post("/", createBooking);

// admin only
router.get("/", protect, adminOnly, getAllBookings);
router.put("/:id/status", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, deleteBooking);

module.exports = router;
