import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../../Styles/Textes.css";
import "../../Styles/Glass.css";
import "../../Styles/Buttons.css";
import Select from "react-select";

function ApaisementMajeur(props) {
  const [students, setStudents] = useState([]); //team members
  const [student, setStudent] = useState("0"); //selected target

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudentsTeam", { //get team members
        team: props.data[0].team,
      })
      .then((res) => {
        setStudents(res.data);
        setStudent(res.data[0].id); //default target
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  const useSpell = (e) => {
    e.preventDefault(); // prevent page reload
    if (props.data[0].mana >= 2) { //check if student has enough mana
      axios
        .post("http://localhost:5000/useApaisementMajeur", {
          id: props.data[0].id,
          target: student,
        })
        .then(() => {
          props.close();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.manaAlert();
    }
  };

  return (
    <div
      className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2 }}
    >
      <motion.div
        //entrance animation
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="px-3 py-3 w-50 h-75 glass3 text-center d-flex flex-column align-items-center justify-content-between"
      >
        <div className="d-flex flex-row justify-content-between">
          <h1 className="px-5">Apaisement majeur</h1>
          <motion.button
            whileHover={{ scale: 2 }}
            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
            onClick={props.close}
          ></motion.button>
        </div>
        <div className="p-3 rounded">
          <p style={{ fontSize: "22px" }}>
            Tu soignes de 10 HP un membre de l'équipe ou toi-même.
          </p>
        </div>
        <h3>Coût en mana : 6</h3>
        <div className="h-50 d-flex flex-column justify-content-center">
          <form
            onSubmit={useSpell}
            className="h-75 d-flex flex-column justify-content-between"
          >
            <div className="d-flex flex-column">
              <label htmlFor="text" className="my-3">
                Choisis un membre de l'équipe sur qui utiliser le sort :
              </label>
              {(() => {
                const options = [];
                students.map((eleve) => {
                  options.push({
                    value: eleve.id,
                    label: eleve.first_name + " " + eleve.surname,
                    key: eleve.id,
                  });
                });

                const styles = {
                  option: (provided, state) => ({
                    ...provided,
                    fontWeight: state.isSelected ? "bold" : "normal",
                    color: "black",
                    backgroundColor: "white",
                    fontSize: state.selectProps.myFontSize,
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: "black",
                    fontSize: state.selectProps.myFontSize,
                  }),
                };

                return (
                  <Select
                    options={options}
                    required
                    placeholder="Choisis une cible"
                    styles={styles}
                    name="student"
                    id="student-select"
                    className="rounded"
                    onChange={(e) => setStudent(e.value)}
                  />
                );
              })()}
            </div>
            <div className="w-100 text-center">
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  type="submit"
                  className="btn-pop-up-valider just-color-white big-button px-4 pt-1 my-3"
                >
                  Utiliser
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ApaisementMajeur;
