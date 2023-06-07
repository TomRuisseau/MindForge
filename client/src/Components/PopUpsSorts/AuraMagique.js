import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function AuraMagique(props) {
  const useSpell = () => {
    console.log("AuraMagique");
    props.close();
  };

  

  return (
    <div className="px-3 py-3 w-auto h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Aura Magique</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="bg-secondary p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Sort qui rendra <span className="text-danger">2 de mana</span> à tous
          les autres membres de votre équipe.
        </p>
      </div>
      <h3>Coût en mana : 4</h3>
      <div>
        <button onClick={useSpell} className="btn btn-success btn-lg">
          Utiliser
        </button>
      </div>
    </div>
  );
}

export default AuraMagique;
