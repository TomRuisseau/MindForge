import React, { useState, useEffect, useRef } from 'react';
import SpellBar from './SpellBar';
import axios from 'axios';
import '../Styles/studentProfile.css';







function StudentProfile(props) {


    console.log(props.data);
    const [hpRatio, setHpRatio] = useState(0);
    const [skin, setSkin] = useState("toutNu");
    const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page

    const [updated, setUpdated] = useState(false); // pour forcer le rechargement de la page aussi

    const isMountedRef = useRef(false);

    const addCounter = () => {
        isMountedRef.current = false;
        setCounter(counter + 1);
    };

    useEffect(() => {
        if (!isMountedRef.current) {
            alert("useEffect");
            isMountedRef.current = true;
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
                    console.log(res.data);
                    props.data[0] = res.data[0];
                    setUpdated(!updated);
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
        }
    }, [props.data, counter, updated]);



    return (
        <>
                <div className='row row-profile position-relative'>

                    <div className='col-6 position-relative'>
                        <div className='lol-box'>
                            <div className='lines'></div>
                            <div className='content'>
                                <div className='details'>
                                    <h3>{props.data[0].team}</h3>
                                    <div className='stripe'></div>
                                    <h1>{props.data[0].first_name + " " + props.data[0].surname}</h1>
                                    <SpellBar data={props.data} refresh={addCounter} />
                                    <div className='stripe'></div>


                                    {/* //todo : mettre des icones  icones pour les 4 trucs qui suvent   */}
                                    <progress className="progress-bar" role="progressbar" id="file" max="100" value={hpRatio}></progress>
                                    <h2>{props.data[0].mana + " points de mana"}</h2>
                                    <h2>{props.data[0].xp + " points d'XP"}</h2>
                                    {parseInt(props.data[0].protected) ? <h2>Vous êtes protégé par un halo </h2> : null}
                                    {parseInt(props.data[0].minded) ? <h2>Votre prochain gain d'XP sera doublé </h2> : null}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='col-4 col-skins position-relative'>
                        <div className='col-skin'>
                            <img src={`media/skin/${skin}.png`} className='w-100 lol-image'></img>
                        </div>
                    </div>

                </div>
        </>
    )
}

export default StudentProfile;