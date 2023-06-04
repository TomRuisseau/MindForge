import React, { useState, useEffect } from "react";
import axios from "axios";

function Quests(props) {
    //state
    const [description, setDescription] = useState("")
    const [reward, setReward] = useState(0)
    const [counter, setCounter] = useState(0) // pour forcer le rechargement de la page quand on ajoute une quête
    const [quests, setQuests] = useState([]) // liste des quêtes

    //comportement
    useEffect(() => {
        axios.post("http://localhost:5000/getQuests", { email: props.id })
            .then((res) => {
                setQuests(res.data)
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

    //affichage
    return (
        <div className="row">
            <div className="col m-5" style={{ height: "85vh", overflow: "auto" }}>
                <h2>Liste de quêtes</h2>
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
                                <tr key={quest.id}>
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
            </div>
        </div>
    )
}

export default Quests;