var express = require("express");
var fs = require("fs/promises");
const getDB = require("../database");
const closeClient = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
  let db = await getDB();
  let collection = await db.collection("catalogue");
  const query = req.query.q;
  const regex = new RegExp(`${query}`, "i")
  let results = await collection.find({name: regex}).limit(50).toArray();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(results).status(200);
});

module.exports = router;
