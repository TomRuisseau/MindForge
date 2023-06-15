import React, { useEffect, useState, useRef } from "react";
import Clock from "react-live-clock";
import axios from "axios";
import SmallList from "./SmallList";
import "react-clock/dist/Clock.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Scroll.css";

function TeacherMenu(props) {
  const [value, setValue] = useState(new Date());
  const [student, setStudent] = useState({});
  const [skin, setSkin] = useState("toutNu");
  const [quests, setQuests] = useState([]); // liste des quêtes

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      axios
        .post("http://localhost:5000/getRandomStudent", { id: props.id })
        .then((res) => {
          setStudent(res.data);
          axios
            .post("http://localhost:5000/getSkin", { id: res.data.id })
            .then((res) => {
              setSkin(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/getQuests", { email: props.id })
        .then((res) => {
          setQuests(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.id]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between h-100">
      <div className="d-flex flex-column align-items-center">
        <div
          className="clock-glass text-center hug just-color-yellow h-25 pt-3"
        >
          <h1>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>
        </div>
        <div className="glass1 m-5">
          <h2 className="text-center just-color-yellow m-3">Liste de quêtes</h2>
          <div
            className="m-2 custom-scrollbar"
            style={{ height: "50vh", overflow: "auto" }}
          >
            <table className="table table-striped text-white">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Récompense</th>
                  <th scope="col">Terminée par </th>
                </tr>
              </thead>
              <tbody>
                {quests.map((quest) => {
                  return (
                    <tr key={quest.id} data-key={quest.id} className={quest.bg}>
                      <td className="text-white">{quest.description}</td>
                      <td className="text-white">{quest.reward}</td>
                      <td className="text-white">
                        {quest.nbCompleted + " élève(s)"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-75 hug just-color-white d-flex flex-column justify-content-center">
        <div className="glass2">
          <h2 className="text-center m-3 just-color-yellow">
            Élève mis à l'honneur :
          </h2>
          <h3 className="text-center m-3">
            {student.first_name +
              " " +
              student.surname +
              " : " +
              student.xp +
              " xp"}
          </h3>
        </div>
        <img className="h-100" src={`media/skin/${skin}.png`}></img>
      </div>
      <SmallList id={props.id} />
    </div>
  );
}

export default TeacherMenu;
