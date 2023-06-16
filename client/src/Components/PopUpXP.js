import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";

function PopUpXP(props) {
  //state
  const [XP, setXP] = useState(0);
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [mages, setMages] = useState([]);
  const [mage, setMage] = useState("0");

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
        axios
          .post("http://localhost:5000/getMages", {
            id: props.id,
            team: res.data[0].team,
          })
          .then((res) => {
            setMages(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (mage === "0") {
      axios
        .post("http://localhost:5000/giveXP", {
          id: props.id,
          xp: XP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:5000/useTruquageDuDestin", {
          id: props.id,
          team: getTeam(mage),
          xp: XP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getTeam = (mage) => {
    for (let i = 0; i < mages.length; i++) {
      if (mages[i].id === mage) {
        return mages[i].team;
      }
    }
  };

  //affichage (render)
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <div className="p-5 w-auto h-50 glass3 d-flex flex-column align-items-center">
        <motion.button
          whileHover={{ scale: 2 }}
          className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
          onClick={props.close}
        ></motion.button>
        <h2 className="px-5">
          Ajouter de l'XP à {first_name} {surname}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="h-100 w-100 d-flex flex-column justify-content-between"
        >
          <div>
            <label htmlFor="number" className="mt-5 mb-2">
              Donner le nombre d'XP à ajouter :
            </label>
            <input
              value={XP}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setXP(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              type="number"
              className="form-control opacity-75"
              placeholder="0"
              id="xp"
              name="xp"
              required
            />
          </div>

          <div className="d-flex flex-column">
            <label htmlFor="mage" className="mt-5 mb2">
              Utilisation de "truquage du destin" (5points de mana - gain des XP
              pour toute l'équipe) par :
            </label>
            <select
              name="mage"
              id="mage-select"
              className="rounded"
              value={mage}
              onChange={(e) => setMage(e.target.value)}
            >
              <option value="0">Personne</option>
              {mages.map((_mage) => (
                <option value={_mage.id} key={_mage.id}>
                  {_mage.first_name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-100 text-center">
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                type="submit"
                className="btn-pop-up-valider just-color-white big-button px-4 pt-1 mt-5"
              >
                Valider
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUpXP;
