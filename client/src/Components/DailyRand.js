import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SmallList from "./SmallList";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";

function DailyRand(props) {
  const options = [
    "On regarde un film la semaine prochaine",
    "Le professeur organise un goûter la semaine prochaine",
    "On fera cours dehors s'il fait beau la semaine prochaine",
    "Le professeur vous laisse choisir le prochain exercice",
    "Quelqu'un va perdre des HP",
    "Quelqu'un va gagner des XP",
    "Quelqu'un sera dispensé de devoirs pour le prochain cours",
    "Quelqu'un va gagner du Mana",
    "Interro pour le prochain cours",
    'Tout le monde écrit une idée pour la case "Au choix "',
    "Au choix",
    "Au choix",
  ];
  const [updatedStudent, setUpdatedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [toAddMana, setToAddMana] = useState(0);
  const [toAddXP, setToAddXP] = useState(0);
  const [toRemoveHP, setToRemoveHP] = useState(0);
  const [show, setShow] = useState(false);

  const selectStudent = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    setShow(false);

    setToAddMana(0);
    setToAddXP(0);
    setToRemoveHP(0);

    setUpdatedStudent(students[randomIndex]);
    console.log(updatedStudent);
  };

  const addXP = () => {
    //random number between 1 and 10
    const randomXP = Math.floor(Math.random() * 10) + 1;
    setShow(true);
    setToAddXP(randomXP);
    axios
      .post("http://localhost:5000/giveXP", {
        id: updatedStudent.id,
        xp: randomXP,
      })
      .then(() => {
        props.close();
        console.log(toAddXP);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMana = () => {
    //random number between 1 and 10
    const randomMana = Math.floor(Math.random() * 10) + 1;
    setShow(true);
    setToAddMana(randomMana);

    axios
      .post("http://localhost:5000/giveMana", {
        id: updatedStudent.id,
        mana: randomMana,
      })
      .then(() => {
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeHP = () => {
    //random number between 1 and 10
    const randomHP = Math.floor(Math.random() * 10) + 1;
    setShow(true);

    setToRemoveHP(randomHP);
    axios
      .post("http://localhost:5000/removeHP", {
        id: updatedStudent.id,
        damage: randomHP,
      })
      .then(() => {
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const random = () => {
    setShow(false);
    setToAddMana(0);
    setToAddXP(0);
    setToRemoveHP(0);
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    setSelectedOption(selectedOption);
    setUpdatedStudent(null);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.id })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div className="h-100 text-white d-flex flex-row hug justify-content-between align-items-center">
      <div className="box-size m-5 p-5 w-75 glass1 text-center d-flex flex-column justify-content-between align-items-center">
        <div>
          <button
            onClick={random}
            className="btn-lancer-dailyRand just-color-white"
          >
            LANCER
          </button>
        </div>
        <h1>{selectedOption}</h1>
        <div className="w-50 h-25 d-flex flex-row text-center my-5 justify-content-between">
          {selectedOption === "Quelqu'un va perdre des HP" ||
          selectedOption === "Quelqu'un va gagner des XP" ||
          selectedOption === "Quelqu'un va gagner du Mana" ||
          selectedOption ===
            "Quelqu'un sera dispensé de devoirs pour le prochain cours" ? (
            <div className="w-50 h-5O d-flex flex-column justify-content-between align-items-center">
              <div className="w-100 mt-5 mb-3">
                <button
                  onClick={selectStudent}
                  className="w-75 btn-quetes-valider just-color-yellow who-how-many-size"
                >
                  Qui donc ?
                </button>
              </div>
              <h3 style={{ whiteSpace: "nowrap" }}>
                {updatedStudent &&
                  `C'est pour ${updatedStudent.first_name} ${updatedStudent.surname}`}
              </h3>
            </div>
          ) : null}
          {selectedOption === "Quelqu'un va gagner des XP" &&
            updatedStudent && (
              <div className="h-5O d-flex flex-column justify-content-between align-items-center">
                <div className="w-100 mt-5 mb-3">
                  <button
                    onClick={addXP}
                    className="w-100 btn-quetes-valider px-4 just-color-yellow who-how-many-size"
                  >
                    Combien ?
                  </button>
                </div>
                {show === true && toAddXP > 0 && (
                  <div>
                    <h3>{`+ ${toAddXP} XP`}</h3>
                  </div>
                )}
              </div>
            )}

          {selectedOption === "Quelqu'un va gagner du Mana" &&
            updatedStudent && (
              <div className="h-5O d-flex flex-column justify-content-between align-items-center">
                <div className="w-100 mt-5 mb-3">
                  <button
                    onClick={addMana}
                    className="w-100 btn-quetes-valider px-4 just-color-yellow who-how-many-size"
                  >
                    Combien ?
                  </button>
                </div>
                {show === true && toAddMana > 0 && (
                  <div>
                    <h3>{`+ ${toAddMana} Mana`}</h3>
                  </div>
                )}
              </div>
            )}

          {selectedOption === "Quelqu'un va perdre des HP" &&
            updatedStudent && (
              <div className="h-5O d-flex flex-column justify-content-between align-items-center">
                <div className="w-100 mt-5 mb-3">
                  <button
                    onClick={removeHP}
                    className="w-100 px-4 btn-quetes-valider just-color-yellow who-how-many-size"
                  >
                    Combien ?
                  </button>
                </div>
                {show === true && toRemoveHP > 0 && (
                  <div>
                    <h3>{`- ${toRemoveHP} HP`}</h3>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
      <SmallList id={props.id} />
    </div>
  );
}

export default DailyRand;
