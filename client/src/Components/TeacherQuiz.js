import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizAleatoire from "./QuizAleatoire";

const TeacherQuiz = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [XP, setXP] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.id })
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleClick = (studentId) => {
    setSelectedStudent(studentId);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/giveXP", {
        id: props.id,
        xp: XP,
      })
      .then((res) => {
        props.close();
        props.addCounter(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-3 text-white">
      <h2 className="text-center">
        QUIZ : Sélectionnez l'élève qui gagne de l'XP
      </h2>

      <div className="d-flex flex-row justify-content-between m-5">
        <div
          className="text-center border border-white rounded d-flex flex-column align-items-center"
          style={{ width: "35%" }}
        >
          <h4 className="m-4 text-nowrap">
            Questions aléatoires de culture générale !
          </h4>
          <QuizAleatoire />
          <button className="btn btn-success mt-3">+ 2 XP</button>
        </div>
        <div className="text-center w-auto border border-white rounded d-flex flex-column align-items-center">
          <h4 className="m-4 text-nowrap">
            Questions définies par le professeur !
          </h4>
          <p>Écoutez bien !</p>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center">
              <div className="form-group d-flex justify-content-center align-items-center">
                <input
                  value={XP}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setXP(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                  type="number"
                  className="form-control w-25 text-white text-right"
                  style={{ backgroundColor: "#3e7797", height: "20px" }}
                  placeholder="0"
                  id="xp"
                  name="xp"
                  required
                />

                <label htmlFor="number" className="mt-0 mx-2">
                  XP
                </label>
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Valider
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-2 w-25 border border-white rounded custom-scrollbar d-flex flex-column justify-content-between"
          style={{
            height: "70vh",
            overflow: "auto",
          }}
        >
          <table className="mx-3">
            <thead>
              <tr>
                <th className="pb-3 pt-2 text-center">Prénom</th>
                <th className="pb-3 pt-2 text-center">Nom</th>
                <th className="pb-3 pt-2 text-center">XP</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleClick(student.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedStudent === student.id
                        ? "#3e7797"
                        : "transparent",
                  }}
                >
                  <td>{student.first_name}</td>
                  <td>{student.surname}</td>
                  <td className="text-center">{student.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuiz;
