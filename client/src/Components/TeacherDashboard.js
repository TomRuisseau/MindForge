import React, { useState, useRef } from "react";
import TeacherDrawer from "./TeacherDrawer";
import TeacherMenu from "./TeacherMenu";
import StudentManager from "./StudentManager";
import Quests from "./Quests";
import DailyRand from "./DailyRand";
import TeacherQuiz from "./TeacherQuiz";
import "../Styles/animations.css";
import { motion } from "framer-motion";

function TeacherDashboard(props) {
  const [page, setPage] = useState("TeacherMenu"); // current page : TeacherMenu, StudentManager, quests, quiz, dailyEvent, tutorial, settings
  const childRef = useRef();

  const switchPage = (page) => { //
    setPage(page);
  };
  return (
    <>
      <TeacherDrawer ref={childRef} onChoice={switchPage} /> 

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
    </>
  );
}

export default TeacherDashboard;
