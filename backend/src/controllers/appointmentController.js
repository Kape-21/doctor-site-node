const {
  getAppointmentsData,
  createAppointment,
} = require("../services/appointmentService");

function getAppointments(req, res) {
  const response = getAppointmentsData();

  res.status(200).json(response);
}

function createAppointmentController(req, res) {
  const response = createAppointment(req.body);

  res.status(201).json(response);
}

module.exports = {
  getAppointments,
  createAppointmentController,
};