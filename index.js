const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  res.send("Hello world!!");
});
//get all
app.get("/beauty", (req, res) => {
  connection.query("SELECT * FROM beauty", function (err, results, fields) {
    res.send(results);
  });
});
app.get("/beauty/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM beauty WHERE id = ?",
    [id],
    function (err, results, fields) {
      res.send(results);
    }
  );
});

//add new
app.post("/beauty/add", (req, res) => {
  connection.query(
    "INSERT INTO `beauty` (`name`, `category`, `price`, `avatar`) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.category, req.body.price, req.body.avatar],
    function (err, results, fields) {
      if (err) {
        console.error("Error in POST /beauty:", err);
        res.status(500).send("Error adding beauty product");
      } else {
        res.status(200).send(results);
      }
    }
  );
});
// update
app.put("/beauty/update", (req, res) => {
  connection.query(
    "UPDATE `beauty` SET `name`=?, `category`=?, `price`=?,`avatar`=? WHERE id =?",
    [
      req.body.name,
      req.body.category,
      req.body.price,
      req.body.avatar,
      req.body.id,
    ],
    function (err, results, fields) {
      res.send(results);
    }
  );
});
//delete
app.delete('/beauty/delete', (req, res) => {
    connection.query(
    'DELETE FROM `beauty` WHERE id =?',
    [req.body.id],
    function (err, results, fields) {
    res.send(results)
    }
    )
    })
    


app.listen(process.env.PORT || 3000, () => {
  console.log("CORS-enabled web server listening on port 3000");
});
// export the app for vercel serverless functions
module.exports = app;
