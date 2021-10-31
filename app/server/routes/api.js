const express = require("express");
const router = express.Router();

const heroes = require("./heroes");
const records = require("./records");

router.get("/", (req, res) => {
  res.send({ version: "0.0.1" });
});

router.use("/heroes", heroes);

router.use("/records", records);

module.exports = router;
