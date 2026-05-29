const {
  successResponse,
} = require("../utils/apiResponse");

function getInquiriesData() {
  return successResponse(
    "Inquiries fetched successfully",
    []
  );
}

module.exports = {
  getInquiriesData,
};