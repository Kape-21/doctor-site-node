const {
  getAvailabilityData,
} = require("../services/availabilityService");

function getAvailability(req, res) {
  const result = getAvailabilityData();

  res.json(result);
}

module.exports = {
  getAvailability,
};