import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { forwardRef, useImperativeHandle } from "react";

const BigList = forwardRef((props, ref) => {
  //state
  const [students, setStudents] = useState([]); //liste des élèves
  const [count, setCount] = useState(0); //compteur de rechargement


  //comportement
  useImperativeHandle(ref, () => ({
    forceReload: () => {
      setCount(count + 1);
    },
  }));

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.id })
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, count]);


  //affichage (render)
  return (
    <div
      className="text-muted m-5 px-5 py-2 border border-black rounded bg-warning"
      style={{ height: "80vh", overflow: "auto" }}
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
          <h2>{team}</h2>
          <table className="mb-5">
            <tbody>
              {members.map((student) => (
                <tr key={student.id}>
                  <td className="mx-5 px-5">{student.surname}</td>
                  <td className="mx-5 px-5">{student.first_name}</td>
                  <td className="mx-5 px-5">{student.class}</td>
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
