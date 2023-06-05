import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";


function TeacherLogger(props) {
    const [currentForm, setCurrentForm] = useState('Login'); // ['Login', 'Register']

    const toggleForm = (formName) => { 
        setCurrentForm(formName);
    }

    const validation = (page, id) => {
        props.onPass(id);
        props.onValidation(page);
    }
    return (
        <>
            <div className="mainChoice">
                <div className="w-50">
                {
                    
                    currentForm === "Login" ? <Login onFormSwitch={toggleForm} sendValidation={validation} /> : <Register onFormSwitch={toggleForm} sendValidation={validation} />
                
                }
                </div>
            </div>
        </>
    )
}

export default TeacherLogger;