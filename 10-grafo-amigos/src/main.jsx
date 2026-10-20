import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// No se usa React.StrictMode porque react-d3-graph es una librería antigua
// y en modo estricto puede crear el grafo dos veces durante el desarrollo.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
