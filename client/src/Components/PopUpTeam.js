import { useState } from "react";
import axios from "axios";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";

function PopUpTeam(props) {
  //state
  const [nomDequipe, setNomDequipe] = useState("");

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/addTeam", { //ask server to create the team
        email: props.id,
        name: nomDequipe,
      })
      .then((res) => {
        if (res.data === 0) { //if the team was created, close the pop up
          props.close();
        } else { //else, display an error message
          props.notify("Equipe déjà existante");
        }
      });
  };

  //affichage (render)
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <motion.div
        //entrance animation
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-5 glass3 w-auto h-50 d-flex flex-column justify-content-between align-items-center"
      >
        <motion.button
          whileHover={{ scale: 2 }}
          className="btn-close btn-close-white m-3 position-absolute top-0 end-0 "
          onClick={props.close}
        ></motion.button>
        <h2 className="px-3 just-color-white">Ajouter une équipe</h2>
        <form
          onSubmit={handleSubmit}
          className="w-100 h-75 d-flex flex-column justify-content-between align-items-center"
        >
          <div className="w-100">
            <label htmlFor="text" className="my-3">
              Entrez un nom d'équipe :
            </label>
            <input
              value={nomDequipe}
              onChange={(e) => setNomDequipe(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Un nom d'équipe"
              id="nomDequipe"
              name="nomDequipe"
              required
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="btn-pop-up-valider just-color-white big-button px-4 pt-1 mt-3"
            >
              Valider
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PopUpTeam;
