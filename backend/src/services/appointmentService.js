const {
  successResponse,
} = require("../utils/apiResponse");

function getAppointmentsData() {
  return successResponse(
    "Appointments fetched successfully",
    []
  );
}

function createAppointment(appointmentData) {
  console.log("Service received:", appointmentData);

  return successResponse(
    "Appointment data received",
    appointmentData
  );
}

module.exports = {
  getAppointmentsData,
  createAppointment,
};