import React from 'react';
import StudentDrawer from './StudentDrawer';
import StudentMenu from './StudentMenu';
import StudentManager from './StudentManager';
import SmallList from './SmallList';
import Quests from './Quests';
import { useState, useRef } from 'react';
import StudentProfile from './StudentProfile';
import StudentTeam from './StudentTeam';
import Shop from './Shop';
import Tutorial from './Tutorial';

function StudentDashboard() {
    const [page, setPage] = useState("StudentMenu"); // StudentMenu, quests, quiz, dailyEvent, tutorial, settings
    const childRef = useRef();

    const switchPage = (page) => {
        setPage(page);
        console.log(page);
    }
    return (
        <div>
            <h1 className="text-center">Student Dashboard</h1>
            <StudentDrawer ref={childRef} onChoice={switchPage}/>
            <div className="row w-100 h-100" >
                <div className="pages col p-0">
                    <button onClick={() => childRef.current.toggleDrawerOutside()} className="btn btn-primary position-absolute start-0">Menu</button>
                    {page === "StudentProfile" ? <StudentProfile /> : page === "StudentTeam" ? <StudentTeam/> : page === "Shop" ? <Shop/> : page === "Tutorial" ? <Tutorial/> : <StudentMenu/>}
                </div>
            </div>

            
        </div>
       
    )
}

export default StudentDashboard;