const express = require("express");

const router = express.Router();

const {
  getinquiry,
} = require("../controllers/inquiryController");

console.log(getinquiry);

router.get("/", getinquiry);

module.exports = router;