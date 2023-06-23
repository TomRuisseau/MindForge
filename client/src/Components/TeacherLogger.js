import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function TeacherLogger(props) {
  const [currentForm, setCurrentForm] = useState("Login"); // ['Login', 'Register']

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const validation = (page, id) => {
    props.onPass(id);
    props.onValidation(page);
  };

  const notify = (message) => toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
        <motion.div
        whileHover={{
          scale: 1.4,
          originX: 0,
          cursor: "pointer",
        }}
        className="position-absolute m-5 start-0 top-0"
        onClick={() => window.location.reload()}
      >
        <img style={{ height: "5vh"}} src="media/logos/fleche_back.png" />
      </motion.div>

      <div className="w-25 h-50 hug just-color-black log-size classic-glass p-4 text-center">
        {currentForm === "Login" ? (
          <Login onFormSwitch={toggleForm} sendValidation={validation} notify={notify} />
        ) : (
          <Register onFormSwitch={toggleForm} sendValidation={validation} notify={notify} />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default TeacherLogger;
