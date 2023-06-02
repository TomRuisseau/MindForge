import { useState } from "react";
import PopUpTeam from "./PopUpTeam";
import PopUpStudent from "./PopUpStudent";
import PopUpHP from "./PopUpHP";
import PopUpXP from "./PopUpXP";
import BigList from "./BigList";
import StudentStats from "./StudentStats";
import { useRef } from "react";

const StudentManager = (props) => {
  const [popUp, setPopUp] = useState("hidden"); //[hidden, addTeam, addStudent, removeHp, removeXp]
  const [openStats, setOpenStats] = useState("hidden"); //[false, true]
  const childRef = useRef();
  const [student, setStudent] = useState(0);

  const forceReload = () => {
    console.log("reload");
    childRef.current.forceReload();
  };

  const pass = (identifiant) => {
    setStudent(identifiant);
  };

  return (
    <div className="row p-0 m-0 w-100 h-100">
      <div className="col-10 m-0 p-0 bg-info">
        <div className="d-flex flex-row my-5">
          <BigList id={props.id} ref={childRef} onPass={pass} />
          {student === 0 ? null : <StudentStats id={student} />}
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
        <PopUpHP close={() => setPopUp("hidden")} id={student} />
      ) : null}
      {popUp === "removeXp" ? (
        <PopUpXP close={() => setPopUp("hidden")} id={student} />
      ) : null}
      <div className="col m-0 p-0 h-100 bg-secondary">
        <h1 className="text-center">Actions</h1>
        <div className="m-5 d-flex flex-column align-content-between">
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
