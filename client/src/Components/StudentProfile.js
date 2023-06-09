import React, { useState, useEffect } from 'react';
import SpellBar from './SpellBar';
import axios from 'axios';
import '../Styles/studentProfile.css';







function StudentProfile(props) {


    console.log(props.data);
    const [hpRatio, setHpRatio] = useState(0);
    const [skin, setSkin] = useState("toutNu");
    const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page

    const addCounter = () => {
        setCounter(counter + 1);
    };

    useEffect(() => {
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
                props.data[0] = res.data[0];
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

    }, [props.data, counter]);



    return (
        <>
            <div className='div-main position-absolute'>
                <div className='row row-profile position-relative'>
                    <div className='col-8 col-skin position-relative'>
                        <img src={`media/skin/${skin}.png`} className='w-100'></img>
                    </div>
                    <div className='col-4 position-relative col-details'>
                        <h3>{props.data[0].team}</h3>
                        <div className='stripe'></div>
                        <h1>{props.data[0].first_name + " " + props.data[0].surname}</h1>
                        <SpellBar data={props.data} refresh={addCounter} />
                        <div className='stripe'></div>


                        <progress className="progress-bar" role="progressbar" id="file" max="100" value={hpRatio}></progress>
                        <h2>{props.data[0].mana + " points de mana"}</h2>
                        <h2>{props.data[0].xp + " points d'XP"}</h2>


                    </div>

                </div>
            </div>
        </>
    )
}

export default StudentProfile;