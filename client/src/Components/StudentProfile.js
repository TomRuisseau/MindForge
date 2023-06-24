import React, { useState, useEffect, useRef } from "react";
import SpellBar from "./SpellBar";
import axios from "axios";
import "../Styles/studentProfile.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentProfile(props) {
  console.log(props.data);
  const [hpRatio, setHpRatio] = useState(0);
  const [skin, setSkin] = useState("toutNu");
  const [counter, setCounter] = useState(0); // pour forcer le rechargement de la page

  const [updated, setUpdated] = useState(false); // pour forcer le rechargement de la page aussi

  const isMountedRef = useRef(false);

  const [selectedSpell, setSelectedSpell] = useState("hidden"); // sort sélectionné

  const openPopUp = (spell) => {
    setSelectedSpell(spell);
  };

  const addCounter = () => {
    isMountedRef.current = false;
    setCounter(counter + 1);
  };

  function closePopUp() {
    setSelectedSpell("hidden");
    addCounter();
  }

  const manaAlert = () => {
    toast.warning("Pas assez de mana pour utiliser ce sort", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      axios
        .post("http://localhost:5000/getSkin", { id: props.data[0].id })
        .then((res) => {
          setSkin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/getStudent", { id: props.data[0].id })
        .then((res) => {
          console.log(res.data);
          props.data[0] = res.data[0];
          setUpdated(!updated);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:5000/getHp", { id: props.data[0].id })
        .then((res) => {
          setHpRatio(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.data, counter, updated]);

  return (
    <div className="hug just-color-white" style={{ height: "100vh" }}>
      <div className="h-100 p-5 w-100 d-flex flex-row justify-content-between align-items-center">
        <div
          className="h-75 box-size-2 glass1 p-4 d-flex flex-column justify-content-between"
          style={{ width: "40%" }}
        >
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "70%" }}
          >
            <div className="h-25 d-flex flex-column justify-content-between">
              <h1 className="just-color-yellow mb-5">
                {props.data[0].first_name + " " + props.data[0].surname}
              </h1>
              <h3 className="mx-5">{props.data[0].team}</h3>
            </div>
            <div className="mx-5 px-5 h-50 d-flex flex-column justify-content-between">
              <div className="w-100 d-flex flex-row align-items-center ">
                <div className="h-25 w-25 d-flex align-items-center">
                  <img
                    src={"media/logos/coeur_clair.png"}
                    style={{ width: "50px", height: "auto" }}
                  />
                </div>
                <progress
                  className="progress-bar my-4 mx-3"
                  role="progressbar"
                  id="file"
                  max="100"
                  value={hpRatio}
                ></progress>
                <h2 className="mx-4 just-color-red mt-2 mb-0">
                  {"(" + props.data[0].hp + ")"}
                </h2>
              </div>
              <div className="h-25 w-25 d-flex align-items-center">
                <img
                  src={"media/logos/mana.png"}
                  style={{ width: "50px", height: "auto" }}
                />
                <h2 className="mx-4 just-color-blue mt-2 mb-0">
                  {props.data[0].mana}
                </h2>
              </div>
              <div className="h-25 w-25 d-flex align-items-center">
                <img
                  src={"media/logos/etoile.png"}
                  style={{ width: "50px", height: "auto" }}
                />
                <h2 className="mx-4 text-warning mt-2 mb-0">
                  {props.data[0].xp}
                </h2>
              </div>
            </div>
          </div>

          <div className="text-center my-5">
            {parseInt(props.data[0].protected) &&
              parseInt(props.data[0].minded) ? (
              <div>
                <h3>* Tu es protégé par un Halo *</h3>
                <h3>* Ton prochain gain d'XP sera doublé *</h3>
              </div>
            ) : parseInt(props.data[0].protected) ? (
              <h3>* Tu es protégé par un Halo *</h3>
            ) : parseInt(props.data[0].minded) ? (
              <h3>* Ton prochain gain d'XP sera doublé *</h3>
            ) : (
              <h3>* Aucun sort appliqué sur toi *</h3>
            )}
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "90%", width: "40%", marginRight: "10%" }}
        >
          <img src={`media/skin/${skin}.png`}></img>
        </div>
        <div
          className="glass1 just-color-yellow w-auto p-3 text-center"
          style={{ height: "70%" }}
        >
          <SpellBar
            data={props.data}
            refresh={addCounter}
            openPopUp={openPopUp}
            className="p-2"
          />
        </div>
      </div>
      {
        {
          protection: <Protection data={props.data} close={closePopUp} manaAlert={manaAlert} />,
          aura_magique: <AuraMagique data={props.data} close={closePopUp} manaAlert={manaAlert} />,
          premiers_soins: (
            <PremiersSoins data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          apaisement_majeur: (
            <ApaisementMajeur data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          expansion_du_savoir: (
            <ExpansionDuSavoir data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          halo_salvateur: (
            <HaloSalvateur data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          purification: <Purification data={props.data} close={closePopUp} manaAlert={manaAlert} />,
          imposition_des_mains: (
            <ImpositionDesMains data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          soin_de_masse: <SoinDeMasse data={props.data} close={closePopUp} manaAlert={manaAlert} />,
          truquage_du_destin: (
            <TruquageDuDestin data={props.data} close={closePopUp} manaAlert={manaAlert} />
          ),
          vague_de_mana: <VagueDeMana data={props.data} close={closePopUp} manaAlert={manaAlert} />,
          reviviscence: <Reviviscence data={props.data} close={closePopUp} manaAlert={manaAlert} />,

          hidden: null,
          default: null,
        }[selectedSpell]
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default StudentProfile;
