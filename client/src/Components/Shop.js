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
                <div className='col-2'></div>
                <div className='col-2'>
                    <h3>Item 1</h3>
                    <img className="img-thumbnail" src="https://cdna.artstation.com/p/assets/images/images/040/894/544/large/jhonnatan-christofer-barbosa-e1.jpg?1630176038" alt="item1" />
                </div>
                <div className='col-2'>
                    <h3>Item 2</h3>
                    <img className="img-thumbnail" src="https://cdna.artstation.com/p/assets/images/images/040/894/544/large/jhonnatan-christofer-barbosa-e1.jpg?1630176038" alt="item1" />
                </div>
                <div className='col-2'>
                    <h3>Item 3</h3>
                </div>
                <div className='col-2'>
                    <h3>Item 4</h3>
                </div>
            </div>



        </>
    )
}

export default Shop;