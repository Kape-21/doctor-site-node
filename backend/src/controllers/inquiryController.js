const {
  getInquiriesData,
} = require("../services/inquiryService");

function getInquiries(req, res) {
  const result = getInquiriesData();

  res.json(result);
}

module.exports = {
  getInquiries,
};