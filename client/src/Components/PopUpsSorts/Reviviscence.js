function Reviviscence(props) {
  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Reviviscence</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Permet à un membre qui n'a plus de vie de revenir à{" "}
          <span className="text-danger">1 HP</span> sans subir le malus
          aléatoire.
        </p>
        <p style={{ fontSize: "22px" }}>
          (Est activé par le professeur lors de la mort de ton équipier){" "}
        </p>
      </div>
      <h3>Coût en mana : 6</h3>
    </div>
  );
}

export default Reviviscence;
