import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DisplayHome from "./Components/DisplayHome";
import DisplayAlbum from "./Components/DisplayAlbum";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import App from "./App.jsx";

const App1 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/*" element={<App />} />
        {/* <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} /> */}
      </Routes>
    </Router>
  );
};

export default App1;
