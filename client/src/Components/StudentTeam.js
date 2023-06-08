import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/studentTeam.css';

function StudentTeam(props){


    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:5000/getStudentsTeam", { team: props.data[0].team })
            .then((res) => {
                setTeam(res.data);
                
            })
            .catch((err) => {
                console.log(err);

            });
    }, [props.data]);

    //Recupère le skin de chaque élève de l'équipe
    useEffect(() => {
        team.map((student) => {
            axios
                .post("http://localhost:5000/getSkin", { id: student.id })
                .then((res) => {
                    student.skin = res.data;
                    setTeam([...team]);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    }, [team]);





    return(
        <>
            <div className='row row-team'>
                <div className='col-2 col-team'></div>
                <h1 className='col col-team'>Mon équipe</h1>
                <div className='row row-team'>
                    <div className='col-2 col-team'></div>
                    {team.map((student) => {
                        return (
                            
                                
                                <div className='col-3 col-team'>
                                    
                                    <h3>{student.first_name}</h3>
                                    <h5>Vie:</h5><p>{student.hp}</p>
                                    <h5>XP:</h5><p>{student.xp}</p>
                                    <img src={`media/skin/${student.skin}.png`} alt="media/skin/toutNu.png" className="skin display-box max-w"></img>
                                </div>
                        
                        )
                    }
                    )}
                </div>

            </div>
        </>
    )
}

export default StudentTeam;