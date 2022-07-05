const express = require("express");
const cors = require("cors");
const { request } = require("express");
const app = express();
const PORT = 5000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db,
  dbString = process.env.DB_STRING,
  dbName = "testRun";

MongoClient.connect(dbString, { useUnifiedTopology: true }).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});

app
  .route("/")
  .get((req, res) => {
    db.collection("test")
      .find()
      .toArray()
      .then((data) => {
        res.render("index.ejs", { info: data });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  })
  .post((req, res) => {
    db.collection("test")
      .insertOne({
        content: req.body.content,
      })
      .then((result) => res.redirect("/"))
      .catch((error) => console.error(error));
  });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
