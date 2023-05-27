import Choice from './Components/Choice';
import TeacherLogger from './Components/TeacherLogger';
import StrudentLogger from './Components/StudentLogger';
import React, { useState } from 'react';
import StudentDashboard from './Components/StudentDashboard';
import TeacherDashboard from './Components/TeacherDashboard';
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState('Choice'); // ['Choice', 'TeacherLogger', 'StudentLogger', 'StudentDashboard', 'TeacherDashboard']

  const switchPage = (page) => {
    setCurrentPage(page);
  }

  const onTest = () => {
    axios.post('http://localhost:5000/api', { message: "Hello from client" })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <button onClick={() => onTest()}>Test server</button>
      <div className="App">
        {
          currentPage === "Choice" ? <Choice onChoice={switchPage} /> :
            currentPage === "TeacherLogger" ? <TeacherLogger onValidation={switchPage} /> :
              currentPage === "StudentLogger" ? <StrudentLogger onValidation={switchPage} /> :
                currentPage === "StudentDashboard" ? <StudentDashboard /> :
                  <TeacherDashboard />

        }
      </div>
    </>
  );
}

export default App;