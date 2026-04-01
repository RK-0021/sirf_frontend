import React, { useState } from "react";
import "./Regestration.css";
import "./ForgotPassword.css";
import "./OTP.css";
import "./SetNewPassword.css";
import "./PasswordConfirmation.css";
import { Grid, Typography, Stack, IconButton, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import Jharkhand from "../../assets/images/Government_banner_of_Jharkhand.png";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../alert/Errorpopup";
export const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutErr, setLogoutErr] = useState("");

  const handleClick = (event) => {
    Notification_messages()
      //Colleges_GET_Call('U-0209')
      .then((response) => {
        //console.log(response)
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
  const [clicked, setClicked] = useState(false);
  // const [logoutErr, setLogoutErr] = useState("");

  // const handleLogout = () => {
  //   LogoutApi_Post_Call(Cookies.get("token")).then((response) => {
  //     if (response.status === 200) {
  //       Cookies.remove("token");
  //       Cookies.remove("username");
  //       Cookies.remove("aishe");
  //       Cookies.remove("userType");
  //       Cookies.remove("role");
  //       navigate("/");
  //       setLogoutOpen("");
  //     }
  //     else if (response.response.status === 401) {
  //       setLogoutErr("Error");
  //       Cookies.remove("token");
  //       Cookies.remove("username");
  //       Cookies.remove("aishe");
  //       Cookies.remove("userType");
  //       Cookies.remove("role");
  //       navigate("/");
  //       setLogoutOpen("");
  //     } else {
  //       setLogoutErr("Error1");
  //       Cookies.remove("token");
  //       Cookies.remove("username");
  //       Cookies.remove("aishe");
  //       Cookies.remove("userType");
  //       Cookies.remove("role");
  //       navigate("/");
  //     }
  //   });
  // };

  // const handleClickApprove=()=>{
  //   setLogoutOpen("");
  //   navigate('/approve');
  // }

  const handleClickProfile = () => {
    setLogoutOpen("");
    navigate("/profile");
  };

  return (
    <>
      <Grid container sx={{ marginBottom: "15px" }}>
        <Grid alignItems="center" item xs={12} sm={6} md={2}>
          <Stack sx={{ marginTop: "15px" }} direction="row" className="img">
            <img
              alt="Jharkhand"
              src={Jharkhand}
              style={{ width: 147, height: 83 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Stack sx={{ marginTop: "15px" }}>
            <Typography
              align="center"
              fontSize="25px"
              fontWeight="400"
              fontFamily="Garamond"
            >
              GOVERNMENT OF JHARKHAND
            </Typography>
            <Typography
              align="center"
              fontSize="25px"
              fontWeight="700"
              fontFamily="Garamond"
            >
              DEPARTMENT OF HIGHER AND TECHNICAL EDUCATION
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={3}
            className="icons"
          >
            <Stack>
              <div aria-describedby={id} onClick={handleClick}>
                <IconButton>
                  <NotificationsIcon
                    sx={{ color: "#000", fontSize: 27, marginLeft: "10px" }}
                  />
                </IconButton>
                <Typography fontSize="12px" height="45px">
                  Notifications
                </Typography>
              </div>
              {/* {logoutOpen === "Logout" && Cookies.get("role")==='ADMIN'? (
                  <div
                    className="usernamelogout"
                    onClick={()=>handleClickApprove()}
                  >
                    Approve
                  </div>
                ) : (
                  ""
                )} */}
            </Stack>

            {Cookies.get("token") === undefined ? (
              <Stack
                sx={{ paddingRight: "31px" }}
                onClick={() => {
                  // setloginOpen(true)
                  navigate("/login");
                }}
              >
                <IconButton>
                  <PersonIcon
                    sx={{ color: "#000", width: "27px", height: "27px" }}
                  />
                </IconButton>
                <Typography fontSize="12px" className="logintext">
                  Login | Register
                </Typography>
              </Stack>
            ) : (
              <Stack
                sx={{ paddingRight: "31px" }}
                onClick={() => {
                  if (logoutOpen === "") {
                    setLogoutOpen("Logout");
                  } else {
                    setLogoutOpen("");
                  }
                }}
              >
                <IconButton>
                  <PersonIcon
                    sx={{ color: "#000", width: "27px", height: "27px" }}
                  />
                </IconButton>
                <div className="username-div">
                  <Typography fontSize="12px" className="username">
                    {Cookies.get("username")}
                  </Typography>
                </div>
                {/* {logoutOpen === "Logout" ? (
                  <div
                    className="usernamelogout"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    {logoutOpen}
                  </div>
                ) : (
                  ""
                )} */}
                {logoutOpen === "Logout" ? (
                  <>
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
                        opacity:"100%",
                        width:"105%" 
                      }}
                    />
                    <div
                      className="usernamelogout2"
                      onClick={() => handleClickYes()}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  ""
                )}
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
          {/* {logoutErr === "Error" && (
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
          )} */}
        </Grid>
      </Grid>
      {clicked && Cookies.get("role") === "ADMIN" && (
        <Popper id={id} open={open} anchorEl={anchorEl} className="notiWrapper">
          <img src="notiPoly.png" alt="polygon" className="notiTriangle" />
          <Box className="notification-box">
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography className="noti-text">Notifications</Typography>
              <Typography className="notiDnd">Do not Disturb</Typography>
              {dnd === false ? (
                <ToggleOffIcon
                  style={{
                    height: "37px",
                    width: "90px",
                    color: "rgba(103,103,103,0.3",
                  }}
                  onClick={() => setDnd(true)}
                />
              ) : (
                <ToggleOnIcon
                  style={{
                    height: "37px",
                    width: "90px",
                    color: "rgba(40,157,104,1",
                  }}
                  onClick={() => setDnd(false)}
                />
              )}
            </div>
            <img src="notiBar.png" alt="vector" style={{ width: "100%" }} />
            <div className="notiScroll">
              {notiList.map((item) => {
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
            <img src="notiBar.png" alt="vector" style={{ width: "100%" }} />
            <Typography className="notiEndText">Mark as all read</Typography>
          </Box>
        </Popper>
      )}
    </>
  );
};