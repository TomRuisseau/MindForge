import React, { useState, useEffect } from "react";
import axios from "axios";

function PopUpDead(props) {
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    "L'équipe organise un goûter",
    "Coup de bol",
    "Choix du professeur",
    "Passer au tableau pour le prochain exercice",
    "L'équipe doit faire un exposé",
    "Tu fais seul un exposé",
    "Chanter",
    "Récit de poésie",
    "Faire un stand-up",
    "Faire un poème d'éloge au professeur",
    "Débat",
    "Coup de bol",
  ];

  const onClick = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    setSelectedOption(selectedOption);
  };

  const backToLife = () => {
    axios
      .post("http://localhost:5000/removeHp", {
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
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div className="text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-mwhite rounded w-50 h-50 bg-black d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Oh non !</h1>
          <button
            className="btn-close btn-close-white h-auto"
            onClick={backToLife}
          ></button>
        </div>
        <br></br>
        <h2>
          {first_name} {surname} n'a plus de vie.
        </h2>

        <br></br>
        {selectedOption ? (
          <h1 className="h-5 m-5">{selectedOption}</h1>
        ) : (
          <button className="btn btn-primary" onClick={onClick}>
            Lancer la roue de la mort
          </button>
        )}
      </div>
    </div>
  );
}

export default PopUpDead;
