const StudentManager = () => {
    return (
        <div className="row p-0 m-0 w-100 h-100" >
            <div className="col-8 m-0 p-0 bg-info">
                <h1 className='text-center'>Liste</h1>
            </div>
            <div className="col m-0 p-0 h-100 bg-secondary">
                <h1 className="text-center">Actions</h1>
                <button className="btn btn-primary">Ajouter une équipe</button>
                <button className="btn btn-primary">Ajouter un élève</button>
                <button className="btn btn-primary">Retirer des HP  à l'élève sélectionné</button>
                <button className="btn btn-primary">Ajouter de l'XP à l'élève sélectionné</button>

            </div>
        </div>
    )
}

export default StudentManager;