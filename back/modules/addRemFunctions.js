exports.functions = { addXp: addXp, addXpWithoutSend: addXpWithoutSend, removeMana: removeMana, addMana: addMana, addHp: addHp, removeHp: removeHp };

function addXp(connectionPool, id, xp, res) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT xp, minded FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1);
                connection.query(
                    "UPDATE student SET xp ='" +
                    new_xp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (parseInt(result[0].minded) === 0) {
                            res.send("1");
                        }
                        else {
                            connection.query(
                                "UPDATE student SET minded ='0' WHERE id = '" +
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
    });
}

function addXpWithoutSend(connectionPool, id, xp) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT xp, minded FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_xp = parseInt(result[0].xp) + parseInt(xp) * (parseInt(result[0].minded) + 1);
                connection.query(
                    "UPDATE student SET xp ='" +
                    new_xp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (parseInt(result[0].minded) === 0) {
                        }
                        else {
                            connection.query(
                                "UPDATE student SET minded ='0' WHERE id = '" +
                                id +
                                "'",
                                function (err, result3, fields) {
                                    if (err) throw err;
                                }
                            );
                        }
                    });
            });
    });
}

function removeMana(connectionPool, id, mana) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT mana FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_mana = parseInt(result[0].mana) - parseInt(mana);
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
    });
}


function addMana(connectionPool, id, mana) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT mana, class FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_mana = parseInt(result[0].mana) + parseInt(mana);
                new_mana = Math.min(new_mana, classMap.get(result[0].class).mana);
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
    });
}

function addHp(connectionPool, id, hp) {
    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT hp, class FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_hp = parseInt(result[0].hp) + parseInt(hp);
                new_hp = Math.min(new_hp, classMap.get(result[0].class).hp);
                connection.query(
                    "UPDATE student SET hp ='" +
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
    });
}

function removeHp(connectionPool, id, hp) {

    connectionPool.getConnection(function (err, connection) {
        connection.query(
            "SELECT hp, protected FROM student WHERE id = '" + id + "'",
            function (err, result, fields) {
                if (err) throw err;
                let new_hp = parseInt(result[0].protected) === 1 ? result[0].hp : (result[0].hp - hp);
                new_hp = new_hp < 0 ? 0 : new_hp;
                connectionPool.query(
                    "UPDATE student SET hp = '" +
                    new_hp +
                    "' WHERE id = '" +
                    id +
                    "'",
                    function (err, result2, fields) {
                        if (err) throw err;
                        if (result[0].protected === 1) {
                            connectionPool.query(
                                "UPDATE student SET protected = '" +
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
    });
}


