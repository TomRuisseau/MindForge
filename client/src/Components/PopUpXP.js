import { useState } from "react";

function PopUpXP(props) {
  //state
  const [XP, setXP] = useState(0);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log(XP);
    //axios.post('http://localhost:5000/login/teacher', { email: email, password: password })
  };

  //affichage (render)
  return (
    <div className="w-auto p-5 h-40 border border-muted rounded bg-secondary position-absolute d-flex flex-column justify-content-center">
      <div className="d-flex flex-row">
        <h2>Retirer des XP à 'prenom + nom'</h2>
        <button
          className="btn-close text-danger w-10 mx-3 rounded-circle"
          onClick={props.close}
        ></button>
      </div>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label htmlFor="number" className="mt-3">
          Donner le nombre d'XP à retirer :
        </label>
        <input
          value={XP}
          onChange={(e) => setXP(e.target.value)}
          type="number"
          className="form-control"
          placeholder="0"
          id="xp"
          name="xp"
          required
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

export default PopUpXP;
