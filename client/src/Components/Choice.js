import '../Styles/mainChoice.css'
import '../Styles/mainMain.css'
import React from 'react';



function Choice(props) {
    return (
        <>
            <div className="accueil">
                <h1>Laissez nous vous aider à apprendre</h1>
            </div>

            <div className="fleche">
                <p>voir plus</p>
                <p> fleche vers le bas</p>
            </div>

            <div className="accueil">
                <h1>Qui sommes-nous?</h1>
                <p> Etudiants en 3ème année en école d'ingénieur, nous cherchons à aider 
                    professeurs et élèves dans leur vie scolaire.
                </p>
            </div>

            <div className="accueil">
                <h1>Tentez d'apprendre?</h1>
                    <div className="mainChoice">
                        <h1>Vous êtes :</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={() => props.onChoice('TeacherLogger')} type="button" className="btn btn-primary btn-lg">Un enseignant</button>
                            <button onClick={() => props.onChoice('StudentLogger')} type="button" className="btn btn-primary btn-lg">Un élève</button>
                        </div>
                    </div>
            </div>

        

            
        </>
    )
}

export default Choice;