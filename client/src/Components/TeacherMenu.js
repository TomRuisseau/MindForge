import React, { useEffect, useState, useRef } from 'react';
import Clock from 'react-clock';
import axios from 'axios';
import 'react-clock/dist/Clock.css';

function TeacherMenu(props) {
    const [value, setValue] = useState(new Date());
    const [student, setStudent] = useState({});
    const [skin, setSkin] = useState("toutNu");
    const [quests, setQuests] = useState([]); // liste des quêtes


    const isMountedRef = useRef(false);


    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            axios.post("http://localhost:5000/getRandomStudent", { id: props.id })
                .then((res) => {
                    setStudent(res.data);
                    axios.post("http://localhost:5000/getSkin", { id: res.data.id })
                        .then((res) => {
                            setSkin(res.data);
                        }
                        )
                        .catch((err) => {
                            console.log(err);
                        }
                        );
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

        <>
            <div className="row">
                <div className="col-4">
                    <div className='bg-white rounded-circle m-5' style={{ width: "200px" }}>
                        <Clock value={value} size={200} />
                    </div>

                    <h2 className="text-center">Liste de quêtes</h2>
                    <div
                        className="m-1 custom-scrollbar"
                        style={{ height: "50vh", overflow: "auto" }}
                    >
                        <table className="table table-striped">
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
                                        <tr
                                            key={quest.id}
                                            data-key={quest.id}
                                            className={quest.bg}
                                        >
                                            <td>{quest.description}</td>
                                            <td>{quest.reward}</td>
                                            <td>{quest.nbCompleted + " étudiants"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-5'>
                    <h1 className='text-center'>Student of the day</h1>
                    <h2 className='text-center'>{student.first_name + " " + student.surname + " : " + student.xp + " xp"}</h2>
                    <img src={`media/skin/${skin}.png`}></img>
                </div>
            </div>
        </>

    );
}

export default TeacherMenu;