import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import "../Styles/studentClass.css";

const StudentClass = forwardRef((props,ref) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.data[0].teacher_email })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data[0].teacher_email]);

  return (
    <div className=" glass3 position-absolute">
      <h1 class="titre">Ma classe</h1>
      <table>
        <thead>
          <tr  class="titre">
            <th >Prénom</th>
            <th>HP</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody  class="titre1" >
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
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
