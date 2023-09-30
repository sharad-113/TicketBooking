const express = require("express");
const router = express.Router();
const createTicket = require("../controllers/createTicket");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

//  create a new ticket
router.route("/users/:userId/buses/:busId/tickets").post(createTicket);

module.exports = router;
