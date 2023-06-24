import React, { forwardRef, useImperativeHandle } from "react";
import "../Styles/studentDrawer.css";
import { motion } from "framer-motion";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const StudentDrawer = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);//drawer is closed by default

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
        size={300}
        style={{ backgroundColor: "#ebbd3f", color: "white" }}
      >
        <div className="h-75 mt-5 drawerTeacher d-flex flex-column justify-content-between">
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("StudentProfile");
            }}
          >
            Mon profil
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("StudentTeam");
            }}
          >
            Mon équipe
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("StudentClass");
            }}
          >
            Ma classe
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("Shop");
            }}
          >
            Boutique
          </motion.h2>
          <motion.h2
            whileHover={{
              color: "#232826",
              scale: 1.2,
              originX: 0,
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              props.onChoice("Quetes");
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
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              toggleDrawer();
              //reload page
              window.location.reload();
            }}
          >
            Déconnexion
          </motion.h2>
        </div>
      </Drawer>
    </>
  );
});

export default StudentDrawer;
