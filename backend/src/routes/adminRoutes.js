const express = require("express");

console.log("Admin route file loaded");

const router = express.Router();

const {
  getAdmin,
} = require("../controllers/adminController");

console.log(getAdmin);

router.get("/", getAdmin);
module.exports = router;