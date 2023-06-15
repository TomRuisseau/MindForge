import '../Styles/mainChoice.css'
import '../Styles/mainMain.css'
import React from 'react';



function Choice(props) {
    const [activeTab, setActiveTab] = React.useState('Tank');
    const [isScrollNavbar, setIsScrollNavbar] = React.useState(false);
  
    React.useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollThreshold = 100; // Définissez votre seuil de défilement
        
        if (scrollTop > scrollThreshold) {
          setIsScrollNavbar(true);
        } else {
          setIsScrollNavbar(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="body">
            <div className="containerAccueil centeredDiv ${isScrollNavbar ? 'scrollNavbar' : ''}`}">
                <h1>MINDFORGE</h1>
                <h2>Laissez nous vous aider à apprendre</h2>
                
                <div className="fleche">
                    <p>fleche vers le bas</p>
                </div>
            </div>

            <div className={`containerAccueil ${isScrollNavbar ? 'scrollNavbar' : ''}`}>
                <div className="navbar">
                    <h1> Se connecter : </h1>
                    <h1> enseignant </h1>
                    <h1> élève </h1>
                </div>
                
            </div>

            <div className="containerAccueil centeredDiv containerPrincipe">
                <h1>Le principe?</h1>
                <p>Avec votre équipe, vos trois amis, observez l'évolution de vos personnages au fil de l'année, guidés par les 
                    quêtes, les missions, les aides de votre maitre, enseignant.
                </p>

                <div>
                     <div class="tab">
                        <button class="tablinks" onClick={() => setActiveTab('Tank')}>Tank</button>
                        <button class="tablinks" onClick={() => setActiveTab('Healer')}>Healer</button>
                        <button class="tablinks"  onClick={() => setActiveTab('Mage')}>Mage</button>
                    </div>

                    <div id="Tank" class={`tabcontent ${activeTab === 'Tank' ? 'active' : ''}`}>
                        <h3>Tank</h3>
                        <p>Il aide ses coéquipiers en les protégeant d'attaques dangereuses.
                           Il est là pour contrer et abriter ceux dont la vie est la plus fragile.
                        </p>
                    </div>

                    <div id="Healer" class={`tabcontent ${activeTab === 'Healer' ? 'active' : ''}`}>
                        <h3>Healer</h3>
                        <p>Avec ses sorts, il aide en offrant plus de vie à ses coéquipiers.
                           
                        </p>
                    </div>

                    <div id="Mage" class={`tabcontent ${activeTab === 'Mage' ? 'active' : ''}`}>
                        <h3>Mage</h3>
                        <p>Il aide son équipe grâce à ses sorts en les renforçant et les supportant.
                           
                        </p>
                    </div>
                </div>
               

            </div>

            <div className="containerAccueil centeredDiv">
                <h1>Comment jouer?</h1>
                <p>Blah Blah Blah</p>
            </div>

            <div className="containerAccueil centeredDiv containerPrincipe">
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

            
        </div>
    )
}

export default Choice;