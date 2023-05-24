const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const mysql = require ('mysql');

const pool = mysql.createPool({
  host : '89.116.147.1',
  port : '3306',
  user : 'u495496740_Moi',
  password : 'N0v/EGU:',
  database : 'u495496740_Propro', 
})


pool.getConnection(function(err, connection) {
  //connection.query("SELECT * FROM Sorts", function (err, result, fields) {
    //if (err) throw err;
    //console.log(result);
  //}); 
});

