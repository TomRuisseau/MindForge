import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";


function TeacherLogger(props) {
  const [currentForm, setCurrentForm] = useState("Login"); // ['Login', 'Register']

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const validation = (page, id) => {
    props.onPass(id);
    props.onValidation(page);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-25 h-50 hug just-color-black log-size classic-glass p-4 text-center">
        {currentForm === "Login" ? (
          <Login onFormSwitch={toggleForm} sendValidation={validation} />
        ) : (
          <Register onFormSwitch={toggleForm} sendValidation={validation} />
        )}
      </div>
    </div>
  );
}

export default TeacherLogger;
