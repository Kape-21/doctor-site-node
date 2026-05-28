const express = require("express");

const router = express.Router();

const {
  getAppointments,
} = require("../controllers/appointmentController");

console.log(getAppointments);

router.get("/", getAppointments);

module.exports = router;