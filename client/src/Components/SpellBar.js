import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpellBar = (props) => {
    const [spells, setSpells] = useState([]); // liste des sorts

    useEffect(() => {
        axios.post("http://localhost:5000/getSpells", { id: props.data[0].id, class: props.data[0].class })
            .then((res) => {
                setSpells(res.data);
            }).catch((err) => {
                console.log(err);
            }
            );
    }, [props.data]);

    return (
        <div>
            <br></br>
            <h2>SpellBar</h2>

            {spells.map((spell) => {
                return (
                    <div>
                        <img key={spell.item_name} src={`media/spells/${spell.item_name}.webp`}></img>
                        <p>{spell.item_name.split("_").join(" ") + " : " + spell.manaCost + " points de mana"}</p>
                    </div>
                )
            }
            )}
        </div>

    )
}

export default SpellBar;

