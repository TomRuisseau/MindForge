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
                    <img key={spell.name} src={`media/spells/${spell.name}.webp`}></img>
                )
            }
            )}
        </div>

    )
}

export default SpellBar;

