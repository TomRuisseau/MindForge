import React from 'react';

function StudentProfile(){
    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Mon Profil</h1>
            </div>
            <br></br>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col'>
                    <h2>Ton nom:</h2>
                    <h2>Ton équipe:</h2>
                </div>
                <div className='col'>
                    <h2>Ton avatar:</h2>
                </div>             
            </div>
        </>
    )
}

export default StudentProfile;