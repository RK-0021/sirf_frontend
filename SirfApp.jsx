import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import About from "./components/about/About";
import Home from "./Pages/Home/Home";
import LatestUpdates from "./Pages/Home/LatestUpdates";
import Footer from "./components/Footer/Footer";
//import "./SirfApp.css";

function SirfApp() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<LatestUpdates />} />
      </Routes>
      <Footer />                        
    </Router>
  );
}

export default SirfApp;