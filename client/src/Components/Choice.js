import "../Styles/mainChoice.css";
import "../Styles/Glass.css";
import "../Styles/Textes.css";
import "../Styles/Buttons.css";
import { motion } from "framer-motion";
import React from "react";

function Choice(props) {
  const [activeTab, setActiveTab] = React.useState("Protecteur");
  const [isScrollNavbar, setIsScrollNavbar] = React.useState(false);
  const [selector, setSelector] = React.useState(0);

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
        <h2 className="tailleSousTitre p-3 glass1">Pour motiver à apprendre</h2>

        <div className="m-5 w-50 d-flex flex-row justify-content-between">
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
        </div>
      </div>
      <div
        className={`containerAccueil ${isScrollNavbar ? "scrollNavbar" : ""}`} //display navbar after scrolling down
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

      <div className="containerAccueil glass1 m-5" style={{ height: "80vh" }}>
        <div className="h-75 p-3 d-flex flex-column justify-content-between">
          <h1 className="pt-3">Le principe</h1>
          <p className="just-color-white who-how-many-size p-justify mx-5 px-5">
            Dans cette plateforme ludique et éducative, vous pouvez incarner le
            personnage de vos rêves ! Choisissez parmi les 3 rôles aux
            compétences et aux objectifs divers, et alliez vous avec vos amis
            pour triompher de l'ignorance et de l'obscurantisme.
          </p>
          <div className="w-100 class-size mx-5 ">
            <div class="tab">
              <motion.button
                style={
                  selector === 0
                    ? {
                      backgroundColor: "#f5cb5c",
                      color: "#232826",
                      transition: "all .5s ease",
                    }
                    : {
                      backgroundColor: "#232826",
                      color: "#f5cb5c",
                      transition: "all .5s ease",
                    }
                }
                onMouseEnter={() => {
                  setSelector(0);
                  setActiveTab("Protecteur");
                }}
                class="tablinks"
              >
                Protecteur
              </motion.button>
              <motion.button
                style={
                  selector === 1
                    ? {
                      backgroundColor: "#f5cb5c",
                      color: "#232826",
                      transition: "all .5s ease",
                    }
                    : {
                      backgroundColor: "#232826",
                      color: "#f5cb5c",
                      transition: "all .5s ease",
                    }
                }
                onMouseEnter={() => {
                  setSelector(1);
                  setActiveTab("Soigneur");
                }}
                class="tablinks"
              >
                Soigneur
              </motion.button>
              <motion.button
                style={
                  selector === 2
                    ? {
                      backgroundColor: "#f5cb5c",
                      color: "#232826",
                      transition: "all .5s ease",
                    }
                    : {
                      backgroundColor: "#232826",
                      color: "#f5cb5c",
                      transition: "all .5s ease",
                    }
                }
                onMouseEnter={() => {
                  setSelector(2);
                  setActiveTab("Mage");
                }}
                //keep change on the button after click
                class="tablinks"
              >
                Mage
              </motion.button>
            </div>
            <div
              id="Protecteur"
              class={`tabcontent ${activeTab === "Protecteur"
                ? "active d-flex flex-row align-items-center"
                : ""
                }`}
            >
              <div
                className="mx-4 w-100 d-flex flex-column justify-content-between"
                style={{ height: "100%" }}
              >
                <h3 className="mb-3">Protecteur</h3>
                <p className="just-color-white p-justify">
                  Bouclier de l'équipe, le protecteur n'hésitera pas à prendre
                  les coups à la place de ses coéquipiers. Son grand nombre de
                  points de vie lui permet de se tenir en première ligne et de
                  conjuguer ses sorts pour réduire les dégâts subits par toutes
                  son équipe. Sa faible réserve de mana le force en revanche à
                  être parcimonieux et se faire aider par ses alliés mages. Un
                  rôle destiné aux joueurs valeureux souhaitant protéger les
                  personnes plus fragiles.
                </p>
              </div>
              <img
                src="media/skin/tank.png"
                style={{ height: "50%", right: "0", bottom: "0" }}
                className="position-absolute"
              />
            </div>
            <div
              id="Soigneur"
              class={`tabcontent ${activeTab === "Soigneur"
                ? "active  h-75 d-flex flex-row align-items-center"
                : ""
                }`}
            >
              <div className="mx-4 h-100 w-100 d-flex flex-column justify-content-between">
                <h3 className="mb-3">Soigneur</h3>
                <p className="just-color-white p-justify">
                  Gardien de l'équipe, le soigneur est dédié à la guérison et à
                  la protection de ses coéquipiers. Il est prêt à sacrifier ses
                  propres ressources et capacités pour maintenir ses alliés en
                  bonne santé. Doté d'un large éventail de sorts de guérison et
                  de récupération, le soigneur est capable de restaurer les
                  points de vie perdus et de dissiper les altérations négatives
                  sur son équipe. Il doit néanmoins faire preuve de prudence,
                  car il possède très peu de points de vie. Le rôle de soigneur
                  convient aux joueurs bienveillants qui souhaitent prendre soin
                  et soutenir les membres plus vulnérables de leur équipe.
                </p>
              </div>
              <img
                src="media/skin/healer.png"
                style={{ height: "50%", right: "0", bottom: "0" }}
                className="position-absolute"
              />
            </div>
            <div
              id="Mage"
              class={`tabcontent ${activeTab === "Mage"
                ? "active  h-75 d-flex flex-row align-items-center"
                : ""
                }`}
            >
              <div className="mx-4 h-100 w-100 d-flex flex-column justify-content-between">
                <h3 className="mb-3">Mage</h3>
                <p className="just-color-white p-justify">
                  Maître des arcanes, le mage soutient son équipe grâce à sa
                  panoplie de sorts puissants. Sa grande réserve de mana lui
                  permet d'en distribuer à ses alliés pour qu'ils puissent
                  utiliser leurs sorts plus régulièrement. Ses capacités à
                  altérer l'espace et le temps lui donnent l'occasion
                  d'accélérer le développement et le gain d'expérience des
                  personnages. Rôle préférentiel pour les joueurs à l'esprit
                  disrupteur et à la recherche de puissance.
                </p>
              </div>
              <img
                src="media/skin/mage.png"
                style={{ height: "50%", right: "0", bottom: "0" }}
                className="position-absolute"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="containerAccueil centeredDiv">
        <h1>Le but</h1>
        <p
          className="w-100 px-5 p-justify"
          style={{ fontSize: "2.5vh", lineHeight: "2" }}
        >
          Dans MindForge, vous êtes regroupés par équipe de 4 élèves. Vous devez
          vous serrer les coudes et faire preuve de stratégie pour progresser
          durant l'année. <br></br> <br></br>Se comporter correctement, réaliser
          les quêtes et les devoirs, remporter les quizs... tout ceci vous
          permettra de faire progresser votre personnage en gagnant des points
          d'expérience. En revanche, un comportement inadapté pendant le cours
          forcera votre professeur à vous retirer des points de vie. Une fois à
          0, vous encourrez un malus aléatoire. Attention, ce dernier peut aussi
          mettre toute votre équipe dans la panade. <br></br> <br></br>Utilisez
          vos points d'expérience pour débloquer de puissants sorts vous
          permettant de soutenir votre équipe et de progresser encore plus
          rapidement ! Vous pouvez aussi utiliser cette expérience pour vous
          offrir de magnifiques tenues afin d'avoir le plus beau personnage de
          toute la classe.
        </p>
      </div>

      <div className="containerAccueil centeredDiv2 glass1 m-5">
        <h1>Qui sommes-nous ?</h1>
        <p
          className="w-100 just-color-white px-5 p-justify"
          style={{ fontSize: "2.5vh", lineHeight: "2" }}
        >
          Marie, Clara, Xavier, Armand et Tom : étudiants en 3ème année à Junia
          ISEN.
          <br></br> <br></br> Plus jeunes, le système éducatif nous semblait
          daté et peu adapté à nos besoins et envies, il était donc difficile de
          s'investir autant dans l'apprentissage que dans nos passions.
          Passionnés de jeux de rôle, d'héroïque fantasy et de pop culture, nous
          souhaitons mettre ces univers passionnants au service de l'éducation.
          Notre objectif est de rendre l'apprentissage ludique, agréable et
          motivant. Pour ce faire, nous avons créé MindForge, un outil
          divertissant et interactif qui s'intègre parfaitement au déroulement
          d'une journée. <br></br> <br></br> Alors, tu es prêt à tenter
          l'aventure avec nous ?
        </p>
      </div>

      <div className="containerAccueil centeredDiv2 m-5">
        <h1>C'est parti !</h1>
        <div className=" w-50 d-flex flex-row justify-content-between">
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
          <img style={{ height: "10vh" }} src="media/logos/fleche_bas.png" />
        </div>
        <div className="mainChoice">
          <h1>Vous êtes :</h1>
          <div className="w-100 d-flex flex-row justify-content-between">
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => props.onChoice("TeacherLogger")}
              className="btn-choice m-5"
            >
              Enseignant
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => props.onChoice("StudentLogger")}
              className="btn-choice m-5"
            >
              Elève
            </motion.button>
          </div>
        </div>
      </div>

      <footer className="footer pt-4">
        <p className="">
          Taume Xavled Marie Nobody Armand - Junia ISEN - Projet 2023
        </p>
      </footer>
    </div>
  );
}

export default Choice;
