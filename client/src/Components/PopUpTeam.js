import { useState } from "react";

function PopUpTeam(props) {
  //state
  const [nomDequipe, setNomDequipe] = useState("");

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log(nomDequipe);
    //axios.post('http://localhost:5000/login/teacher', { email: email, password: password })
  };

  //affichage (render)
  return (
    <div className="w-auto p-3 h-40 border border-primary rounded bg-danger position-absolute d-flex flex-column justify-content-center">
      <h2>Créer une équipe</h2>
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
        />
        <button
          type="submit"
          className="btn btn-success mt-3"
          onClick={props.close}
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default PopUpTeam;
