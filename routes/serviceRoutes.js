const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getServices, addService } = require("../controllers/serviceController");

router.get("/", getServices);
router.post("/", protect, adminOnly, addService);

module.exports = router;
