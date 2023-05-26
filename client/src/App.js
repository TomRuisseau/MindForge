import Choice from './Components/Choice';
import TeacherLogger from './Components/TeacherLogger';
import StrudentLogger from './Components/StudentLogger';
import React, { useState } from 'react';
import StudentDashboard from './Components/StudentDashboard';
import TeacherDashboard from './Components/TeacherDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('Choice'); // ['Choice', 'TeacherLogger', 'StudentLogger', 'StudentDashboard', 'TeacherDashboard']

  const switchPage = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className="App">
      {
        currentPage === "Choice" ? <Choice onChoice={switchPage} /> :
          currentPage === "TeacherLogger" ? <TeacherLogger onValidation={switchPage} /> :
            currentPage === "StudentLogger" ? <StrudentLogger onValidation={switchPage} /> :
              currentPage === "StudentDashboard" ? <StudentDashboard /> :
                <TeacherDashboard />

      }
    </div>
  );
}

export default App;