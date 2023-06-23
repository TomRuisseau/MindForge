import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/studentProfile.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import { motion } from "framer-motion";

const SpellBar = (props) => {
  const [spells, setSpells] = useState([]); // liste des sorts
  const [hoveredSpell, setHoveredSpell] = useState(null); // sort survolé
  const [glassClass, setGlassClass] = useState("glass-tank"); // classe du verre (tank, healer, mage)

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

  const isMountedRef = useRef(false);

  useEffect(() => {
    const classToGlassClassMap = {
      tank: "glass-tank",
      mage: "glass-mage",
      healer: "glass-healer",
    };
    setGlassClass(classToGlassClassMap[props.data[0].class]);
  }, [props.data]);

  const selectSpell = (spell) => {
    props.openPopUp(spell);
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      axios
        .post("http://localhost:5000/getSpells", {
          id: props.data[0].id,
          class: props.data[0].class,
        })
        .then((res) => {
          setSpells(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.data]);

  return (
    <div className="w-auto h-100 d-flex flex-column">
      <h3 className="mb-5">Sorts</h3>

      <div
        className="h-auto d-flex flex-column justify-content-between"
        style={{ minHeight: "50%" }}
      >
        {spells.map((spell) => {
          return (
            <div key={spell.item_name} className="text-center spell-container">
              <motion.img
                whileHover={{
                  x: -10,
                  cursor: "pointer",
                }}
                whileTap={{ scale: 0.9 }}
                src={`media/spells/${spell.item_name}.png`}
                onClick={() => selectSpell(spell.item_name)}
                onMouseEnter={() => setHoveredSpell(spell.item_name)}
                onMouseLeave={() => setHoveredSpell(null)}
                className="rounded m-3"
                style={{ width: "71px", height: "71px" }}
              ></motion.img>
              {hoveredSpell === spell.item_name && (
                <div className={`position-nom-sort ${glassClass} `}>
                  <p
                    className="just-color-white spell-name pt-3 px-4"
                    style={{ fontSize: "2vh" }}
                  >
                    {spellsMap.get(spell.item_name.split("_").join(" "))}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpellBar;
