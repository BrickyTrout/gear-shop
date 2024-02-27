const { MongoClient } = require("mongodb");

const getDB = async () => {
  const connectionString = process.env.DB_URI || "";
  console.log(connectionString);
  const client = new MongoClient(connectionString);
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }
  return conn.db("gear-store");
};

module.exports = getDB;
