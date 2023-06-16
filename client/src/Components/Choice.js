import '../Styles/mainChoice.css'
import '../Styles/mainMain.css'
import React from 'react';



function Choice(props) {
    const [activeTab, setActiveTab] = React.useState('Guerrier');
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
            <div className={"containerAccueil centeredDiv ${isScrollNavbar ? 'scrollNavbar' : ''}"}>
                
                <h1 className="tailleTitre">MINDFORGE</h1>
                <h2 className="tailleSousTitre">Laissez nous vous aider à apprendre</h2>
                
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
                <h1>Quel est le principe?</h1>
                <p>Vous avez le choix d'incarner un guerrier, un mage ou un soigneur lors de votre aventure et avec lui vous allez apprendre !
                </p>

                <div className="mt-5">
                    <div class="tab">
                        <button class="tablinks" onClick={() => setActiveTab('Guerrier')}>Guerrier</button>
                        <button class="tablinks" onClick={() => setActiveTab('Soigneur')}>Soigneur</button>
                        <button class="tablinks"  onClick={() => setActiveTab('Mage')}>Mage</button>
                    </div>

                    <div id="Guerrier" class={`tabcontent ${activeTab === 'Guerrier' ? 'active' : ''}`}>
                        <h3>Guerrier</h3>
                        <p>Il aide ses coéquipiers en les protégeant d'attaques dangereuses.
                           Il est là pour contrer et abriter ceux dont la vie est la plus fragile.
                        </p>
                    </div>

                    <div id="Soigneur" class={`tabcontent ${activeTab === 'Soigneur' ? 'active' : ''}`}>
                        <h3>Soigneur</h3>
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

        
            <footer className="footer">
                <p className="">2023</p>
            </footer>

            
        </div>
    )
}

export default Choice;