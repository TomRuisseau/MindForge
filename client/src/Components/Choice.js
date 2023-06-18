import "../Styles/mainChoice.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";
import React from "react";

function Choice(props) {
  const [activeTab, setActiveTab] = React.useState("Guerrier");
  const [isScrollNavbar, setIsScrollNavbar] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 10; // Définissez votre seuil de défilement

      if (scrollTop > scrollThreshold) {
        setIsScrollNavbar(true);
      } else {
        setIsScrollNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="body hug">
      <div className="containerAccueil centeredDiv">
        <h1 className="tailleTitre">
          MINDFORGE<span className="blinking-cursor">_</span>
        </h1>
        <h2 className="tailleSousTitre p-3 glass1">
          Pour te motiver à apprendre
        </h2>

        <div className="m-5 w-50 d-flex flex-row justify-content-between">
          <img style={{ height: "100px" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "100px" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "100px" }} src="media/logos/fleche_bas.png" />
        </div>
      </div>
      <div
        className={`containerAccueil ${isScrollNavbar ? "scrollNavbar" : ""}`}
      >
        <div className="glass1 px-5 pt-3 navbar mx-5 my-2">
          <h1> Se connecter : </h1>
          <div className="w-25 d-flex flex-row justify-content-between">
            <motion.h1
              whileHover={{
                color: "#f0d68d",
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => props.onChoice("TeacherLogger")}
            >
              enseignant
            </motion.h1>
            <h1> - </h1>
            <motion.h1
              whileHover={{
                color: "#f0d68d",
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => props.onChoice("StudentLogger")}
            >
              élève
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="containerAccueil centeredDiv2 glass1 m-5">
        <h1>Quel est le principe?</h1>
        <p className="just-color-white who-how-many-size">
          Vous avez le choix d'incarner un guerrier, un mage ou un soigneur lors
          de votre aventure et avec lui vous allez apprendre ! (modifier)
        </p>

        <div className="w-75 mt-5 ">
          <div class="tab">
            <button class="tablinks" onClick={() => setActiveTab("Guerrier")}>
              Guerrier
            </button>
            <button class="tablinks" onClick={() => setActiveTab("Soigneur")}>
              Soigneur
            </button>
            <button class="tablinks" onClick={() => setActiveTab("Mage")}>
              Mage
            </button>
          </div>

          <div
            id="Guerrier"
            class={`tabcontent ${activeTab === "Guerrier" ? "active h-75 d-flex flex-column justify-content-between" : ""}`}
          >
            <h3>Guerrier</h3>
            <p className="just-color-white">
              Il aide ses coéquipiers en les protégeant d'attaques dangereuses.
              Il est là pour contrer et abriter ceux dont la vie est la plus
              fragile.
            </p>
          </div>

          <div
            id="Soigneur"
            class={`tabcontent ${activeTab === "Soigneur" ? "active  h-75 d-flex flex-column justify-content-between" : ""}`}
          >
            <h3>Soigneur</h3>
            <p className="just-color-white">
              Avec ses sorts, il aide en offrant plus de vie à ses coéquipiers.
            </p>
          </div>

          <div
            id="Mage"
            class={`tabcontent ${activeTab === "Mage" ? "active  h-75 d-flex flex-column justify-content-between" : ""}`}
          >
            <h3>Mage</h3>
            <p className="just-color-white">
              Il aide son équipe grâce à ses sorts en les renforçant et les
              supportant.
            </p>
          </div>
        </div>
      </div>

      <div className="containerAccueil centeredDiv">
        <h1>Comment jouer?</h1>
        <p>Blah Blah Blah</p>
      </div>

      <div className="containerAccueil centeredDiv containerPrincipe">
        <h1>Qui sommes-nous?</h1>
        <p>
          {" "}
          Etudiants en 3ème année en école d'ingénieur, nous cherchons à aider
          professeurs et élèves dans leur vie scolaire.
        </p>
      </div>

      <div className="containerAccueil centeredDiv">
        <h1>Tentez d'apprendre?</h1>
        <div className="mainChoice">
          <h1>Vous êtes :</h1>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => props.onChoice("TeacherLogger")}
              type="button"
              className="btn btn-primary btn-lg"
            >
              Enseignant
            </button>
            <button
              onClick={() => props.onChoice("StudentLogger")}
              type="button"
              className="btn btn-primary btn-lg"
            >
              Elève
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p className="">2023</p>
      </footer>
    </div>
  );
}

export default Choice;
