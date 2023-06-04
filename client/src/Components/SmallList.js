import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/Scroll.css'

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
            className="col-2 m-5 text-muted border border-black rounded custom-scrollbar"
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
                                <tr
                                    key={student.id}
                                >
                                    <td className="mx-2 px-3">{student.surname}</td>
                                    <td className="mx-2 px-3">{student.first_name}</td>
                                    <td className="mx-2 px-3">{student.hp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </div>
    );
}

export default SmallList;