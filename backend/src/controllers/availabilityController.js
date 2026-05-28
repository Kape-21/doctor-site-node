const getAvailability = (req, res) => {
  res.json({
    success: true,
    message: "Availability controller is working",
  });
};

module.exports = {
  getAvailability,
};