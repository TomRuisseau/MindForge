import axios from "axios";
import { useEffect, useState } from "react";

function PopUpXP(props) {
  //state
  const [XP, setXP] = useState(0);
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [mages, setMages] = useState([]);
  const [mage, setMage] = useState("0");


  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudent", { id: props.id })
      .then((res) => {
        setFirst_name(res.data[0].first_name);
        setSurname(res.data[0].surname);
        axios
          .post("http://localhost:5000/getMages", {
            id: props.id,
            team: res.data[0].team,
          })
          .then((res) => {
            setMages(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  //comportement
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (mage === "0") {

      axios
        .post("http://localhost:5000/giveXP", {
          id: props.id,
          xp: XP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      axios
        .post("http://localhost:5000/useTruquageDuDestin", {
          id: props.id,
          team: getTeam(mage),
          xp: XP,
        })
        .then((res) => {
          props.close();
          props.addCounter(1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getTeam = (mage) => {
    for (let i = 0; i < mages.length; i++) {
      if (mages[i].id === mage) {
        return mages[i].team;
      }
    }
  };


  //affichage (render)
  return (
    <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="p-5 border border-muted rounded w-auto h-auto bg-primary d-flex flex-column align-items-center">
        <div className="d-flex flex-row">
          <h2 className="px-3">
            Ajouter de l'XP à {first_name} {surname}
          </h2>
          <button className="btn-close h-auto" onClick={props.close}></button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <label htmlFor="number" className="mt-3">
            Donner le nombre d'XP à ajouter :
          </label>
          <input
            value={XP}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setXP(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e" || e.key === "E") {
                e.preventDefault();
              }
            }}
            type="number"
            className="form-control"
            placeholder="0"
            id="xp"
            name="xp"
            required
          />

          <label htmlFor="mage" className="mt-3 text-white">
            L'élève souhaite-t-il qu'un des mages de son équipe utilise
            "truquage du destin" pour 5 points de mana afin de faire gagner cet XP à toute l'équipe ?
          </label>
          <select
            name="mage"
            id="mage-select"
            className="rounded"
            value={mage}
            onChange={(e) => setMage(e.target.value)}
          >
            <option value="0">Personne</option>
            {mages.map((_mage) => (
              <option value={_mage.id} key={_mage.id}>
                {_mage.first_name}
              </option>
            ))}
          </select>


          <button type="submit" className="btn btn-success mt-3">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpXP;
