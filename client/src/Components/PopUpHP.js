import { useState } from "react";

function PopUpHP(props) {
  //state
  const [HP, setHP] = useState(0);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log(HP);
    //axios.post('http://localhost:5000/login/teacher', { email: email, password: password })
  };

  //affichage (render)
  return (
    <div className="w-auto p-5 h-40 border border-muted rounded bg-warning position-absolute d-flex flex-column justify-content-center">
      <div className="d-flex flex-row">
        <h2>Retirer des HP à 'prenom + nom'</h2>
        <button
          className="btn-close text-danger w-10 mx-3 rounded-circle"
          onClick={props.close}
        ></button>
      </div>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label htmlFor="number" className="mt-3">
          Donner le nombre d'HP à retirer :
        </label>
        <input
          value={HP}
          onChange={(e) => setHP(e.target.value)}
          type="number"
          className="form-control"
          placeholder="0"
          id="hp"
          name="hp"
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

export default PopUpHP;
