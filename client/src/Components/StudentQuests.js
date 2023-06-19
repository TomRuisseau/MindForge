import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Buttons.css";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import { motion } from "framer-motion";

function StudentQuests(props) {
  //state
  const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page quand valide une quête
  const [quests, setQuests] = useState([]); // liste des quêtes
  const [completedQuests, setCompletedQuests] = useState([]); // liste des quêtes validées
  //comportement
  useEffect(() => {
    axios
      .post("http://localhost:5000/getQuests", {
        email: props.data[0].teacher_email,
      })
      .then((res) => {
        setQuests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:5000/getCompletedQuests", {
        email: props.data[0].teacher_email,
        id: props.data[0].id,
      })
      .then((res) => {
        setCompletedQuests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter, props.data]);

  const questValidation = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/questValidation", {
        quest_id: e.target.parentElement.parentElement.getAttribute("data-key"),
        student_id: props.data[0].id,
      })
      .then((res) => {
        props.data[0].xp += getReward(
          e.target.parentElement.parentElement.getAttribute("data-key")
        );
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testCompletedQuests = (quest_id) => {
    for (let i = 0; i < completedQuests.length; i++) {
      if (completedQuests[i].id == quest_id) {
        return true;
      }
    }
    return false;
  };

  const getReward = (quest_id) => {
    for (let i = 0; i < quests.length; i++) {
      if (quests[i].id == quest_id) {
        return quests[i].reward;
      }
    }
  };

  //affichage
  return (
    <>
      <div
        className="w-100 d-flex align-items-center hug justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="glass1 p-5 d-flex flex-column custom-scrollbar box-size w-75"
          style={{ overflow: "auto" }}
        >
          <h2 className="text-center just-color-yellow mb-5">
            Liste de quêtes
          </h2>
          <table className="table">
            <thead className="just-color-white log-size">
              <tr className="mb-5">
                <th scope="col">Description</th>
                <th scope="col">Récompense</th>
                <th scope="col">État</th>
              </tr>
            </thead>
            <tbody className="just-color-white">
              {quests.map((quest) => {
                return (
                  <tr key={quest.id} data-key={quest.id}>
                    <td>{quest.description}</td>
                    <td>{quest.reward}</td>
                    {testCompletedQuests(quest.id) ? (
                      <td>
                        <p>Quête déjà terminée</p>
                      </td>
                    ) : (
                      <td>
                        <button
                          onClick={questValidation}
                          className="btn btn-light"
                        >
                          Terminer la quête
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentQuests;
