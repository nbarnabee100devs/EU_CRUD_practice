const express = require("express");
const app = express();
const PORT = 5000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
  dbString = process.env.DB_STRING,
  dbName = "testRun";

MongoClient.connect(dbString, { useUnifiedTopology: true }).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
