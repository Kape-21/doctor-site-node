const getAppointments = (req, res) => {
  res.json({
    success: true,
    message: "Appointment controller is working",
  });
};

module.exports = {
  getAppointments,
};