// Récupère les données de la table student et les affiche dans le front StudentProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';







function StudentProfile(props) {


    console.log(props.data);
    const [hpRatio, setHpRatio] = useState(0);

    useEffect(() => {
        axios
            .post("http://localhost:5000/getHp", { id: props.data[0].id })
            .then((res) => {
                setHpRatio(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.data]);



    return (
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Mon Profil</h1>
            </div>
            <br></br>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-4'>
                    <h2>Ton nom:</h2>
                    <p>{props.data[0].first_name}</p>

                    <h2>Ton équipe:</h2>
                    <p>{props.data[0].team}</p>


                    <h2>Ta vie:</h2>
                    <progress id="file" max="100" value={props.data[0].hp}></progress>
                </div>
                <div className='col-2'>
                    <h2>Ton avatar:</h2>
                    <img src="media/pierre.png" className='w-100'></img>
                </div>
            </div>
        </>
    )
}

export default StudentProfile;