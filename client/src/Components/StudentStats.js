import { useState, useEffect } from "react";
import axios from "axios";

function StudentStats(props) {
  const [studentStats, setStudentStats] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setStudentStats(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div className="w-50 m-5 px-5 py-2 border border-black rounded bg-warning">
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
          <img src={stat.skin} />
        </div>
      ))}
    </div>
  );
}

export default StudentStats;
