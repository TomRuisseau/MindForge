//login for student
exports.setPostLogin = function setPostLogin(app, pool, classMap) {
    app.post("/login/student", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE id = '" + req.body.code + "'", //select student with the code
                function (err, result, fields) {
                    if (err) throw err;
                    let now = new Date().getTime();
                    if (result.length > 0) { //if the student exists

                        if (
                            now - result[0].last_time >= 1000 * 60 * 60 * 24 && //check if the sutdent  haven't logged in for 24h
                            result[0].mana < classMap.get(result[0].class).mana //check if the student haven't reached the max mana
                        ) {
                            connection.query(
                                "UPDATE student SET last_time = '" + //update the last time the student logged in and his mana
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
            connection.release(); //release connection to free memory space
        });
    });

    //login for teacher
    app.post("/login/teacher", (req, res) => {
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
            connection.release();
        });
    });

    //register for teacher
    app.post("/register/teacher", (req, res) => {
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
            connection.release(); //release connection to free memory space
        });
    });
}