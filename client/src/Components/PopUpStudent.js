import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";

function PopUpStudent(props) {
  //state
  const [nomEleve, setNomEleve] = useState("");
  const [prenomEleve, setPrenomEleve] = useState("");
  const [classe, setClasse] = useState(""); //[classe1,classe2,classe3] //peut-être une classe par défaut
  const [teams, setTeams] = useState([]); //[team1,team2,team3] //peut-être une team par défaut
  const [team, setTeam] = useState(""); //[team1,team2,team3] //peut-être une team par défaut
  //comportement
  useEffect(() => {
    axios
      .post("http://localhost:5000/getTeams", { email: props.id })
      .then((res) => {
        setTeams(res.data);
        setTeam(res.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    //number of students in the team must not exceeds 5
    axios
      .post("http://localhost:5000/getTeamSize", { team: team })
      .then((res) => {
        if (res.data[0].size < 4) {
          axios
            .post("http://localhost:5000/addStudent", {
              email: props.id,
              surname: nomEleve,
              first_name: prenomEleve,
              class: classe,
              team: team,
            })
            .then((res) => {
              props.reload();
              props.close();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("L'équipe est déjà complète");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //affichage (render)
  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <div className="p-5 glass3 w-auto h-75 d-flex flex-column justify-content-between align-items-center">
        <motion.button
          whileHover={{ scale: 2 }}
          className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
          onClick={props.close}
        ></motion.button>
        <h2 className="px-3">Ajouter un élève</h2>
        <form
          onSubmit={handleSubmit}
          className="h-100 d-flex flex-column justify-content-between"
        >
          <div className="d-flex flex-column">
            <label htmlFor="text" className="mt-5 mb-2">
              Choisir une équipe :
            </label>
            <select
              name="teams"
              id="teams-select"
              className="rounded opacity-75"
              onChange={(e) => setTeam(e.target.value)}
            >
              {teams.map((team) => {
                return (
                  <option value={team.name} key={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="text" className="mt-5 mb-2">
              Nom de l'élève
            </label>
            <input
              value={nomEleve}
              onChange={(e) => setNomEleve(e.target.value)}
              type="text"
              className="form-control opacity-75"
              placeholder="Dupont"
              id="nomEleve"
              name="nomEleve"
              required
            />
          </div>

          <div>
            <label htmlFor="text" className="mt-5 mb-2">
              Prénom de l'élève
            </label>
            <input
              value={prenomEleve}
              onChange={(e) => setPrenomEleve(e.target.value)}
              type="text"
              className="form-control opacity-75"
              placeholder="Jean"
              id="prenomEleve"
              name="prenomEleve"
              required
            />
          </div>

          <div>
            <p className="mt-5 mb-2">Choisir la classe du personnage</p>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <input
                  type="radio"
                  id="tank"
                  name="classe"
                  className=" opacity-75"
                  value="tank"
                  onClick={() => {
                    setClasse("tank");
                  }}
                  required
                />
                <label htmlFor="tank" className="mx-2">
                  Tank
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="healer"
                  name="classe"
                  className=" opacity-75"
                  value="healer"
                  onClick={() => {
                    setClasse("healer");
                  }}
                  required
                />
                <label htmlFor="healer" className="mx-2">
                  Healer
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="mage"
                  name="classe"
                  className=" opacity-75"
                  value="mage"
                  onClick={() => {
                    setClasse("mage");
                  }}
                  required
                />
                <label htmlFor="mage" className="mx-2">
                  Mage
                </label>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            type="submit"
            className="btn-pop-up-valider just-color-white big-button px-4 pt-1 mt-5"
          >
            Valider
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default PopUpStudent;
