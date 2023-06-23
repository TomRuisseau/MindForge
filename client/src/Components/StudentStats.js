import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import { motion } from "framer-motion";

function StudentStats(props) {
  const [studentStats, setStudentStats] = useState([]);
  const [skin, setSkin] = useState("toutNu");

  const className = {
    tank: "Protecteur",
    healer: "Soigneur",
    mage: "Mage",
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setStudentStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:5000/getSkin", { id: props.id })
      .then((res) => {
        setSkin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, props.counter]);

  return (
    <motion.div
      //entrance animation
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className="hug w-50 m-4 px-3 py-2 rounded glass1"
    >
      {studentStats.map((stat) => (
        <div key={stat.id} className="h-100">
          <div className="m-3 just-color-yellow d-flex flex-row justify-content-between">
            <h3>
              {stat.first_name} {stat.surname}
            </h3>
            <h3>Equipe : {stat.team}</h3>
          </div>
          <div className="h-50 m-5 d-flex just-color-white flex-column justify-content-between">
            <h4>Rôle : {className[stat.class]}</h4>
            <div className="h-25 w-25 d-flex align-items-center">
              <img
                src={"media/logos/etoile.png"}
                style={{ width: "50px", height: "auto" }}
                alt="etoile"
              />
              <p className="mx-3 mb-0 text-warning size-digits">{stat.xp}</p>
            </div>
            <div className="h-25 w-25 d-flex align-items-center">
              <img
                src={"media/logos/coeur.png"}
                style={{ width: "50px", height: "auto" }}
                alt="coeur"
              />
              <p className="mx-3 mb-0 just-color-dark-red size-digits">
                {stat.hp}
              </p>
            </div>
            <div className="h-25 w-25 d-flex align-items-center">
              <img
                src={"media/logos/mana.png"}
                style={{ width: "50px", height: "auto" }}
                alt="mana bottle"
              />
              <p className="mx-3 mb-0 just-color-blue size-digits">
                {stat.mana}
              </p>
            </div>
          </div>
          <img
            src={`media/skin/${skin}.png`}
            className="position-absolute"
            style={{ bottom: "-5%", right: "-2%", width: "65vh" }}
            alt="Skin"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default StudentStats;
