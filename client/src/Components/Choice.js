import '../Styles/mainChoice.css'
import '../Styles/mainMain.css'
import React from 'react';



function Choice(props) {
    const [activeTab, setActiveTab] = React.useState('Tank');
    

    return (
        <>
            <div className="containerAccueil centeredDiv">
                <h1>Nom du Site</h1>
                <h2>Laissez nous vous aider à apprendre</h2>
                
                <div className="fleche">
                    <p>voir plus</p>
                    <p>fleche vers le bas</p>
                </div>
            </div>


            <div className="containerAccueil centeredDiv">
                <h1>Le principe?</h1>
                <p>blah blah on explique</p>

                <div>
                     <div class="tab">
                        <button class="tablinks" onClick={() => setActiveTab('Tank')}>Tank</button>
                        <button class="tablinks" onClick={() => setActiveTab('Healer')}>Healer</button>
                        <button class="tablinks"  onClick={() => setActiveTab('Mage')}>Mage</button>
                    </div>

                    <div id="Tank" class={`tabcontent ${activeTab === 'Tank' ? 'active' : ''}`}>
                        <h3>Tank</h3>
                        <p>Le tank aide à protéger ses coéquipiers.</p>
                    </div>

                    <div id="Healer" class={`tabcontent ${activeTab === 'Healer' ? 'active' : ''}`}>
                        <h3>Healer</h3>
                    </div>

                    <div id="Mage" class={`tabcontent ${activeTab === 'Mage' ? 'active' : ''}`}>
                        <h3>Mage</h3>
                    </div>
                </div>
               

            </div>

            <div className="containerAccueil centeredDiv">
                <h1>Comment jouer?</h1>
                <p>Blah Blah Blah</p>
            </div>

            <div className="containerAccueil centeredDiv">
                <h1>Qui sommes-nous?</h1>
                <p> Etudiants en 3ème année en école d'ingénieur, nous cherchons à aider 
                    professeurs et élèves dans leur vie scolaire.
                </p>
            </div>

            <div className="containerAccueil centeredDiv">
                <h1>Tentez d'apprendre?</h1>
                    <div className="mainChoice">
                        <h1>Vous êtes :</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={() => props.onChoice('TeacherLogger')} type="button" className="btn btn-primary btn-lg">Un enseignant</button>
                            <button onClick={() => props.onChoice('StudentLogger')} type="button" className="btn btn-primary btn-lg">Un élève</button>
                        </div>
                    </div>
            </div>

        
            <footer className="d-flex flex-wrap py-3 my-4 border-top">
                <p className="text-center ">2023</p>
            </footer>

            
        </>
    )
}

export default Choice;