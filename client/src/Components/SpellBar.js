import React, { useEffect, useState, useRef } from "react";
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
import "../Styles/studentProfile.css";

const SpellBar = (props) => {
  const [spells, setSpells] = useState([]); // liste des sorts
  const [selectedSpell, setSelectedSpell] = useState("hidden"); // sort sélectionné

  const isMountedRef = useRef(false);

  function closePopUp() {
    setSelectedSpell("hidden");
    props.refresh();
  }

  const selectSpell = (spell) => {
    setSelectedSpell(spell);
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
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
    }
  }, [props.data]);

  return (
    <div className="w-auto h-auto d-flex flex-column">
      <h3>Sorts :</h3>

      <div className="d-flex flex-row mt-2 mx-5">
        {spells.map((spell) => {
          return (
            <div key={spell.item_name}>
              <img
                src={`media/spells/${spell.item_name}.webp`}
                onClick={() => selectSpell(spell.item_name)}
                className="rounded mx-3"
                style={{ width: "71px", height: "71px" }}
              ></img>
            </div>
          );
        })}
      </div>

      {
        {
          protection: <Protection data={props.data} close={closePopUp} />,
          aura_magique: <AuraMagique data={props.data} close={closePopUp} />,
          premiers_soins: (
            <PremiersSoins data={props.data} close={closePopUp} />
          ),
          apaisement_majeur: (
            <ApaisementMajeur data={props.data} close={closePopUp} />
          ),
          expansion_du_savoir: (
            <ExpansionDuSavoir data={props.data} close={closePopUp} />
          ),
          halo_salvateur: (
            <HaloSalvateur data={props.data} close={closePopUp} />
          ),
          purification: <Purification data={props.data} close={closePopUp} />,
          imposition_des_mains: (
            <ImpositionDesMains data={props.data} close={closePopUp} />
          ),
          soin_de_masse: <SoinDeMasse data={props.data} close={closePopUp} />,
          truquage_du_destin: (
            <TruquageDuDestin data={props.data} close={closePopUp} />
          ),
          vague_de_mana: <VagueDeMana data={props.data} close={closePopUp} />,
          reviviscence: <Reviviscence data={props.data} close={closePopUp} />,

          hidden: null,
          default: null,
        }[selectedSpell]
      }
    </div>
  );
};

export default SpellBar;
