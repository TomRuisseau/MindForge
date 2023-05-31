const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')
const mysql = require('mysql');


app.use(express.json()); //Used to parse JSON bodies
app.use(cors()) //Prevent CORS errors


//connect to database
const pool = mysql.createPool({
  host: '89.116.147.1',
  port: '3306',
  user: 'u495496740_Moi',
  password: 'N0v/EGU:',
  database: 'u495496740_Propro',
})


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//login for student
app.post("/login/student", (req, res) => {
  console.log(req.body.code);
  res.send("student code received!");
});

//login for teacher
app.post("/login/teacher", (req, res) => {
  //todo : use the real table
  pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM teacher WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'", function (err, result, fields) {
      if (err) throw err;
      res.send(result.length > 0 ? "1" : "0");  //test if email and password match

    });
  });
});

//register for teacher
app.post("/register/teacher", (req, res) => {
  //todo : use the real table
  pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM teacher WHERE email = '" + req.body.email + "'", function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) res.send("1");  //test if email already used
      else {
        //insert new user
        connection.query("INSERT INTO teacher(email, password) VALUES ('" + req.body.email + "', '" + req.body.password + "')", function (err, result, fields) {
          if (err) throw err;
          res.send("0");
        });
      }
    });
  });
});

//login for teacher
app.post("/addTeam", (req, res) => {
  //todo : use the real table
  pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM equipe WHERE name = '" + req.body.name + "'", function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) res.send("1");  //test if name already used
      else {
        connection.query("INSERT INTO equipe(name,teacher_email) VALUES ('" + req.body.name + "', '" + req.body.email + "')", function (err, result, fields) {
          if (err) throw err;
          res.send("0");

        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
