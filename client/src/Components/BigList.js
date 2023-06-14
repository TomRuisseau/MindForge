import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import "../Styles/Scroll.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";

const BigList = forwardRef((props, ref) => {
  //state
  const [students, setStudents] = useState([]); //liste des élèves
  const [count, setCount] = useState(0); //compteur de rechargement
  const [selectedStudent, setSelectedStudent] = useState(0); //élève sélectionné

  //comportement
  useImperativeHandle(ref, () => ({
    forceReload: () => {
      setCount(count + 1);
    },
  }));

  const changeBackground = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          setSelectedStudent(studentId);
          props.onPass(studentId);
          return { ...student, bgColor: "#232826", supclass: "classe-sup" };
        } else {
          return { ...student, bgColor: "", supclass: "" };
        }
      })
    );
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.id })
      .then((res) => {
        // Ajouter la propriété bgColor initiale à chaque élève
        const updatedStudents = res.data.map((student) => ({
          ...student,
        }));
        setStudents(updatedStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, count]);

  //affichage (render)
  return (
    <div
      className="glass1 w-50 m-4 p-4 rounded custom-scrollbar"
      style={{
        height: "75vh",
        overflow: "auto",
      }}
    >
      {Array.from(
        students.reduce((teamMap, student) => {
          if (teamMap.has(student.team)) {
            teamMap.get(student.team).push(student);
          } else {
            teamMap.set(student.team, [student]);
          }
          return teamMap;
        }, new Map())
      ).map(([team, members]) => (
        <React.Fragment key={team}>
          <h1 className="lignes-tab">{team}</h1>
          <table className="mb-5">
            <tbody>
              {members.map((student) => (
                <tr
                  key={student.id}
                  style={{ backgroundColor: student.bgColor }}
                  onClick={() => changeBackground(student.id)}
                >
                  <td
                    className={`mx-5 px-5 lignes-tab taille-lignes-tab ${student.supclass}`}
                  >
                    {student.surname}
                  </td>
                  <td
                    className={`mx-5 px-5 lignes-tab taille-lignes-tab ${student.supclass}`}
                  >
                    {student.first_name}
                  </td>
                  <td
                    className={`mx-5 px-5 lignes-tab taille-lignes-tab ${student.supclass}`}
                  >
                    {student.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </div>
  );
});

export default BigList;
