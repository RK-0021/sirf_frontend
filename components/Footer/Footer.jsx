import React from "react";
import "./Footer.css";
import aishe from "../../assets/images/aishe_logo_big.png";
//import naac from "../../assets/images/naac.png";
import emblem from "../../assets/images/Emblem_of_india.svg.png";
import jharkhand from "../../assets/images/Government_banner_of_Jharkhand 18.png";
import logo2 from "../../assets/images/logo_2 1.png";
import facebook from "../../assets/images/facebook 1.png";
import twitter from "../../assets/images/remove.jpg";

const HeaderFooter = () => {
  return (
    <>
      <div className="top-header">
        <img src={aishe} className="logo" alt="aishe" />
        <img src={emblem} className="logo" alt="emblem" />
        <img src={jharkhand} className="logo" alt="jharkhand" />
        <img src={logo2} className="logo" alt="logo" />
        <img src={facebook} className="logo" alt="facebook" />
        <h2 className="portal-text"></h2>
      </div>

      <footer className="footer">
        <div className="footer-container">

          <div className="footer-col">
            <p>Home</p>
            <p>Analytical Dashboard</p>
            <p>Ranking</p>
            <p>JSIRF</p>
            <p>Self-Improvement Tool</p>
            <p>Downloads</p>
            <p>FAQ</p>
          </div>

          {/* CENTER */}
          <div className="footer-col">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Copyright Policy</p>
            <p>Hyperlink Policy</p>
            <p>Disclaimer</p>
            <p>Accessibility Statement</p>
            <p>Feedback</p>
          </div>

          {/* RIGHT TEXT */}
          <div className="footer-col big-text">
            <p><strong>Visitors Count:</strong></p>
            <p><strong>Last Updated on:</strong> 2025</p>
            <p>
              Contents provided by the Department of Higher and Technical Education, Government of Jharkhand.
            </p>
            <p>Copyright 2025. All rights reserved.</p>
          </div>

          {/* RIGHT LOGO + SOCIAL */}
          <div className="footer-col right-side">
            <img src={jharkhand} className="footer-logo" alt="jharkhand-logo" />

            <div className="social">
              <a href="#">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default HeaderFooter;