import React from 'react';
import StudentDrawer from './StudentDrawer';

function StudentDashboard() {
    return (
        <div>
            <StudentDrawer />
            <h1 className="text-center">Student Dashboard</h1>
            <div className="row m-0">
                <div className="col-2">
                </div>
                <div className="col-3  m-0 h-500 bg-success">
                    <h2>Ton nom:</h2>
                    <h2>Ta classe: </h2>
                </div>
                <div className="col m-0 h-500 bg-danger">
                    <h2>Ton personnage:</h2>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;