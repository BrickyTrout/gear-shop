const { MongoClient } = require("mongodb");

const getDB = async () => {
  const connectionString = process.env.DB_URI || "";
  const client = new MongoClient(connectionString);
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }
  return conn.db("gear_store");
};

module.exports = getDB;
