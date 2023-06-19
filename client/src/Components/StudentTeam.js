import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Buttons.css";
import "../Styles/Textes.css";
import "../Styles/Glass.css";
import { motion } from "framer-motion";

function StudentTeam(props) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudentsTeam", {
        team: props.data[0].team,
      })
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  //Recupère le skin de chaque élève de l'équipe
  useEffect(() => {
    team.map((student) => {
      axios
        .post("http://localhost:5000/getSkin", { id: student.id })
        .then((res) => {
          student.skin = res.data;
          setTeam([...team]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [team]);

  return (
    <div
      className="w-100 d-flex align-items-center hug just-color-white justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="w-75 p-4 glass1 d-flex flex-column box-size">
        <h1 className="just-color-yellow text-center">
          Mon équipe : {props.data[0].team}
        </h1>
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="w-100 h-100 d-flex flex-row justify-content-between align-items-center p-5">
            {team.map((student) => {
              return (
                <div className="h-100 d-flex flex-column justify-content-between">
                  <h3 className="text-center">{student.first_name}</h3>
                  <img
                    src={`media/skin/${student.skin}.png`}
                    className="mt-5"
                    style={{ height: "400px" }}
                  ></img>
                  <div
                    className="glass4 h-100 d-flex flex-column justify-content-between align-self-center p-3"
                    style={{ width: "15vw" }}
                  >
                    <div className="h-25 w-25 d-flex align-items-center">
                      <img
                        src={"media/logos/coeur.png"}
                        style={{ width: "30px", height: "auto" }}
                      />
                      <p className="mx-3 mb-0 just-color-dark-red size-digits">
                        {student.hp}
                      </p>
                    </div>
                    <div className="h-25 w-25 d-flex align-items-center">
                      <img
                        src={"media/logos/etoile.png"}
                        style={{ width: "30px", height: "auto" }}
                      />
                      <p className="mx-3 mb-0 text-warning size-digits">
                        {student.xp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentTeam;
