import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizAleatoire from "./QuizAleatoire";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import "../Styles/Scroll.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherQuiz = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [XP, setXP] = useState(0);

  const addXP = () => {
    if (selectedStudent !== null) {
      axios
        .post("http://localhost:5000/giveXP", {
          id: selectedStudent,
          xp: 2,
        })
        .then((res) => {
          props.close();
          setXP(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Veuillez sélectionner un élève !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };


  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", { email: props.id })
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedStudent, addXP, props.id]);

  const handleClick = (studentId) => {
    setSelectedStudent(studentId);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // empêche le rechargement de la page
    if (selectedStudent === null) {
      toast.warning("Veuillez sélectionner un élève !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    axios
      .post("http://localhost:5000/giveXP", {
        id: selectedStudent,
        xp: XP,
      })
      .then((res) => {
        props.close();
        setXP(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-100 just-color-white hug d-flex flex-column align-items-center">
      <div className="h-25 m-2 w-50 glass2 pt-3">
        <h2 className="text-center">
          QUIZ : Sélectionnez l'élève qui gagne de l'XP
        </h2>
      </div>
      <div className="w-100 d-flex flex-row justify-content-between m-5">
        <div
          className="mx-4 box-size text-center glass1 d-flex flex-column align-items-center"
          style={{ width: "32vw" }}
        >
          <h4 className="m-4 text-nowrap">Questions de culture générale !</h4>
          <QuizAleatoire />
          <div className="w-100 my-5 pb-5 log-size">
            <motion.button
              whileHover={{
                scale: 1.1,
                cursor: "pointer",
              }}
              whileTap={{ scale: 1 }}
              onClick={addXP}
              className="btn-quetes-valider just-color-white"
            >
              + 2 XP
            </motion.button>
          </div>
        </div>
        <div
          className="box-size glass1 w-25 custom-scrollbar d-flex flex-column justify-content-between"
          style={{
            overflow: "auto",
          }}
        >
          <table className="mx-4 taille-lignes-tab">
            <thead className="just-color-yellow">
              <tr>
                <th className="py-4 text-center">Prénom</th>
                <th className="py-4 text-center">Nom</th>
                <th className="py-4 text-center">XP</th>
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
                        ? "#F5CB5C"
                        : "transparent",
                    color:
                      selectedStudent === student.id ? "#232826" : "#fdfdfb",
                  }}
                >
                  <td style={{ lineHeight: "2" }}>{student.first_name}</td>

                  <td>{student.surname}</td>
                  <td className="text-center">{student.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-4 box-size glass1 text-center d-flex flex-column align-items-center justify-content-between">
          <h4 className="m-4 text-nowrap">
            Questions définies par le professeur !
          </h4>
          <p className="just-color-yellow">Écoutez bien !</p>
          <form
            onSubmit={handleSubmit}
            className="h-75 m-5 py-5 d-flex flex-column"
          >
            <div className="h-100 d-flex flex-column justify-content-between">
              <h2 className="just-color-white">Pour gagner :</h2>
              <div className="form-group">
                <motion.input
                  whileTap={{ scale: 0.9 }}
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
                  className="px-3 w-25 text-white input-glass input-big-size text-right"
                  placeholder="0"
                  id="xp"
                  name="xp"
                  required
                />

                <label
                  htmlFor="number"
                  className="mb-5 mx-2"
                  style={{ fontSize: "3vh" }}
                >
                  XP
                </label>
              </div>
              <div>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 1 }}
                  type="submit"
                  className="btn-quetes-valider just-color-white px-5"
                >
                  Valider
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TeacherQuiz;
