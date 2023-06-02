import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function StudentStats(props) {
  //state
  const [studentStats, setStudentStats] = useState([]); //stats de l'élève

  //comportement
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

  //affichage (render)
  return (
    <div className="w-50 m-5 px-5 py-2 border border-black rounded bg-warning">
      <h1>Stats de l'élève</h1>
    </div>
  );
}

export default StudentStats;
