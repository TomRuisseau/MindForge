import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentQuests(props) {
    //state
    //const [counter, setCounter] = useState(0) // pour forcer le rechargement de la page quand valide une quête
    const [quests, setQuests] = useState([]) // liste des quêtes

    //comportement
    useEffect(() => {
        axios.post("http://localhost:5000/getQuests", { email: props.data[0].teacher_email })
            .then((res) => {
                setQuests(res.data);
            }).catch((err) => {
                console.log(err);
            }
            );
    }, [/*counter,*/ props.data]);

    const questValidation = (e) => {
        e.preventDefault(); // prevent page reload
        alert("Faut faire le code pour ça ^^");
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
                                    <td><button onClick={questValidation} className='btn btn-light'>Terminer la quête</button></td>
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