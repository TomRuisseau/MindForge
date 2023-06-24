import React from "react";
import { motion } from "framer-motion";
import "../Styles/Glass.css";
import "../Styles/Textes.css";

function SpellDescription(props) {

    let spellsMap = new Map(); //map to translate spells names
    //tank
    spellsMap.set("protection", { name: "Protection", description: "Tu encaisses les dégats en HP à la place d'un membre de ton équipe. (Est activé par le professeur lors de la mort de ton équipier)", manaCost: 2 });
    spellsMap.set("halo_salvateur", { name: "Halo salvateur", description: "Annule la prochaine source de dégat que tu recois.", manaCost: 6 });
    spellsMap.set("imposition_des_mains", { name: "Imposition des mains", description: "Tu t'infliges des dégats de 5 HP pour soigner un membre de 10 HP.", manaCost: 6 });
    spellsMap.set("purification", { name: "Purification", description: "Tu te soignes de 2 HP.", manaCost: 3 });
    //healer
    spellsMap.set("premiers_soins", { name: "Premiers soins", description: "Tu soignes de 3 HP un membre de l'équipe ou toi-même.", manaCost: 2 });
    spellsMap.set("apaisement_majeur", { name: "Apaisement majeur", description: "Tu soignes de 10 HP un membre de l'équipe ou toi-même.", manaCost: 6 });
    spellsMap.set("reviviscence", { name: "Reviviscence", description: "Permet à un membre qui n'a plus de vie de revenir à 1 HP sans subir le malus aléatoire.", manaCost: 6 });
    spellsMap.set("soin_de_masse", { name: "Soin de masse", description: "Tu soignes tous les membres de l'équipe de 2 HP.", manaCost: 6 });
    //mage
    spellsMap.set("aura_magique", { name: "Aura magique", description: "Tu restitues 2 de mana à tous les autres membres de ton équipe.", manaCost: 4 });
    spellsMap.set("vague_de_mana", { name: "Vague de mana", description: "Tu restaures tout le mana d'un membre de ton équipe (sauf toi) en fonction de sa classe.", manaCost: 6 });
    spellsMap.set("truquage_du_destin", { name: "Truquage du destin", description: "Permet de généraliser un gain d'XP individuel à toute l'équipe.", manaCost: 5 });
    spellsMap.set("expansion_du_savoir", { name: "Expansion du savoir", description: " Tu fais doubler le prochain gain d'XP d'un membre de l'équipe.", manaCost: 4 });

    return (

        props.state != "hidden" ? (
            <div
                className="classic-glass-moins-flou hug just-color-white position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ zIndex: 2 }}
            >
                <motion.div
                    //entrance animation
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 py-3 w-50 h-50 glass3 text-center d-flex flex-column align-items-center justify-content-between"
                >
                    <div className="d-flex flex-row justify-content-between">
                        <h1 className="px-5">{spellsMap.get(props.state).name}</h1>
                        <motion.button
                            whileHover={{ scale: 2 }}
                            className="btn-close btn-close-white m-3 position-absolute top-0 end-0"
                            onClick={props.close}
                        ></motion.button>
                    </div>
                    <div className="p-3 rounded">
                        <p style={{ fontSize: "22px" }}>
                            {spellsMap.get(props.state).description}
                        </p>
                    </div>
                    <h3>{spellsMap.get(props.state).manaCost + " manas"}</h3>
                </motion.div>
            </div>
        ) : (
            <></>
        )
    );
}

export default SpellDescription;
