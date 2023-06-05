import '../Styles/mainChoice.css'
import React from 'react';



function Choice(props) {
    return (
        <>
            <div className="mainChoice">
                <h1>Vous êtes :</h1>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={() => props.onChoice('TeacherLogger')} type="button" className="btn btn-primary btn-lg">Un enseignant</button>
                    <button onClick={() => props.onChoice('StudentLogger')} type="button" className="btn btn-primary btn-lg">Un élève</button>
                </div>
            </div>
        </>
    )
}

export default Choice;