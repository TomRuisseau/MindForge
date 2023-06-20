exports.setPostInfosGetters = function setPostInfosGetters(app, pool, classMap, SpellsCosts) {


    //get team size 
    app.post("/getTeamSize", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT COUNT(*) AS size FROM student WHERE team = '" + //count number of students in the team
                req.body.team +
                "'",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release(); //release connection to free memory space
        });
    });



    //get % of hp of a student
    app.post("/getHp", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT hp, class FROM student WHERE id = '" + req.body.id + "'", //select hp and class of the student
                function (err, result, fields) {
                    if (err) throw err;
                    let ratioHp = Math.floor( //calculate ratio of hp based on the max hp of the class
                        (result[0].hp / classMap.get(result[0].class).hp) * 100
                    );
                    res.send(ratioHp.toString());
                }
            );
            connection.release();
        });
    });


    //get % mana of a student
    app.post("/getMana", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT mana, class FROM student WHERE id = '" + req.body.id + "'", //select mana and class of the student
                function (err, result, fields) {
                    if (err) throw err;
                    let ratioMana = Math.floor( //calculate ratio of mana based on the max mana of the class
                        (result[0].mana / classMap.get(result[0].class).mana) * 100
                    );
                    res.send(ratioMana.toString());
                }
            );
            connection.release();
        });
    });



    //send skin of a student
    app.post("/getSkin", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT item_name FROM owned_item WHERE student_id = '" +  //select equiped skin of the student
                req.body.id +
                "' AND equiped = '" +
                1 +
                "'",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result[0].item_name);
                }
            );
            connection.release(); //release connection to free memory space
        });
    });

    //get spells of a student
    app.post("/getSpells", (req, res) => {
        let query = "SELECT owned_item.item_name FROM owned_item, item WHERE owned_item.student_id = '" //select spells owned by the student
            + req.body.id
            + "'"
            + " AND owned_item.item_name = item.name AND item.type = 'spell_" + req.body.class + "'";
        pool.getConnection(function (err, connection) {
            connection.query(query,
                function (err, result, fields) {
                    if (err) throw err;
                    result.forEach((spell) => { //add mana cost to each spell
                        spell.manaCost = SpellsCosts.get(spell.item_name);
                    }
                    );
                    res.send(result);
                });
            connection.release(); //release connection to free memory space
        });
    });
}
