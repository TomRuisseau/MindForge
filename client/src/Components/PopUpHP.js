import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";

function PopUpHP(props) {
  //state
  const [HP, setHP] = useState(0);
  const [tanker, setTanker] = useState("0");
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [tanks, setTanks] = useState([]);

  //comportement

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
        axios
          .post("http://localhost:5000/getTanks", { id: props.id, team: res.data[0].team })
          .then((res) => {
            setTanks(res.data);
          })
          .catch((err) => {
            console.log(err);
          }
          );
      })
      .catch((err) => {
        console.log(err);
      });

  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (tanker === "0") {
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
    }
    else {
      axios
        .post("http://localhost:5000/removeHp", {
          id: tanker,
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
        }
        );
      axios
        .post("http://localhost:5000/useProtection", {
          id: tanker,
        })
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        }
        );
    }
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
          <label htmlFor="tanker" className="mt-3 text-white">
            L'élève souhaite-t-il qu'un des tanks de son équipe utilise "protection" pour 2 points de mana afin de prendre les dégats à sa place ?
          </label>
          <select
            name="tanker"
            id="tanker-select"
            className="rounded"
            onChange={(e) => setTanker(e.target.value)}
          >
            <option value="0">Personne</option>
            {tanks.map((tank) => {
              return (
                <option value={tank.id} key={tank.first_name}>
                  {tank.first_name}
                </option>
              );
            })}
          </select>
          <button type="submit" className="btn btn-success mt-3">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpHP;
