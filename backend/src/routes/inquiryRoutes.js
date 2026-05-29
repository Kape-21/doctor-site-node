const express = require("express");

const router = express.Router();

const {
  getInquiries,
} = require("../controllers/inquiryController");

router.get("/", getInquiries);

module.exports = router;