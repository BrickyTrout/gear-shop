const { MongoClient } = require("mongodb");

const connectionString = process.env.DB_URI || "";
const client = new MongoClient(connectionString);
module.exports = client;
