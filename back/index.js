const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
const mysql = require("mysql");
const { classMap } = require("./modules/class.js");
const { SpellsCosts } = require("./modules/spells.js");

const { functions } = require("./modules/addRemFunctions.js");
const { setPostLogin } = require("./routes/loggers.js");
const { setPostManagers } = require("./routes/teamStudentManagers.js");
const { setPostStudentsGetters } = require("./routes/studentsGetters.js")
const { setPostInfosGetters } = require("./routes/infosGetter.js");
const { setPostQuests } = require("./routes/questsManager.js");
const { setPostActions } = require("./routes/actions.js");
const { setPostBoutique } = require("./routes/boutique.js");

addXp = functions.addXp;
addXpWithoutSend = functions.addXpWithoutSend;
removeMana = functions.removeMana;
addMana = functions.addMana;
addHp = functions.addHp;
removeHp = functions.removeHp;

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

setPostLogin(app, pool, classMap);
setPostManagers(app, pool, classMap);
setPostStudentsGetters(app, pool);
setPostInfosGetters(app, pool, classMap, SpellsCosts);
setPostQuests(app, pool, addXp);
setPostActions(app, pool, classMap, addXp, addMana);
setPostBoutique(app, pool);


app.get("/", (req, res) => {
  res.send("Hello World!");
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
          addMana(pool, student.id, 2, classMap);
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
  addHp(pool, req.body.target, 3, classMap);
  removeMana(pool, req.body.id, SpellsCosts.get("premiers_soins"));
  addXp(pool, req.body.id, SpellsCosts.get("premiers_soins"), res);
  console.log("fin premiers soins");
});

app.post("/useApaisementMajeur", (req, res) => {
  //receive id and target 
  addHp(pool, req.body.target, 10, classMap);
  removeMana(pool, req.body.id, SpellsCosts.get("apaisement_majeur"));
  addXp(pool, req.body.id, SpellsCosts.get("apaisement_majeur"), res);
});

app.post("/useImpositionDesMains", (req, res) => {
  //receive id and target
  addHp(pool, req.body.target, 10, classMap);
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
  addHp(pool, req.body.id, 2, classMap);
  res.send("0");
});

app.post("/useVagueDeMana", (req, res) => {
  //receive id and target
  removeMana(pool, req.body.id, SpellsCosts.get("vague_de_mana"));
  addMana(pool, req.body.target, 5000, classMap);
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
          addHp(pool, student.id, 2, classMap);
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
