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
            <div className='row w-100 p-5'>
                <div className='col-4'>
                    <h3>{props.data[0].team}</h3>
                    <h1>{props.data[0].first_name + " " + props.data[0].surname}</h1>


                    <progress className="progress-bar" role="progressbar" id="file" max="100" value={hpRatio}></progress>
                    <h2>{props.data[0].mana + " points de mana"}</h2>
                    <h2>{props.data[0].xp + " points d'XP"}</h2>

                    <SpellBar data={props.data} />
                </div>
                <div className='col-4'>
                    <img src={`media/skin/${skin}.png`} className='w-100'></img>
                </div>
            </div>
        </>
    )
}

export default StudentProfile;