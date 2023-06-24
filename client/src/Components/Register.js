import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (password === passwordConfirm) { //check if passwords match
      axios
        .post("http://localhost:5000/register/teacher", { //send register data to server
          email: email,
          password: password,
        })

        .then((res) => {
          if (res.data === 1) { //if email is already used, send error message to parent
            props.notify("E mail déjà utilisé")
            return;
          }
          //else send validation to parent
          props.sendValidation("TeacherDashboard", email);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.notify("Les mots de passe ne correspondent pas")
    }
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <form
        onSubmit={handleSubmit}
        className="h-100 d-flex flex-column justify-content-between mb-5"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="dupond.dupont@gmail.com"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfrim">Confirmation du mot de passe</label>
          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            className="form-control"
            placeholder="********"
            id="passwordConfirm"
            name="passwordConfirm"
          />
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="btn-connection just-color-white"
          >
            Créer
          </motion.button>
        </div>
      </form>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => props.onFormSwitch("Login")}
          className="btn-create-account just-color-white"
        >
          Se connecter
        </motion.button>
      </div>
    </div>);
}

export default Register;
