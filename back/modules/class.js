exports.classMap = new Map();

let tank = {
    hp: 20,
    mana: 10
}

let healer = {
    hp: 10,
    mana: 15
}

let mage = {
    hp: 15,
    mana: 20
}

exports.classMap.set("tank", tank);
exports.classMap.set("healer", healer);
exports.classMap.set("mage", mage);