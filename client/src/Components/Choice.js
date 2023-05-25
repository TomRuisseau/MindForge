function Choice(props) {
    return (
        <>
            <h1>Vous êtes :</h1>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button onClick={() => props.onChoice('TeacherLogger')} type="button" class="btn btn-primary btn-lg">Un enseignant</button>
                <button onClick={() => props.onChoice('StudentLogger')} type="button" class="btn btn-primary btn-lg">Un élève</button>
            </div>
        </>
    )
}

export default Choice;