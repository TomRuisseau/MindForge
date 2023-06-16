import React, { useState, useRef } from "react";
import TeacherDrawer from "./TeacherDrawer";
import TeacherMenu from "./TeacherMenu";
import StudentManager from "./StudentManager";
import Quests from "./Quests";
import DailyRand from "./DailyRand";
import "../Styles/teacherDashboard.css";
import TeacherQuiz from "./TeacherQuiz";
import "../Styles/animations.css";
import { motion } from "framer-motion";

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
        <div className="col h-100 p-0">
          <motion.div
            whileHover={{
              scale: 1.4,
              originX: 0,
              cursor: "pointer",
            }}
            className="position-absolute m-3"
            onClick={() => childRef.current.toggleDrawerOutside()}
          >
            <div className="menu-animation"></div>
            <div className="menu-animation"></div>
            <div className="menu-animation"></div>
          </motion.div>
          <h1 className="position-absolute mx-5 my-4 end-0 just-color-yellow hug">
            MindForge<span class="blinking-cursor">_</span>
          </h1>
          {page === "TeacherMenu" ? (
            <TeacherMenu id={props.id} />
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
      </div>
    </div>
  );
}

export default TeacherDashboard;
