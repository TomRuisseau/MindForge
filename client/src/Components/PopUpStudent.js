import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

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
  };

  //affichage (render)
  return (
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-auto h-auto bg-primary d-flex flex-column align-items-center">
        {" "}
        <div className="d-flex flex-row">
          <h2 className="px-3">Ajouter un élève</h2>
          <button className="btn-close h-auto" onClick={props.close}></button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <label htmlFor="text" className="mt-3">
            Choisir une équipe
          </label>
          <select
            name="teams"
            id="teams-select"
            className="rounded"
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

          <label htmlFor="text" className="mt-3">
            Nom de l'élève
          </label>
          <input
            value={nomEleve}
            onChange={(e) => setNomEleve(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Dupont"
            id="nomEleve"
            name="nomEleve"
            required
          />

          <label htmlFor="text" className="mt-3">
            Prénom de l'élève
          </label>
          <input
            value={prenomEleve}
            onChange={(e) => setPrenomEleve(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Jean"
            id="prenomEleve"
            name="prenomEleve"
            required
          />

          <p className="mt-3">Choisir la classe du personnage</p>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <input
                type="radio"
                id="tank"
                name="classe"
                value="tank"
                onClick={() => {
                  setClasse("tank");
                }}
                required
              />
              <label htmlFor="tank">Tank</label>
            </div>
            <div>
              <input
                type="radio"
                id="healer"
                name="classe"
                value="healer"
                onClick={() => {
                  setClasse("healer");
                }}
                required
              />
              <label htmlFor="healer">Healer</label>
            </div>
            <div>
              <input
                type="radio"
                id="mage"
                name="classe"
                value="mage"
                onClick={() => {
                  setClasse("mage");
                }}
                required
              />
              <label htmlFor="mage">Mage</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpStudent;
