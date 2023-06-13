import { useState } from "react";
import PopUpTeam from "./PopUpTeam";
import PopUpStudent from "./PopUpStudent";
import PopUpHP from "./PopUpHP";
import PopUpXP from "./PopUpXP";
import PopUpDead from "./PopUpDead";
import BigList from "./BigList";
import StudentStats from "./StudentStats";
import { useRef } from "react";

const StudentManager = (props) => {
  const [popUp, setPopUp] = useState("hidden"); //[hidden, addTeam, addStudent, removeHp, removeXp]
  const [student, setStudent] = useState(0);
  const [counter, setCounter] = useState(0); //used to force reloads
  const childRef = useRef();

  const isDead = () => {
    setPopUp("dead");
  };

  const forceReload = () => {
    console.log("reload");
    childRef.current.forceReload();
  };

  const pass = (identifiant) => {
    setStudent(identifiant);
  };

  return (
    <div className="row p-0 m-0 w-100 h-100">
      <div className="col-10 m-0 p-0">
        <div className="d-flex flex-row my-5">
          <BigList id={props.id} ref={childRef} onPass={pass} />
          {student === 0 ? null : (
            <StudentStats id={student} counter={counter} />
          )}
          {popUp === "dead" && student !== 0 ? (
            <PopUpDead
              id={student}
              life={isDead}
              close={() => setPopUp("hidden")}
              open={() => setPopUp("badRand")}
            />
          ) : null}
        </div>
      </div>

      {popUp === "addTeam" ? (
        <PopUpTeam close={() => setPopUp("hidden")} id={props.id} />
      ) : null}

      {popUp === "addStudent" ? (
        <PopUpStudent
          close={() => setPopUp("hidden")}
          id={props.id}
          reload={forceReload}
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
      <div className="col m-0 p-0 h-100">
        <div className="m-3 d-flex flex-column h-100 justify-content-between">
          <button
            className="btn btn-primary mt-5"
            onClick={() => setPopUp("addTeam")}
          >
            Ajouter une équipe
          </button>

          <button
            className="btn btn-primary mt-10"
            onClick={() => setPopUp("addStudent")}
          >
            Ajouter un élève
          </button>
          {student === 0 ? null : (
            <button
              className="btn btn-primary mt-10"
              onClick={() => setPopUp("removeHp")}
            >
              Retirer des HP à l'élève sélectionné
            </button>
          )}
          {student === 0 ? null : (
            <button
              className="btn btn-primary mt-10"
              onClick={() => setPopUp("removeXp")}
            >
              Ajouter de l'XP à l'élève sélectionné
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
