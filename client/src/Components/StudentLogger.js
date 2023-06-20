import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentLogger(props) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    axios
      .post("http://localhost:5000/login/student", { code: code })

      .then((res) => {
        console.log(res.data.length);
        if (res.data.length !== 0) {
          props.onPass(res.data);
          props.onValidation("StudentDashboard");
        } else {
          toast.warning('Code incorrect', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-100 d-flex hug justify-content-center align-items-center">
      <div className="mainChoice h-25 w-25 p-5 classic-glass">
        <form onSubmit={handleSubmit} className="d-flex flex-column log-size">
          <label htmlFor="code">Entre ton identifiant</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            className="form-control my-2"
            placeholder="xyz123"
            id="code"
            name="code"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="btn-connection just-color-white p-2 align-self-center w-75 mt-5"
          >
            Connexion
          </motion.button>
        </form>
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

export default StudentLogger;
