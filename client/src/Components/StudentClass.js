//code à corriger pour avoir la liste des élèves de la classe

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const StudentClass = forwardRef((props,ref) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.teacher_email })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.teacher_email]);

  return (
    <div className="start-0">
      <h1>Ma classe</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>HP</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.hp}</td>
              <td>{student.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default StudentClass;
