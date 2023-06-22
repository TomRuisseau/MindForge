import React from "react";
import StudentDrawer from "./StudentDrawer";
import StudentMenu from "./StudentMenu";
import { useState, useRef } from "react";
import StudentProfile from "./StudentProfile";
import StudentTeam from "./StudentTeam";
import Shop from "./Shop";
import StudentQuests from "./StudentQuests";
import StudentClass from "./StudentClass";
import { motion } from "framer-motion";

function StudentDashboard(props) {
  const [page, setPage] = useState("StudentProfile"); // StudentMenu, quests, quiz, dailyEvent, tutorial, settings, Quetes
  const childRef = useRef();

  console.log(props.data);

  const switchPage = (page) => {
    setPage(page);
    console.log(page);
  };
  return (
    <div>
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

      <StudentDrawer ref={childRef} onChoice={switchPage} />

      {page === "StudentProfile" ? (
        <StudentProfile data={props.data} />
      ) : page === "StudentTeam" ? (
        <StudentTeam data={props.data} />
      ) : page === "Shop" ? (
        <Shop data={props.data} />
      ) : page === "StudentClass" ? (
        <StudentClass data={props.data} />
      ) : page === "Quetes" ? (
        <StudentQuests data={props.data} />
      ) : (
        <StudentMenu />
      )}
    </div>
  );
}

export default StudentDashboard;
