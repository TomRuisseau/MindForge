import React, { useState, useEffect } from "react";
import axios from "axios";
import SmallList from "./SmallList.js";
import "../Styles/Scroll.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";

function Quests(props) {
  // state
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState(0);
  const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page quand on ajoute une quête
  const [quests, setQuests] = useState([]); // liste des quêtes
  const [selectedQuest, setSelectedQuest] = useState(0); // quête sélectionnée

  // comportement
  useEffect(() => {
    axios
      .post("http://localhost:5000/getQuests", { email: props.id }) //get the list of quests
      .then((res) => {
        const blankQuests = res.data.map((quest) => {
          quest.bg = ""; // background color (empty by default)
          return quest;
        });
        setQuests(blankQuests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter, props.id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/addQuest", {
        //add a quest
        email: props.id,
        description: description,
        reward: reward,
      })
      .then((res) => {
        setDescription("");
        setReward(0);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const select = (e) => {
    //select a quest by clicking on it
    let key = e.target.parentNode.getAttribute("data-key");
    setSelectedQuest(key);
    const blankQuests = quests.map((quest) => {
      if (quest.id.toString() === key) {
        quest.bg = "classe-sup"; //add a background color to the selected quest
      } else {
        quest.bg = ""; //and remove it from the others
      }
      return quest;
    });
    setQuests(blankQuests);
  };

  const deleteQuest = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/deleteQuest", {
        //delete a quest
        id: selectedQuest,
      })
      .then((res) => {
        setCounter(counter + 1); //force page reload
        setSelectedQuest(0); //unselect the quest
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // affichage
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100 d-flex flex-row align-items-center justify-content-between">
        <div className="p-3 m-5 glass1 hug box-size" style={{ width: "40vw" }}>
          <h2 className="text-center just-color-yellow m-3 mb-5">
            Liste de quêtes
          </h2>
          <div
            className="custom-scrollbar"
            style={{ height: "65vh", overflow: "auto" }}
          >
            <table className="table table-striped text-white">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Récompense</th>
                  <th scope="col">Terminée par </th>
                </tr>
              </thead>
              <tbody>
                {quests.map((quest) => {
                  return (
                    <tr
                      key={quest.id}
                      onClick={select}
                      data-key={quest.id}
                      className={`on-hover ${quest.bg} `}
                    >
                      <td className="text-white">{quest.description}</td>
                      <td className="text-white">{quest.reward}</td>
                      <td className="text-white">
                        {quest.nbCompleted + " élève(s)"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="glass1 w-25 p-4 hug box-size d-flex flex-column justify-content-between">
          <h2 className="just-color-yellow">Ajouter une quête :</h2>
          <form
            onSubmit={handleSubmit}
            className="h-75 d-flex flex-column justify-content-between just-color-white"
          >
            <div className="h-50 w-100">
              <label htmlFor="text" className="mt-3">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control h-100 opacity-75"
                placeholder="Faire l'exercice 1 page 12"
                id="description"
                name="description"
                required
              />
            </div>
            <div className="w-100">
              <label htmlFor="number" className="mt-3">
                Nombre de points d'XP à gagner :
              </label>
              <input
                value={reward}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setReward(e.target.value);
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="btn-quetes-valider just-color-white log-size"
            >
              Valider
            </motion.button>
          </form>
          {selectedQuest != 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={deleteQuest}
              className="btn-quetes-supp just-color-white log-size"
            >
              Supprimer la quête sélectionnée
            </motion.button>
          ) : (
            <motion.button className="w-100 btn-quetes-supp just-color-white log-size">
              Selectionnez une quête pour la supprimer
            </motion.button>
          )}
        </div>

        <SmallList id={props.id} />
      </div>
    </div>
  );
}

export default Quests;
