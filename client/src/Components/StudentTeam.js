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
      className="w-100 d-flex align-items-center hug justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="w-75 p-4 glass1 d-flex flex-column box-size">
        <h1 className="just-color-yellow text-center">Mon équipe</h1>
            <div className="w-100 d-flex flex-row justify-content-between p-5">
              {team.map((student) => {
                return (
                  <div className="d-flex flex-column">
                    <h3>{student.first_name}</h3>
                    <h5>Vie:</h5>
                    <p>{student.hp}</p>
                    <h5>XP:</h5>
                    <p>{student.xp}</p>
                    <img
                      src={`media/skin/${student.skin}.png`}
                      style={{ height: "300px"}}
                    ></img>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default StudentTeam;
