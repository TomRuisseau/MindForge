
exports.setPostBoutique = function setPostBoutique(app, pool) {

    app.post("/getSkinsShop", (req, res) => {
        pool.getConnection(function (err, connection) {
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
                                            res.send(respons);
                                        }
                                    );
                                });
                        }
                    );
                });
            connection.release();
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
            connection.release();
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
            connection.release();
        });
    });
};