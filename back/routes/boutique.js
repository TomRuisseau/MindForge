
exports.setPostBoutique = function setPostBoutique(app, pool) {

    app.post("/getSkinsShop", (req, res) => {
        pool.getConnection(function (err, connection) {
            let respons = { skins: [], spells: [] }
            connection.query(
                "SELECT * FROM item WHERE type = 'skin'", //select all existing skins
                function (err, allSkins, fields) {
                    if (err) throw err;
                    connection.query(
                        "SELECT item_name, equiped FROM owned_item WHERE student_id = '" //select all owned items
                        + req.body.id
                        + "'",
                        function (err, result, fields) {
                            allSkins.forEach((spell) => { //add a boolean to each skin and to know if it is owned and equiped
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
                                "SELECT * FROM item WHERE type = 'spell_" + req.body.class + "'", //select all existing spells for the class
                                function (err, allSpells, fields) {
                                    if (err) throw err;
                                    connection.query(
                                        "SELECT item_name FROM owned_item WHERE student_id = '" //select all owned items
                                        + req.body.id
                                        + "'",
                                        function (err, result, fields) {
                                            allSpells.forEach((spell) => { //add a boolean to each spell to know if it is owned (is always equiped if owned)
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
            connection.release(); //release connection to free memory space
        });
    });

    //buy a spell or item 
    app.post("/buy", (req, res) => {
        //receive id and item name
        pool.getConnection(function (err, connection) {
            connection.query(
                "INSERT INTO owned_item(student_id, item_name, equiped) VALUES ('" + //add the item to the owned items
                req.body.id +
                "', '" +
                req.body.name +
                "', '0')",
                function (err, result, fields) {
                    if (err) throw err;
                    connection.query(
                        "UPDATE student SET xp = '" + //remove the xp from the student
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
            connection.release(); //release connection to free memory space
        });
    });

    //equip an item
    app.post("/equip", (req, res) => {
        //receive id and item name
        pool.getConnection(function (err, connection) {
            connection.query(
                "UPDATE owned_item SET equiped = '0' WHERE student_id = '" + //unequip all items
                req.body.id +
                "'",
                function (err, result, fields) {
                    if (err) throw err;
                    connection.query(
                        "UPDATE owned_item SET equiped = '1' WHERE student_id = '" + //equip the item
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
            connection.release(); //release connection to free memory space
        });
    });
};