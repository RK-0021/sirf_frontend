import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./menuBarNew.css";
import Cookies from "js-cookie";
import { useTheme } from '@mui/material/styles';

//import Logo from "../../assets/images/main_icon.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
//import { analytical, jsirf, dataent } from "../../constants/pageroutes";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
 import MenuIcon from "@mui/icons-material/Menu";
 import ArrowBackIcon from "@mui/icons-material/ArrowBack";
 import Jhklogo from "../../assets/images/logo (2).svg"
// import darklogo from "../../assets/DarkTheme/dark-theme-headerlogo.png"
// import { useTheme } from "../context/DarkLightContext";

const MenubarNew = () => {
  const { theme, setTheme } = useTheme();
  const [lineWidth, setLineWidth] = useState("52px");
  const [lineLeft, setLineLeft] = useState("381.24px");
  // const [colormain, setColorMain] = useState("black");
  const [homeColor, setHomeColor] = useState('black');
  const [dashboardColor, setDashboardColor] = useState('black');
  const [ranking, setRanking] = useState('black');
  const [jsirfSec, setJsirfSec] = useState('black');
  const [self, setSelf] = useState('black');
  const [download, setDownload] = useState('black');
  const [faq, setFaq] = useState('black');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSubMenu2Open, setIsSubMenu2Open] = useState(false);
  const [isSubMenu3Open, setIsSubMenu3Open] = useState(false);
  const [isSubMenu4Open, setIsSubMenu4Open] = useState(false);
  const [isSubMenu5Open, setIsSubMenu5Open] = useState(false);


  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleSubMenu2 = () => {
    setIsSubMenu2Open(!isSubMenu2Open);
  };

  const toggleSubMenu3 = () => {
    setIsSubMenu3Open(!isSubMenu3Open);
  };

  const toggleSubMenu4 = () => {
    setIsSubMenu4Open(!isSubMenu4Open);
  };

  const toggleSubMenu5 = () => {
    setIsSubMenu5Open(!isSubMenu5Open);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;

    let initialWidth = "52px";
    let initialLeft = "367.24px";
    let initialColor = "black";

    if (currentPath === "/") {
      initialWidth = "52px";
      initialLeft = "367.24px";
      setHomeColor("green");
    } else if (analytical.includes(currentPath)) {
      initialWidth = "170px";
      initialLeft = "449.24px";
      setDashboardColor("green");
    } else if (jsirf.includes(currentPath)) {
      initialWidth = "47px";
      initialLeft = "758.24px";
      setJsirfSec("green");
    } else if (dataent.includes(currentPath)) {
      initialWidth = "170px";
      initialLeft = "843.24px";
      setSelf("green");
    } else if (currentPath === "/downloads") {
      initialWidth = "77px";
      initialLeft = "1058.24px";
      setDownload("green");
    } else if (currentPath === "/faq") {
      initialWidth = "39px";
      initialLeft = "1179.24px";
      setFaq("green");
    }
    setLineWidth(initialWidth);
    setLineLeft(initialLeft);
  }, []);

  const handleSectionHover = (width, left) => {
    setLineWidth(width);
    setLineLeft(left);
  };

  const handleMouseLeave = () => {
    const currentPath = window.location.pathname;

    let initialWidth = "52px";
    let initialLeft = "367.24px";

    if (currentPath === "/") {
      initialWidth = "52px";
      initialLeft = "367.24px";
    } else if (analytical.includes(currentPath)) {
      initialWidth = "170px";
      initialLeft = "449.24px";
    } else if (jsirf.includes(currentPath)) {
      initialWidth = "47px";
      initialLeft = "758.24px";
    } else if (dataent.includes(currentPath)) {
      initialWidth = "170px";
      initialLeft = "843.24px";
    } else if (currentPath === "/downloads") {
      initialWidth = "77px";
      initialLeft = "1058.24px";
    } else if (currentPath === "/faq") {
      initialWidth = "39px";
      initialLeft = "1179.24px";
    }

    setLineWidth(initialWidth);
    setLineLeft(initialLeft);
  };

  const usertype = Cookies.get("userType");

  return (
    <>
      <header>
        <nav>
          <img src={localStorage.getItem('theme') === 'dark' ? darklogo : Jhklogo} alt="" style={{ width: "336px" }} />
          <div className="respon">
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "310px",
                  padding: "40px 35px 0px 35px",
                  backgroundColor: "#333131",
                },
              }}
            >
              <List className="listMain">
                {/* Home Section */}
                <li>
                  <a href="/" style={{ color: "white" }}>
                    Home
                  </a>
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* Analytical Dashboard Section */}
                <li>
                  <a onClick={toggleSubMenu} style={{ cursor: "pointer" }}>
                    Analytical Dashboard <ArrowRightIcon />{" "}
                  </a>
                  {isSubMenuOpen && (
                    <ul className="ssubmenu">
                      <li>
                        <a href="/upload">Upload DCF</a>
                      </li>
                      <li>
                        <span
                          onClick={toggleSubMenu2}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          Visualisation <ArrowRightIcon />{" "}
                        </span>
                        {isSubMenu2Open && (
                          <ul className="ssubmenu2">
                            <li>
                              <a href="/heatmap">Heat Map</a>
                            </li>
                            <li>
                              <a href="/charts">
                                Bar Graph & <br /> Pie Chart
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* Ranking Section */}
                <li>
                  <a style={{ cursor: "pointer" }}>Ranking</a>
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* JSIRF Section */}
                <li>
                  <a style={{ cursor: "pointer" }} onClick={toggleSubMenu3}>
                    JSIRF <ArrowRightIcon />{" "}
                  </a>
                  {usertype !== "HEAD" &&
                    usertype !== "UNIVERSITY" &&
                    usertype !== "ADMIN" &&
                    usertype !== "COLLEGE" &&
                    usertype !== "STANDALONE_INSTITUTE" ? (
                    <>
                      {isSubMenu3Open && (
                        <ul>
                          <li>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={toggleSubMenu4}
                            >
                              {" "}
                              Dashboard <ArrowRightIcon />{" "}
                            </span>
                            {isSubMenu4Open && (
                              <ul className="ssubmenu2">
                                <li>
                                  <a href="/jsirfheatmap">Overview</a>
                                </li>
                                <li>
                                  <a href="/barchartnew">Comparative</a>
                                </li>
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <ul className="ssubmenu3">
                      {isSubMenu3Open && (
                        <>
                          {usertype !== "STANDALONE_INSTITUTE" && (
                            <>
                              {usertype === "ADMIN" || usertype === "HEAD" ? (
                                <li>
                                  <a href="/jsirfDataEntry">
                                    View Questionnaire
                                  </a>
                                </li>
                              ) : (
                                <li>
                                  <a href="/jsirfDataEntry">Data Entry</a>
                                </li>
                              )}
                            </>
                          )}

                          {(usertype === "ADMIN" || usertype === "HEAD") && (
                            <li>
                              <a href="/jsirfdatavalidation">Data Validation</a>
                            </li>
                          )}
                          {usertype !== "STANDALONE_INSTITUTE" && (
                            <li>
                              {usertype === "ADMIN" || usertype === "HEAD" ? (
                                <a href="/indiscoredropdown">
                                  Indicative Scoring
                                </a>
                              ) : (
                                <a href="/indiscoreuniv">Indicative Scoring</a>
                              )}
                            </li>
                          )}
                          {usertype !== "STANDALONE_INSTITUTE" && (
                            <li>
                              {usertype === "ADMIN" || usertype === "HEAD" ? (
                                <a href="/jsirfscoredropdown">JSIRF Scoring</a>
                              ) : (
                                <a href="/jsirfscoreuniv">JSIRF Scoring</a>
                              )}
                            </li>
                          )}
                          {usertype === "STANDALONE_INSTITUTE" && (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={toggleSubMenu4}
                              >
                                {" "}
                                Dashboard <ArrowRightIcon />{" "}
                              </span>
                              {isSubMenu4Open && (
                                <ul className="ssubmenu2">
                                  <li>
                                    <a href="/jsirfheatmap">Overview</a>
                                  </li>
                                  <li>
                                    <a href="/barchartnew">Comparative</a>
                                  </li>
                                </ul>
                              )}
                            </li>
                          )}

                          {usertype === "COLLEGE" && (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={toggleSubMenu4}
                              >
                                {" "}
                                Dashboard <ArrowRightIcon />{" "}
                              </span>
                              {isSubMenu4Open && (
                                <ul className="ssubmenu2">
                                  <li>
                                    <a href="/barchartnew">
                                      Comparative-
                                      <br />
                                      Colleges
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/RectangleChartCol">
                                      Detailed
                                      <br />
                                      Comparative
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>
                          )}
                          {usertype === "UNIVERSITY" && (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={toggleSubMenu4}
                              >
                                {" "}
                                Dashboard <ArrowRightIcon />{" "}
                              </span>
                              {isSubMenu4Open && (
                                <ul className="ssubmenu2">
                                  <li>
                                    <a href="/barandpienew">Status</a>
                                  </li>
                                  <li>
                                    <a href="/barchartnew">Comparative</a>
                                  </li>
                                  <li>
                                    <a href="/RectangleChartUni">
                                      Detailed
                                      <br />
                                      Comparative
                                      <br />
                                      University
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/RectangleChartCol">
                                      Detailed
                                      <br />
                                      Comparative
                                      <br />
                                      Colleges
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>
                          )}
                          {usertype === "HEAD" && (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={toggleSubMenu4}
                              >
                                {" "}
                                Dashboard <ArrowRightIcon />{" "}
                              </span>
                              {isSubMenu4Open && (
                                <ul className="ssubmenu2">
                                  <li>
                                    <a href="/jsirfdashpublic">Scorecard</a>
                                  </li>
                                  <li>
                                    <a href="/barandpienew">Status</a>
                                  </li>
                                  <li>
                                    <a href="/jsirfheatmap">Heatmap</a>
                                  </li>
                                  <li>
                                    <a href="/barchartnewtemp">Comparative</a>
                                  </li>
                                  <li>
                                    <a href="/RectangleChart">
                                      Detailed
                                      <br />
                                      Comparative
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>
                          )}
                          {usertype === "ADMIN" && (
                            <>
                              <li>
                                <a href="/studentsurvey">Satisfaction Survey</a>
                              </li>
                              <li>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={toggleSubMenu4}
                                >
                                  {" "}
                                  Dashboard <ArrowRightIcon />{" "}
                                </span>
                                {isSubMenu4Open && (
                                  <ul className="ssubmenu2">
                                    <li>
                                      <a href="/barandpienew">Status</a>
                                    </li>
                                    <li>
                                      <a href="/jsirfheatmap">Heatmap</a>
                                    </li>
                                    <li>
                                      <a href="/barchartnewtemp">Comparative</a>
                                    </li>
                                    <li>
                                      <a href="/RectangleChart">
                                        Detailed
                                        <br />
                                        Comparative
                                      </a>
                                    </li>
                                  </ul>
                                )}
                              </li>
                            </>
                          )}
                          {(usertype === "ADMIN" || usertype === "HEAD") && (
                            <li>
                              <a href="/jsirfmanagement">Management</a>
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  )}
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* Self Improvement Section */}
                <li>
                  <a style={{ cursor: "pointer" }} onClick={toggleSubMenu5}>
                    Self-Improvement Tool <ArrowRightIcon />{" "}
                  </a>
                  {isSubMenu5Open && (
                    <ul className="ssubmenu4">
                      {usertype === "ADMIN" && (
                        <>
                          {/* Data Entry */}
                          <li>
                            <a href="/dataEntry">View Questionnaire</a>
                          </li>
                          {/* Data Validation */}
                          <li>
                            <a href="/dataValidation">Data Validation</a>
                          </li>

                          {/* Self Improvement Tool */}
                          <li>
                            <a href="/MockFirstPage">Results</a>
                          </li>

                          {/* Dashboard */}
                          <li>
                            <a href="/dashboard">Dashboard</a>
                          </li>

                          {/* Assessment Management */}
                          <li>
                            <a href="/edit">Management</a>
                          </li>
                        </>
                      )}

                      {usertype === "HEAD" && (
                        <>
                          {/* Data Entry */}
                          <li>
                            <a href="/dataEntry">View Questionnaire</a>
                          </li>
                          {/* Data Validation */}
                          <li>
                            <a href="/dataValidation">Data Validation</a>
                          </li>

                          {/* Self Improvement Tool */}
                          <li>
                            <a href="/MockFirstPage">Results</a>
                          </li>

                          {/* Report */}
                          <li>
                            <a href="/reports">Report</a>
                          </li>

                          {/* Dashboard */}
                          <li>
                            <a href="/dashboard">Dashboard</a>
                          </li>

                          {/* Assessment Management */}
                          <li>
                            <a href="/edit">Management</a>
                          </li>
                        </>
                      )}

                      {(usertype === "COLLEGE" ||
                        usertype === "STANDALONE_INSTITUTE") && (
                          <>
                            {/* Data Entry */}
                            <li>
                              <a href="/dataEntry">Data Entry</a>
                            </li>

                            {/* Self Improvement Tool */}
                            <li>
                              <a href="/universityMock">Results</a>
                            </li>
                          </>
                        )}

                      {usertype === "UNIVERSITY" && (
                        <>
                          {/* Data Entry */}
                          <li>
                            <a href="/dataEntry">Data Entry</a>
                          </li>

                          {/* Self Improvement Tool */}
                          <li>
                            <a href="/universityMock">Results</a>
                          </li>
                          {/* Dashboard */}
                          <li>
                            <a href="/dashboard">Dashboard</a>
                          </li>
                        </>
                      )}

                      {(usertype === null || usertype === undefined) && (
                        <>
                          {/* Data Entry */}
                          <li>
                            <a href="/dataEntry">Data Entry</a>
                          </li>
                          {/* Self-Improvement Tool */}
                          <li>
                            <a href="/universityMock">Results</a>
                          </li>
                          {/* Dashboard */}
                          <li>
                            <a href="/dashboard">Dashboard</a>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* Downloads Section */}
                <li>
                  <a href="/downloads">Downloads</a>
                </li>
                <Divider
                  sx={{
                    borderColor: "white",
                    alignSelf: "auto",
                  }}
                />
                {/* FAQ Section */}
                <li>
                  <a href="/faq">FAQ</a>
                </li>
              </List>
            </Drawer>
          </div>
          <ul className="menu">
            <li>
              <a
                href="/"
                onMouseEnter={() => handleSectionHover("52px", "367.24px")}
                onMouseLeave={handleMouseLeave}
                style={{ color: localStorage.getItem('theme') === 'dark' ? window.location.pathname === '/' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : homeColor }}
              // style={{ homeColor }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: localStorage.getItem('theme') === 'dark' ? analytical.includes(window.location.pathname) ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : dashboardColor }}
                onMouseEnter={() => handleSectionHover("170px", "449.24px")}
              >
                Analytical Dashboard
              </a>
              <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu' : "submenu"} >
                <li>
                  <a href="/upload">Upload DCF</a>
                </li>
                <li>
                  <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                    {" "}
                    Visualisation <ArrowRightIcon />{" "}
                  </span>
                  <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"} onMouseLeave={handleMouseLeave}>
                    <li>
                      <a href="/heatmap">Heat Map</a>
                    </li>
                    <li>
                      <a href="/charts">
                        Bar Graph & <br /> Pie Chart
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="/"
                onMouseEnter={() => handleSectionHover("62px", "657.24px")}
                onMouseLeave={handleMouseLeave}
                style={{ color: localStorage.getItem('theme') === 'dark' ? window.location.pathname === '/ranking' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : ranking }}
              >
                Ranking
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer", color: localStorage.getItem('theme') === 'dark' ? jsirf.includes(window.location.pathname) ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : jsirfSec }}
                onMouseEnter={() => handleSectionHover("47px", "758.24px")}
              >
                JSIRF
              </a>
              {usertype !== "HEAD" &&
                usertype !== "UNIVERSITY" &&
                usertype !== "ADMIN" &&
                usertype !== "COLLEGE" &&
                usertype !== "STANDALONE_INSTITUTE" ? (
                <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu3' : "submenu3"} onMouseLeave={handleMouseLeave}>
                  <li>
                    <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                      {" "}
                      Dashboard <ArrowRightIcon />{" "}
                    </span>
                    <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"}>
                      <li>
                        <a href="/jsirfheatmap">Overview</a>
                      </li>
                      <li>
                        <a href="/barchartnew">Comparative</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu3' : "submenu3"} onMouseLeave={handleMouseLeave}>
                  {usertype !== "STANDALONE_INSTITUTE" && (
                    <>
                      {usertype === "ADMIN" || usertype === "HEAD" ? (
                        <li>
                          <a href="/jsirfDataEntry">View Questionnaire</a>
                        </li>
                      ) : (
                        <li>
                          <a href="/jsirfDataEntry">Data Entry</a>
                        </li>
                      )}
                    </>
                  )}
                  {(usertype === "ADMIN" || usertype === "HEAD") && (
                    <li>
                      <a href="/jsirfdatavalidation">Data Validation</a>
                    </li>
                  )}
                  {usertype !== "STANDALONE_INSTITUTE" && (
                    <li>
                      {usertype === "ADMIN" || usertype === "HEAD" ? (
                        <a href="/indiscoredropdown">Indicative Scoring</a>
                      ) : (
                        <a href="/indiscoreuniv">Indicative Scoring</a>
                      )}
                    </li>
                  )}

                  {usertype !== "STANDALONE_INSTITUTE" && (
                    <li>
                      {usertype === "ADMIN" || usertype === "HEAD" ? (
                        <a href="/jsirfscoredropdown">JSIRF Scoring</a>
                      ) : (
                        <a href="/jsirfscoreuniv">JSIRF Scoring</a>
                      )}
                    </li>
                  )}

                  {usertype === "COLLEGE" && (
                    <li>
                      <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                        {" "}
                        Dashboard <ArrowRightIcon />{" "}
                      </span>
                      <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"}>
                        <li>
                          <a href="/barchartnew">
                            Comparative-
                            <br />
                            Colleges
                          </a>
                        </li>
                        <li>
                          <a href="/RectangleChartCol">
                            Detailed
                            <br />
                            Comparative
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                  {usertype === "UNIVERSITY" && (
                    <li>
                      <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                        {" "}
                        Dashboard <ArrowRightIcon />{" "}
                      </span>
                      <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"} >
                        <li>
                          <a href="/barandpienew">Status</a>
                        </li>
                        <li>
                          <a href="/barchartnew">Comparative</a>
                        </li>
                        <li>
                          <a href="/RectangleChartUni">
                            Detailed
                            <br />
                            Comparative
                            <br />
                            University
                          </a>
                        </li>
                        <li>
                          <a href="/RectangleChartCol">
                            Detailed
                            <br />
                            Comparative
                            <br />
                            Colleges
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                  {usertype === "STANDALONE_INSTITUTE" && (
                    <li>
                      <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                        {" "}
                        Dashboard <ArrowRightIcon />{" "}
                      </span>
                      <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"} >
                        <li>
                          <a href="/jsirfheatmap">Overview</a>
                        </li>
                        <li>
                          <a href="/barchartnew">Comparative</a>
                        </li>
                      </ul>
                    </li>
                  )}
                  {usertype === "HEAD" && (
                    <li>
                      <span className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"} style={{ cursor: "pointer" }}>
                        {" "}
                        Dashboard <ArrowRightIcon />{" "}
                      </span>
                      <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"} >
                        <li>
                          <a href="/jsirfdashpublic">Scorecard</a>
                        </li>
                        <li>
                          <a href="/barandpienew">Status</a>
                        </li>
                        <li>
                          <a href="/jsirfheatmap">Heatmap</a>
                        </li>
                        <li>
                          <a href="/barchartnewtemp">Comparative</a>
                        </li>
                        <li>
                          <a href="/RectangleChart">
                            Detailed
                            <br />
                            Comparative
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                  {usertype === "ADMIN" && (
                    <>
                      <li>
                        <a href="/studentsurvey">Satisfaction Survey</a>
                      </li>
                      <li>
                        <span
                          className={localStorage.getItem('theme') === 'dark' ? 'darkspanClass' : "spanClass"}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          Dashboard <ArrowRightIcon />{" "}
                        </span>
                        <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu2' : "submenu2"} >
                          <li>
                            <a href="/barandpienew">Status</a>
                          </li>
                          <li>
                            <a href="/jsirfheatmap">Heatmap</a>
                          </li>
                          <li>
                            <a href="/barchartnewtemp">Comparative</a>
                          </li>
                          <li>
                            <a href="/RectangleChart">
                              Detailed
                              <br />
                              Comparative
                            </a>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}
                  {(usertype === "ADMIN" || usertype === "HEAD") && (
                    <li>
                      <a href="/jsirfmanagement">Management</a>
                    </li>
                  )}
                </ul>
              )}
            </li>
            <li></li>
            <li>
              <a
                style={{ cursor: "pointer", color: localStorage.getItem('theme') === 'dark' ? dataent.includes(window.location.pathname) ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : self }}
                onMouseEnter={() => handleSectionHover("170px", "843.24px")}
              >
                Self-Improvement Tool
              </a>
              <ul className={localStorage.getItem('theme') === 'dark' ? 'darksubmenu4' : "submenu4"} onMouseLeave={handleMouseLeave}>
                {usertype === "ADMIN" && (
                  <>
                    {/* Data Entry */}
                    <li>
                      <a href="/dataEntry">View Questionnaire</a>
                    </li>
                    {/* Data Validation */}
                    <li>
                      <a href="/dataValidation">Data Validation</a>
                    </li>

                    {/* Self Improvement Tool */}
                    <li>
                      <a href="/MockFirstPage">Results</a>
                    </li>

                    {/* Dashboard */}
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>

                    {/* Assessment Management */}
                    <li>
                      <a href="/edit">Management</a>
                    </li>
                  </>
                )}

                {usertype === "HEAD" && (
                  <>
                    {/* Data Entry */}
                    <li>
                      <a href="/dataEntry">View Questionnaire</a>
                    </li>
                    {/* Data Validation */}
                    <li>
                      <a href="/dataValidation">Data Validation</a>
                    </li>

                    {/* Self Improvement Tool */}
                    <li>
                      <a href="/MockFirstPage">Results</a>
                    </li>

                    {/* Report */}
                    <li>
                      <a href="/reports">Report</a>
                    </li>

                    {/* Dashboard */}
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>

                    {/* Assessment Management */}
                    <li>
                      <a href="/edit">Management</a>
                    </li>
                  </>
                )}

                {(usertype === "COLLEGE" ||
                  usertype === "STANDALONE_INSTITUTE") && (
                    <>
                      {/* Data Entry */}
                      <li>
                        <a href="/dataEntry">Data Entry</a>
                      </li>

                      {/* Self Improvement Tool */}
                      <li>
                        <a href="/universityMock">Results</a>
                      </li>
                    </>
                  )}

                {usertype === "UNIVERSITY" && (
                  <>
                    {/* Data Entry */}
                    <li>
                      <a href="/dataEntry">Data Entry</a>
                    </li>

                    {/* Self Improvement Tool */}
                    <li>
                      <a href="/universityMock">Results</a>
                    </li>
                    {/* Dashboard */}
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>
                  </>
                )}

                {(usertype === null || usertype === undefined) && (
                  <>
                    {/* Data Entry */}
                    <li>
                      <a href="/dataEntry">Data Entry</a>
                    </li>
                    {/* Self-Improvement Tool */}
                    <li>
                      <a href="/universityMock">Results</a>
                    </li>
                    {/* Dashboard */}
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li>
              <a
                href="/downloads"
                onMouseEnter={() => handleSectionHover("77px", "1058.24px")}
                onMouseLeave={handleMouseLeave}
                style={{ color: localStorage.getItem('theme') === 'dark' ? window.location.pathname === "/downloads" ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : download }}
              >
                Downloads
              </a>
            </li>
            <li>
              <a
                href="/faq"
                onMouseEnter={() => handleSectionHover("39px", "1179.24px")}
                onMouseLeave={handleMouseLeave}
                style={{ color: localStorage.getItem('theme') === 'dark' ? window.location.pathname === "/faq" ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' : faq }}
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>
        <Box
          className="line"
          sx={{
            width: lineWidth,
            left: lineLeft,
            display: "block",
            overflow: "hidden",
          }}
        />
      </header>
    </>
  );
};

export default MenubarNew;
