// list of classes and their stats (max hp, max mana, base spell)
exports.classMap = new Map();

let tank = {
    hp: 20,
    mana: 10,
    spell: "protection"
}

let healer = {
    hp: 10,
    mana: 15,
    spell: "premiers_soins"
}

let mage = {
    hp: 15,
    mana: 20,
    spell: "aura_magique"
}

exports.classMap.set("tank", tank);
exports.classMap.set("healer", healer);
exports.classMap.set("mage", mage);