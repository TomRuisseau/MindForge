
exports.setPostActions = function setPostActions(app, pool, classMap, addXp, addMana) {

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
        addMana(pool, req.body.id, req.body.mana, classMap);
        res.send("0");
    });
};