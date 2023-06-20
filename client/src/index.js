import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./Styles/Glass.css";
import "./Styles/Textes.css";

function ErrorApp() {
  return (
    <div className="w-100 h-100 classic-glass-moins-flou d-flex flex-row justify-content-center align-items-center">
      <div className="glass1 hug just-color-white h-75 w-75 d-flex flex-column justify-content-center">
        <p
          style={{ fontSize: "200%", lineHeight: "1.5" }}
          className="text-center m-5"
        >
          Utilisez un ordinateur et mettez vous en fenêtre 100%
        </p>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.innerWidth < 1800) {
  console.log("caca");
  root.render(<ErrorApp />);
} else root.render(<App />);
