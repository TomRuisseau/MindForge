import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/Buttons.css";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import { motion } from "framer-motion";

function Shop(props) {
  const [spells, setSpells] = useState([]); // liste des sorts
  const [skins, setSkins] = useState([]); // liste des skins
  const [selected, setSelected] = useState(""); // liste des skins
  const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page quand valide une quête
  const [glassClass, setGlassClass] = useState(""); // classe du verre (tank, healer, mage)

  const isMountedRef = useRef(false);

  let skinsMap = new Map();
  skinsMap.set("tank", "Protecteur");
  skinsMap.set("mage", "Mage");
  skinsMap.set("healer", "Soigneur");

  let spellsMap = new Map();
  //tank
  spellsMap.set("protection", "Protection");
  spellsMap.set("halo salvateur", "Halo salvateur");
  spellsMap.set("imposition des mains", "Imposition des mains");
  spellsMap.set("purification", "Purification");
  //healer
  spellsMap.set("premiers soins", "Premiers soins");
  spellsMap.set("apaisement majeur", "Apaisement majeur");
  spellsMap.set("reviviscence", "Reviviscence");
  spellsMap.set("soin de masse", "Soin de masse");
  //mage
  spellsMap.set("aura magique", "Aura magique");
  spellsMap.set("vague de mana", "Vague de mana");
  spellsMap.set("truquage du destin", "Truquage du destin");
  spellsMap.set("expansion du savoir", "Expansion du savoir");

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      axios
        .post("http://localhost:5000/getSkinsShop", {
          id: props.data[0].id,
          class: props.data[0].class,
        })
        .then((res) => {
          setSkins(res.data.skins);
          setSpells(res.data.spells);
          isMountedRef.current = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.data, counter]);

  const select = (e) => {
    if (e.target.getAttribute("data-key") === null) {
      setSelected(e.target.parentNode.getAttribute("data-key"));
    } else {
      setSelected(e.target.getAttribute("data-key"));
    }
  };

  //change class glass-tank or glass-healer or glass-mage
  useEffect(() => {
    const classToGlassClassMap = {
      tank: "glass-tank",
      mage: "glass-mage",
      healer: "glass-healer",
    };
    setGlassClass(classToGlassClassMap[props.data[0].class]);
  }, [props.data]);

  const buy = () => {
    let price = 0;
    skins.forEach((skin) => {
      if (skin.name === selected) {
        price = skin.cost;
      }
    });
    spells.forEach((spell) => {
      if (spell.name === selected) {
        price = spell.cost;
      }
    });
    if (props.data[0].xp >= price) {
      axios
        .post("http://localhost:5000/buy", {
          id: props.data[0].id,
          name: selected,
          newXp: props.data[0].xp - price,
        })
        .then((res) => {
          props.data[0].xp -= price;
          setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Vous n'avez pas assez d'xp");
    }
  };

  const equip = () => {
    axios
      .post("http://localhost:5000/equip", {
        id: props.data[0].id,
        name: selected,
      })
      .then((res) => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isOwned = (name) => {
    let owned = false;
    skins.forEach((skin) => {
      if (skin.name === name && skin.owned) {
        owned = true;
      }
    });
    spells.forEach((spell) => {
      if (spell.name === name && spell.owned) {
        owned = true;
      }
    });
    return owned;
  };

  const isSkin = (name) => {
    let _skin = false;
    skins.forEach((skin) => {
      if (skin.name === name) {
        _skin = true;
      }
    });
    return _skin;
  };

  const isEquiped = (name) => {
    let equiped = false;
    skins.forEach((skin) => {
      if (skin.name === name && skin.equiped == "1") {
        equiped = true;
      }
    });
    return equiped;
  };

  return (
    <div
      className="w-100 d-flex flex-column align-items-center hug just-color-white justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="glass2 py-3 px-5 mb-5">
        <h1 className="text-center just-color-yellow mb-4">Boutique</h1>
        <h2 className="text-center just-color-white">
          Vous avez {props.data[0].xp} XP
        </h2>
      </div>
      <div className="h-75 d-flex flex-row justify-content-between mx-5 mb-5">
        <div className="w-auto glass1 d-flex flex-column justify-content-between p-4">
          <h1 className="just-color-yellow text-center">Sorts</h1>
          <p className="just-color-yellow text-center">
            (sort acheté = sort appris)
          </p>

          <div className="h-100 w-100 d-flex flex-row justify-content-between align-self-center align-items-center flex-wrap">
            {spells.map((spell) => {
              let bg = spell.name === selected ? "classic-glass" : glassClass;
              let className = "rounded-circle " + bg; //mettre ici les autres classes de la div
              return (
                <div
                  key={spell.name}
                  data-key={spell.name}
                  className="d-flex flex-column justify-content-center align-items-center h-50"
                  onClick={select}
                  style={{ flexBasis: "50%" }}
                >
                  <p>{spellsMap.get(spell.name.split("_").join(" "))}</p>
                  <p>
                    {!spell.owned ? "Prix : " + spell.cost + " XP" : "Appris !"}
                  </p>
                  <div
                    data-key={spell.name}
                    className={className}
                    style={{ width: "120px", height: "120px" }}
                  >
                    <img
                      src={`media/spells/${spell.name}.webp`}
                      className="rounded-circle"
                      style={{ width: "100px", transform: "translate(9%,9%)" }}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass1 text-center p-4" style={{ width: "15%" }}>
          <div className="h-75 d-flex flex-column justify-content-between">
            <h1 className="just-color-yellow">Actions</h1>
            {selected !== "" && !isOwned(selected) ? (
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className={`${glassClass} btn-just-circle just-color-white big-button px-4`}
                onClick={buy}
              >
                Acheter
              </motion.button>
            ) : (
              <button
                className={`${glassClass} btn-just-circle opacity-25 just-color-white big-button px-4`}
              >
                Acheter
              </button>
            )}
            {isOwned(selected) && isSkin(selected) && !isEquiped(selected) ? (
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className={`${glassClass} btn-just-circle just-color-white big-button px-4`}
                onClick={equip}
              >
                Équiper
              </motion.button>
            ) : (
              <button
                className={`${glassClass} btn-just-circle opacity-25 just-color-white big-button px-4`}
              >
                Équiper
              </button>
            )}
          </div>
        </div>
        <div className="box-size-2 glass1 d-flex flex-column justify-content-between p-4">
          <h1 className="just-color-yellow text-center">Skins</h1>
          <div className="d-flex d-flex1 flex-row">
            {skins.map((skin) => {
              let bg = skin.name === selected ? "selected" : "";
              let className = "m-2 " + bg; //mettre ici les autres classes de la div
              return (
                <div
                  key={skin.name}
                  data-key={skin.name}
                  className="d-flex flex-column justify-content-between align-items-center"
                  onClick={select}
                >
                  <h2>{skinsMap.get(skin.name.split("_").join(" "))}</h2>
                  <img
                    src={`media/skin/${skin.name}.png`}
                    style={{ width: "140%" }}
                  ></img>
                  <p>
                    {!skin.owned
                      ? "Prix : " + skin.cost + " XP"
                      : "En poche" + (isEquiped(skin.name) ? " et équipé" : "")}
                  </p>
                  <div />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
