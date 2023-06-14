import Choice from "./Components/Choice";
import TeacherLogger from "./Components/TeacherLogger";
import StrudentLogger from "./Components/StudentLogger";
import React, { useState } from "react";
import StudentDashboard from "./Components/StudentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard";
import "./Styles/BoutonPrincipal.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Choice"); // ['Choice', 'TeacherLogger', 'StudentLogger', 'StudentDashboard', 'TeacherDashboard']
  const [logId, setLogId] = useState("");

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  const passId = (id) => {
    setLogId(id);
  };

  return (
    <div className="App w-100 h-100 text-black">
      {currentPage === "Choice" ? (
        <Choice onChoice={switchPage} />
      ) : currentPage === "TeacherLogger" ? (
        <TeacherLogger onValidation={switchPage} onPass={passId} />
      ) : currentPage === "StudentLogger" ? (
        <StrudentLogger onValidation={switchPage} onPass={passId} />
      ) : currentPage === "StudentDashboard" ? (
        <StudentDashboard data={logId} />
      ) : (
        <TeacherDashboard id={logId} />
      )}
    </div>
  );
}

export default App;
