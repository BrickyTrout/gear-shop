var express = require("express");
var fs = require("fs/promises");
const client = require("../database");
const { ObjectId } = require("mongodb");
var router = express.Router();

router.get("/", async function (req, res) {
  let conn;
  try {
    conn = await client.connect();
  } catch (err) {
    res.status(500).send(JSON.stringify("error connecting"));
    return;
  }

  let collection = conn.db("gear_store").collection("catalogue");
  const { id } = req.query;
  console.log(id);
  try {
    const _id = new ObjectId(id);
    let results = await collection.find({ _id }).toArray();
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(results[0]).status(200);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
  // client.close();
});

module.exports = router;
