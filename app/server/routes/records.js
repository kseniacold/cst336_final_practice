const express = require("express");
const router = express.Router();
const dbConnection = require("../DBConnection");

const { body, validationResult } = require("express-validator");

const querySelectCorrect = `
SELECT COUNT (*) FROM record WHERE value = 1;
`;

const querySelectIncorrect = `
SELECT COUNT(*) FROM record WHERE value = 0;
`;

const queryInsert = (value) => `
INSERT INTO record (value) VALUES (${value});
`;

router.post("/", body("value").not().notEmpty().trim().escape(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  dbConnection
    .getConnection()
    .query(queryInsert(req.body.value), (err, results) => {
      if (err) {
        res.status(500).send("Server Error");
      }

      res.status(200);
      res.send(results.insertId + "");
    });
});

module.exports = router;
