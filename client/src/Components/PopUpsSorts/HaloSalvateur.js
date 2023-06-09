import axios from "axios";

function HaloSalvateur(props) {
  const useSpell = () => {
    axios
      .post("http://localhost:5000/useHaloSalvateur", {
        id: props.data[0].id,
      })
      .then((res) => {

      })
      .catch((err) => {
        console.log(err);
      });
    props.close();
  };

  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Halo Salvateur</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Annule la prochaine source de dégat que tu recois.
        </p>
      </div>
      <h3>Coût en mana : 6</h3>
      <div>
        <button onClick={useSpell} className="btn btn-success btn-lg">
          Utiliser
        </button>
      </div>
    </div>
  );
}

export default HaloSalvateur;
