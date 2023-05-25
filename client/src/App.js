import Choice from './Components/Choice';
import TeacherLogger from './Components/TeacherLogger';
import StrudentLogger from './Components/StudentLogger';
import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Choice'); // ['Choice', 'TeacherLogger', 'StudentLogger']

  const switchPage = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className="App">
      {
        currentPage === "Choice" ? <Choice onChoice={switchPage} /> : currentPage === "TeacherLogger" ? <TeacherLogger /> : <StrudentLogger />
      }
    </div>
  );
}

export default App;