var indexRouter = require("./routes/index");
var catalogueRouter = require("./routes/catalogue");
var cors = require("cors");

const express = require("express");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/catalogue", catalogueRouter);
app.listen(port);
