import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/Glass.css";
import "../Styles/Textes.css";

function StudentStats(props) {
  const [studentStats, setStudentStats] = useState([]);
  const [skin, setSkin] = useState("toutNu");

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setStudentStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:5000/getSkin", { id: props.id })
      .then((res) => {
        setSkin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, props.counter]);

  return (
    <div className="hug w-50 m-4 px-3 py-2 rounded glass1">
      {studentStats.map((stat) => (
        <div key={stat.id}>
          <div className="just-color-yellow d-flex flex-row justify-content-between">
            <h3>
              {stat.first_name} {stat.surname}
            </h3>
            <h3>Equipe : {stat.team}</h3>
          </div>
          <div className="just-color-white">
            <p>Classe : {stat.class}</p>
            <p>XP : {stat.xp}</p>
            <p>HP : {stat.hp}</p>
          </div>
          <img
            src={`media/skin/${skin}.png`}
            className="position-absolute"
            style={{ bottom: "0%", right: "-10%", width: "75%" }}
          />
        </div>
      ))}
    </div>
  );
}

export default StudentStats;
