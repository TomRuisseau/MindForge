import React, { useState } from "react";

function DailyRand(props) {
  const options = [
    "On regarde un film la semaine prochaine",
    "Le professeur organise un goûter la semaine prochaine",
    "On fera cours dehors s'il fait beau la semaine prochaine",
    "Le professeur vous laisse choisir le prochain exercice",
    "Tu vas perdre des HP",
    "Tu vas gagner des XP",
    "Tu es dispensé de devoirs pour le prochain cours",
    "Tu gagnes des Manas",
    "Interro pour le prochain cours",
    'Tout le monde écrit une idée pour la case "Au choix "',
    "Au choix",
    "Au choix",
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const random = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    setSelectedOption(selectedOption);
  };

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
        <button
          onClick={random}
          className="btn btn-danger btn-lg"
          style={{ marginBottom: "10%" }}
        >
          Lancer
        </button>
        <h3>{selectedOption}</h3>
      </div>
    </div>
  );
}

export default DailyRand;
