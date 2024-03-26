var express = require("express");
const client = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
  let conn;
  let results;
  try {
    conn = await client.connect();
    let collection = conn.db("gear_store").collection("catalogue_filters");
    results = await collection.find({}).limit(50).toArray();
  } catch (err) {
    res.status(500).send(JSON.stringify(`error connecting ${err}`));
    return;
  }

  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(results).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
  // client.close();
});

module.exports = router;
