import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherQuiz = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des élèves
    axios
      .post("http://localhost:5000/getStudents", { email: props.data[0].teacher_email })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.data[0].teacher_email]);

  return (
    <div>
      <h1>Liste des élèves</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.grade})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherQuiz;
