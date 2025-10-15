const express = require("express");
let mysql = require("mysql2");
const PORT = process.env.PORT || 5001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});



const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3309",
  password: "12345678",
  database: "Mahasiswa",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("MySQL Connected Successfully");
});

app.get("/biodata", (req, res) => {
  db.query('SELECT * FROM biodata', (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({
      message: "GET all biodata success",
      data: results
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
