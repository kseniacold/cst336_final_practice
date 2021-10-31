const express = require("express");
const router = express.Router();
const dbConnection = require("../DBConnection");

const { body, query, validationResult } = require("express-validator");

const querySelect = (value, superheroId) => `
SELECT COUNT(*) FROM record WHERE (value = ${value} AND superheroId = ${superheroId});
`;

const queryInsert = (value, superheroId) => `
INSERT INTO record (value, superheroId) VALUES (${value}, ${superheroId});
`;

router.post(
  "/",
  body("value").not().notEmpty().trim().escape(),
  body("superheroId").not().notEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { value, superheroId } = req.body;

    dbConnection
      .getConnection()
      .query(queryInsert(value, superheroId), (err, results) => {
        if (err) {
          return res.status(500).send("Server Error");
        }

        res.status(200);
        res.send(results.insertId + "");
      });
  }
);

router.get(
  "/",
  query("value").not().notEmpty().trim().escape(),
  query("superheroId").not().notEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { value, superheroId } = req.query;

    dbConnection
      .getConnection()
      .query(querySelect(value, superheroId), (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }

        res.status(200);
        if (Array.isArray(results)) {
          res.send(results[0]["COUNT(*)"] + "");
        } else {
          res.send(-1 + "");
        }
      });
  }
);
module.exports = router;
