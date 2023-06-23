import React from "react";
import { motion } from "framer-motion";
import "../../Styles/Glass.css";
import "../../Styles/Textes.css";

function Protection(props) {
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <motion.div
        //entrance animation
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="px-3 py-3 w-50 h-50 glass3 text-center d-flex flex-column align-items-center justify-content-between"
      >
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Protection</h1>
          <motion.button
            whileHover={{ scale: 2 }}
            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
            onClick={props.close}
          ></motion.button>
        </div>
        <div className="p-3 rounded">
          <p style={{ fontSize: "22px" }}>
            Tu encaisses les dégats en HP à la place d'un membre de ton équipe.
          </p>
          <p style={{ fontSize: "22px" }}>
            (Est activé par le professeur lors de la mort de ton équipier){" "}
          </p>
        </div>
        <h3>Coût en mana : 2</h3>
      </motion.div>
    </div>
  );
}

export default Protection;
