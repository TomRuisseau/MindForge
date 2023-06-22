import React from "react";
import { motion } from "framer-motion";
import "../../Styles/Glass.css";
import "../../Styles/Textes.css";
import "../../Styles/Buttons.css";

function Reviviscence(props) {
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <div className="px-3 py-3 w-50 h-50 glass3 text-center d-flex flex-column align-items-center justify-content-between">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Revviscence</h1>
          <motion.button
            whileHover={{ scale: 2 }}
            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
            onClick={props.close}
          ></motion.button>
        </div>
        <div className="p-3 rounded">
          <p style={{ fontSize: "22px" }}>
            Permet à un membre qui n'a plus de vie de revenir à 1 HP sans subir
            le malus aléatoire.
          </p>
          <p style={{ fontSize: "22px" }}>
            (Est activé par le professeur lors de la mort de ton équipier){" "}
          </p>
        </div>
        <h3>Coût en mana : 6</h3>
      </div>
    </div>
  );
}

export default Reviviscence;
