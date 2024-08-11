import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import { AuthProvider } from "../contexts/Authcontext.jsx";
import App1 from "./App1.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <BrowserRouter>
  <PlayerContextProvider>
    <AuthProvider>
      <App1 />
    </AuthProvider>
    {/* <App /> */}
  </PlayerContextProvider>
  // </BrowserRouter>

  // </React.StrictMode>
);
