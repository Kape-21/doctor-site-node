const {
  successResponse,
} = require("../utils/apiResponse");

function getAvailabilityData() {
  return successResponse(
    "Availability fetched successfully",
    []
  );
}

module.exports = {
  getAvailabilityData,
};