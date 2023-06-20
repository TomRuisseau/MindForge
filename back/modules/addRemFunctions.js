exports.functions = { addXp: addXp, addXpWithoutSend: addXpWithoutSend, removeMana: removeMana, addMana: addMana, addHp: addHp, removeHp: removeHp };

function addXp(connectionPool, id, xp, res) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT xp, minded FROM student WHERE id = '" + id + "'", //query to get number of xp and if mind expansion is active
            function (err, result, fields) {
                if (err) throw err;
                let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1); //if mind expansion is active, xp is doubled
                connection.query(
                    "UPDATE student SET xp ='" + //update number of xp
                    new_xp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (parseInt(result[0].minded) === 0) {  //if mind expansion was not active, do nothing
                            res.send("1");
                        }
                        else {
                            connection.query(
                                "UPDATE student SET minded ='0' WHERE id = '" + //if mind expansion was active, disable it
                                id +
                                "'",
                                function (err, result3, fields) {
                                    if (err) throw err;
                                    res.send("1");
                                }
                            );
                        }
                    }
                );
            }
        );
        connection.release(); //release connection to free memory
    });
}

//same as addXp, but does not send response
function addXpWithoutSend(connectionPool, id, xp) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT xp, minded FROM student WHERE id = '" + id + "'", //query to get number of xp and if mind expansion is active
            function (err, result, fields) {
                if (err) throw err;
                let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1);
                connection.query(
                    "UPDATE student SET xp ='" + //update number of xp  
                    new_xp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (parseInt(result[0].minded) === 0) { //if mind expansion was not active, do nothing
                        }
                        else {
                            connection.query(
                                "UPDATE student SET minded ='0' WHERE id = '" + //if mind expansion was active, disable it
                                id +
                                "'",
                                function (err, result3, fields) {
                                    if (err) throw err;
                                }
                            );
                        }
                    });
            });
        connection.release(); //release connection to free memory
    });
}

function removeMana(connectionPool, id, mana) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT mana FROM student WHERE id = '" + id + "'", //query to get number of mana
            function (err, result, fields) {
                if (err) throw err;
                let new_mana = parseInt(result[0].mana) - parseInt(mana); //subtract mana, normally can't go below 0 because spell costs are checked before
                connection.query(
                    "UPDATE student SET mana ='" +
                    new_mana +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result, fields) {
                        if (err) throw err;
                    }
                );
            }
        );
        connection.release();
    });
}


function addMana(connectionPool, id, mana, classMap) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT mana, class FROM student WHERE id = '" + id + "'", //query to get number of mana and class of the student
            function (err, result, fields) {
                if (err) throw err;
                let new_mana = parseInt(result[0].mana) + parseInt(mana); //add mana
                new_mana = Math.min(new_mana, classMap.get(result[0].class).mana); //mana can't go above max mana of the class
                connection.query(
                    "UPDATE student SET mana ='" + //update number of mana
                    new_mana +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result, fields) {
                        if (err) throw err;
                    }
                );
            }
        );
        connection.release(); //release connection to free memory
    });
}

function addHp(connectionPool, id, hp, classMap) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT hp, class FROM student WHERE id = '" + id + "'", //query to get number of hp and class of the student
            function (err, result, fields) {
                if (err) throw err;
                let new_hp = parseInt(result[0].hp) + parseInt(hp); //add hp
                new_hp = Math.min(new_hp, classMap.get(result[0].class).hp); //hp can't go above max hp of the class
                connection.query(
                    "UPDATE student SET hp ='" + //update number of hp
                    new_hp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result, fields) {
                        if (err) throw err;
                    }
                );
            }
        );
        connection.release(); //release connection to free memory
    });
}

function removeHp(connectionPool, id, hp) {

    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT hp, protected FROM student WHERE id = '" + id + "'", //query to get number of hp and if the student is protected
            function (err, result, fields) {
                if (err) throw err;
                let new_hp = parseInt(result[0].protected) === 1 ? result[0].hp : (result[0].hp - hp); //subtract hp, if the student is protected, do nothing
                new_hp = new_hp < 0 ? 0 : new_hp; //hp can't go below 0
                connectionPool.query(
                    "UPDATE student SET hp = '" + //update number of hp
                    new_hp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (result[0].protected === 1) {
                            connectionPool.query(
                                "UPDATE student SET protected = '" + //if the student is protected, disable protection
                                0 +
                                "' WHERE id = '" +
                                id +
                                "'",
                                function (err, result3, fields) {
                                    if (err) throw err;
                                    return;
                                }
                            );
                        } else {
                            return;
                        }
                    }
                );
            });
        connection.release(); //release connection to free memory
    });
}


