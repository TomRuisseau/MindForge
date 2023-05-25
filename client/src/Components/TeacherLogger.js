import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";


function TeacherLogger() {
    const [currentForm, setCurrentForm] = useState('Login'); // ['Login', 'Register']

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    return (
        <>
            {
                currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </>
    )
}

export default TeacherLogger;