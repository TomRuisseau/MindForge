import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Scroll.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";

const SmallList = (props) => {
  const [students, setStudents] = useState([]);

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
  }, [props.id]);

  return (
    <div
      className="glass1 hug rounded custom-scrollbar m-5 box-size"
      style={{
        width: "20%",
        overflowY: "auto",
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
          <div className="mx-2 my-3">
            <h2 className="just-color-yellow">{team}</h2>
            <table className="mb-5">
              <tbody>
                {members.map((student) => (
                  <tr key={student.id}>
                    <td className="mx-2 px-3 just-color-white taille-lignes-tab">
                      {(student.surname + " ").padEnd(9, ".")}
                    </td>
                    <td className="mx-2 px-3 just-color-white taille-lignes-tab">
                      {(student.first_name + " ").padEnd(9, ".")}
                    </td>
                    <td className="mx-2 px-3 just-color-white text-center taille-lignes-tab">
                      {student.hp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SmallList;
