import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
    // axios
    //   .post("http://localhost:5000/giveXP", {
    //     id: updatedStudent.id,
    //     xp: randomXP,
    //   })
    //   .then(() => {
    //     props.data[0].xp += randomXP;
    setToAddXP(randomXP);
    //   props.close();
    //   console.log(toAddXP);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const addMana = () => {
    //random number between 1 and 10
    const randomMana = Math.floor(Math.random() * 10) + 1;
    setShow(true);

    // axios
    //   .post("http://localhost:5000/giveMana", {
    //     id: updatedStudent.id,
    //     mana: randomMana,
    //   })
    //   .then(() => {
    setToAddMana(randomMana);
    //   props.data[0].mana += randomMana;
    //   props.close();
    //   console.log(toAddMana);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const removeHP = () => {
    //random number between 1 and 10
    const randomHP = Math.floor(Math.random() * 10) + 1;
    setShow(true);

    // axios
    //   .post("http://localhost:5000/removeHP", {
    //     id: updatedStudent.id,
    //     damage: randomHP,
    //   })
    //   .then(() => {
    setToRemoveHP(randomHP);
    //   props.data[0].hp -= randomHP;
    //   props.close();
    //   console.log(toRemoveHP);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
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
    <div
      className="text-white"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="p-5 w-75 h-75 border border-danger rounded text-center d-flex flex-column justify-content-center">
        <div>
          <button
            onClick={random}
            className="btn btn-danger btn-lg"
            style={{
              marginBottom: "10%",
              fontSize: "50px",
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingLeft: "100px",
              paddingRight: "100px",
            }}
          >
            Lancer
          </button>
        </div>
        <h3>{selectedOption}</h3>
        <div className="d-flex flex-row text-center my-5 justify-content-between">
          {selectedOption === "Quelqu'un va perdre des HP" ||
          selectedOption === "Quelqu'un va gagner des XP" ||
          selectedOption === "Quelqu'un va gagner du Mana" ||
          selectedOption ===
            "Quelqu'un sera dispensé de devoirs pour le prochain cours" ? (
            <div>
              <button
                onClick={selectStudent}
                className="btn btn-primary"
                style={{ marginBottom: "10%", marginTop: "10%" }}
              >
                Qui donc ?
              </button>
            </div>
          ) : null}
          <h4>
            {updatedStudent &&
              `C'est pour ${updatedStudent.first_name} ${updatedStudent.surname}`}
          </h4>
          {selectedOption === "Quelqu'un va gagner des XP" && (
            <div>
              <button
                onClick={addXP}
                className="btn btn-primary"
                style={{ marginBottom: "10%", marginTop: "10%" }}
              >
                Combien ?
              </button>
            </div>
          )}
          {selectedOption === "Quelqu'un va gagner du Mana" && (
            <div>
              <button
                onClick={addMana}
                className="btn btn-primary"
                style={{ marginBottom: "10%", marginTop: "10%" }}
              >
                Combien ?
              </button>
            </div>
          )}
          {selectedOption === "Quelqu'un va perdre des HP" && (
            <div>
              <button
                onClick={removeHP}
                className="btn btn-primary"
                style={{ marginBottom: "10%", marginTop: "10%" }}
              >
                Combien ?
              </button>
            </div>
          )}
          {show === true ? (
            <div>
              {toRemoveHP > 0 && (
                <div>
                  <h4>{`-${toRemoveHP} HP`}</h4>
                </div>
              )}
              {toAddMana > 0 && (
                <div>
                  <h4>{`+${toAddMana} Mana`}</h4>
                </div>
              )}
              {toAddXP > 0 && (
                <div>
                  <h4>{`+${toAddXP} XP`}</h4>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DailyRand;
