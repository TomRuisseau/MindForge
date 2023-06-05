import React, {useState,useEffect} from "react";
import axios from "axios";

function StudentClass(props){

    const [classroom, setClassroom] = useState([]);







    return(
        <>
            <div className='row'>
                <div className='col-2'></div>
                <h1 className='col'>Ma classe</h1>
                <div className='row'>
                    <div className='col-2'></div>
                    {classroom.map((student) => {
                        return (
                            
                                
                                <div className='col-2'>
                                    
                                    <p>{student.first_name}</p>
                                </div>
                        
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
    
}