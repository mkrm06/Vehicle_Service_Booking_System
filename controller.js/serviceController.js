const ServiceCategory = require("../models/ServiceCategory");

// GET /api/services
const getServices = async (req, res) => {
  try {
    const services = await ServiceCategory.find().sort({ createdAt: -1 });
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/services (admin)
const addService = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await ServiceCategory.findOne({ name });
    if (exists) return res.status(409).json({ message: "Service already exists" });

    const service = await ServiceCategory.create({ name, description });
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getServices, addService };
