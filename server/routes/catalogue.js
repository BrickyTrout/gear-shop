var express = require("express");
var fs = require("fs/promises");
const getDB = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
  let db = await getDB();
  let collection = await db.collection("catalogue");
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
  // const data = await fs.readFile("./data/catalogue.json", "utf8");
  // const parsed = JSON.parse(data);
  // res.status(200).json(parsed);
});

module.exports = router;
