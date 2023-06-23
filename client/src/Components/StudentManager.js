import { useState } from "react";
import PopUpTeam from "./PopUpTeam";
import PopUpStudent from "./PopUpStudent";
import PopUpHP from "./PopUpHP";
import PopUpXP from "./PopUpXP";
import PopUpDead from "./PopUpDead";
import BigList from "./BigList";
import StudentStats from "./StudentStats";
import { useRef } from "react";
import { motion } from "framer-motion";
import "../Styles/Buttons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentManager = (props) => {
  const [popUp, setPopUp] = useState("hidden"); //[hidden, addTeam, addStudent, removeHp, removeXp]
  const [student, setStudent] = useState(0);
  const [counter, addCounter] = useState(0); //used to force reloads
  const [deadStudent, setDeadStudent] = useState(0); //used to force reloads
  const childRef = useRef();

  const isDead = (id) => {
    setDeadStudent(id);
    setPopUp("dead");
  };

  const forceReload = () => {
    childRef.current.forceReload();
  };

  const setCounter = (value) => {
    addCounter(counter + value);
  };

  const pass = (identifiant) => {
    setStudent(identifiant);
  };

  const notify = (message) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="row p-0 m-0 w-100 h-100">
      <div className="col-10 my-4 p-0">
        <div className="d-flex flex-row my-5">
          <BigList
            id={props.id}
            ref={childRef}
            onPass={pass}
            counter={counter}
          />
          {student === 0 ? null : (
            <StudentStats id={student} counter={counter} />
          )}
        </div>
      </div>
      {popUp === "dead" && student !== 0 ? (
        <PopUpDead
          id={deadStudent}
          life={isDead}
          close={() => {
            setPopUp("hidden");
            addCounter(counter + 1);
          }}
          open={() => setPopUp("badRand")}
        />
      ) : null}

      {popUp === "addTeam" ? (
        <PopUpTeam
          close={() => setPopUp("hidden")}
          id={props.id}
          notify={notify}
        />
      ) : null}

      {popUp === "addStudent" ? (
        <PopUpStudent
          close={() => setPopUp("hidden")}
          id={props.id}
          reload={forceReload}
          notify={notify}
        />
      ) : null}
      {popUp === "removeHp" ? (
        <PopUpHP
          close={() => setPopUp("hidden")}
          id={student}
          addCounter={setCounter}
          isDead={isDead}
        />
      ) : null}
      {popUp === "removeXp" ? (
        <PopUpXP
          close={() => setPopUp("hidden")}
          id={student}
          addCounter={setCounter}
        />
      ) : null}
      <div className="col m-0 p-0 h-75 w-auto">
        <div className=" my-5 h-25">
          <div className="m-3 d-flex flex-column h-100 justify-content-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className="mt-5 btn-act-students-classique"
              onClick={() => setPopUp("addTeam")}
            >
              Ajouter une équipe
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className="btn-act-students-classique mt-5"
              onClick={() => setPopUp("addStudent")}
            >
              Ajouter un élève
            </motion.button>
          </div>
        </div>
        <div className=" my-5 h-25">
          <div className="m-3 d-flex flex-column h-100 justify-content-between">
            {student === 0 ? null : (
              <motion.button
                //entrance animation
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="btn-act-students-new mt-5"
                onClick={() => setPopUp("removeHp")}
              >
                Retirer des HP à l'élève sélectionné
              </motion.button>
            )}
            {student === 0 ? null : (
              <motion.button
                //entrance animation
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="btn-act-students-new mt-5"
                onClick={() => setPopUp("removeXp")}
              >
                Ajouter de l'XP à l'élève sélectionné
              </motion.button>
            )}
          </div>
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

export default StudentManager;
