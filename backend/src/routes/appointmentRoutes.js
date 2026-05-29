const express = require("express");

const {
  getAppointments,
  createAppointmentController,
} = require("../controllers/appointmentController");

const appointmentLoggerMiddleware = require(
  "../middleware/appointmentLoggerMiddleware"
);

const appointmentValidationMiddleware = require(
  "../middleware/appointmentValidationMiddleware"
);

const router = express.Router();

router.get(
  "/",
  appointmentLoggerMiddleware,
  getAppointments
);

router.post(
  "/",
  appointmentValidationMiddleware,
  createAppointmentController
);

module.exports = router;