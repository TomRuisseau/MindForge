import React, { useState, useRef } from 'react';
import TeacherDrawer from './TeacherDrawer';
import TeacherMenu from './TeacherMenu';
import StudentManager from './StudentManager';
import SmallList from './SmallList';

function TeacherDashboard(props) {
    const [page, setPage] = useState("TeacherMenu"); // TeacherMenu, StudentManager, quests, quiz, dailyEvent, tutorial, settings
    const childRef = useRef();

    console.log(props.id);

    const switchPage = (page) => {
        setPage(page);
        console.log(page);
    }
    return (
        <div className='Dashboard w-100 h-100 m-0'>
            <TeacherDrawer ref={childRef} onChoice={switchPage} />
            <div className="row m-0 w-100 h-100" >
                <div className="col-10 p-0">
                    <button onClick={() => childRef.current.toggleDrawerOutside()} className="btn btn-primary position-absolute">Omg le tiroir</button>
                    {page === "TeacherMenu" ? <TeacherMenu /> : page === "StudentManager" ? <StudentManager /> : <h1>Page not found</h1>}
                </div>
                {page === "StudentManager" ? null : <SmallList /> /*faut fix ça*/}
            </div>
        </div>
    )
}

export default TeacherDashboard;