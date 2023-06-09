import axios from "axios";
import { useEffect, useState } from "react";

function PopUpXP(props) {
  //state
  const [XP, setXP] = useState(0);
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/giveXP", {
        id: props.id,
        xp: XP,
      })
      .then((res) => {
        props.close();
        props.addCounter(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //affichage (render)
  return (
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-auto h-auto bg-primary d-flex flex-column align-items-center">
        <div className="d-flex flex-row">
          <h2 className="px-3">
            Ajouter de l'XP à {first_name} {surname}
          </h2>
          <button className="btn-close h-auto" onClick={props.close}></button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <label htmlFor="number" className="mt-3">
            Donner le nombre d'XP à ajouter :
          </label>
          <input
            value={XP}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setXP(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e" || e.key === "E") {
                e.preventDefault();
              }
            }}
            type="number"
            className="form-control"
            placeholder="0"
            id="xp"
            name="xp"
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

export default PopUpXP;
