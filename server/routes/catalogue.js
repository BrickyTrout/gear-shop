var express = require("express");
var fs = require("fs/promises");
var router = express.Router();

router.get("/", async function (req, res) {
  const data = await fs.readFile("./data/catalogue.json", "utf8");
  const parsed = JSON.parse(data);
  res.status(200).json(parsed);
});

module.exports = router;
