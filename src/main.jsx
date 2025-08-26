import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SOSProvider } from "./context/SOSContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SOSProvider>
      <App />
    </SOSProvider>
  </React.StrictMode>
);
