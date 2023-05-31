import { useState } from "react";

function PopUpTeam(props) {
  //state
  const [nomDequipe, setNomDequipe] = useState("");
  const [toggle, setToggle] = useState(false);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log(nomDequipe);
    //axios.post('http://localhost:5000/login/teacher', { email: email, password: password })
  };

  //affichage
  return (
    <div className="w-25 p-3 h-30 border border-danger rounded bg-primary position-absolute top-50 x*-left-50">
      <h2>Créer une équipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Entrez un nom d'équipe :</label>
        <input
          value={nomDequipe}
          onChange={(e) => setNomDequipe(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Un nom d'équipe"
          id="nomDequipe"
          name="nomDequipe"
        />
        <button type="submit" className="btn btn-primary" onClick={props.close}>
          Valider
        </button>
      </form>
    </div>
  );
}

export default PopUpTeam;
