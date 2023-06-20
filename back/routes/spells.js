exports.setPostSpells = function setPostSpells(app, pool, classMap, SpellsCosts, addXp, addMana, removeMana, addHp, removeHp, addXpWithoutSend) {

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
        "SELECT * FROM student WHERE team = '" +  //get all the students from the same team except the one who used the spell
        req.body.team +
        "' AND id != '" +
        req.body.id +
        "'",
        function (err, result, fields) {
          if (err) throw err;
          result.forEach((student) => {
            addMana(pool, student.id, 2, classMap); //add 2 mana to each student
          });
          removeMana(pool, req.body.id, (SpellsCosts.get("aura_magique")));  //remove the mana cost from the student who used the spell
          addXp(pool, req.body.id, SpellsCosts.get("aura_magique"), res);  //add xp to the student who used the spell
        }
      );
    });
  });

  app.post("/usePremiersSoins", (req, res) => {
    //receive id and target 
    addHp(pool, req.body.target, 3, classMap); //add 3 hp to the target
    removeMana(pool, req.body.id, SpellsCosts.get("premiers_soins")); //remove the mana cost from the student who used the spell
    addXp(pool, req.body.id, SpellsCosts.get("premiers_soins"), res); //add xp to the student who used the spell
  });

  app.post("/useApaisementMajeur", (req, res) => {
    //receive id and target 
    addHp(pool, req.body.target, 10, classMap); //add 10 hp to the target
    removeMana(pool, req.body.id, SpellsCosts.get("apaisement_majeur")); //remove the mana cost from the student who used the spell
    addXp(pool, req.body.id, SpellsCosts.get("apaisement_majeur"), res); //add xp to the student who used the spell
  });

  app.post("/useImpositionDesMains", (req, res) => {
    //receive id and target
    addHp(pool, req.body.target, 10, classMap); //add 10 hp to the target
    removeMana(pool, req.body.id, SpellsCosts.get("imposition_des_mains")); //remove the mana cost from the student who used the spell
    removeHp(pool, req.body.id, 5); //remove 5 hp from the student who used the spell
    addXp(pool, req.body.id, SpellsCosts.get("imposition_des_mains"), res); //add xp to the student who used the spell
  });

  app.post("/useRevivification", (req, res) => {
    //receive id 
    removeMana(pool, req.body.id, SpellsCosts.get("reviviscence")); //remove the mana cost from the student who used the spell
    addXp(pool, req.body.id, SpellsCosts.get("reviviscence"), res); //add xp to the student who used the spell
  });

  app.post("/usePurification", (req, res) => {
    //receive id
    removeMana(pool, req.body.id, SpellsCosts.get("purification")); //remove the mana cost from the student who used the spell
    addHp(pool, req.body.id, 2, classMap); //add 2 hp to the student who used the spell
    res.send("0");
  });

  app.post("/useVagueDeMana", (req, res) => {
    //receive id and target
    removeMana(pool, req.body.id, SpellsCosts.get("vague_de_mana")); //remove the mana cost from the student who used the spell
    addMana(pool, req.body.target, 5000, classMap); //add full mana to the target
    addXp(pool, req.body.id, SpellsCosts.get("vague_de_mana"), res);
  });

  app.post("/useSoinDeMasse", (req, res) => {
    //receive id and team
    pool.getConnection(function (err, connection) {
      connection.query(
        "SELECT * FROM student WHERE team = '" + //get all the students from the same team
        req.body.team + "'",
        function (err, result, fields) {
          if (err) throw err;
          result.forEach((student) => {
            addHp(pool, student.id, 2, classMap); //add 2 hp to each student
          });
          removeMana(pool, req.body.id, SpellsCosts.get("soin_de_masse")); //remove the mana cost from the student who used the spell
          addXp(pool, req.body.id, SpellsCosts.get("soin_de_masse"), res); //add xp to the student who used the spell
        }
      );
      connection.release(); //release the connection
    });
  });

  app.post("/useExpansionDuSavoir", (req, res) => {
    //receive id and target
    pool.getConnection(function (err, connection) {
      connection.query(
        "UPDATE student SET minded = '1' WHERE id = '" + //set the target minded to 1
        req.body.target +
        "'",
        function (err, result, fields) {
          if (err) throw err;
        }
      );
      connection.release();
    });
    removeMana(pool, req.body.id, SpellsCosts.get("expansion_du_savoir")); //remove the mana cost from the student who used the spell
    res.send("0");
  });

  app.post("/useHaloSalvateur", (req, res) => {
    //receive id
    pool.getConnection(function (err, connection) {
      connection.query(
        "UPDATE student SET protected = '1' WHERE id = '" + //set the user protected to 1
        req.body.id +
        "'",
        function (err, result, fields) {
          if (err) throw err;
        }
      );
      connection.release();
    });
    removeMana(pool, req.body.id, SpellsCosts.get("halo_salvateur")); //remove the mana cost from the student who used the spell
    res.send("0");
  });

  app.post("/useTruquageDuDestin", (req, res) => {
    //receive team and XP
    pool.getConnection(function (err, connection) {
      connection.query(
        "SELECT * FROM student WHERE team = '" +  //get all the students from the same team including the user
        req.body.team + "'",
        function (err, result, fields) {
          if (err) throw err;
          result.forEach((student) => {
            addXpWithoutSend(pool, student.id, req.body.xp);
          });
          removeMana(pool, req.body.id, SpellsCosts.get("truquage_du_destin")); //remove the mana cost from the student who used the spell
          res.send("0");
        }
      )
      connection.release();
    });
  });
};