import React, { useState, useEffect } from "react";
import axios from "axios";

function VagueDeMana(props) {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("0");

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudentsTeamExcept", {
        team: props.data[0].team,
        id: props.data[0].id,
      })
      .then((res) => {
        setStudents(res.data);
        setStudent(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  const useSpell = (e) => {
    e.preventDefault(); // prevent page reload
    if (props.data[0].mana >= 2 && props.data[0].hp > 5) {
      axios
        .post("http://localhost:5000/useImpositionDesMains", {
          //changer la route
          id: props.data[0].id,
          target: student,
        })
        .then(() => {
          props.data[0].mana -= 4;
          props.data[0].xp += 4;
          props.data[0].hp -= 5;
          props.close();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(
        "Vous n'avez pas assez de mana ou de points de vie pour utiliser ce sort !"
      );
    }
  };

  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Vague de mana</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Tu restaures <span className="text-danger">tout le mana</span> d'un
          membre de ton équipe (sauf toi) en fonction de sa classe.
        </p>
      </div>
      <h3>Coût en mana : 6</h3>
      <div className="w-50">
        <form
          onSubmit={useSpell}
          className="d-flex flex-row justify-content-between"
        >
          <div className="d-flex flex-column">
            <label htmlFor="text" className="mt-3">
              Choisir un membre de l'équipe sur qui utiliser le sort :
            </label>
            <select
              name="student"
              id="student-select"
              className="rounded"
              onChange={(e) => setStudent(e.target.value)}
            >
              {students.map((eleve) => {
                return (
                  <option value={eleve.id} key={eleve.id}>
                    {eleve.first_name} {eleve.surname}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-success btn-lg">
            Utiliser
          </button>
        </form>
      </div>
    </div>
  );
}

export default VagueDeMana;
