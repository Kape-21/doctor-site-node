const express = require("express");

const router = express.Router();

const {
  getindex,
} = require("../controllers/indexController");

console.log(getindex);

router.get("/", getindex);

module.exports = router;