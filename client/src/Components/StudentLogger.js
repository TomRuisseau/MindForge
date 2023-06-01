import React, { useState } from "react";
import axios from 'axios';


function StudentLogger(props) {
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload

        axios.post('http://localhost:5000/login/student', { code: code })

            .then(res => {
                console.log(res.data.length);
                if (res.data.length !== 0) {
                    props.onValidation("StudentDashboard");
                }
                else {
                    alert("Code incorrect");
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="code">Entre le code fourni par ton enseignant</label>
                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className="form-control" placeholder="xyz123" id="code" name="code" />
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </>
    )
}

export default StudentLogger;