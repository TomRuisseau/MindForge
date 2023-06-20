import React, { useState, useEffect, useRef } from "react";
import SpellBar from "./SpellBar";
import axios from "axios";
import "../Styles/studentProfile.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import { motion } from "framer-motion";

function StudentProfile(props) {
  console.log(props.data);
  const [hpRatio, setHpRatio] = useState(0);
  const [skin, setSkin] = useState("toutNu");
  const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page

  const [updated, setUpdated] = useState(false); // pour forcer le rechargement de la page aussi

  const isMountedRef = useRef(false);

  const addCounter = () => {
    isMountedRef.current = false;
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      axios
        .post("http://localhost:5000/getSkin", { id: props.data[0].id })
        .then((res) => {
          setSkin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/getStudent", { id: props.data[0].id })
        .then((res) => {
          console.log(res.data);
          props.data[0] = res.data[0];
          setUpdated(!updated);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/getHp", { id: props.data[0].id })
        .then((res) => {
          setHpRatio(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.data, counter, updated]);

  return (
    <div className="hug just-color-white" style={{ height: "100vh" }}>
      <div className="h-100 p-5 w-100 d-flex flex-row justify-content-between align-items-center">
        <div
          className="h-75 box-size-2 glass1 p-4 d-flex flex-column justify-content-between"
          style={{ width: "40%" }}
        >
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "70%" }}
          >
            <div className="h-25 d-flex flex-column justify-content-between">
              <h1 className="just-color-yellow mb-5">
                {props.data[0].first_name + " " + props.data[0].surname}
              </h1>
              <h3 className="mx-5">{props.data[0].team}</h3>
            </div>
            <div className="mx-5 px-5 h-50 d-flex flex-column justify-content-between">
              <div className="w-100 d-flex flex-row align-items-center ">
                <div className="h-25 w-25 d-flex align-items-center">
                  <img
                    src={"media/logos/coeur_clair.png"}
                    style={{ width: "50px", height: "auto" }}
                  />
                </div>
                <progress
                  className="progress-bar my-4 mx-3"
                  role="progressbar"
                  id="file"
                  max="100"
                  value={hpRatio}
                ></progress>
                <h2 className="mx-4 just-color-red mt-2 mb-0">
                  {"(" + props.data[0].hp + ")"}
                </h2>
              </div>
              <div className="h-25 w-25 d-flex align-items-center">
                <img
                  src={"media/logos/mana.png"}
                  style={{ width: "50px", height: "auto" }}
                />
                <h2 className="mx-4 just-color-blue mt-2 mb-0">
                  {props.data[0].mana}
                </h2>
              </div>
              <div className="h-25 w-25 d-flex align-items-center">
                <img
                  src={"media/logos/etoile.png"}
                  style={{ width: "50px", height: "auto" }}
                />
                <h2 className="mx-4 text-warning mt-2 mb-0">
                  {props.data[0].xp}
                </h2>
              </div>
            </div>
          </div>

          <div className="text-center my-5">
            {parseInt(props.data[0].protected) ? (
              <h2>* Vous êtes protégé par un Halo *</h2>
            ) : parseInt(props.data[0].minded) ? (
              <h2>* Votre prochain gain d'XP sera doublé *</h2>
            ) : (
              <h2>* Aucun sort appliqué sur toi *</h2>
            )}
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "90%", width: "40%" ,marginRight:"10%"}}
        >
          <img src={`media/skin/${skin}.png`}></img>
        </div>
        <div
          className="glass1 just-color-yellow w-auto p-3 text-center"
          style={{ height: "70%" }}
        >
          <SpellBar data={props.data} refresh={addCounter} className="p-2" />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
