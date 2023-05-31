import { useState } from "react";
import PopUpTeam from "./PopUpTeam";
import PopUpStudent from "./PopUpStudent";

const StudentManager = () => {
  const [popUp, setPopUp] = useState("hidden"); //[hidden, addTeam, addStudent]

  return (
    <div className="row p-0 m-0 w-100 h-100">
      <div className="col-8 m-0 p-0 bg-info">
        <h1 className="text-center">Liste</h1>
      </div>
      {popUp === "addTeam" ? (
        <PopUpTeam close={() => setPopUp("hidden")} />
      ) : null}

      {popUp === "addStudent" ? (
        <PopUpStudent close={() => setPopUp("hidden")} />
      ) : null}
      <div className="col m-0 p-0 h-100 bg-secondary">
        <h1 className="text-center">Actions</h1>
        <div className="w-100 d-flex flex-column align-content-between">
          <button
            className="btn btn-primary mt-10"
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

          <button className="btn btn-primary mt-10">
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
