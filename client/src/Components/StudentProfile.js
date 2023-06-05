import React, { useState, useEffect } from 'react';
import SpellBar from './SpellBar';
import axios from 'axios';







function StudentProfile(props) {


    console.log(props.data);
    const [hpRatio, setHpRatio] = useState(0);
    const [skin, setSkin] = useState("toutNu");

    useEffect(() => {
        axios
            .post("http://localhost:5000/getHp", { id: props.data[0].id })
            .then((res) => {
                setHpRatio(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post("http://localhost:5000/getSkin", { id: props.data[0].id })
            .then((res) => {
                setSkin(res.data);
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
                    <progress className="progress-bar" role="progressbar" id="file" max="100" value={hpRatio}></progress>
                    <SpellBar data={props.data} />
                </div>
                <div className='col-2'>
                    <h2>Ton avatar:</h2>
                    <img src={`media/skin/${skin}.png`} className='w-100'></img>
                </div>
            </div>
        </>
    )
}

export default StudentProfile;