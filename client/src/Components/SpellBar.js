import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/studentProfile.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import { motion } from "framer-motion";

const SpellBar = (props) => {
  const [spells, setSpells] = useState([]); // liste des sorts

  const isMountedRef = useRef(false);


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
    <div className="w-auto h-75 d-flex flex-column justify-content-between">
      <h3>Sorts</h3>

      <div
        className="h-auto d-flex flex-column justify-content-between"
        style={{ minHeight: "50%" }}
      >
        {spells.map((spell) => {
          return (
            <div key={spell.item_name} className="text-center">
              <motion.img
                whileHover={{
                  scale: 1.2,
                  //scale center
                  originY: 0.5,
                  cursor: "pointer",
                }}
                whileTap={{ scale: 1 }}
                src={`media/spells/${spell.item_name}.webp`}
                onClick={() => selectSpell(spell.item_name)}
                className="rounded m-3"
                style={{ width: "71px", height: "71px" }}
              ></motion.img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpellBar;
