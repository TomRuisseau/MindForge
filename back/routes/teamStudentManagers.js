exports.setPostManagers = function setPostManagers(app, pool, classMap) {

    //create a new team
    app.post("/addTeam", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM team WHERE name = '" + req.body.name.replace('\'', " ") + "'",
                function (err, result, fields) {
                    if (err) throw err;
                    if (result.length > 0) res.send("1"); //test if name already used
                    else {
                        connection.query(
                            "INSERT INTO team(name,teacher_email) VALUES ('" +
                            req.body.name.replace('\'', " ") +
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
}