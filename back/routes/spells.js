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
};