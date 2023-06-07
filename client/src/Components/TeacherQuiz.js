import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherQuiz = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getStudents", {
          email: props.data[0].teacher_email,
        });
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [props.data]);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };

  const giveManaToSelectedStudents = () => {
    // Envoyer une requête au serveur pour donner du mana aux élèves sélectionnés
    // Utilisez la liste des IDs des élèves sélectionnés : selectedStudents
    axios
      .post("http://localhost:5000/giveMana", { studentIds: selectedStudents })
      .then((res) => {
        console.log("Mana given to selected students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Liste des élèves</h1>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Mana</th>
            <th>Sélectionner</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.mana}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleStudentSelect(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={giveManaToSelectedStudents}>Donner du mana</button>
    </div>
  );
};

export default TeacherQuiz;
