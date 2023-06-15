const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
const mysql = require("mysql");

//stats of each class 
const { classMap } = require("./modules/class.js");

//list of spells and their costs
const { SpellsCosts } = require("./modules/spells.js");

//functions to add or remove xp, mana, hp
const { functions } = require("./modules/addRemFunctions.js");

//routes imports
//routes for login and register (student and teacher)
const { setPostLogin } = require("./routes/loggers.js");
//routes for adding, removing, modifying students and teams
const { setPostManagers } = require("./routes/teamStudentManagers.js");
//routes for getting students (all of them, a random one ...) and teams
const { setPostStudentsGetters } = require("./routes/studentsGetters.js")
//routes for getting infos about students (xp, mana, hp, class, team, quests, skins, spells)
const { setPostInfosGetters } = require("./routes/infosGetter.js");
//routes for managing quests (add, remove, modify, get, complete)
const { setPostQuests } = require("./routes/questsManager.js");
//routes for actions on student 
const { setPostActions } = require("./routes/actions.js");
//routes for the shop (buying skins, equip)
const { setPostBoutique } = require("./routes/boutique.js");
//routes to get supports how can use spells
const { setPostSupports } = require("./routes/supports.js");
//routes to use spells 
const { setPostSpells } = require("./routes/spells.js");

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
setPostSupports(app, pool, SpellsCosts);
setPostSpells(app, pool, classMap, SpellsCosts, addXp, addMana, removeMana, addHp, removeHp, addXpWithoutSend)


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
