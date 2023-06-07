function PremiersSoins(props) {
  const useSpell = () => {
    console.log("Premiers soins");
  };

  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Premiers soins</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Rend <span className="text-danger">3 HP</span> à un teammate ou lui
          même.
        </p>
      </div>
      <h3>Coût en mana : 2</h3>
      <div>
        <button onClick={useSpell} className="btn btn-success btn-lg">
          Utiliser
        </button>
      </div>
    </div>
  );
}

export default PremiersSoins;
