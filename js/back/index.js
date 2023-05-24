const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";

  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });

  //connection.query("SELECT * FROM Sorts", function (err, result, fields) {
    //if (err) throw err;
    //console.log(result);
  //}); 
});

