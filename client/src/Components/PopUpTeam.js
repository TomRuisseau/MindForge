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
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-auto h-auto bg-danger d-flex flex-column align-items-center">
        {" "}
        <div className="d-flex flex-row">
          <h2 className="px-3">Créer une équipe</h2>
          <button
            className="btn-close btn-close-white h-auto"
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
    </div>
  );
}

export default PopUpTeam;
