import React from "react";

function StudentTeam(){

    console.log(props);
    const [team, setTeam] = useState(0);

    useEffect(() => {
        axios
            .post("http://localhost:5000/getStudentsTeam", { team: props.data[0].team })
            .then((res) => {
                setTeam(res.data);
            })
            .catch((err) => {
                console.log(err);

            });
    }, [props.data]);


    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Mon équipe</h1>
            </div>
        </>
    )
}

export default StudentTeam;