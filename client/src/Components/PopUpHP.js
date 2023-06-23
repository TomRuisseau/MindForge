import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";
import Select from "react-select";

function PopUpHP(props) {
  //state
  const [HP, setHP] = useState(0);
  const [tanker, setTanker] = useState("0");
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [tanks, setTanks] = useState([]);

  //comportement

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
        axios
          .post("http://localhost:5000/getTanks", {
            id: props.id,
            team: res.data[0].team,
          })
          .then((res) => {
            setTanks(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (tanker === "0") {
      axios
        .post("http://localhost:5000/removeHp", {
          id: props.id,
          damage: HP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
          if (res.data === "dead") {
            props.isDead(props.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:5000/removeHp", {
          id: tanker,
          damage: HP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
          if (res.data === "dead") {
            props.isDead(tanker);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/useProtection", {
          id: tanker,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
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
        className="p-5 w-auto h-50 glass3 d-flex flex-column align-items-center"
      >
        <motion.button
          whileHover={{ scale: 2 }}
          className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
          onClick={props.close}
        ></motion.button>
        <h2 className="px-5">
          Retirer des HP à {first_name} {surname}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="h-100 w-100 d-flex flex-column justify-content-between"
        >
          <div>
            <label htmlFor="number" className="mt-5 mb-2">
              Donner le nombre d'HP à retirer :
            </label>
            <input
              value={HP}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setHP(e.target.value);
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
              id="hp"
              name="hp"
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="tanker" className="mt-5 mb-2">
              Utilisation de "Protection" (2 points mana) par :
            </label>
            {(() => {
              const options = [];
              options.push({ value: "0", label: "Personne", key: "Personne" });
              tanks.map((tank) => {
                options.push({
                  value: tank.id,
                  label: tank.first_name,
                  key: tank.first_name,
                });
              });

              const styles = {
                option: (provided, state) => ({
                  ...provided,
                  fontWeight: state.isSelected ? "bold" : "normal",
                  color: "black",
                  backgroundColor: "white",
                  fontSize: state.selectProps.myFontSize,
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "black",
                  fontSize: state.selectProps.myFontSize,
                }),
              };

              return (
                <Select
                  options={options}
                  defaultValue={options[0]}
                  required
                  styles={styles}
                  name="tanks"
                  id="tanker-select"
                  className="rounded"
                  onChange={(e) => setTanker(e.value)}
                />
              );
            })()}
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
      </motion.div>
    </div>
  );
}

export default PopUpHP;
