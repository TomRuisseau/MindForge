import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/boutique.css"

function Shop(props) {
    const [spells, setSpells] = useState([]); // liste des sorts
    const [skins, setSkins] = useState([]); // liste des skins
    const [selected, setSelected] = useState(""); // liste des skins
    const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page quand valide une quête

    const isMountedRef = useRef(false);


    useEffect(() => {
        // axios.post("http://localhost:5000/getSpellsShop", { id: props.data[0].id, class: props.data[0].class })
        //     .then((res) => {
        //         setSpells(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     }
        //     );
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            axios.post("http://localhost:5000/getSkinsShop", { id: props.data[0].id, class: props.data[0].class })
                .then((res) => {
                    console.log(res.data);
                    setSkins(res.data.skins);
                    setSpells(res.data.spells);
                }
                ).catch((err) => {
                    console.log(err);
                }
                );
        }
    }, [props.data, counter]);

    const select = (e) => {
        if (e.target.getAttribute("data-key") === null) {
            setSelected(e.target.parentNode.getAttribute("data-key"));
        }
        else {
            setSelected(e.target.getAttribute("data-key"));
        }
    }

    const buy = () => {
        let price = 0;
        skins.forEach((skin) => {
            if (skin.name === selected) {
                price = skin.cost;
            }
        }
        );
        spells.forEach((spell) => {
            if (spell.name === selected) {
                price = spell.cost;
            }
        }
        );
        if (props.data[0].xp >= price) {
            axios.post("http://localhost:5000/buy", { id: props.data[0].id, name: selected, newXp: props.data[0].xp - price })
                .then((res) => {
                    props.data[0].xp -= price;
                    setCounter(counter + 1);
                }).catch((err) => {
                    console.log(err);
                }
                );
        }
        else {
            alert("Vous n'avez pas assez d'xp");
        }
    }

    const equip = () => {
        axios.post("http://localhost:5000/equip", { id: props.data[0].id, name: selected })
            .then((res) => {
                setCounter(counter + 1);
            }
            ).catch((err) => {
                console.log(err);
            }
            );
    }


    const isOwned = (name) => {
        let owned = false;
        skins.forEach((skin) => {
            if (skin.name === name && skin.owned) {
                owned = true;
            }
        });
        spells.forEach((spell) => {
            if (spell.name === name && spell.owned) {
                owned = true;
            }
        });
        return owned;
    }

    const isSkin = (name) => {
        let _skin = false;
        skins.forEach((skin) => {
            if (skin.name === name) {
                _skin = true;
            }
        });
        return _skin;
    }

    const isEquiped = (name) => {
        let equiped = false;
        skins.forEach((skin) => {
            if (skin.name === name && skin.equiped == "1") {
                equiped = true;
            }
        });
        return equiped;
    }



    return (
        <>
            <h1 className='text-center'>Boutique</h1>
            <h2 className="text-center">Vous avez {props.data[0].xp} xp</h2>
            <div className='row m-0'>
                <div className='col p-5'>
                    <h2>Sorts</h2>
                    <div className='d-flex flex-row'>
                        {spells.map((spell) => {
                            let bg = spell.name === selected ? "selected" : "";
                            let className = "m-2 " + bg;//mettre ici les autres classes de la div
                            return (
                                <div key={spell.name} data-key={spell.name} className={className} onClick={select}>
                                    <h2>{spell.name.split("_").join(" ")}</h2>
                                    <img src={`media/spells/${spell.name}.webp`}></img>
                                    <p>{!spell.owned ? "Prix : " + spell.cost + " XP" : "Déjà possédé"}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="col p-5">
                    <h2>Skins</h2>
                    <div className='d-flex flex-row'>
                        {skins.map((skin) => {
                            let bg = skin.name === selected ? "selected" : "";
                            let className = "m-2 " + bg;//mettre ici les autres classes de la div
                            return (
                                <div key={skin.name} data-key={skin.name} className={className} onClick={select}>
                                    <h2>{skin.name.split("_").join(" ")}</h2>
                                    <img src={`media/skin/${skin.name}.png`} style={{ width: "100%" }}></img>
                                    <p>{!skin.owned ? "Prix : " + skin.cost + " XP" : "Déjà possédé" + (isEquiped(skin.name) ? " et équipé" : "")}</p>
                                    <div />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
            {(selected !== "" && !isOwned(selected)) ? <button className="btn btn-primary" onClick={buy}>Acheter</button> : <></>}
            {(isOwned(selected) && isSkin(selected) && !isEquiped(selected)) ? <button className="btn btn-primary" onClick={equip}>Equiper</button> : <></>}
        </>
    )
}

export default Shop;