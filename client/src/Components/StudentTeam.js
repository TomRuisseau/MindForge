import React, { useState, useEffect } from 'react';
import axios from 'axios';

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


    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Mon équipe</h1>
                {team.map((student) => {
                    return (
                        <div className='col'>
                            <p>{student.first_name}</p>
                        </div>
                    )
                }
                )}

            </div>
        </>
    )
}

export default StudentTeam;