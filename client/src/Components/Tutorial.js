import React from "react";
import "../Styles/Tutorial.css";

function Tutorial(){
    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <div className="Text-Tutoriel">
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>  
                <h1 className='col glass1'>Tutoriel</h1>
                </div>
            </div>
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
        
            <div className='row '>
                <div className='col-2'></div>
                
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <div className='col-3'>
                    <h2>Comment jouer:</h2>
                    <p className="text-justify">Le but du jeu est de répondre correctement aux questions posées par le professeur. Pour cela, il faut cliquer sur la bonne réponse parmi les propositions. Si la réponse est correcte, le joueur gagne des points. Si la réponse est incorrecte, le joueur perd des points. Le joueur peut également gagner des points en réalisant des quêtes.</p>
                </div>
                
                
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <div className='col-3'>
                    <h2>Comment gagner:</h2>
                    <p className="text-justify">Le joueur gagne la partie lorsqu'il a atteint le nombre de points requis pour gagner. Le joueur peut également gagner la partie en réalisant des quêtes.</p>
                </div>
                
                
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <div className='col-3'>
                    <h2>Comment gagner:</h2>
                    <p className="text-justify">Le joueur gagne la partie lorsqu'il a atteint le nombre de points requis pour gagner. Le joueur peut également gagner la partie en réalisant des quêtes.</p>
                </div>
                   
                
            </div>
        </>
    )
}

export default Tutorial;

