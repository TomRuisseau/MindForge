const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
const mysql = require("mysql");
const { classMap } = require("./modules/class.js");
const { SpellsCosts } = require("./modules/spells.js");

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

// const pool = mysql.createPool({
//   host: "localhost",
//   port: "3306",
//   password: "motdepasse",
//   user: "taume",
//   database: "test",
// });



function addXp(connectionPool, id, xp, res) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT xp, minded FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1);
        connection.query(
          "UPDATE student SET xp ='" +
          new_xp +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result2, fields) {
            if (err) throw err;
            if (parseInt(result[0].minded) === 0) {
              res.send("1");
            }
            else {
              connection.query(
                "UPDATE student SET minded ='0' WHERE id = '" +
                id +
                "'",
                function (err, result3, fields) {
                  if (err) throw err;
                  res.send("1");
                }
              );
            }
          }
        );
      }
    );
  });
}

function addXpWithoutSend(connectionPool, id, xp) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT xp, minded FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1);
        connection.query(
          "UPDATE student SET xp ='" +
          new_xp +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result2, fields) {
            if (err) throw err;
            if (parseInt(result[0].minded) === 0) {
            }
            else {
              connection.query(
                "UPDATE student SET minded ='0' WHERE id = '" +
                id +
                "'",
                function (err, result3, fields) {
                  if (err) throw err;
                }
              );
            }
          }
        );
      }
    );
  });
}

function removeMana(connectionPool, id, mana) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT mana FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_mana = parseInt(result[0].mana) - parseInt(mana);
        connection.query(
          "UPDATE student SET mana ='" +
          new_mana +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
          }
        );
      }
    );
  });
}


function addMana(connectionPool, id, mana) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT mana, class FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_mana = parseInt(result[0].mana) + parseInt(mana);
        new_mana = Math.min(new_mana, classMap.get(result[0].class).mana);
        connection.query(
          "UPDATE student SET mana ='" +
          new_mana +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
          }
        );
      }
    );
  });
}

function addHp(connectionPool, id, hp) {
  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT hp, class FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_hp = parseInt(result[0].hp) + parseInt(hp);
        new_hp = Math.min(new_hp, classMap.get(result[0].class).hp);
        connection.query(
          "UPDATE student SET hp ='" +
          new_hp +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
          }
        );
      }
    );
  });
}

function removeHp(connectionPool, id, hp) {

  connectionPool.getConnection(function (err, connection) {
    connection.query(
      "SELECT hp, protected FROM student WHERE id = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_hp = parseInt(result[0].protected) === 1 ? result[0].hp : (result[0].hp - hp);
        new_hp = new_hp < 0 ? 0 : new_hp;
        connectionPool.query(
          "UPDATE student SET hp = '" +
          new_hp +
          "' WHERE id = '" +
          id +
          "'",
          function (err, result2, fields) {
            if (err) throw err;
            if (result[0].protected === 1) {
              connectionPool.query(
                "UPDATE student SET protected = '" +
                0 +
                "' WHERE id = '" +
                id +
                "'",
                function (err, result3, fields) {
                  if (err) throw err;
                  return;
                }
              );
            } else {
              return;
            }
          }
        );
      });
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
        if (result.length > 0) {

          if (
            now - result[0].last_time >= 1000 * 60 * 60 * 24 &&
            result[0].mana < classMap.get(result[0].class).mana
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
          }
          else {
            res.send(result);
          }
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

//get team size 
app.post("/getTeamSize", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT COUNT(*) AS size FROM student WHERE team = '" +
      req.body.team +
      "'",
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
        "INSERT INTO student(id,teacher_email, team, first_name, surname, class, hp, xp, mana, last_time, protected, minded) VALUES ('" +
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
        "', '" +
        0 +
        "', '" +
        0 +
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

//get a random student of a teacher 
app.post("/getRandomStudent", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE teacher_email = '" +
      req.body.id +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        let length = result.length;
        let random = Math.floor(Math.random() * (length - 1));
        console.log(result[random]);
        res.send(result[random]);
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

//get all student of a team except one 
app.post("/getStudentsTeamExcept", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE team = '" +
      req.body.team +
      "' AND id != '" +
      req.body.id +
      "'",
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
      "SELECT hp, protected FROM student WHERE id = '" + req.body.id + "'",
      function (err, result, fields) {
        if (err) throw err;
        let new_hp = parseInt(result[0].protected) === 1 ? result[0].hp : (result[0].hp - req.body.damage);
        new_hp = new_hp < 0 ? 0 : new_hp;
        connection.query(
          "UPDATE student SET hp = '" +
          new_hp +
          "' WHERE id = '" +
          req.body.id +
          "'",
          function (err, result2, fields) {
            if (err) throw err;
            if (result[0].protected === 1) {
              connection.query(
                "UPDATE student SET protected = '" +
                0 +
                "' WHERE id = '" +
                req.body.id +
                "'",
                function (err, result3, fields) {
                  if (err) throw err;
                  res.send(new_hp === 0 ? "dead" : "alive");
                }
              );
            } else {
              res.send(new_hp === 0 ? "dead" : "alive");
            }
          }
        );
      });
  });
});

app.post("/giveXp", (req, res) => {
  //receive id and xp
  addXp(pool, req.body.id, req.body.xp, res);
});

app.post("/giveMana", (req, res) => {
  //receive id and mana
  addMana(pool, req.body.id, req.body.mana);
  res.send("0");
});
//send skin of a student
app.post("/getSkin", (req, res) => {
  console.log("début profile")
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT item_name FROM owned_item WHERE student_id = '" +
      req.body.id +
      "' AND equiped = '" +
      1 +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        console.log("fin profile")
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
        if (err) {
          console.error(err);
          res.status(500).send("Error retrieving quests");
          return;
        }

        const quests = result;

        // Helper function to get the number of completed quests for a specific quest
        const getCompletedQuestsCount = (quest) => {
          return new Promise((resolve, reject) => {
            connection.query(
              "SELECT COUNT(*) AS number FROM completed_quest WHERE quest_id = '" + quest.id + "'",
              function (err, result, fields) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(result[0].number);
              }
            );
          });
        };

        // Array to store the promises for each quest's completed count
        const promises = quests.map((quest) => getCompletedQuestsCount(quest));

        // Wait for all promises to resolve
        Promise.all(promises)
          .then((completedCounts) => {
            // Assign the completed counts to the respective quests
            quests.forEach((quest, index) => {
              quest.nbCompleted = completedCounts[index];
            });

            res.send(quests);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving quests");
          })
          .finally(() => {
            connection.release();
          });
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
  let query = "SELECT owned_item.item_name FROM owned_item, item WHERE owned_item.student_id = '"
    + req.body.id
    + "'"
    + " AND owned_item.item_name = item.name AND item.type = 'spell_" + req.body.class + "'";
  pool.getConnection(function (err, connection) {
    connection.query(query,
      function (err, result, fields) {
        if (err) throw err;
        result.forEach((spell) => {
          spell.manaCost = SpellsCosts.get(spell.item_name);
        }
        );
        res.send(result);
      });
  });
});

//get spells shop of a student
// app.post("/getSpellsShop", (req, res) => {
//   pool.getConnection(function (err, connection) {
//     connection.query(
//       "SELECT * FROM item WHERE type = 'spell_" + req.body.class + "'",
//       function (err, allSpells, fields) {
//         if (err) throw err;
//         connection.query(
//           "SELECT item_name FROM owned_item WHERE student_id = '"
//           + req.body.id
//           + "'",
//           function (err, result, fields) {
//             allSpells.forEach((spell) => {
//               spell.owned = false;
//               result.forEach((ownedSpell) => {
//                 if (spell.name === ownedSpell.item_name) {
//                   spell.owned = true;
//                 }
//               });
//             }
//             );
//             res.send(allSpells);
//           }
//         );
//       });
//   });
// });

