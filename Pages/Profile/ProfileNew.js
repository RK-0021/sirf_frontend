import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import removeIMG from "../../assets/images/remove.jpg";
import bg from "../../assets/images/bg.png";
import profilepic from "../../assets/images/profile picture.png";
import "./ProfileNew.css";
import Cookies from "js-cookie";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import { InstitutionIndicator_Post_Call } from "../../services/MockAssessmentPage";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LogoutApi_Post_Call } from "../../services/LogoutApi";
import Approve from "../Approve/Approve";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Change_Req_GET_Call,
  InstitutionTypeChange_Post_Call,
} from "../../services/ProfileApi";
import "./ProfileNew.css";
import { InstitutionIndicator_GET_Call } from "../../services/MockAssessmentPage";
import { onLogout } from "../../utils";
const ProfileNew = () => {
  const [buttonState, setButtonState] = useState(false);
  const [postRes, setPostRes] = useState("");
  const navigate = useNavigate();
  let location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(true); //profile tab content
  const [mockOpen, setMockOpen] = useState(false);//self-improvement/approvals tab content
  const [securityOpen, setSecurityOpen] = useState(false);//security tab content
  const [heiOpen, setHeiOpen] = useState(false);//approvals (hei type) tab content
  const [emailOpen, setEmailOpen] = useState(false);//approvals (email id) tab content
  const [changeReqList, setChangeReqList] = useState([]);//hei type change request list
  const [changeReqRes, setChangeReqRes] = useState();
  const [emptyMsg, setEmptyMsg] = useState("");//empty hei type change request list
  const [defaultHei, setDefaultHei] = useState("");//store default hei type
  const [errorMsg, setErrorMsg] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const [getcallres, setGetcallres] = useState("");
  var inFifteenMinutes = new Date(new Date().getTime() + 14 * 60 * 1000);
  useEffect(() => {
    if (Cookies.get("role") === "ADMIN") {
      //API CALL TO GET HEI TYPE CHANGE REQUEST LIST
      Change_Req_GET_Call()
        .then((response) => {
          if (response.status === 200 && response.data.length !== 0) {
            setChangeReqRes(true);
            setChangeReqList(response.data);
          } else if (response.status === 200 && response.data.length === 0) {
            setEmptyMsg("No pending Requests");
            setChangeReqRes(false);
          } else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          } else {
            setChangeReqRes(false);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else if (Cookies.get("role") !== "HEAD") {
      //API CALL TO GET INSTITUTION TYPE INDICATOR AND STORE IT AS DEFAULT HEI TYPE
      InstitutionIndicator_GET_Call(Cookies.get("aishe"))
        .then((response) => {
          if (response.status === 200) {
            setHeiName(response.data.institutionTypeIndicator);
            setDefaultHei(response.data.institutionTypeIndicator);
            setHeinew(response.data.institutionName)
          } else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);

  //HANDLES TAB SELECTION
  //ITEM1-PROFILE
  //ITEM2-SELF-IMPROVEMENT/APPROVALS
  //ITEM3-HEI TYPE (APPROVALS)
  //ITEM4-EMAIL ID (APPROVALS)
  //ITEM5-SECURITY
  const handleClick = (item) => {
    if (item === "item1") {
      setSelectedItem("item1");
      setProfileOpen(true);
      setMockOpen(false);
      setSecurityOpen(false);
      setOpen(false);
      setEmailOpen(false);
      setHeiOpen(false);
    }
    if (item === "item2") {
      if (Cookies.get("role") !== "HEAD" && Cookies.get("role") !== "ADMIN") {
        //API CALL TO GET INSTITUTION TYPE INDICATOR AND STORE IT AS DEFAULT HEI TYPE
        InstitutionIndicator_GET_Call(Cookies.get("aishe"))
          .then((response) => {
            if (response.status === 200) {
              setDefaultHei(response.data.institutionTypeIndicator);
            } else if (response?.response?.status === 401) {
              onLogout();
              localStorage.removeItem('theme')
            } else if (response?.response?.status === 500) {
              setGetcallres("Internal Server Error. Try Again!");
            } else {
              setGetcallres(response?.response?.data.message);
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
      setSelectedItem("item2");
      setProfileOpen(false);
      setMockOpen(true);
      setHeiOpen(true);
      setEmailOpen(false);
      setSecurityOpen(false);
      setOpen(!open);
    }
    if (item === "item5") {
      setEmailOpen(false);
      setHeiOpen(false);
      setSelectedItem("item5");
      setProfileOpen(false);
      setMockOpen(false);
      setSecurityOpen(true);
      setOpen(false);
    }
    if (item === "item3") {
      setSelectedItem("item3");
      setHeiOpen(true);
      setEmailOpen(false);
    }
    if (item === "item4") {
      setSelectedItem("item4");
      setEmailOpen(true);
      setHeiOpen(false);
    }
  };

  console.log(Cookies.get("userType"));
  const [heiName, setHeiName] = useState("");
  const [heinew, setHeinew] = useState("")

  //TRIGGERED WHEN HEI TYPE IS SELECTED FROM SELF-IMPROVEMENT TAB CONTENT
  const handleChange = (event) => {
    setButtonState(true);
    setHeiName(event.target.value);
    //API CALL TO GET INSTITUTION TYPE INDICATOR AND STORE IT AS DEFAULT HEI TYPE
    InstitutionIndicator_GET_Call(Cookies.get("aishe"))
      .then((response) => {
        if (response.status === 200) {
          setDefaultHei(response.data.institutionTypeIndicator);
        } else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else if (response?.response?.status === 500) {
          setGetcallres("Internal Server Error. Try Again!");
        } else {
          setGetcallres(response?.response?.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //TRIGGERED WHEN  HEI TYPE REQUEST IS SUBMITTED FROM SELF-IMPROVEMENT TAB CONTENT
  const handleClickSubmitHei = (item) => {
    const postInstitutionIndicator_data = {
      aisheCode: Cookies.get("aishe"),
      requestedInstitutionTypeIndicator: heiName.toUpperCase(),
    };
    //POST CALL THAT SENDS THE REQUESTED HEI TYPE WITH AISHE CODE AND HEI NAME
    InstitutionIndicator_Post_Call(
      heiName.toUpperCase(),
      Cookies.get("aishe"),
      postInstitutionIndicator_data
    )
      .then((response) => {
        if (response?.status === 200) {
          setPostRes("success");
          if (item === "first") {
            setsuccessmsg("Submitted Successfully!");
          } else if (item === "second") {
            setsuccessmsg(
              "Your request for changing HEI Type has been raised to Dept. Admin.You’ll be notified for further process."
            );
          }
        } else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else if (response?.response?.status === 500) {
          setPostRes("Internal Server Error. Try Again!");
        } else {
          setPostRes(response.response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showReNewPassword, setShowReNewPassword] = React.useState(false);

  //HANDLES PASSWORD VISIBILITY
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowReNewPassword = () =>
    setShowReNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  //HANDLES APPROVE OR REJECT OF HEI TYPE CHANGE REQUEST
  const handleClickAorR = (action, aishe) => {
    setChangeReqList(
      changeReqList.filter((req) => {
        return req.aisheCode !== aishe;
      })
    );
    const acceptOrReject_data = {
      aisheCode: aishe,
      updatedApprovalStatus: action,
    };
    //POST CALL THAT SENDS THE ACCEPTED OR REJECTED STATUS WITH THE RESPETIVE AISHE CODE
    InstitutionTypeChange_Post_Call(acceptOrReject_data)
      .then((response) => {
        console.log(response);
        if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //HANDLES PASSWORD CHANGE
  const handleClickChange = () => {
    if (oldPass === "" || newPass === "" || reNewPass === "") {
      setErrorMsg("Password fields should not be empty");
    } else if (newPass !== reNewPass) {
      setErrorMsg("Passwords does not match");
    } else if (
      !/[A-Z]+/.test(newPass) ||
      !/[-\#\$\.\%\&\@\!\+\=\<\>\*]+/.test(newPass) ||
      newPass.length < 8 ||
      newPass.length > 12
    ) {
      setErrorMsg(
        "Password should contain one special character, one Upper case letter and should be of length greater than 7 and less than 13"
      );
    } else {
      setErrorMsg("success");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        margin: "30px",
        justifyContent: "space-between",
      }}
    >

      {/* LIST OF TABS PRESENT ON LEFT HAND SIDE */}
      <div className="profileMenu">
        <List
          className="profile-menu-list"
          component="nav"
          aria-labelledby="nested-list-subheader"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#2C665F!important",
              borderRadius: "0px 27px 27px 0px",
              width: "105%",
            },
            display: "block",
          }}
        >
          {/* PROFILE TAB */}
          <ListItemButton
            className="profile-menu-list-item"
            selected={selectedItem === "item1"}
            onClick={() => handleClick("item1")}
          >
            <ListItemText
              className="profile-menu-list-text"
              primary="Profile"
              sx={{
                color:
                  selectedItem === "item1" ? "#ffffff!important" : "#000000",
              }}
            />
          </ListItemButton>

          {/* SELF-IMPROVEMENT/APPROVALS TAB */}
          {Cookies.get("role") !== "HEAD" && (
            <ListItemButton
              className="profile-menu-list-item"
              selected={
                selectedItem === "item2" ||
                selectedItem === "item3" ||
                selectedItem === "item4"
              }
              onClick={() => handleClick("item2")}
            >
              <ListItemText
                className="profile-menu-list-text"
                primary={
                  Cookies.get("role") === "UNIVERSITY" ||
                    Cookies.get("role") === "COLLEGE" ||
                    Cookies.get("role") === "STANDALONE_INSTITUTE"
                    ? "Self-Improvement"
                    : "Approvals"
                }
                sx={{
                  color:
                    selectedItem === "item2" ||
                      selectedItem === "item3" ||
                      selectedItem === "item4"
                      ? "#ffffff!important"
                      : "#000000",
                }}
              />
            </ListItemButton>
          )}

          {/* HEI TYPE/ E-MAIL ID TAB */}
          {Cookies.get("role") === "ADMIN" && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => handleClick("item3")}
                  sx={{
                    backgroundColor:
                      selectedItem === "item3"
                        ? "rgba(44, 102, 95, 0.42)!important"
                        : "rgba(223, 231, 222, 1)!important",
                  }}
                >
                  <ListItemText
                    className="profile-menu-list-text"
                    primary="HEI Type"
                    sx={{
                      color:
                        selectedItem === "item3"
                          ? "#ffffff!important"
                          : "#000000",
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleClick("item4")}
                  sx={{
                    backgroundColor:
                      selectedItem === "item4"
                        ? "rgba(44, 102, 95, 0.42)!important"
                        : "rgba(223, 231, 222, 1)!important",
                  }}
                >
                  <ListItemText
                    className="profile-menu-list-text"
                    primary="Email-Id"
                    sx={{
                      color:
                        selectedItem === "item4"
                          ? "#ffffff!important"
                          : "#000000",
                    }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          )}

          {/* SECURITY TAB */}
          <ListItemButton
            className="profile-menu-list-item"
            selected={selectedItem === "item5"}
            onClick={() => handleClick("item5")}
          >
            <ListItemText
              className="profile-menu-list-text"
              primary="Security"
              sx={{
                color:
                  selectedItem === "item5" ? "#ffffff!important" : "#000000",
              }}
            />
          </ListItemButton>
        </List>
      </div>

      <div className="profileMain">
        {/* PROFILE MAIN COMPONENT ON RIGHT HAND SIDE */}
        <Box className="profile-main-box">
          {/* STATIC TOP PART */}
          <Grid container>
            <Grid item xs={11.6}>
              <img
                src={bg}
                alt=""
                width="835px"
                height="182px"
                style={{
                  marginTop: "20px",
                  marginLeft: "30px",
                }}
              />
            </Grid>
            <Grid item xs={0.4}>
              <img
                src={removeIMG}
                alt=""
                width="24px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              />
            </Grid>
            <Grid>
              <img
                src={profilepic}
                style={{
                  width: "161px",
                  height: "155px",
                  borderRadius: "20px",
                  marginLeft: "60px",
                  marginTop: "-70px",
                }}
              />
            </Grid>
            <Grid>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "23px",
                  letterSpacing: "0em",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {Cookies.get("username")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                  letterSpacing: "0em",
                  marginLeft: "10px",
                  marginTop: "12px",
                }}
              >
                {Cookies.get("role")}
              </Typography>
            </Grid>
          </Grid>

          {/* PROFILE TAB CONTENT */}
          {profileOpen && (
            <Grid
              sx={{
                marginTop: "50px",
                marginLeft: "60px",
              }}
            >
              <table
                style={{
                  width: "90%",
                }}
              >
                <tbody>
                  {Cookies.get("userType") !== "ADMIN" &&
                    Cookies.get("userType") !== "HEAD" &&
                    <>
                      <tr>
                        <th className="profile-main-th">HEI Name and Location</th>
                        <td className="profile-main-td">
                          {heinew === "" ? Cookies.get("heiname") : heinew}
                        </td>
                      </tr>
                    </>
                  }
                  <hr
                    style={{
                      width: "250%",
                      marginTop: "28px",
                      marginBottom: "28px",
                    }}
                  />
                  <tr>
                    <th className="profile-main-th">User Type</th>
                    <td className="profile-main-td">{Cookies.get("role")}</td>
                  </tr>
                  {/* {Cookies.get("userType") !== "ADMIN" &&
                    Cookies.get("userType") !== "HEAD" && ( */}
                  <hr
                    style={{
                      width: "250%",
                      marginTop: "28px",
                      marginBottom: "28px",
                    }}
                  />
                  {Cookies.get("userType") !== "ADMIN" &&
                    Cookies.get("userType") !== "HEAD" && (
                      <>
                        <tr>
                          <th className="profile-main-th">AISHE CODE</th>
                          <td className="profile-main-td">
                            {Cookies.get("aishe")}
                          </td>
                        </tr>
                        <hr
                          style={{
                            width: "250%",
                            marginTop: "28px",
                            marginBottom: "28px",
                          }}
                        />
                      </>
                    )}
                  <tr>
                    <th className="profile-main-th">E-mail ID</th>
                    <td className="profile-main-td">
                      {Cookies.get("username")}
                    </td>
                  </tr>
                  <hr
                    style={{
                      width: "250%",
                      marginTop: "28px",
                      marginBottom: "28px",
                    }}
                  />
                </tbody>
              </table>
            </Grid>
          )}

          {/* SELF IMPROVEMENT TAB CONTENT */}
          {mockOpen && Cookies.get("role") !== "ADMIN" && (
            <Grid
              sx={{
                marginTop: "50px",
                marginLeft: "60px",
              }}
            >
              <table
                style={{
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <th className="profile-main-th" width="200px">
                      HEI Type
                    </th>
                    <td className="profile-main-td">
                      <FormControl
                        sx={{
                          "& .MuiSvgIcon-root": {
                            width: "14px!important",
                            height: "14px!important",
                            border: "1px",
                          },
                          "& .MuiTypography-root": {
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "19px",
                            letterSpacing: "0em",
                          },
                          "& .MuiFormControlLabel-root": {
                            marginRight: "50px",
                          },
                        }}
                      >
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleChange}
                          defaultValue={defaultHei}
                          value={heiName}
                        >
                          {defaultHei === null &&
                            Cookies.get("aishe")[0] === "S" ? (
                            <FormControlLabel
                              value="AUTONOMOUS"
                              control={<Radio />}
                              label="Autonomous"
                            />
                          ) : defaultHei === null &&
                            Cookies.get("aishe")[0] === "C" ? (
                            <>
                              <FormControlLabel
                                value="UG"
                                control={<Radio />}
                                label="UG"
                              />
                              <FormControlLabel
                                value="PG"
                                control={<Radio />}
                                label="PG"
                              />
                            </>
                          ) : defaultHei === null &&
                            Cookies.get("aishe")[0] === "U" ? (
                            <FormControlLabel
                              value="UNIVERSITY"
                              control={<Radio />}
                              label="University"
                            />
                          ) : (
                            <>
                              <FormControlLabel
                                value="UNIVERSITY"
                                control={<Radio />}
                                label="University"
                              />
                              <FormControlLabel
                                value="UG"
                                control={<Radio />}
                                label="UG"
                              />
                              <FormControlLabel
                                value="PG"
                                control={<Radio />}
                                label="PG"
                              />
                              <FormControlLabel
                                value="AUTONOMOUS"
                                control={<Radio />}
                                label="Autonomous"
                              />
                            </>
                          )}
                        </RadioGroup>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
              {defaultHei !== null && (
                <Button
                  disabled={buttonState ? false : true}
                  className="profile-mock-submit"
                  onClick={() => handleClickSubmitHei("second")}
                >
                  Change HEI
                </Button>
              )}
              {defaultHei === null && (
                <Button
                  disabled={buttonState ? false : true}
                  className="profile-mock-submit"
                  onClick={() => handleClickSubmitHei("first")}
                >
                  Submit
                </Button>
              )}
            </Grid>
          )}

          {/* APPROVALS TAB CONTENT (HEI TYPE) */}
          {mockOpen && Cookies.get("role") === "ADMIN" && heiOpen && (
            <Grid
              sx={{
                marginTop: "50px",
                marginLeft: "60px",
              }}
            >
              {emptyMsg === "No pending Requests" ? (
                <Box
                  sx={{
                    height: "52px",
                    borderRadius: "5px",
                    background: "#DFE7DECC",
                    boxShadow: "0px 4px 15px 0px #00000040",
                    margin: "30px",
                    padding: "15px",
                    width: "300px",
                    marginLeft: "33%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "15px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      color: "#B26A6A",
                    }}
                  >
                    There are no pending Requests
                  </Typography>
                </Box>
              ) : (
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  sx={{
                    height: "200px",
                    overflowY: "auto",
                    boxShadow: "0px 4px 10px 0px #00000040",
                    width: "93%",
                    display: "block",
                  }}
                >
                  {changeReqRes &&
                    changeReqList.map((item) => (
                      <ListItemButton
                        sx={{
                          paddingRight: "40px",
                          marginBottom: "20px",
                        }}
                      >
                        <ListItemIcon>
                          <CircleIcon className="profile-hei-radio" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            "& .MuiTypography-root": {
                              width: "450px",
                              fontFamily: "Roboto",
                              fontSize: "18px",
                              fontWeight: "600",
                              lineHeight: "21px",
                              letterSpacing: "0em",
                              textAlign: "left",
                              color: "rgba(0, 0, 0, 1)",
                            },
                          }}
                          primary={`${item.aisheCode} has applied for new HEI Type from ${item.institutionTypeIndicator} to ${item.requestedInstitutionTypeIndicator}`}
                        />
                        <Button
                          className="profile-hei-button"
                          onClick={() =>
                            handleClickAorR("ACCEPTED", item.aisheCode)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          className="profile-hei-button"
                          onClick={() =>
                            handleClickAorR("REJECTED", item.aisheCode)
                          }
                        >
                          Reject
                        </Button>
                      </ListItemButton>
                    ))}
                </List>
              )}
            </Grid>
          )}

          {/* APPROVALS TAB CONTENT (EMAIL ID) */}
          {
            mockOpen && Cookies.get("role") === "ADMIN" && emailOpen && (
              <Approve />
            )
          }

          {/* SECURITY TAB CONTENT */}
          {securityOpen && (
            <Grid
              sx={{
                marginTop: "50px",
                marginLeft: "60px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                  className="profile-main-th"
                >
                  Enter Old Password
                </InputLabel>
                <Input
                  onChange={(e) => {
                    setOldPass(e.target.value);
                  }}
                  id="standard-adornment-password"
                  type={showOldPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                  className="profile-main-th"
                >
                  Enter New Password
                </InputLabel>
                <Input
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  id="standard-adornment-password"
                  type={showNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "90%", height: "100px" }}
                variant="standard"
              >
                <InputLabel
                  htmlFor="standard-adornment-password"
                  className="profile-main-th"
                >
                  Re-Enter Password
                </InputLabel>
                <Input
                  onChange={(e) => {
                    setReNewPass(e.target.value);
                  }}
                  id="standard-adornment-password"
                  type={showReNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowReNewPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showReNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errorMsg !== "success" && (
                <Typography className="setnewpassworderror">
                  {errorMsg}
                </Typography>
              )}
              <Button
                className="profile-mock-submit"
                onClick={() => handleClickChange()}
              >
                Change
              </Button>
            </Grid>
          )}
        </Box>

        {/* CONDITIONAL RENDERING OF ALERT AND ERROR POPUPS */}
        {postRes === "success" && (
          <Alertpopup
            showDialog={postRes === "success" ? true : false}
            msg={successmsg}
            setoff={() => {
              // history.goBack();
              // navigate('/dataEntry');
              const storedAisheCode = Cookies.get("aishe");
              InstitutionIndicator_GET_Call(storedAisheCode)
                .then((res) => {
                  if (res.status === 200) {
                    console.log(
                      "Profile Insti",
                      res.data.institutionTypeIndicator
                    );
                    if (res.data.institutionTypeIndicator !== null) {
                      navigate(-1);
                      setPostRes("");
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          />
        )}
        {postRes !== "success" && postRes !== "" && (
          <Errorpopup
            showDialog={postRes !== "success" && postRes !== "" ? true : false}
            msg={postRes}
            setoff={() => {
              navigate("/profile");
              setPostRes("");
              setHeiName(defaultHei);
            }}
          />
        )}
        {errorMsg === "success" && (
          <Alertpopup
            showDialog={errorMsg === "success" ? true : false}
            msg={"New Password set successfully !"}
            setoff={() => {
              navigate("/profile");
              setErrorMsg("");
            }}
          />
        )}
        {getcallres !== "" && (
          <Errorpopup
            showDialog={getcallres !== "" ? true : false}
            msg={getcallres}
            setoff={() => {
              navigate("/upload");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileNew;
