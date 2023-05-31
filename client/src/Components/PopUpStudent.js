import { useEffect, useState } from "react";
import axios from "axios";

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
    axios.post("http://localhost:5000/addStudent", {
      email: props.id,
      surname: nomEleve,
      first_name: prenomEleve,
      class: classe,
      team: team,
    });
    props.close();
  };

  //affichage (render)
  return (
    <div className="w-auto p-5 h-40 border border-danger rounded bg-primary position-absolute d-flex flex-column justify-content-center">
      <div className="d-flex flex-row">
        <h2>Ajouter un élève</h2>
        <button
          className="btn-close text-danger w-10 mx-3 rounded-circle"
          onClick={props.close}
        ></button>
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
            />
            <label htmlFor="mage">Mage</label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success mt-3"
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default PopUpStudent;