app.post("/getSkinsShop", (req, res) => {
  pool.getConnection(function (err, connection) {
    console.log("début boutique")
    let respons = { skins: [], spells: [] }
    connection.query(
      "SELECT * FROM item WHERE type = 'skin'",
      function (err, allSkins, fields) {
        if (err) throw err;
        connection.query(
          "SELECT item_name, equiped FROM owned_item WHERE student_id = '"
          + req.body.id
          + "'",
          function (err, result, fields) {
            allSkins.forEach((spell) => {
              spell.owned = false;
              result.forEach((ownedSpell) => {
                if (spell.name === ownedSpell.item_name) {
                  spell.owned = true;
                  spell.equiped = ownedSpell.equiped;
                }
              });
            }
            );
            respons.skins = allSkins;
            connection.query(
              "SELECT * FROM item WHERE type = 'spell_" + req.body.class + "'",
              function (err, allSpells, fields) {
                if (err) throw err;
                connection.query(
                  "SELECT item_name FROM owned_item WHERE student_id = '"
                  + req.body.id
                  + "'",
                  function (err, result, fields) {
                    allSpells.forEach((spell) => {
                      spell.owned = false;
                      result.forEach((ownedSpell) => {
                        if (spell.name === ownedSpell.item_name) {
                          spell.owned = true;
                        }
                      });
                    }
                    );
                    respons.spells = allSpells;
                    console.log("fin boutique")
                    res.send(respons);
                  }
                );
              });
          }
        );
      });
  });
});

//buy a spell or item 
app.post("/buy", (req, res) => {
  //receive id and item name
  pool.getConnection(function (err, connection) {
    connection.query(
      "INSERT INTO owned_item(student_id, item_name, equiped) VALUES ('" +
      req.body.id +
      "', '" +
      req.body.name +
      "', '0')",
      function (err, result, fields) {
        if (err) throw err;
        connection.query(
          "UPDATE student SET xp = '" +
          req.body.newXp +
          "' WHERE id = '" +
          req.body.id +
          "'",
          function (err, result, fields) {
            if (err) throw err;
            res.send("0");
          }
        );
      }
    );
  });
});

//equip an item
app.post("/equip", (req, res) => {
  //receive id and item name
  pool.getConnection(function (err, connection) {
    connection.query(
      "UPDATE owned_item SET equiped = '0' WHERE student_id = '" +
      req.body.id +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        connection.query(
          "UPDATE owned_item SET equiped = '1' WHERE student_id = '" +
          req.body.id +
          "' AND item_name = '" +
          req.body.name +
          "'",
          function (err, result, fields) {
            if (err) throw err;
            res.send("0");
          }
        );
      }
    );
  });
});

//get tanks that could protect 
app.post("/getTanks", (req, res) => {
  //receive id and team
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE team = '" +
      req.body.team +
      "' AND id != '" +
      req.body.id +
      "' AND class = 'tank' AND mana >= '" +
      SpellsCosts.get("protection") +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});

