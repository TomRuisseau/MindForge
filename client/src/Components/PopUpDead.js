import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";
import Select from "react-select";

function PopUpDead(props) {
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); //selected option for healer
  const [healers, setHealers] = useState([]); //list of healers that could revive the student
  const [healer, setHealer] = useState("0"); //selected healer

  const options = [
    "L'équipe organise un goûter",
    "Coup de chance ! pas de malus",
    "Choix du professeur",
    "Passer au tableau pour le prochain exercice",
    "L'équipe doit faire un exposé sur un sujet choisi par le professeur",
    "Faire seul un exposé",
    "Toute l'équipe chante une chanson",
    "Récit de poésie",
    "Faire un stand-up ou une mini pièce de théâtre avec l'équipe",
    "Faire un poème d'éloge au professeur",
    "Lire un livre choisi par le professeur",
    "Tutorat d'un autre élève",
    "Exercices supplémentaires",
    "Faire un exposer en anglais",
  ];

  const onClick = () => { //when the button is clicked, select a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    setSelectedOption(selectedOption);
  };

  const backToLife = () => { //when the button is clicked, revive the student
    if (healer !== "0") { //if a healer was selected, make them use revivification
      axios
        .post("http://localhost:5000/useRevivification", {
          id: healer,
        })
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .post("http://localhost:5000/removeHp", { //set the student's hp to 1
        id: props.id,
        damage: -1,
      })
      .then((res) => {
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id }) //get the student's name and team
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
        axios
          .post("http://localhost:5000/getHealers", { //get the list of healers that could revive the student
            id: props.id,
            team: res.data[0].team,
          })
          .then((res) => {
            setHealers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

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
        className="glass-dead p-5 w-50 h-50 d-flex flex-column align-items-center"
      >
        <motion.button
          whileHover={{ scale: 2 }}
          className="btn-close btn-close-white m-3 position-absolute top-0 end-0 "
          onClick={backToLife}
        ></motion.button>
        <div className="h-100 d-flex flex-column justify-content-between align-items-center">
          <h1 className="px-5">Oh non !</h1>
          <h2>
            {first_name} {surname} n'a plus de vie...
          </h2>
          <label htmlFor="tanker" className="mt-3 text-white">
            Utilisation de "reviviscence" (6 points de mana - annuler le malus)
            par :
          </label>
          <option value="0">Personne</option>
          {healers.map((_healer) => {
            return (
              <option value={_healer.id} key={_healer.first_name}>
                {_healer.first_name}
              </option>
            );
          })}

          {(() => {
            const options = [];
            options.push({ value: "0", label: "Personne", key: "Personne" });
            healers.map((_healer) => {
              options.push({
                value: _healer.id,
                label: _healer.first_name,
                key: _healer.first_name,
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
                name="healer"
                id="healer-select"
                className="rounded"
                onChange={(e) => setHealer(e.value)}
              />
            );
          })()}
          {selectedOption ? (
            <h1 className="h-5 m-5">{selectedOption}</h1>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className="btn-lancer-roue-de-la-mort just-color-white big-button p-4 mt-3"
              onClick={onClick}
            >
              Lancer la roue de la mort
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default PopUpDead;
