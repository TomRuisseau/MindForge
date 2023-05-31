import React from "react";

function Tutorial(){
    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Tutoriel</h1>
            </div>
            <br></br>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-3'>
                    <h2>Comment jouer:</h2>
                    <p className="text-justify">Le but du jeu est de répondre correctement aux questions posées par le professeur. Pour cela, il faut cliquer sur la bonne réponse parmi les propositions. Si la réponse est correcte, le joueur gagne des points. Si la réponse est incorrecte, le joueur perd des points. Le joueur peut également gagner des points en réalisant des quêtes.</p>
                <div className='col-2'>
                    <h2>Comment gagner:</h2>
                    <p className="text-justify">Le joueur gagne la partie lorsqu'il a atteint le nombre de points requis pour gagner. Le joueur peut également gagner la partie en réalisant des quêtes.</p>
                </div>
                    
                </div>
            </div>
        </>
    )
}

export default Tutorial;

