import React, { useState, useRef } from 'react';
import TeacherDrawer from './TeacherDrawer';
import TeacherMenu from './TeacherMenu';
import StudentManager from './StudentManager';

function TeacherDashboard(props) {
    const [page, setPage] = useState("TeacherMenu"); // TeacherMenu, StudentManager, quests, quiz, dailyEvent, tutorial, settings
    const childRef = useRef();

    console.log(props.id);

    const switchPage = (page) => {
        setPage(page);
    }
    return (
        <div className='Dashboard w-100 h-100 m-0'>
            <TeacherDrawer ref={childRef} onChoice={switchPage} />
            <div className="w-100 h-100">
                <div className="row m-0 w-100 h-100  bg-danger" >
                    <div className="col-10 p-0 bg-success">
                        <button onClick={() => childRef.current.toggleDrawerOutside()} className="btn btn-primary">Omg le tiroir</button>
                        {page === "TeacherMenu" ? <TeacherMenu /> : page === "StudentManager" ? <StudentManager /> : <h1>Page not found</h1>}
                    </div>
                    <div className="col p-0  h-100">
                        <h1 className='text-center'>Liste</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboard;