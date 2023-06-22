import axios from "axios";
import { motion } from "framer-motion";
import "../../Styles/Glass.css";
import "../../Styles/Textes.css";
import "../../Styles/Buttons.css";

function SoinDeMasse(props) {
  const useSpell = () => {
    if (props.data[0].mana >= 4) {
      axios
        .post("http://localhost:5000/useSoinDeMasse", {
          //changer le nom de la route
          id: props.data[0].id,
          team: props.data[0].team,
        })
        .then(() => {
          props.close();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Vous n'avez pas assez de mana pour utiliser ce sort !");
    }
  };

  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <div className="px-3 py-3 w-50 h-50 glass3 text-center d-flex flex-column align-items-center justify-content-between">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Soin de masse</h1>
          <motion.button
            whileHover={{ scale: 2 }}
            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
            onClick={props.close}
          ></motion.button>
        </div>
        <div className="p-3 rounded">
          <p style={{ fontSize: "22px" }}>
            Tu soignes tous les membres de l'équipe de{" "}
            <span className="text-danger">2 HP</span>.
          </p>
        </div>
        <h3>Coût en mana : 6</h3>
        <div className="w-100 text-center">
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="btn-pop-up-valider just-color-white big-button px-4 pt-1 my-3"
            >
              Utiliser
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoinDeMasse;