//get healers that could revive
app.post("/getHealers", (req, res) => {
  //receive id and team
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT student.* FROM student, owned_item WHERE student.team = '" +
      req.body.team +
      "' AND student.id != '" +
      req.body.id +
      "' AND student.class = 'healer' AND mana >= '" +
      SpellsCosts.get("reviviscence") +
      "' AND owned_item.student_id = student.id AND owned_item.item_name = 'reviviscence'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});


//get mages that could use truquage_du_destin
app.post("/getMages", (req, res) => {
  //receive id and team
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT student.* FROM student, owned_item WHERE student.team = '" +
      req.body.team +
      "' AND student.mana >= '" +
      SpellsCosts.get("truquage_du_destin") +
      "' AND owned_item.student_id = student.id AND owned_item.item_name = 'truquage_du_destin'",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});


//use protection 
app.post("/useProtection", (req, res) => {
  //receive id
  removeMana(pool, req.body.id, SpellsCosts.get("protection"));
  addXp(pool, req.body.id, SpellsCosts.get("protection"), res);
});

//use aura_magique 
app.post("/useAuraMagique", (req, res) => {
  pool.getConnection(function (err, connection) {
    //receive id
    connection.query(
      "SELECT * FROM student WHERE team = '" +
      req.body.team +
      "' AND id != '" +
      req.body.id +
      "'",
      function (err, result, fields) {
        if (err) throw err;
        result.forEach((student) => {
          addMana(pool, student.id, 2);
        });
        removeMana(pool, req.body.id, (SpellsCosts.get("aura_magique")));
        addXp(pool, req.body.id, SpellsCosts.get("aura_magique"), res);
      }
    );
  });
});

app.post("/usePremiersSoins", (req, res) => {
  //receive id and target 
  console.log("début premiers soins");
  addHp(pool, req.body.target, 3);
  removeMana(pool, req.body.id, SpellsCosts.get("premiers_soins"));
  addXp(pool, req.body.id, SpellsCosts.get("premiers_soins"), res);
  console.log("fin premiers soins");
});

app.post("/useApaisementMajeur", (req, res) => {
  //receive id and target 
  addHp(pool, req.body.target, 10);
  removeMana(pool, req.body.id, SpellsCosts.get("apaisement_majeur"));
  addXp(pool, req.body.id, SpellsCosts.get("apaisement_majeur"), res);
});

app.post("/useImpositionDesMains", (req, res) => {
  //receive id and target
  addHp(pool, req.body.target, 10);
  removeMana(pool, req.body.id, SpellsCosts.get("imposition_des_mains"));
  removeHp(pool, req.body.id, 5);
  addXp(pool, req.body.id, SpellsCosts.get("imposition_des_mains"), res);
});

app.post("/useRevivification", (req, res) => {
  //receive id 
  removeMana(pool, req.body.id, SpellsCosts.get("reviviscence"));
  addXp(pool, req.body.id, SpellsCosts.get("reviviscence"), res);
});

app.post("/usePurification", (req, res) => {
  //receive id
  removeMana(pool, req.body.id, SpellsCosts.get("purification"));
  addHp(pool, req.body.id, 2);
  res.send("0");
});

app.post("/useVagueDeMana", (req, res) => {
  //receive id and target
  removeMana(pool, req.body.id, SpellsCosts.get("vague_de_mana"));
  addMana(pool, req.body.target, 5000);
  addXp(pool, req.body.id, SpellsCosts.get("vague_de_mana"), res);
});

app.post("/useSoinDeMasse", (req, res) => {
  //receive id and team
  console.log("début soin de masse")
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE team = '" +
      req.body.team + "'",
      function (err, result, fields) {
        if (err) throw err;
        result.forEach((student) => {
          addHp(pool, student.id, 2);
        });
        removeMana(pool, req.body.id, SpellsCosts.get("soin_de_masse"));
        console.log("fin soin de masse");
        addXp(pool, req.body.id, SpellsCosts.get("soin_de_masse"), res);
      }
    );
  });
});

app.post("/useExpansionDuSavoir", (req, res) => {
  //receive id and target
  pool.getConnection(function (err, connection) {
    connection.query(
      "UPDATE student SET minded = '1' WHERE id = '" +
      req.body.target +
      "'",
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  });
  removeMana(pool, req.body.id, SpellsCosts.get("expansion_du_savoir"));
  res.send("0");
});

app.post("/useHaloSalvateur", (req, res) => {
  //receive id
  pool.getConnection(function (err, connection) {
    connection.query(
      "UPDATE student SET protected = '1' WHERE id = '" +
      req.body.id +
      "'",
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  });
  removeMana(pool, req.body.id, SpellsCosts.get("halo_salvateur"));
  res.send("0");
});

app.post("/useTruquageDuDestin", (req, res) => {
  //receive team and XP
  pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM student WHERE team = '" +
      req.body.team + "'",
      function (err, result, fields) {
        if (err) throw err;
        result.forEach((student) => {
          addXpWithoutSend(pool, student.id, req.body.xp);
        });
        removeMana(pool, req.body.id, SpellsCosts.get("truquage_du_destin"));
        res.send("0");
      }
    )
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
