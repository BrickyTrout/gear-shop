const dotenv = require("dotenv").config();
const express = require("express");
const catalogue = require("./routes/catalogue");
const catalogueFilters = require("./routes/catalogue-filter");
const app = express();
const port = 3001;
app.use("/catalogue", catalogue);
app.use("/catalogue-filters", catalogueFilters);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
