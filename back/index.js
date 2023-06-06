const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
const mysql = require("mysql");
const { classMap } = require("./modules/class.js");

app.use(express.json()); //Used to parse JSON bodies
app.use(cors()); //Prevent CORS errors

//connect to database
const pool = mysql.createPool({
  host: "89.116.147.1",
  port: "3306",
  user: "u495496740_Moi",
  password: "N0v/EGU:",
  database: "u495496740_Propro",
});

function addXp(connectionPool, id, xp, res) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT xp FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_xp = parseInt(result[0].xp) + parseInt(xp);
        connection.query(
          "UPDATE student SET xp ='" +
          new_xp +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
            res.send("1");
          }
        );
      }
    );
  });
}


app.get("/", (req, res) => {
  res.send("Hello World!");
});

//login for student
app.post("/login/student", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE id = '" + req.body.code + "'",
      function (err, result, fields) {
        if (err) throw err;
        let now = new Date().getTime();
        if (
          now - result[0].last_time >= 1000 * 60 &&
          result[0].mana < classMap.get(result[0].class).mana &&
          result.length > 0
        ) {
          //todo : mettre à 24h
          connection.query(
            "UPDATE student SET last_time = '" +
            now +
            "', mana = '" +
            (result[0].mana + 1) +
            "' WHERE id = '" +
            req.body.code +
            "'",
            function (err, result2, fields) {
              if (err) throw err;
              res.send(result);
            }
          );
        } else {
          res.send(result);
        }
      }
    );
  });
});

//login for teacher
app.post("/login/teacher", (req, res) => {
  //todo : use the real table
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM teacher WHERE email = '" +
      req.body.email +
      "' AND password = '" +
      req.body.password +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result.length > 0 ? "1" : "0"); //test if email and password match
      }
    );
  });
});

//register for teacher
app.post("/register/teacher", (req, res) => {
  //todo : use the real table
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM teacher WHERE email = '" + req.body.email + "'",
      function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) res.send("1"); //test if email already used
        else {
          //insert new user
          connection.query(
            "INSERT INTO teacher(email, password) VALUES ('" +
            req.body.email +
            "', '" +
            req.body.password +
            "')",
            function (err, result, fields) {
              if (err) throw err;
              res.send("0");
            }
          );
        }
      }
    );
  });
});

//create a new team
app.post("/addTeam", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM team WHERE name = '" + req.body.name + "'",
      function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) res.send("1"); //test if name already used
        else {
          connection.query(
            "INSERT INTO team(name,teacher_email) VALUES ('" +
            req.body.name +
            "', '" +
            req.body.email +
            "')",
            function (err, result, fields) {
              if (err) throw err;
              res.send("0");
            }
          );
        }
      }
    );
  });
});

//get all teams of a teacher
app.post("/getTeams", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT name FROM team WHERE teacher_email = '" + req.body.email + "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//add a new student
app.post("/addStudent", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM student", function (err, result, fields) {
      if (err) throw err;
      let hp = classMap.get(req.body.class).hp;
      let xp = 0;
      let mana = classMap.get(req.body.class).mana;
      let id = result.length + 1;
      let date = new Date().getTime();
      connection.query(
        "INSERT INTO student(id,teacher_email, team, first_name, surname, class, hp, xp, mana, last_time) VALUES ('" +
        id + //id
        "', '" +
        req.body.email +
        "', '" + //teacher_email
        req.body.team +
        "', '" + //team
        req.body.first_name +
        "', '" + //first_name
        req.body.surname +
        "', '" + //surname
        req.body.class +
        "', '" + //class
        hp +
        "', '" + //hp
        xp +
        "', '" + //xp
        mana +
        "', '" + //mana
        date + //last_time
        "')",
        function (err, result, fields) {
          if (err) throw err;
          connection.query(
            "INSERT INTO owned_item() VALUES ('" +
            req.body.class +
            "', '" +
            id +
            "', '" +
            1 +
            "')",
            function (err, result, fields) {
              if (err) throw err;
              connection.query(
                "INSERT INTO owned_item() VALUES ('" +
                classMap.get(req.body.class).spell +
                "', '" +
                id +
                "', '" +
                1 +
                "')",
                function (err, result, fields) {
                  if (err) throw err;
                  res.send("0");
                }
              );
            }
          );
        }
      );
    });
  });
});

