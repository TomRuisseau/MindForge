exports.setPostQuests = function setPostQuests(app, pool, addXp) {

    //add quest
    app.post("/addQuest", (req, res) => {
        //receive id and quest
        pool.getConnection(function (err, connection) {
            connection.query(
                "INSERT INTO quest(id, teacher_email, reward, description) VALUES ('" +  //add the quest to the database
                new Date().getTime() +
                "', '" +
                req.body.email +
                "', '" +
                req.body.reward +
                "', '" +
                req.body.description.replace('\'', " ") + //replace ' by a space to avoid sql errors
                "')",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send("0");
                }
            );
            connection.release();  //release connection to free memory space
        });
    });

    //get all quests of a teacher
    app.post("/getQuests", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM quest WHERE teacher_email = '" + req.body.email + "'", //get all quests of a teacher
                function (err, result, fields) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error retrieving quests");
                        return;
                    }

                    const quests = result;

                    // Helper function to get the number of completed quests for a specific quest
                    const getCompletedQuestsCount = (quest) => {
                        return new Promise((resolve, reject) => {
                            connection.query(
                                "SELECT COUNT(*) AS number FROM completed_quest WHERE quest_id = '" + quest.id + "'",
                                function (err, result, fields) {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve(result[0].number);
                                }
                            );
                        });
                    };

                    // Array to store the promises for each quest's completed count
                    const promises = quests.map((quest) => getCompletedQuestsCount(quest));

                    // Wait for all promises to resolve
                    Promise.all(promises)
                        .then((completedCounts) => {
                            // Assign the completed counts to the respective quests
                            quests.forEach((quest, index) => {
                                quest.nbCompleted = completedCounts[index];
                            });

                            res.send(quests);
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).send("Error retrieving quests");
                        })
                        .finally(() => {
                            connection.release();  //release connection to free memory space
                        });
                }
            );
        });
    });

    //get completed quests of a student
    app.post("/getCompletedQuests", (req, res) => {
        pool.getConnection(function (err, connection) {
            connection.query(
                "SELECT quest.* FROM quest, completed_quest WHERE teacher_email = '" //get all completed quests of a student
                + req.body.email +
                "' AND completed_quest.student_id = '" +
                req.body.id +
                "' AND completed_quest.quest_id = quest.id",
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
            connection.release();  //release connection to free memory space
        });
    });

    //validate a quest
    app.post("/questValidation", (req, res) => {
        //receive id
        pool.getConnection(function (err, connection) {
            connection.query(
                "INSERT INTO completed_quest(student_id, quest_id) VALUES ('" + //add the completed quest to the database
                req.body.student_id +
                "', '" +
                req.body.quest_id +
                "')",
                function (err, result, fields) {
                    if (err) throw err;
                    connection.query(
                        "SELECT reward FROM quest WHERE id = '" + req.body.quest_id + "'",  //get the reward of the quest
                        function (err, result, fields) {
                            if (err) throw err;
                            addXp(pool, req.body.student_id, result[0].reward, res); //add the reward to the student
                        }
                    );
                }
            );
            connection.release();  //release connection to free memory space
        });
    });

    //delete a quest
    app.post("/deleteQuest", (req, res) => {
        //receive id
        pool.getConnection(function (err, connection) {
            connection.query(
                "DELETE FROM quest WHERE id = '" + req.body.id + "'",  //delete the quest from the database
                function (err, result, fields) {
                    if (err) throw err;
                    connection.query(
                        "DELETE FROM completed_quest WHERE quest_id = '" + req.body.id + "'",  //delete the completed quest from the database
                        function (err, result, fields) {
                            if (err) throw err;
                            res.send("0");
                        }
                    );
                }
            );
            connection.release();  //release connection to free memory space
        });
    });
};
