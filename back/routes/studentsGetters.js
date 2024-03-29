exports.setPostStudentsGetters = function setPostStudentsGetters(app, pool) {


    //get all teams of a teacher ordered by team
    app.post("/getStudents", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE teacher_email = '" + //get all students of a teacher
                req.body.email +
                "' ORDER BY team",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release();
        });
    });

    //get a random student of a teacher 
    app.post("/getRandomStudent", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE teacher_email = '" + //get all students of a teacher
                req.body.id +
                "'",
                function (err, result, fields) {
                    if (err) throw err;
                    let length = result.length; //get the number of students
                    let random = Math.floor(Math.random() * (length - 1)); //pick a random student 
                    res.send(result[random]);
                }
            );
            connection.release(); //release connection to free memory space
        });
    });

    //get all students of a team
    app.post("/getStudentsTeam", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE team = '" + req.body.team + "'", //get all students of a team
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release(); //release connection to free memory space
        });
    });

    //get all student of a team except one 
    app.post("/getStudentsTeamExcept", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE team = '" +  //get all students of a team except one
                req.body.team +
                "' AND id != '" +
                req.body.id +
                "'",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release();
        });
    });

    //get a specific student
    app.post("/getStudent", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM student WHERE id = '" + req.body.id + "'", //get a specific student
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release();
        });
    });
}
