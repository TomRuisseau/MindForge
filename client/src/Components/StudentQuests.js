import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentQuests(props) {
    //state
    const [counter, setCounter] = useState(0) // pour forcer le rechargement de la page quand valide une quête
    const [quests, setQuests] = useState([]) // liste des quêtes
    const [completedQuests, setCompletedQuests] = useState([]) // liste des quêtes validées
    //comportement
    useEffect(() => {
        axios.post("http://localhost:5000/getQuests", { email: props.data[0].teacher_email })
            .then((res) => {
                setQuests(res.data);
            }).catch((err) => {
                console.log(err);
            }
            );
        axios.post("http://localhost:5000/getCompletedQuests", { email: props.data[0].teacher_email, id: props.data[0].id })
            .then((res) => {
                setCompletedQuests(res.data);
            }).catch((err) => {
                console.log(err);
            }
            )
    }, [counter, props.data]);

    const questValidation = (e) => {
        e.preventDefault(); // prevent page reload
        axios.post("http://localhost:5000/questValidation", { quest_id: e.target.parentElement.parentElement.getAttribute("data-key"), student_id: props.data[0].id })
            .then((res) => {
                setCounter(counter + 1);
            }
            ).catch((err) => {
                console.log(err);
            }
            );
    }

    const testCompletedQuests = (quest_id) => {
        for (let i = 0; i < completedQuests.length; i++) {
            if (completedQuests[i].id == quest_id) {
                return true;
            }
        }
        return false;
    }



    //affichage
    return (
        <div className="row">
            <div className="col m-5 custom-scrollbar" style={{ height: "82vh", overflow: "auto" }}>
                <h2 className="text-center">Liste de quêtes</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Récompense</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quests.map((quest) => {
                            return (
                                <tr key={quest.id} data-key={quest.id}>
                                    <td>{quest.description}</td>
                                    <td>{quest.reward}</td>
                                    {testCompletedQuests(quest.id) ? <td><p>Quête déjà terminée</p></td> : <td><button onClick={questValidation} className='btn btn-light'>Terminer la quête</button></td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentQuests;