import React, { useEffect, useState } from "react";
import axios from "axios";

function Shop(props) {
    const [spells, setSpells] = useState([]); // liste des sorts

    useEffect(() => {
        axios.post("http://localhost:5000/getSpellsShop", { id: props.data[0].id, class: props.data[0].class })
            .then((res) => {
                setSpells(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            }
            );
    }, [props.data]);

    return (
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Boutique</h1>
                <h2 className="text-center">Vous avez {props.data[0].xp} xp</h2>
            </div>
            <br></br>
            <div className='row'>
                <div className='col p-5'>
                    <h2>Sorts</h2>
                    {spells.map((spell) => {
                        return (
                            <div key={spell.name}>
                                <h2>{spell.name.split("_").join(" ")}</h2>
                                <img src={`media/spells/${spell.name}.webp`}></img>
                                <p>{spell.owned ? "Prix : " + spell.cost + " XP" : "Déjà possédé"}</p>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>



        </>
    )
}

export default Shop;