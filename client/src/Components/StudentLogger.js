import React, { useState } from "react";

function StudentLogger(props) {
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        console.log(code);
        props.onValidation("StudentDashboard");
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