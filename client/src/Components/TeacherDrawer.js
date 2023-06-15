import React, { forwardRef, useImperativeHandle } from "react";
// import component
import Drawer from "react-modern-drawer";

//import styles
import "react-modern-drawer/dist/index.css";
import { motion } from "framer-motion";

import "../Styles/teacherDrawer.css";

const TeacherDrawer = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useImperativeHandle(ref, () => ({
    toggleDrawerOutside() {
      setIsOpen((prevState) => !prevState);
    },
  }));

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="drawer"
        style={{ backgroundColor: "#EB9F04", color: "white" }}
        size={300}
      >
        <div className="h-75 mt-5 drawerTeacher d-flex flex-column justify-content-between">
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("TeacherMenu");
            }}
          >
            Accueil
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("StudentManager");
            }}
          >
            Élèves
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("Quests");
            }}
          >
            Quêtes
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("TeacherQuiz");
            }}
          >
            Quiz
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("DailyRand");
            }}
          >
            Roue du destin
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={toggleDrawer}
          >
            Tutoriel
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            onClick={toggleDrawer}
          >
            Paramètres
          </motion.h2>
        </div>
      </Drawer>
    </>
  );
});

export default TeacherDrawer;
