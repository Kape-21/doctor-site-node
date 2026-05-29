const {
  successResponse,
} = require("../utils/apiResponse");

function getAdminData() {
  return successResponse(
    "Admin data fetched successfully",
    []
  );
}

module.exports = {
  getAdminData,
};