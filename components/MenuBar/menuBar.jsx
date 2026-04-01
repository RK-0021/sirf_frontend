import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./menuBar.css";
import Cookies from "js-cookie";
//import { analytical, jsirf, dataent } from "../../constants/pageroutes";

const Menubar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const usertype = Cookies.get("userType");

  useEffect(() => {
    const currentPath = window.location.pathname;
    
    if (currentPath === "/") {
      setSelectedSection("home");
    } else if (analytical.includes(currentPath)) {
      setSelectedSection("analytical");
    } else if (jsirf.includes(currentPath)) {
      setSelectedSection("jsirf");
    } else if (dataent.includes(currentPath)) {
      setSelectedSection("mock");
    } else if (currentPath === "/downloads") {
      setSelectedSection("downloads");
    } else if (currentPath === "/faq") {
      setSelectedSection("faq");
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light nav_main"
      style={{ backgroundColor: "#b2b4c3" }}
    >
      <div className="container container">
        <ul className="nav nav-pills nav-fill">
          {/* home section */}
          <li
            className={`nav-item  ${
              selectedSection === "home" ? "back" : ""
            }`}
          >
            <a
              className="nav-link text-white home"
              href="/"
              onClick={() => handleSectionClick("home")}
            >
              Home
            </a>
          </li>

          {/* Analytical section */}
          <li
            className={`nav-item dropdown  ${
              selectedSection === "analytical" ? "back" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle text-white"
              href="/"
              id="dashboard"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => handleSectionClick("analytical")}
            >
              Analytical Dashboard
            </a>
            <ul
              className="dropdown-menu drop_menu dm1"
              aria-labelledby="dashboardDropdown"
            >
              {/* Upload DCF section */}
              <li>
                <a className="dropdown-item item" href="/upload">
                  Upload DCF
                </a>
              </li>
              <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                <a
                  class="dropdown-item dropdown-toggle item"
                  href="/"
                  id="multilevelDropdownMenu1"
                  data-bs-toggle="collapse"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                    e.stopPropagation();
                  }}
                >
                  Visualisation
                </a>
              </div>

              <div
                className="div_cont1"
                style={{ display: isDropdownOpen ? "block" : "none" }}
              >
                <li>
                  <a class="dropdown-item item1" href="/heatmap">
                    Heat Map
                  </a>
                </li>
                <li>
                  <a class="dropdown-item item1" href="/charts">
                    Bar Graph & <br /> Pie Chart
                  </a>
                </li>
              </div>
            </ul>
          </li>

          {/* Ranking section */}
          <li
            className={`nav-item dropdown  ${
              selectedSection === "ranking" ? "back" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle text-white"
              href="/"
              id="ranking"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => handleSectionClick("ranking")}
            >
              Ranking
            </a>
            <ul
              className="dropdown-menu drop_menu dm2"
              aria-labelledby="rankingDropdown"
            >
              <li>
                <a className="dropdown-item item" href="/">
                  University
                </a>
              </li>
              <li>
                <a className="dropdown-item item" href="/">
                  College
                </a>
              </li>
            </ul>
          </li>

          {/* JSIRF section */}
          <li
            className={`nav-item dropdown  ${
              selectedSection === "jsirf" ? "back" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle text-white"
              href="/"
              id="jsirf"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => handleSectionClick("jsirf")}
            >
              JSIRF
            </a>
            <ul
              className="dropdown-menu drop_menu dm4"
              aria-labelledby="jsirfDropdown"
            >
              {usertype !== "HEAD" &&
              usertype !== "UNIVERSITY" &&
              usertype !== "ADMIN" &&
              usertype !== "COLLEGE" &&
              usertype !== "STANDALONE_INSTITUTE" ? (
                <li>
                  <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                    <a
                      class="dropdown-item dropdown-toggle item"
                      href="/"
                      id="multilevelDropdownMenu1"
                      data-bs-toggle="collapse"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown();
                        e.stopPropagation();
                      }}
                    >
                      Dashboard
                    </a>
                  </div>
                  <div
                    className="div_cont"
                    style={{ display: isDropdownOpen ? "block" : "none" }}
                  >
                    <li>
                      <a class="dropdown-item item1" href="/jsirfheatmap">
                        Overview
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item item1" href="/barchartnew">
                        Comparative
                      </a>
                    </li>
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <a className="dropdown-item item" href="/jsirfDataEntry">
                      Data Entry
                    </a>
                  </li>
                  {(usertype === "ADMIN" || usertype === "HEAD") && (
                    <li>
                      <a
                        className="dropdown-item item"
                        href="/jsirfdatavalidation"
                      >
                        Data Validation
                      </a>
                    </li>
                  )}
                  <li>
                    {usertype === "ADMIN" || usertype === "HEAD" ? (
                      <a
                        className="dropdown-item item"
                        href="/indiscoredropdown"
                      >
                        Indicative Scoring
                      </a>
                    ) : (
                      <a className="dropdown-item item" href="/indiscoreuniv">
                        Indicative Scoring
                      </a>
                    )}
                  </li>
                  <li>
                    {usertype === "ADMIN" || usertype === "HEAD" ? (
                      <a
                        className="dropdown-item item"
                        href="/jsirfscoredropdown"
                      >
                        JSIRF Scoring
                      </a>
                    ) : (
                      <a className="dropdown-item item" href="/jsirfscoreuniv">
                        JSIRF Scoring
                      </a>
                    )}
                  </li>
                  <li>
                    {usertype === "COLLEGE" && (
                      <>
                        <div
                          className={`dropdown ${isDropdownOpen ? "show" : ""}`}
                        >
                          <a
                            class="dropdown-item dropdown-toggle item"
                            href="/"
                            id="multilevelDropdownMenu1"
                            data-bs-toggle="collapse"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown();
                              e.stopPropagation();
                            }}
                          >
                            Dashboard
                          </a>
                        </div>
                        <div
                          className="div_cont"
                          style={{ display: isDropdownOpen ? "block" : "none" }}
                        >
                          <li>
                            <a class="dropdown-item item2" href="/barchartnew">
                              Comparative-
                              <br />
                              Colleges
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item item23"
                              href="/RectangleChartCol"
                            >
                              Detailed
                              <br />
                              Comparative
                            </a>
                          </li>
                        </div>
                      </>
                    )}
                    {usertype === "UNIVERSITY" && (
                      <>
                        <div
                          className={`dropdown ${isDropdownOpen ? "show" : ""}`}
                        >
                          <a
                            class="dropdown-item dropdown-toggle item"
                            href="/"
                            id="multilevelDropdownMenu1"
                            data-bs-toggle="collapse"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown();
                              e.stopPropagation();
                            }}
                          >
                            Dashboard
                          </a>
                        </div>
                        <div
                          className="div_cont"
                          style={{ display: isDropdownOpen ? "block" : "none" }}
                        >
                          <li>
                            <a class="dropdown-item item2" href="/barandpienew">
                              Status
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item item2" href="/barchartnew">
                              Comparative
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item item2"
                              href="/RectangleChartUni"
                            >
                              Detailed
                              <br />
                              Comparative
                              <br />
                              University
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item item23"
                              href="/RectangleChartCol"
                            >
                              Detailed
                              <br />
                              Comparative
                              <br />
                              Colleges
                            </a>
                          </li>
                        </div>
                      </>
                    )}
                    {usertype === "HEAD" && (
                      <>
                        <div
                          className={`dropdown ${isDropdownOpen ? "show" : ""}`}
                        >
                          <a
                            class="dropdown-item dropdown-toggle item"
                            href="/"
                            id="multilevelDropdownMenu1"
                            data-bs-toggle="collapse"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown();
                              e.stopPropagation();
                            }}
                          >
                            Dashboard
                          </a>
                        </div>
                        <div
                          className="div_cont"
                          style={{ display: isDropdownOpen ? "block" : "none" }}
                        >
                          <li>
                            <a
                              class="dropdown-item item2"
                              href="/jsirfdashpublic"
                            >
                              Scorecard
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item item2" href="/barandpienew">
                              Status
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item item2" href="/jsirfheatmap">
                              Heatmap
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item item2" href="/barchartnew">
                              Comparative
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item item23"
                              href="/RectangleChart"
                            >
                              Detailed
                              <br />
                              Comparative
                            </a>
                          </li>
                        </div>
                      </>
                    )}
                  </li>
                  {usertype === "ADMIN" && (
                    <>
                      <li>
                        <a className="dropdown-item item" href="/studentsurvey">
                          Student Survey
                        </a>
                      </li>
                      <div
                        className={`dropdown ${isDropdownOpen ? "show" : ""}`}
                      >
                        <a
                          class="dropdown-item dropdown-toggle item"
                          href="/"
                          id="multilevelDropdownMenu1"
                          data-bs-toggle="collapse"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDropdown();
                            e.stopPropagation();
                          }}
                        >
                          Dashboard
                        </a>
                      </div>
                      <div
                        className="div_cont"
                        style={{ display: isDropdownOpen ? "block" : "none" }}
                      >
                        <li>
                          <a class="dropdown-item item2" href="/barandpienew">
                            Status
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item item2" href="/jsirfheatmap">
                            Heatmap
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item item2" href="/barchartnew">
                            Comparative
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item item2" href="/RectangleChart">
                            Detailed
                            <br />
                            Comparative
                          </a>
                        </li>
                      </div>
                    </>
                  )}
                  {(usertype === "ADMIN" || usertype === "HEAD") && (
                    <li>
                      <a className="dropdown-item item" href="/jsirfmanagement">
                        Management
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </li>

          {/* mock assesment section */}
          <li
            className={`nav-item dropdown  ${
              selectedSection === "mock" ? "back" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle text-white"
              href="/"
              id="mock"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => handleSectionClick("mock")}
            >
              Self-Improvement Tool
            </a>
            <ul
              className="dropdown-menu drop_menu dm3"
              aria-labelledby="mockDropdown"
            >
              {usertype === "ADMIN" && (
                <>
                  {/* Data Entry */}
                  <li>
                    <a className="dropdown-item item" href="/dataEntry">
                      Data Entry
                    </a>
                  </li>
                  {/* Data Validation */}
                  <li>
                    <a className="dropdown-item item" href="/dataValidation">
                      Data Validation
                    </a>
                  </li>

                  {/* Self Improvement Tool */}
                  <li>
                    <a className="dropdown-item item" href="/MockFirstPage">
                      Results
                    </a>
                  </li>

                  {/* Dashboard */}
                  <li>
                    <a className="dropdown-item item" href="/dashboard">
                      Dashboard
                    </a>
                  </li>

                  {/* Assessment Management */}
                  <li>
                    <a className="dropdown-item item" href="/edit">
                      Management
                    </a>
                  </li>
                </>
              )}

              {usertype === "HEAD" && (
                <>
                  {/* Data Entry */}
                  <li>
                    <a className="dropdown-item item" href="/dataEntry">
                      Data Entry
                    </a>
                  </li>
                  {/* Data Validation */}
                  <li>
                    <a className="dropdown-item item" href="/dataValidation">
                      Data Validation
                    </a>
                  </li>

                  {/* Self Improvement Tool */}
                  <li>
                    <a className="dropdown-item item" href="/MockFirstPage">
                      Results
                    </a>
                  </li>

                  {/* Report */}
                  <li>
                    <a className="dropdown-item item" href="/reports">
                      Report
                    </a>
                  </li>

                  {/* Dashboard */}
                  <li>
                    <a className="dropdown-item item" href="/dashboard">
                      Dashboard
                    </a>
                  </li>

                  {/* Assessment Management */}
                  <li>
                    <a className="dropdown-item item" href="/edit">
                      Management
                    </a>
                  </li>
                </>
              )}

              {(usertype === "COLLEGE" ||
                usertype === "STANDALONE_INSTITUTE") && (
                <>
                  {/* Data Entry */}
                  <li>
                    <a className="dropdown-item item" href="/dataEntry">
                      Data Entry
                    </a>
                  </li>

                  {/* Self Improvement Tool */}
                  <li>
                    <a className="dropdown-item item" href="/universityMock">
                      Results
                    </a>
                  </li>
                </>
              )}

              {usertype === "UNIVERSITY" && (
                <>
                  {/* Data Entry */}
                  <li>
                    <a className="dropdown-item item" href="/dataEntry">
                      Data Entry
                    </a>
                  </li>

                  {/* Self Improvement Tool */}
                  <li>
                    <a className="dropdown-item item" href="/universityMock">
                      Results
                    </a>
                  </li>
                  {/* Dashboard */}
                  <li>
                    <a className="dropdown-item item" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                </>
              )}

              {(usertype === null || usertype === undefined) && (
                <>
                  {/* Data Entry */}
                  <li>
                    <a className="dropdown-item item" href="/dataEntry">
                      Data Entry
                    </a>
                  </li>
                  {/* Self-Improvement Tool */}
                  <li>
                    <a className="dropdown-item item" href="/universityMock">
                      Results
                    </a>
                  </li>
                  {/* Dashboard */}
                  <li>
                    <a className="dropdown-item item" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                </>
              )}
            </ul>
          </li>

          {/* downloads section */}
          <li
            className={`nav-item  ${
              selectedSection === "downloads" ? "back" : ""
            }`}
          >
            <a
              className="nav-link text-white"
              href="/downloads"
              onClick={() => handleSectionClick("downloads")}
            >
              Downloads
            </a>
          </li>

          {/* FAQ section */}
          <li
            className={`nav-item  ${
              selectedSection === "faq" ? "back" : ""
            }`}
          >
            <a
              className="nav-link text-white faq"
              href="/faq"
              onClick={() => handleSectionClick("faq")}
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
