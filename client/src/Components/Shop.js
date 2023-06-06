import React, { useEffect, useState } from "react";
import axios from "axios";

function Shop(props) {
    const [spells, setSpells] = useState([]); // liste des sorts
    const [skins, setSkins] = useState([]); // liste des skins

    useEffect(() => {
        axios.post("http://localhost:5000/getSpellsShop", { id: props.data[0].id, class: props.data[0].class })
            .then((res) => {
                setSpells(res.data);
            }).catch((err) => {
                console.log(err);
            }
            );
        axios.post("http://localhost:5000/getSkinsShop", { id: props.data[0].id })
            .then((res) => {
                setSkins(res.data);
                console.log(res.data);
            }
            ).catch((err) => {
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
                <div className='col p-5 overflow-auto'>
                    <h2>Sorts</h2>
                    {spells.map((spell) => {
                        return (
                            <div key={spell.name}>
                                <h2>{spell.name.split("_").join(" ")}</h2>
                                <img src={`media/spells/${spell.name}.webp`}></img>
                                <p>{!spell.owned ? "Prix : " + spell.cost + " XP" : "Déjà possédé"}</p>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="col">
                    <h2>Skins</h2>
                    <div className='d-flex flex-row'>
                        {skins.map((skin) => {
                            return (
                                <div key={skin.name}>
                                    <h2>{skin.name.split("_").join(" ")}</h2>
                                    <img src={`media/skin/${skin.name}.png`} style={{ width: "100%" }}></img>
                                    <p>{!skin.owned ? "Prix : " + skin.cost + " XP" : "Déjà possédé"}</p>
                                    <div />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop;