import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function PopUpDead(props) {
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

  return (
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-50 h-50 bg-warning d-flex flex-column align-items-center">
        <h1>Oh non !</h1>
        <br></br>
        <h2>
          {first_name} {surname} n'a plus de vie.
        </h2>

        <br></br>
        <button className="btn btn-primary" onClick={props.close}>
          Lancer la roue de la mort
        </button>
      </div>
    </div>
  );
}

export default PopUpDead;
