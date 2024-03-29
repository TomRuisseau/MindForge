import { useState } from "react";
import BigList from "./BigList";
import StudentStats from "./StudentStats";
import { useRef } from "react";
import "../Styles/Buttons.css";

const StudentManager = (props) => {
  const [student, setStudent] = useState(0); //selected student
  const childRef = useRef();

  const pass = (identifiant) => {
    setStudent(identifiant);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center w-100"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-row w-100">
        <BigList
          id={props.data[0].teacher_email}
          ref={childRef}
          onPass={pass}
        />
        {student === 0 ? null : <StudentStats id={student} />}
      </div>
    </div>
  );
};

export default StudentManager;
