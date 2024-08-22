import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CityProvider } from "./contexts/CityContext";
import TomorrowPage from "./pages/TomorrowPage";
import Home from "./pages/Home";
function App() {
  return (
    <CityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tomorrow" element={<TomorrowPage />} />
        </Routes>
      </Router>
    </CityProvider>
  );
}

export default App;
