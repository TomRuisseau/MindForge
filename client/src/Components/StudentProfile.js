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
                <div className='col-4'>
                    <h2>Ton nom:</h2>
                    <h2>Ton équipe:</h2>
                    <h2>Ta vie:</h2>
                    <progress id="file" max="100" value="100"> 70% </progress>
                </div>
                <div className='col-2 w-100'>
                    <h2>Ton avatar:</h2>
                    <img src="media/pierre.png" className='w-100'></img>
                </div>             
            </div>
        </>
    )
}

export default StudentProfile;