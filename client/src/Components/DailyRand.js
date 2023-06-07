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

  const selectStudent = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    setUpdatedStudent(students[randomIndex]);
    console.log(updatedStudent);
  };

  const random = () => {
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
        {selectedOption === "Quelqu'un va perdre des HP" ||
        selectedOption === "Quelqu'un va gagner des XP" ||
        selectedOption === "Quelqu'un va gagner du Mana" ||
        selectedOption ===
          "Quelqu'un sera dispensé de devoirs pour le prochain cours" ? (
          <div>
            <button
              onClick={selectStudent}
              className="btn btn-primary btn-lg "
              style={{ marginBottom: "10%", marginTop: "10%" }}
            >
              Qui donc ?
            </button>
          </div>
        ) : null}

        <h2>
          {updatedStudent &&
            `C'est pour ${updatedStudent.first_name} ${updatedStudent.surname}`}
        </h2>
      </div>
    </div>
  );
}

export default DailyRand;
