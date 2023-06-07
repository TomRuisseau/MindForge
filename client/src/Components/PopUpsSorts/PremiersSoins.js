function PremiersSoins(props) {
  const useSpell = () => {
    console.log("Premiers soins");
  };

  return (
    <div className="px-3 py-3 w-auto h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <h1>Premiers soins</h1>
      <div className="bg-secondary p-3 rounded">
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
