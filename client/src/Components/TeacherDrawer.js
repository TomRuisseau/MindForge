import React, { forwardRef, useImperativeHandle } from "react";
// import component
import Drawer from "react-modern-drawer";

//import styles
import "react-modern-drawer/dist/index.css";

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
        size={500}
      >
        <div className="mt-5 drawerTeacher">
          <button onClick={toggleDrawer} className="btn btn-primary">
            Menu
          </button>
          <h2
            onClick={() => {
              toggleDrawer();
              props.onChoice("TeacherMenu");
            }}
          >
            Ecran principal
          </h2>
          <h2
            onClick={() => {
              toggleDrawer();
              props.onChoice("StudentManager");
            }}
          >
            Gérer les élèves (ajouter/dégats/récompenses)
          </h2>
          <h2
            onClick={() => {
              toggleDrawer();
              props.onChoice("Quests");
            }}
          >
            Quetes
          </h2>
          <h2 onClick={toggleDrawer}>Quiz</h2>
          <h2
            onClick={() => {
              toggleDrawer();
              props.onChoice("DailyRand");
            }}
          >
            Evènement journalier
          </h2>
          <h2 onClick={toggleDrawer}>Tutoriel</h2>
          <h2 onClick={toggleDrawer}>Paramètres</h2>
        </div>
      </Drawer>
    </>
  );
});

export default TeacherDrawer;
