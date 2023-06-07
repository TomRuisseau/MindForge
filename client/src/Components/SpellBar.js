import React, { useEffect, useState } from "react";
import axios from "axios";
import Protection from "./PopUpsSorts/Protection";
import AuraMagique from "./PopUpsSorts/AuraMagique";
import PremiersSoins from "./PopUpsSorts/PremiersSoins";
import ApaisementMajeur from "./PopUpsSorts/ApaisementMajeur";
import ExpansionDuSavoir from "./PopUpsSorts/ExpansionDuSavoir";
import HaloSalvateur from "./PopUpsSorts/HaloSalvateur";
import Purification from "./PopUpsSorts/Purification";
import ImpositionDesMains from "./PopUpsSorts/ImpositionDesMains";
import SoinDeMasse from "./PopUpsSorts/SoinDeMasse";
import TruquageDuDestin from "./PopUpsSorts/TruquageDuDestin";
import VagueDeMana from "./PopUpsSorts/VagueDeMana";
import Reviviscence from "./PopUpsSorts/Reviviscence";

const SpellBar = (props) => {
  const [spells, setSpells] = useState([]); // liste des sorts
  const [selectedSpell, setSelectedSpell] = useState("hidden"); // sort sélectionné

  function closePopUp() {
    setSelectedSpell("hidden");
  }

  const selectSpell = (spell) => {
    setSelectedSpell(spell);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/getSpells", {
        id: props.data[0].id,
        class: props.data[0].class,
      })
      .then((res) => {
        setSpells(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  return (
    <div>
      <br></br>
      <h2>SpellBar</h2>

      {spells.map((spell) => {
        return (
          <div key={spell.item_name}>
            <img
              src={`media/spells/${spell.item_name}.webp`}
              onClick={() => selectSpell(spell.item_name)}
            ></img>
            <p>
              {spell.item_name.split("_").join(" ") +
                " : " +
                spell.manaCost +
                " points de mana"}
            </p>
          </div>
        );
      })}

      {
        {
          protection: <Protection />,
          aura_magique: <AuraMagique close={closePopUp} />,
          premiers_soins: <PremiersSoins />,
          apaisement_majeur: <ApaisementMajeur />,
          expansion_du_savoir: <ExpansionDuSavoir />,
          halo_salvateur: <HaloSalvateur />,
          purification: <Purification />,
          imposition_des_mains: <ImpositionDesMains />,
          soin_de_masse: <SoinDeMasse />,
          truquage_du_destin: <TruquageDuDestin />,
          vague_de_mana: <VagueDeMana />,
          reviviscence: <Reviviscence />,

          hidden: null,
          default: null,
        }[selectedSpell]
      }
    </div>
  );
};

export default SpellBar;
