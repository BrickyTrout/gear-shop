var express = require("express");
var fs = require("fs/promises");
const client = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
  let conn;
  try {
    conn = await client.connect();
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  let collection = conn.db("gear_store").collection("catalogue");
  const query = req.query.q;
  const regex = new RegExp(`${query}`, "i");
  try {
    let results = await collection.find({ name: regex }).limit(50).toArray();
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(results).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
  client.close();
});

module.exports = router;
