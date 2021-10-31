const express = require("express");
const router = express.Router();
const dbConnection = require("../DBConnection");
const getRandomInt = require("../helpers/getRandomInt");

const query = `
SELECT * FROM superhero;
`;

const uniqueHeroes = (results) => {
  const uniqueNames = new Set(results.map((rs) => rs.name));

  return results.reduce((acc, curr) => {
    if (uniqueNames.has(curr.name)) {
      uniqueNames.delete(curr.name);
      return [...acc, curr];
    }
    return acc;
  }, []);
};

router.get("/", (req, res) => {
  dbConnection.getConnection().query(query, (err, results) => {
    if (err) {
      res.status(500).send("Server Error");
    }

    if (Array.isArray(results)) {
      res.send(uniqueHeroes(results));
    } else {
      res.send([]);
    }
  });
});

router.get("/random", (req, res) => {
  dbConnection.getConnection().query(query, (err, results) => {
    if (err) {
      res.status(500).send("Server Error");
    }

    if (Array.isArray(results)) {
      const uniques = uniqueHeroes(results);
      res.send(uniques[getRandomInt(uniques.length)]);
    } else {
      res.status(404).send("Not found");
    }
  });
});

module.exports = router;
