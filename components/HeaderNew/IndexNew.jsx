import React, { useState } from "react";
import { useFont } from "./useFont";
import "./RegestrationNew.css";
import './ForgetPasswordNew.css';
import "./OTP.css";
import "./SetNewPassword.css";
import "./PasswordConfirmation.css";
import {
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import PersonIcon from "@mui/icons-material/Person";
import Jharkhand from "../../assets/images/Government_banner_of_Jharkhand.png";
import { useNavigate } from "react-router-dom";
 import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
// import ToggleOffIcon from "@mui/icons-material/ToggleOff";
// import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import loginIn from "../../assets/images/enter.png";
import ClickAwayListener from "@mui/material/ClickAwayListener";
//import person from "../../assets/EnhancedImages/header-person-icon.svg";
//import bellicon from "../../assets/EnhancedImages/header_alarm_bell.svg";
import LanguageIcon from "@mui/icons-material/Language";
//import Alertpopup from "../../components/alert/Alertpopup";
// import Errorpopup from "../alert/Errorpopup";

const HeaderNew = ({ onSkip }) => {
  const {
    number,
    setNumbers,
    emailfont,
    setEmailfont,
    loginfont,
    setLoginfont,
    updatefont,
    setUpdatefont,
    welcomefont,
    setWelcomefont,
    bannerheadfont,
    setBannerheadfont,
    bannersubfont,
    setBannersubfont,
    bannercontentfont,
    setBannercontentfont,
    aboutheadfont,
    setAboutheadfont,
    aboutcontentfont,
    setAboutcontentfont,
    objheadfont,
    setObjheadfont,
    objcontentfont,
    setObjcontentfont,
    salientheadfont,
    setSalientheadfont,
    salientsubfont,
    setSalientsubfont,
    salientcontentfont,
    setSalientcontentfont,
    top10headfont,
    setTop10headfont,
    top10updatefont,
    setTop10updatefont,
    top10rankfont,
    setTop10rankfont,
    top10namefont,
    setTop10namefont,
    tableheadfont,
    setTableheadfont,
    tablebodyfont,
    setTablebodyfont,
    uploadheadfont, 
    setUploadheadfont,
    uploadcontentfont, 
    setUploadcontentfont,
    faqfont,
    setFaqfont,
    infomsgfont,
    setInfomsgfont,
    reportokfont,
    setReportokfont,
    pageheadfont, setPageheadfont
  } = useFont();
  // const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutErr, setLogoutErr] = useState("");
  const [clicked, setClicked] = useState(false);
  const [language, setLanguage] = useState("English");

  const changeTheme = () => {
  if (theme === "light") {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    setTheme("light");
    localStorage.setItem("theme", "light");
  }
};
  const handleClickLan = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "English" ? "Hindi" : "English"
    );
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClickAwayProfile = () => {
    setLogoutOpen("");
  };

  const handleClick = (event) => {
    Notification_messages()
      .then((response) => {
        if (response.status === 200) {
          setClicked(true);
          setNotiList(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickYes = () => {
    LogoutApi_Post_Call(Cookies.get("token")).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("theme");
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("aishe");
        Cookies.remove("userType");
        Cookies.remove("role");
        navigate("/");
        sessionStorage.clear();
        setLogoutOpen(false);
      } else if (response.response.status === 401) {
        setLogoutErr("Error");
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("aishe");
        Cookies.remove("userType");
        Cookies.remove("role");
        navigate("/");
        sessionStorage.clear();
        setLogoutOpen(false);
      } else {
        setLogoutErr("Error1");
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("aishe");
        Cookies.remove("userType");
        Cookies.remove("role");
        navigate("/");
        sessionStorage.clear();
        setLogoutOpen(false);
      }
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState("");
  const [notiList, setNotiList] = useState([]);
  const [dnd, setDnd] = useState(false);

  const handleClickProfile = () => {
    setLogoutOpen("");
    navigate("/profile");
  };

  const increase = () => {
    setLoginfont(loginfont + 1);
    setEmailfont(emailfont + 1);
    setUpdatefont(updatefont + 1);
    setWelcomefont(welcomefont + 1);
    setBannersubfont(bannersubfont + 1);
    setBannerheadfont(bannerheadfont + 1);
    setBannercontentfont(bannercontentfont + 1);
    setAboutheadfont(aboutheadfont + 1);
    setAboutcontentfont(aboutcontentfont + 1);
    setObjheadfont(objheadfont + 1);
    setObjcontentfont(objcontentfont + 1);
    setSalientheadfont(salientheadfont + 1);
    setSalientsubfont(salientsubfont + 1);
    setSalientcontentfont(salientcontentfont + 1);
    setTop10headfont(top10headfont + 1);
    setTop10namefont(top10namefont + 1);
    setTop10rankfont(top10rankfont + 1);
    setTop10updatefont(top10updatefont + 1);
    setTableheadfont(tableheadfont + 1);
    setTablebodyfont(tablebodyfont + 1);
    setUploadheadfont(uploadheadfont + 1)
    setUploadcontentfont(uploadcontentfont + 1)
    setFaqfont(faqfont+1)
    setInfomsgfont(infomsgfont+1)
    setReportokfont(reportokfont+1)
    setPageheadfont(pageheadfont + 1);
  };
  const decrease = () => {
    setLoginfont(loginfont - 1);
    setEmailfont(emailfont - 1);
    setUpdatefont(updatefont - 1);
    setWelcomefont(welcomefont - 1);
    setBannersubfont(bannersubfont - 1);
    setBannerheadfont(bannerheadfont - 1);
    setBannercontentfont(bannercontentfont - 1);
    setAboutheadfont(aboutheadfont - 1);
    setAboutcontentfont(aboutcontentfont - 1);
    setObjheadfont(objheadfont - 1);
    setObjcontentfont(objcontentfont - 1);
    setSalientheadfont(salientheadfont - 1);
    setSalientsubfont(salientsubfont - 1);
    setSalientcontentfont(salientcontentfont - 1);
    setTop10headfont(top10headfont - 1);
    setTop10namefont(top10namefont - 1);
    setTop10rankfont(top10rankfont - 1);
    setTop10updatefont(top10updatefont - 1);
    setTableheadfont(tableheadfont - 1);
    setTablebodyfont(tablebodyfont - 1);
    setUploadheadfont(uploadheadfont-1)
    setUploadcontentfont(uploadcontentfont-1)
    setFaqfont(faqfont-1)
    setInfomsgfont(infomsgfont-1)
    setReportokfont(reportokfont-1)
    setPageheadfont(pageheadfont - 1);
  };
  const defaultv = () => {
    setEmailfont(13);
    setLoginfont(14);
    setUpdatefont(14);
    setWelcomefont(16);
    setBannersubfont(24);
    setBannerheadfont(44.8);
    setBannercontentfont(16);
    setAboutheadfont(54);
    setAboutcontentfont(16);
    setObjheadfont(54);
    setObjcontentfont(16);
    setSalientheadfont(54);
    setSalientsubfont(25);
    setSalientcontentfont(16);
    setTop10headfont(54);
    setTop10namefont(17.6);
    setTop10rankfont(25);
    setTop10updatefont(18);
    setTableheadfont(16);
    setTablebodyfont(14);
    setUploadheadfont(25)
    setUploadcontentfont(15)
    setFaqfont(16)
    setInfomsgfont(12)
    setReportokfont(12)
    setPageheadfont(30);
  };
  return (
    <>
    
     <Grid
        container
        sx={{
          // marginBottom: "15px",
          // background: "#18321E",
          background: localStorage.getItem('theme') === 'dark' ? '#171717' : "#18321E",
          justifyContent: "space-between",
        }}
      >
        <Stack
          alignItems="center"
          item
          direction="row"
          sx={{
            justifyContent: "center",
            paddingLeft: "10px",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography className="header-email">
            Email: jharkhandsirf@gmail.com
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              "&.MuiDivider-root": {
                borderColor: "white",
                marginTop: "0",
                marginBottom: "0",
                borderWidth: "1px",
              },
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          <Typography className="header-email">
            Toll Free Number: 1800 0000000
          </Typography>
          
        </Stack>
        <Grid item xs={12} sm={6} md={7}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            className="icons"
          >
            { Cookies !== undefined && Cookies.get("token") === undefined ? (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
                spacing={1}
              >
                <Typography
                  sx={{
                    color: "white", fontSize: "14px", cursor: "pointer",padding: '0px 8px',alignContent:'center', lineHeight:'3.5', "&:hover": {
                      alignContent: 'center',
                      height: '100%',
                      backgroundColor: '#2A4731'
                    }
                  }}
                  onClick={onSkip}
                >
                  Skip to main content
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft:'0px!important'
                    },
                  }}
                />
                <Typography
                  sx={{ color: "white", fontSize: "14px", cursor: "pointer" , lineHeight:'3.5'}} className="hover-div"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft:'0px!important'
                    },
                  }}
                />
                <Typography
                  sx={{ color: "white", fontSize: "14px", cursor: "pointer" , lineHeight:'3.5'}} className="hover-div"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft:'0px!important'
                    },
                  }}
                />
                <Stack direction="row">
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => increase()}
                  >
                    A+
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => defaultv()}
                  >
                    A
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => decrease()}
                  >
                    A-
                  </Button>
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                    },
                  }}
                />
                <Stack direction="column" alignItems="center">
                  <FormControlLabel
                    sx={{ marginRight: "0px", marginLeft: "0" }}
                    control={
                      <Switch
                        onChange={() => changeTheme()}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            transitionDuration: "300ms",
                            "&.Mui-checked": {
                              transform: "translateX(16px)",
                              color: "#fff",
                              "& + .MuiSwitch-track": {
                                backgroundColor: "#65C466",
                                opacity: 1,
                                border: 0,
                              },
                              "&.Mui-disabled + .MuiSwitch-track": {
                                opacity: 0.5,
                              },
                            },
                            "&.Mui-focusVisible .MuiSwitch-thumb": {
                              color: "#33cf4d",
                              border: "6px solid #fff",
                            },
                            "&.Mui-disabled + .MuiSwitch-track": {
                              opacity: 0.7,
                            },
                          },
                          "& .MuiSwitch-track": {
                            borderRadius: 26 / 2,
                            backgroundColor: "#39393D",
                            opacity: 1,
                          },
                        }}
                      />
                    }
                    color="default"
                  />
                  <Typography sx={{ color: "white", fontSize: "8px" }}>
                
                    {localStorage.getItem('theme') === null ? `light mode` : `${localStorage.getItem('theme')} mode`}
                  </Typography>
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                    },
                  }}
                />
                <div className="hover-div">
                  <LanguageIcon sx={{ color: "white" }} />
                  <Typography
                    sx={{ color: "white", fontSize: "14px", cursor: "pointer", lineHeight:'3.5' }}
                    onClick={handleClickLan}
                  >
                    {language}
                  </Typography>
                </div>
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{
                    color: "white", fontSize: "14px", cursor: "pointer", padding: '0px 8px', alignContent:'center',"&:hover": {
                      alignContent: 'center',
                      height: '100%',
                      backgroundColor: '#2A4731'
                    }
                  }}
                  onClick={onSkip}
                >
                  Skip to main content
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft:'0px!important'
                    },
                  }}
                />
                <Stack direction="row">
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => increase()}
                  >
                    A+
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => defaultv()}
                  >
                    A
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "0",
                      justifyContent: "center",
                      color: "white",
                      minWidth: "32px",
                      borderRadius: "0px",
                      border: "1px solid #ededed69",
                      "&:hover": {
                        alignContent: 'center',
                        padding: '0px 5px',
                        height: '100%',
                        backgroundColor: '#2A4731'
                      }
                    }}
                    onClick={() => decrease()}
                  >
                    A-
                  </Button>
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                    },
                  }}
                />
                <Stack direction="column" alignItems="center">
                  <FormControlLabel
                    sx={{ marginRight: "0px", marginLeft: "0" }}
                    control={
                      <Switch
                        onChange={() => changeTheme()}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            transitionDuration: "300ms",
                            "&.Mui-checked": {
                              transform: "translateX(16px)",
                              color: "#fff",
                              "& + .MuiSwitch-track": {
                                backgroundColor: "#65C466",
                                opacity: 1,
                                border: 0,
                              },
                              "&.Mui-disabled + .MuiSwitch-track": {
                                opacity: 0.5,
                              },
                            },
                            "&.Mui-focusVisible .MuiSwitch-thumb": {
                              color: "#33cf4d",
                              border: "6px solid #fff",
                            },
                            "&.Mui-disabled + .MuiSwitch-track": {
                              opacity: 0.7,
                            },
                          },
                          "& .MuiSwitch-track": {
                            borderRadius: 26 / 2,
                            backgroundColor: "#39393D",
                            opacity: 1,
                          },
                        }}
                      />
                    }
                    color="default"
                  />
                  <Typography sx={{ color: "white", fontSize: "8px" }}>
                 
                    {localStorage.getItem('theme') === null ? `light mode` : `${localStorage.getItem('theme')} mode`}
                  </Typography>
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                    },
                  }}
                />
                <div className="hover-div">
                  <LanguageIcon sx={{ color: "white" }} />
                  <Typography
                    sx={{ color: "white", fontSize: "14px", cursor: "pointer" }}
                    onClick={handleClickLan}
                  >
                    {language}
                  </Typography>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft: "0px",
                    },
                  }}
                />
                 
                <div className="hover-div">
                  <img
                    src={bellicon}
                    alt="bell"
                    style={{ cursor: "pointer" }}
                    onClick={handleClick}
                  />
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "&.MuiDivider-root": {
                      borderColor: "white",
                      marginTop: "0",
                      marginBottom: "0",
                      borderWidth: "1px",
                      marginLeft: '0px'
                    },
                  }}
                />
                <Box
                  sx={{
                    // width: 30,
                    // height: 30,
                    // backgroundColor: "white",
                    // borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginLeft:'0px!important',
                    padding: '0px 5px',
                    "&:hover": {
                      alignContent: 'center',
                      height: '100%',
                      backgroundColor: '#2A4731'
                    }
                  }}
                  onClick={() => {
                    if (logoutOpen === "") {
                      setLogoutOpen("Logout");
                    } else {
                      setLogoutOpen("");
                    }
                  }}
                >
                  
                  <img
                    src={person}
                    alt="person"
                    style={{ marginRight: "10px" }}
                  />
                  {Cookies.get("role") === "ADMIN" ||
                    Cookies.get("role") === "HEAD" ? (
                    <>
                      <Typography
                        sx={{ color: "white", fontSize: "14px" }}
                      >
                        {Cookies.get("role")}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography sx={{ color: "white", fontSize: "14px" }}>
                        {Cookies.get("aishe")}
                      </Typography>
                    </>
                  )}
                </Box>
              </Stack>
            )}
          </Stack>
          {logoutErr === "Error" && (
            <Errorpopup
              showDialog={logoutErr === "Error" ? true : false}
              msg={"Your session has expired"}
              setoff={() => {
                navigate("/");
              }}
            />
          )}
          {logoutErr === "Error1" && (
            <Alertpopup
              showDialog={logoutErr === "Error1" ? true : false}
              msg={"Unauthorized user"}
              setoff={() => {
                navigate("/");
              }}
            />
          )}
          
        </Grid>
      </Grid>
      {logoutOpen === "Logout" && Cookies.get("role") === "ADMIN" ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ClickAwayListener onClickAway={handleClickAwayProfile}>
            
            <div
              style={{
                zIndex: "1",
                position: "absolute",
                // marginLeft: "88.5%",
                height: "10%",
              }}
            >
              <div
                className="usernamelogout"
                style={{ alignContent: "center" }}
                onClick={() => handleClickProfile()}
              >
                Profile
              </div>
              <Divider
                sx={{
                  borderColor: "#000000",
                  borderWidth: "1px",
                  opacity: "100%",
                  // width: "7.3%",
                }}
              />
              <div className="usernamelogout2" onClick={() => handleClickYes()}>
                Logout
              </div>
            </div>
          </ClickAwayListener>
        </div>
      ) : (
        ""
      )}

      {logoutOpen === "Logout" &&
        (Cookies.get("role") === "UNIVERSITY" ||
          Cookies.get("role") === "COLLEGE" ||
          Cookies.get("role") === "STANDALONE_INSTITUTE" ||
          Cookies.get("role") === "HEAD") ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ClickAwayListener onClickAway={handleClickAwayProfile}>
            
            <div
              style={{
                zIndex: "1",
                position: "absolute",
                // marginLeft: "92.5%",
                height: "10%",
              }}
            >
              <div
                className="usernamelogout"
                onClick={() => handleClickProfile()}
              >
                Profile
              </div>
              <Divider
                sx={{
                  borderColor: "#000000",
                  borderWidth: "1px",
                  opacity: "100%",
                  // width: "7.3%",
                }}
              />
              <div className="usernamelogout2" onClick={() => handleClickYes()}>
                Logout
              </div>
            </div>
          </ClickAwayListener>
        </div>
      ) : (
        ""
      )}
      {open &&
        (Cookies.get("role") === "ADMIN" || Cookies.get("role") === "HEAD") ? (
        <>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              className="notiWrapper"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                  src="notiPoly.png"
                  alt="polygon"
                  className="notiTriangle"
                />
              </div>
              <Box className="notification-box">
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography className="noti-text">Notifications</Typography>
                  
                  
                </div>
                <img src="notiBar.png" alt="vector" style={{ width: "100%" }} />
                {notiList.length === 0 ? (
                  <div style={{ textAlign: "center" }}>No New Notification</div>
                ) : (
                  <div className="notiScroll">
                    {clicked &&
                      notiList.map((item) => {
                        return (
                          <ul style={{ marginBottom: "38px" }}>
                            <img
                              src="notiEllipse.png"
                              alt="bullet"
                              className="notiBullet"
                            />
                            {item}
                            <Typography className="notiNow">Now</Typography>
                          </ul>
                        );
                      })}
                  </div>
                )}
                <img src="notiBar.png" alt="vector" style={{ width: "100%" }} />
                {notiList.length !== 0 && (
                  <Typography className="notiEndText">
                    Mark as all read
                  </Typography>
                )}
              </Box>
            </Popper>
          </ClickAwayListener>
        </>
      ) : (
        ""
      )} 
    </>
  );
}

export default HeaderNew