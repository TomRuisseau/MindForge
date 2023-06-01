import { useState } from "react";
import PopUpTeam from "./PopUpTeam";
import PopUpStudent from "./PopUpStudent";
import PopUpHP from "./PopUpHP";
import BigList from "./BigList";
import { useRef } from "react";

const StudentManager = (props) => {
  const [popUp, setPopUp] = useState("hidden"); //[hidden, addTeam, addStudent, removeHp]
  const childRef = useRef();

  const forceReload = () => {
    console.log("reload");
    childRef.current.forceReload();
  };

  return (
    <div className="row p-0 m-0 w-100 h-100">
      <div className="col-8 m-0 p-0 bg-info">
        <h1 className="text-center">Liste des élèves par équipe</h1>
        <BigList id={props.id} ref={childRef} />
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
        <PopUpHP close={() => setPopUp("hidden")} />
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

          <button
            className="btn btn-primary mt-10"
            onClick={() => setPopUp("removeHp")}
          >
            Retirer des HP à l'élève sélectionné
          </button>
          <button className="btn btn-primary mt-10">
            Ajouter de l'XP à l'élève sélectionné
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
