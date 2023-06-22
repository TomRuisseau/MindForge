import React from "react";
import { motion } from "framer-motion";

function TruquageDuDestin(props) {
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 translate-middl w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <div className="px-3 py-3 w-50 h-50 glass3 text-center d-flex flex-column align-items-center justify-content-between">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Truquage du destin</h1>
          <motion.button
            whileHover={{ scale: 2 }}
            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
            onClick={props.close}
          ></motion.button>
        </div>
        <div className="p-3 rounded">
          <p style={{ fontSize: "22px" }}>
            Permet de généraliser un gain d'XP individuel à toute l'équipe.
          </p>
          <p style={{ fontSize: "22px" }}>
            (Est activé par le professeur pendant l'attribution d'une
            récompense)
          </p>
        </div>
        <h3>Coût en mana : 5</h3>
      </div>
    </div>
  );
}

export default TruquageDuDestin;
