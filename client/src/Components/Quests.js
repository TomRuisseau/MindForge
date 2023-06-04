import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/Scroll.css'

function Quests(props) {
    //state
    const [description, setDescription] = useState("")
    const [reward, setReward] = useState(0)
    const [counter, setCounter] = useState(0) // pour forcer le rechargement de la page quand on ajoute une quête
    const [quests, setQuests] = useState([]) // liste des quêtes
    const [selectedQuest, setSelectedQuest] = useState(0) // quête sélectionnée

    //comportement
    useEffect(() => {
        axios.post("http://localhost:5000/getQuests", { email: props.id })
            .then((res) => {
                const blankQuests = res.data.map((quest) => {
                    quest.bg = "";
                    return quest;
                })
                setQuests(blankQuests);
            }).catch((err) => {
                console.log(err);
            }
            );
    }, [counter, props.id]);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        axios.post("http://localhost:5000/addQuest", {
            email: props.id,
            description: description,
            reward: reward,
        }
        ).then((res) => {
            setDescription("");
            setReward(0);
            setCounter(counter + 1);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    };

    const select = (e) => {
        let key = e.target.parentNode.getAttribute("data-key");
        setSelectedQuest(key);
        const blankQuests = quests.map((quest) => {
            if (quest.id.toString() === key) {
                quest.bg = "bg-primary";
            }
            else {
                quest.bg = "";
            }
            return quest;
        })
        setQuests(blankQuests);
    }

    const deleteQuest = (e) => {
        e.preventDefault(); // prevent page reload
        axios.post("http://localhost:5000/deleteQuest", {
            id: selectedQuest,
        }
        ).then((res) => {
            setCounter(counter + 1);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    };


    //affichage
    return (
        <div className="row">
            <div className="col m-5 custom-scrollbar" style={{ height: "85vh", overflow: "auto" }}>
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
                                <tr key={quest.id} onClick={select} data-key={quest.id} className={quest.bg}>
                                    <td>{quest.description}</td>
                                    <td>{quest.reward}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-4 m-5">
                <h2>Ajouter une quête : </h2>
                <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <label htmlFor="text" className="mt-3">
                        Description :
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Faire l'exercice 1 page 12"
                        id="description"
                        name="description"
                        required
                    />
                    <label htmlFor="number" className="mt-3">
                        Nombre de points d'XP à gagner :
                    </label>
                    <input
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                        type="number"
                        className="form-control"
                        placeholder="0"
                        id="xp"
                        name="xp"
                        required
                    />
                    <button type="submit" className="btn btn-success mt-3">
                        Valider
                    </button>
                </form>
                <button onClick={deleteQuest} className="btn btn-danger mt-5">
                    Supprimer la quête sélectionnée
                </button>
            </div>
        </div>
    )
}

export default Quests;