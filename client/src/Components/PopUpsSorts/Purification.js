import axios from "axios";

function Purification(props) {
  const useSpell = () => {
    if (props.data[0].mana >= 3) {
      axios
        .post("http://localhost:5000/usePurification", {
          //changer le nom de la route
          id: props.data[0].id,
        })
        .then(() => {
          props.close();
          props.data[0].mana -= 3;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Vous n'avez pas assez de mana pour utiliser ce sort !");
    }
  };

  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Purification</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Tu te soignes de <span className="text-danger">2 HP</span>.
        </p>
      </div>
      <h3>Coût en mana : 3</h3>
      <div>
        <button onClick={useSpell} className="btn btn-success btn-lg">
          Utiliser
        </button>
      </div>
    </div>
  );
}

export default Purification;
