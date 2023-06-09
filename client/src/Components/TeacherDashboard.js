import React, { useState, useRef } from "react";
import TeacherDrawer from "./TeacherDrawer";
import TeacherMenu from "./TeacherMenu";
import StudentManager from "./StudentManager";
import SmallList from "./SmallList";
import Quests from "./Quests";
import DailyRand from "./DailyRand";
import "../Styles/teacherDashboard.css";
import TeacherQuiz from "./TeacherQuiz";

function TeacherDashboard(props) {
  const [page, setPage] = useState("TeacherMenu"); // TeacherMenu, StudentManager, quests, quiz, dailyEvent, tutorial, settings
  const childRef = useRef();

  const switchPage = (page) => {
    setPage(page);
    console.log(page);
  };
  return (
    <div className="Dashboard w-100 h-100 m-0">
      <TeacherDrawer ref={childRef} onChoice={switchPage} />
      <div className="row m-0 w-100 h-100">
        <div className="col p-0">
          <button
            onClick={() => childRef.current.toggleDrawerOutside()}
            className="btn btn-gauche btn-primary position-absolute top-0 start-0"
          >
            Menu
          </button>
          {page === "TeacherMenu" ? (
            <TeacherMenu />
          ) : page === "TeacherQuiz" ? (
            <TeacherQuiz id={props.id} />
          ) : page === "StudentManager" ? (
            <StudentManager id={props.id} />
          ) : page === "Quests" ? (
            <Quests id={props.id} />
          ) : page === "DailyRand" ? (
            <DailyRand id={props.id} />
          ) : null}
        </div>

        {page === "StudentManager" || page === "TeacherQuiz" ? null : (
          <SmallList id={props.id} />
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
