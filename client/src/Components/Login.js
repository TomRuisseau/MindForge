import React, { useState } from "react";
import axios from 'axios';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        console.log(email, password)
        axios.post('http://localhost:5000/login/teacher', { email: email, password: password })

            .then(res => {
                console.log(res.data);
                props.sendValidation("TeacherDashboard");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="dupond.dupont@gmail.com" id="email" name="email" />
                <label htmlFor="password">Mot de passe</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="********" id="password" name="password" />
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>

            <button onClick={() => props.onFormSwitch('Register')} className="btn btn-primary">Vous n'avez pas encore de compte ?</button>
        </>
    )
}

export default Login;