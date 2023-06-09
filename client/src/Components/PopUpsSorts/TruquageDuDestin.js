function TruquageDuDestin(props) {
  return (
    <div className="px-3 py-3 w-50 h-50 bg-light position-absolute top-50 start-50 translate-middle text-center border rounded border-success d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="px-5">Truquage du destin</h1>
        <button className="btn-close h-auto" onClick={props.close}></button>
      </div>
      <div className="p-3 rounded">
        <p style={{ fontSize: "22px" }}>
          Permet de généraliser un gain d'XP individuel à toute l'équipe.
        </p>
        <p style={{ fontSize: "22px" }}>
          (Est activé par le professeur pendant l'attribution d'une récompense)
        </p>
      </div>
      <h3>Coût en mana : 5</h3>
    </div>
  );
}

export default TruquageDuDestin;
