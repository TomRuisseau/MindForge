import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";

function PopUpHP(props) {
  //state
  const [HP, setHP] = useState(0);
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");

  //comportement

  useEffect(() => {
    axios.post("http://localhost:5000/getStudent", { id: props.id }).then((res) => {
      setFirst_name(res.data[0].first_name);
      setSurname(res.data[0].surname);
    }).catch((err) => {
      console.log(err);
    });
  }, [props.id]);


  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios.post("http://localhost:5000/removeHp", {
      id: props.id,
      damage: HP,
    })
      .then((res) => {
        props.close();
        props.addCounter(1);

      })
      .catch((err) => {
        console.log(err);
      }
      );



  };


  //affichage (render)
  return (
    <div className="w-auto p-5 h-40 border border-muted rounded bg-warning position-absolute d-flex flex-column justify-content-center">
      <div className="d-flex flex-row">
        <h2>Retirer des HP à {first_name} {surname}</h2>
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
          required
        />
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

export default PopUpHP;
