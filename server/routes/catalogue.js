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
  const {q, i, s} = req.query;
  const regex = new RegExp(`${q}`, "i");
  let page = parseInt(i, 10) || 1;
  let pageSize = parseInt(s, 10) || 50;
  const pipeline = [
    {
      $match: {
        name: { $regex: regex },
      },
    },
    {
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      },
    },
  ];
  try {
    let results = await collection.aggregate(pipeline).toArray();
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(results[0]).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
  client.close();
});

module.exports = router;
