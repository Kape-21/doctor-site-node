const express = require("express");

const router = express.Router();

const {
  getAvailability,
} = require("../controllers/availabilityController");

console.log(getAvailability);

router.get("/", getAvailability);

module.exports = router;