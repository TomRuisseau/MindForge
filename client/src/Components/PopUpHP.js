import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";

function PopUpHP(props) {
  //state
  const [HP, setHP] = useState();
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");

  //comportement

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

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/removeHp", {
        id: props.id,
        damage: HP,
      })
      .then((res) => {
        props.close();
        props.addCounter(1);
        if (res.data === "dead") {
          props.isDead();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //affichage (render)
  return (
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-auto h-auto bg-black d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between">
          <h2 className="text-white px-5">
            Retirer des HP à {first_name} {surname}
          </h2>
          <button
            className="btn-close btn-close-white h-auto"
            onClick={props.close}
          ></button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <label htmlFor="number" className="mt-3 text-white">
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
          <button type="submit" className="btn btn-success mt-3">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpHP;
