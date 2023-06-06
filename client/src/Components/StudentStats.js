import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="w-50 m-5 px-5 py-2 border border-black rounded">
      {studentStats.map((stat) => (
        <div key={stat.id}>
          <div className="d-flex flex-row justify-content-between">
            <h2>
              {stat.first_name} {stat.surname}
            </h2>
            <h2>Equipe : {stat.team}</h2>
          </div>
          <p>Classe : {stat.class}</p>
          <p>XP : {stat.xp}</p>
          <p>HP : {stat.hp}</p>
          <img
            src={`media/skin/${skin}.png`}
            className="position-absolute"
            style={{ bottom: "15%", right: "20%", width: "25%" }}
          />
        </div>
      ))}
    </div>
  );
}

export default StudentStats;
