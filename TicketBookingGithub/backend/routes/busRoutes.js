const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { createBus, getAllBuses } = require("../controllers/busController");
router.use(requireAuth);

router.route("/users/:userId/buses").get(getAllBuses).post(createBus);

module.exports = router;
