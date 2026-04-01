import React from 'react';
import stud from "../../assets/images/stud.svg";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      
      <img 
        src={stud} 
        alt="Hero" 
        className="hero-image"
      />

    </div>
  );
};

export default Hero;