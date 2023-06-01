import { useState } from "react";
import axios from "axios";

function PopUpTeam(props) {
  //state
  const [nomDequipe, setNomDequipe] = useState("");

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log(nomDequipe);
    axios
      .post("http://localhost:5000/addTeam", {
        email: props.id,
        name: nomDequipe,
      })
      .then((res) => {
        if (res.data === 0) {
          //console.log("team created");
          props.close();
        } else {
          alert("équipe déjà existante");
        }
      });
  };

  //affichage (render)
  return (
    <div className="w-auto p-5 h-40 border border-primary rounded bg-danger position-absolute d-flex flex-column justify-content-center">
      <div className="d-flex flex-row">
        <h2>Créer une équipe</h2>
        <button
          className="btn-close text-danger w-10 mx-3 rounded-circle"
          onClick={props.close}
        ></button>
      </div>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label htmlFor="text" className="mt-3">
          Entrez un nom d'équipe :
        </label>
        <input
          value={nomDequipe}
          onChange={(e) => setNomDequipe(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Un nom d'équipe"
          id="nomDequipe"
          name="nomDequipe"
          required
        />
        <button type="submit" className="btn btn-success mt-3">
          Valider
        </button>
      </form>
    </div>
  );
}

export default PopUpTeam;
