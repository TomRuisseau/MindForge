import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherQuiz = (props) => {
  const [students, setStudents] = useState([]);

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

  return (
    <div className="m-3 text-white">
      <h2 className="text-center">Selectionnez l'élève qui gagne de l'XP</h2>
      <div className="d-flex flex-row justify-content-between">
        <div className="w-50">
          <p>une grosse div tempo</p>
        </div>

        <div
          className="col-2 m-5 border border-white rounded custom-scrollbar d-flex flex-column justify-content-between"
          style={{
            height: "70vh",
            overflow: "auto",
          }}
        >
          <table className="mx-3">
            <thead>
              <tr>
                <th className="pb-3 pt-2">Prénom</th>
                <th className="pb-3 pt-2">Nom</th>
                <th className="pb-3 pt-2">XP</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="mx-3">{student.first_name}</td>
                  <td className="mx-3">{student.surname}</td>
                  <td className="mx-3">{student.xp}</td>
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
