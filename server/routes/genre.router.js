const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  // Add query to get all genres
  const sqlQuery = `
  SELECT * FROM genres 
  ORDER BY "id" ASC`;
  pool
    .query(sqlQuery)
    .then((response) => {
      console.log(response);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("error in genres get", err);
      res.sendStatus(500);
    });
});

module.exports = router;
