import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    axios
      .post("http://localhost:5000/login/teacher", { //send login data to server
        email: email,
        password: password,
      })

      .then((res) => {
        if (res.data === 1) { //if login is correct send validation to parent
          props.sendValidation("TeacherDashboard", email);
        } else {
          props.notify("Email ou mot de passe érroné"); //else send error message to parent
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            className="form-control my-2"
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
            className="form-control my-2"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="btn-connection just-color-white"
          >
            Connexion
          </motion.button>
        </div>
      </form>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => props.onFormSwitch("Register")} //send switch form request to parent
          className="btn-create-account just-color-white"
        >
          Créer un compte
        </motion.button>
      </div>
    </div>
  );
}

export default Login;