//get all teams of a teacher ordered by team
app.post("/getStudents", (req, res) => {
  pool.getConnection(function (err, connection) {
    let studentsMap = new Map();
    connection.query(
      "SELECT * FROM student WHERE teacher_email = '" +
      req.body.email +
      "' ORDER BY team",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get all students of a team
app.post("/getStudentsTeam", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE team = '" + req.body.team + "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get a specific student
app.post("/getStudent", (req, res) => {
  //todo : send the skin too
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get % of hp of a student
app.post("/getHp", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT hp, class FROM student WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let ratioHp = Math.floor(
          (result[0].hp / classMap.get(result[0].class).hp) * 100
        );
        res.send(ratioHp.toString());
      }
    );
  });
});

//get % mana of a student
app.post("/getMana", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT mana, class FROM student WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let ratioMana = Math.floor(
          (result[0].mana / classMap.get(result[0].class).mana) * 100
        );
        res.send(ratioMana.toString());
      }
    );
  });
});

//inflict damage to a student
app.post("/removeHp", (req, res) => {
  //receive id and damage

  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT hp FROM student WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_hp = result[0].hp - req.body.damage;
        new_hp = new_hp < 0 ? 0 : new_hp;
        connection.query(
          "UPDATE student SET hp = '" +
          new_hp +
          "' WHERE id = '" +
          req.body.id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
            res.send(new_hp === 0 ? "dead" : "alive");
          }
        );
      }
    );
  });
});

app.post("/giveXp", (req, res) => {
  //receive id and xp
  addXp(pool, req.body.id, req.body.xp, res);
});

//send skin of a student
app.post("/getSkin", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT item_name FROM owned_item WHERE student_id = '" +
      req.body.id +
      "' AND equiped = '" +
      1 +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result[0].item_name);
      }
    );
  });
});

//add quest
app.post("/addQuest", (req, res) => {
  //receive id and quest
  pool.getConnection(function (err, connection) {
    connection.query(
      "INSERT INTO quest(id, teacher_email, reward, description) VALUES ('" +
      new Date().getTime() +
      "', '" +
      req.body.email +
      "', '" +
      req.body.reward +
      "', '" +
      req.body.description +
      "')",
      function (err, result, fields) {
        if (err) throw err;
        res.send("0");
      }
    );
  });
});


//get all quests of a teacher
app.post("/getQuests", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM quest WHERE teacher_email = '" + req.body.email + "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get completed quests of a student
app.post("/getCompletedQuests", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT quest.* FROM quest, completed_quest WHERE teacher_email = '"
      + req.body.email +
      "' AND completed_quest.student_id = '" +
      req.body.id +
      "' AND completed_quest.quest_id = quest.id",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get quests except the ones already validated

//delete a quest
app.post("/deleteQuest", (req, res) => {
  //receive id
  pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM quest WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        connection.query(
          "DELETE FROM completed_quest WHERE quest_id = '" + req.body.id + "'",
          function (err, result, fields) {
            if (err) throw err;
            res.send("0");
          }
        );
      }
    );
  });
});

//validate a quest
app.post("/questValidation", (req, res) => {
  //receive id
  pool.getConnection(function (err, connection) {
    connection.query(
      "INSERT INTO completed_quest(student_id, quest_id) VALUES ('" +
      req.body.student_id +
      "', '" +
      req.body.quest_id +
      "')",
      function (err, result, fields) {
        if (err) throw err;
        connection.query(
          "SELECT reward FROM quest WHERE id = '" + req.body.quest_id + "'",
          function (err, result, fields) {
            if (err) throw err;
            addXp(pool, req.body.student_id, result[0].reward, res);
          }
        );
      }
    );
  });
});

//get spells of a student
app.post("/getSpells", (req, res) => {
  let query = "SELECT item.* FROM item, owned_item WHERE item.type = 'spell_"
    + req.body.class
    + "'"
    + " AND owned_item.student_id = '"
    + req.body.id
    + "'"
    + " GROUP BY item.name";
  pool.getConnection(function (err, connection) {

    connection.query(query,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get spells shop of a student
app.post("/getSpellsShop", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM item WHERE type = 'spell_" + req.body.class + "'",
      function (err, allSpells, fields) {
        if (err) throw err;
        connection.query(
          "SELECT item.* FROM item, owned_item WHERE item.type = 'spell_"
          + req.body.class
          + "'"
          + " AND owned_item.student_id = '"
          + req.body.id
          + "'"
          + " GROUP BY item.name",
          function (err, result, fields) {
            allSpells.forEach((spell) => {
              result.forEach((ownedSpell) => {
                spell.owned = spell.name === ownedSpell.name;
              });
            }
            );
            res.send(allSpells);
          }
        );
      });
  });
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
