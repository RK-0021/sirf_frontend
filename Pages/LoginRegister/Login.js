/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from "react";
import "./Regestration.css";
import "./ForgotPassword.css";
import "./OTP.css";
import "./SetNewPassword.css";
import "./PasswordConfirmation.css";
import Card from "@mui/material/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography } from "@mui/material";
import validator from "validator";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import removeIMG from "../../assets/images/remove.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import Loader from "../../components/loader/Loader";
import { onLogout } from "../../utils";
import Cookies from "js-cookie";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { CardActions, CardHeader, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Login_Post_Call, Refresh_Token } from "../../services/LoginRegister";

import {
  ForgotPassword_auth_Post_Call,
  ForgotPassword_otp_Post_Call,
  SetPassword_Post_Call,
} from "../../services/ForgotPasswordApi";
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);
  const [otpOpen, setOtpOpen] = React.useState(false);
  const [NewPasswordOpen, setSetNewPasswordOpen] = React.useState(false);
  const [successCardOpen, setSuccessCardOpen] = React.useState(false);
  const redirectTo = sessionStorage.getItem("redirectTo");

  // Login variables
  const [loginUserName, setloginUserName] = React.useState("");
  const [loginPassward, setloginPassward] = React.useState("");
  const [loginPasswardshow, setloginPasswardshow] = React.useState(false);
  const [loginCaptcha, setloginCaptcha] = React.useState("");
  const [Loginbuttonstatus, setLoginbuttonstatus] = React.useState("");
  const [LoginApiRes, setLoginApiRes] = React.useState();
  // eslint-disable-next-line
  const [Loginloader, setLoginloader] = React.useState();

  // Register variables
  const [regPasswordshow, setregPasswordshow] = React.useState(false);
  const [regPasswordReEntershow, setregPasswordReEntershow] =
    React.useState(false);
  const [regResData, setregResData] = React.useState(false);

  //reg OTP variables
  const [regotpOTPdata, setregotpOTPdata] = React.useState("");

  //Forgot Password variables
  const [mail, setMail] = React.useState("");
  const [forgotPasswordButtonStatus, setforgotPasswordButtonStatus] =
    React.useState("");
  const [forgotPasswordResData, setForgotPasswordResData] = useState();
  const [usernameErrorData, setUsernameErrordata] = useState("");
  const [axioserrordata, setAxioserrordata] = useState("");
  const [accountLocked, setAccountLocked] = useState("");

  //Forgot Password OTP variables
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]);

  var inFifteenMinutes = new Date(new Date().getTime() + 59 * 60 * 1000);

  //Triggered when OTP is entered for setting new password 
  const handleInputChange = (value, index) => {
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  // handles key down events in the OTP input fields
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  // eslint-disable-next-line
  const [forgotPwdOtpButtonStatus, setForgotPwdOtpButtonStatus] =
    React.useState("");
  const [forgotPasswordOtpOTPdata, setForgotPasswordOtpOTPdata] =
    React.useState("");

  //set new password variables
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
  const [newPasswordConfirmButtonStatus, setNewPasswordConfirmButtonStatus] =
    React.useState("");
  const [setNewPasswordTokenData, setSetNewPasswordTokenData] = useState();

  const navigate = useNavigate();

  //triggers when user clicks on the login button
  const handleLoginClick = () => {
    setLoginloader(true);
    let user_captcha_value =
      document.getElementById("user_captcha_input").value;

    // Check if username, password are provided and the username is a valid email
    if (loginUserName && loginPassward && validator.isEmail(loginUserName)) {
      if (loginCaptcha === captcha) { //user input captcha matches the generated captcha
        const Logindata = {
          username: loginUserName,
          password: loginPassward,
        };
        // POST call to the login API with the login data (username and password)
        Login_Post_Call(Logindata)
          .then((response) => {
            if (response.status === 200) {
              setLoginApiRes("logedin");

              // Set the cookies with the token, username, aishe code, role, HEI name
              Cookies.set("token", response?.data?.token, {
                expires: inFifteenMinutes,
              });
              Cookies.set("username", response?.data?.username, {
                expires: inFifteenMinutes,
              });
              Cookies.set("aishe", response?.data?.aisheCode, {
                expires: inFifteenMinutes,
              });
              Cookies.set("userType", response?.data?.role, {
                expires: inFifteenMinutes,
              });
              Cookies.set("role", response?.data?.role, {
                expires: inFifteenMinutes,
              });
              Cookies.set("heiname", response?.data?.heiName, {
                expires: inFifteenMinutes,
              });

              // runLogoutTimer(12 * 60 * 1000);
              if (redirectTo) {
                sessionStorage.removeItem("redirectTo");
                navigate(redirectTo);
              }
              navigate("/");
            } else if (response.response.status === 403) {
              setLoginApiRes("approval");
              setAccountLocked(response?.response?.data?.message);
            } else if (response.response.status === 401) {
              setLoginApiRes("no username");
              setAccountLocked(response?.response?.data?.message);
            } else if (response.response.status === 423) {
              setLoginApiRes("locked");
              setAccountLocked(response?.response?.data?.message);
            } else {
              setregotpOTPdata("error");
            }
            setLoginloader(false);
          })
          .catch((err) => console.log(console.log("err", err)));
      } else {
        setLoginbuttonstatus("captcha not matched");
        setLoginloader(false);
      }
    } else {
      setLoginbuttonstatus("error");
      setLoginloader(false);
    }
  };

  //triggered when user clicks on the get OTP button (forgot password card)
  const getOtp = () => {
    if (
      validator.isEmail(mail) &&
      mail !== "" &&
      /^[A-Za-z0-9@.]*$/.test(mail)
    ) {
      const ForgotPassword_auth_data = {
        username: mail,
      };
      //POST call to the forgot password API with the email data
      //user will receive otp in the eneterd mail id
      ForgotPassword_auth_Post_Call(mail, ForgotPassword_auth_data)
        .then((response) => {
          setAxioserrordata(response.message);
          if (response.status === 200) {
            setForgotPasswordResData(response?.data);
            setforgotPasswordButtonStatus("sucess");
            setForgotPasswordOpen(false);
            setOtpOpen(true);
          } else {
            setUsernameErrordata(response.response.data.message);
            setforgotPasswordButtonStatus("sucess");
          }
        })
        .catch((error) => {
          alert(axioserrordata);
        });
    } else {
      setforgotPasswordButtonStatus("error");
    }
  };

  //triggered when user clicks on continue button (set new password card)
  const handleClickSetNewPassword = () => {
    if (newPassword === "" || newPasswordConfirm === "") {
      setNewPasswordConfirmButtonStatus("error1");//empty field error
    } else if (newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmButtonStatus("error2");//password mismatch error
    } else if (
      !/[A-Z]+/.test(newPassword) ||
      !/[-\#\$\.\%\&\@\!\+\=\<\>\*]+/.test(newPassword) ||
      newPassword.length < 8 ||
      newPassword.length > 12
    ) {
      setNewPasswordConfirmButtonStatus("error3");//password validation error
    } else { //if all checks are passed
      const SetPassword_data = {
        token: setNewPasswordTokenData,
        password: newPassword,
      };
      //POST call to the set new password API with the new password data
      SetPassword_Post_Call(SetPassword_data)
        .then((response) => {
          if (response?.status === 200) {
            setSetNewPasswordTokenData(response?.data);
            setNewPasswordConfirmButtonStatus("sucess");
            setSetNewPasswordOpen(false);
            setSuccessCardOpen(true);
          } else {
            setAccountLocked(response?.response?.data?.message);
            setNewPasswordConfirmButtonStatus("old password");
          }
        })
        .catch((error) => {
          alert("api fail");
        });
    }
  };

  //called when user submits otp (continue button of otp card)
  const submitOtp = () => {
    const fullOTP = otp.join(""); //convert otp array to string
    if (fullOTP.length === 6) {
      const ForgotPassword_otp_data = {
        token: forgotPasswordResData?.token,
        otp: fullOTP,
      };
      //POST call to the forgot password otp API with the otp data
      ForgotPassword_otp_Post_Call(ForgotPassword_otp_data).then((response) => {
        if (response.status === 200) {
          setSetNewPasswordTokenData(response.data.token);
          setOtpOpen(false);
          setSetNewPasswordOpen(true);
        } else {
          setForgotPasswordOtpOTPdata("error");
        }
      });
    } else {
      setForgotPwdOtpButtonStatus("error");
    }
  };

  return (
    <div>
      {/* Login Box */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "32.5vw",
        backgroundColor: localStorage.getItem('theme') === 'dark' ? '#000000' : "background.paper",
        borderRadius: "15px",
        boxShadow: 24,
        p: 4
      }}>

        {/* Heading part of Login  */}
        <Grid container sx={{ marginTop: "-4vh" }}>
          <Grid item xs={4.25}></Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontFamily: "PoppinsBold",
                fontSize: "32.5px",
                fontWeight: "700",
                lineHeight: "39px",
                letterSpacing: " 0em",
                textAlign: "left",
                color: localStorage.getItem('theme') === 'dark' ? '#ffffff' : ''
              }}
            >
              LOGIN
            </Typography>
          </Grid>
          <Grid item xs={3.5}></Grid>
          <Grid item xs={0.25}>
            <CancelIcon sx={{
              fontSize: '2rem',
              color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)',
              cursor: 'pointer'
            }}
              onClick={() => {
                navigate("/");
              }} />
          </Grid>
        </Grid>

        <Grid container>
          {/* Username, password, captcha fields */}
          <Grid item xs={12}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: "0.25vh",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff'
              }}
            >
              User Name
            </Typography>
            <TextField
              id="uname"
              label={loginUserName === "" ? "Enter your email id" : ""}
              value={loginUserName}
              onChange={(e) => setloginUserName(e.target.value)}
              InputLabelProps={{
                shrink: false,
              }}
              size="small"
              sx={{
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",

                width: "100%",
                borderRadius: "5px",
                marginBottom: "1.5vh",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                color: "#00000080",
                "& .MuiInputLabel-root": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
                "& .MuiOutlinedInput-input": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
              }}
              variant="outlined"
            />
            <Typography
              sx={{
                color: "#FF0000 ",
                margin: "-0.5vh 0 1vh 1vw ",
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
              }}
            >
              {Loginbuttonstatus === "error" && !loginUserName
                ? "Please enter username"
                : ""}
              {Loginbuttonstatus === "error" &&
                loginUserName &&
                !validator.isEmail(loginUserName)
                ? "Please enter valid username"
                : ""}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: "0.25vh",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff'
              }}
            >
              Password
            </Typography>
            <TextField
              id="pass"
              inputProps={{ maxLength: 12 }}
              type={loginPasswardshow ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setloginPasswardshow(!loginPasswardshow)}
                      edge="end"
                    >
                      {loginPasswardshow ? <Visibility sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} /> : <VisibilityOff sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label={loginPassward === "" ? "Enter your password" : ""}
              value={loginPassward}
              onChange={(e) => setloginPassward(e.target.value)}
              InputLabelProps={{ shrink: false }}
              size="small"
              sx={{
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",
                width: "100%",
                borderRadius: "5px",
                marginBottom: "1.5vh",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                color: " #00000080",
                "& .MuiInputLabel-root": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
                "& .MuiOutlinedInput-input": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }
              }}
              variant="outlined"
            />
            <Typography
              sx={{
                color: "#FF0000 ",
                margin: "-0.5vh 0 1vh 1vw ",
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
              }}
            >
              {Loginbuttonstatus === "error" && !loginPassward
                ? "Please enter password"
                : ""}
            </Typography>

            {loginPassward && LoginApiRes === "no username" && (
              <Errorpopup
                showDialog={LoginApiRes === "no username" ? true : false}
                msg={accountLocked}
                setoff={() => {
                  setLoginApiRes(false);
                }}
              />
            )}

            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: "0.25vh",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff'
              }}
            >
              Captcha Code
            </Typography>
            <div
              style={{
                fontFamily: "Roboto",
                textAlign: "center",
                borderRadius: "5px",
                display: "flex",
                justifyContent: 'flex-start'
              }}
            >
              <CardContent sx={{ padding: "0px" }}>
                <CardActions>
                  <div className="captcha_refresh">{captcha}</div>
                  <Button
                    startIcon={<RefreshIcon sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} />}
                    onClick={() => refreshString()}
                  ></Button>
                </CardActions>
              </CardContent>
              <TextField
                name="user_captcha_input"
                id="user_captcha_input"
                label={loginCaptcha === "" ? "Enter the captcha" : ""}
                value={loginCaptcha}
                onChange={(e) => setloginCaptcha(e.target.value)}
                InputLabelProps={{ shrink: false }}
                size="small"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "14px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  width: "100%",
                  borderRadius: "5px",
                  marginBottom: "1.5vh",
                  backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                  color: " #00000080",
                  "& .MuiInputLabel-root": {
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                  },
                  "& .MuiOutlinedInput-input": {
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                  }
                }}
                variant="outlined"
              />
            </div>
            <Typography
              sx={{
                color: "#FF0000 ",
                margin: "-0.5vh 0 1vh 1vw ",
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
              }}
            >
              {Loginbuttonstatus === "captcha not matched"
                ? "Invalid captcha"
                : ""}
            </Typography>
          </Grid>

          {/* Forgor password and Register now links */}
          <Grid container>
            <Grid
              item
              xs={8}
              sx={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#2BA193",
                cursor: "pointer",
              }}
            >
              <Typography
                onClick={() => {
                  setForgotPasswordOpen(true);
                  //setloginOpen(false);
                }}
              >
                Forgot your password?
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "right",
                color: "#2BA193",
                cursor: "pointer",
              }}
            >
              <Typography
                onClick={() => {
                  navigate("/register");
                  //setloginOpen(false);
                }}
              >
                Register now
              </Typography>
            </Grid>
          </Grid>

          {/* Login button */}
          <Button
            onClick={() => {
              setLoginbuttonstatus();
              handleLoginClick();
            }}
            sx={{
              width: "99%",
              height: "7vh",
            }}
            style={{
              backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(18, 116, 59, 1)' : "#000000",
              color: "#FFFFFF",
              margin: "2.5vh 0 -2.5vh 0",
            }}
          >
            Login
          </Button>
        </Grid>
      </Box>

      {/* Conditional rendering of error and alert popups */}
      {LoginApiRes === "locked" && (
        <Errorpopup
          showDialog={LoginApiRes === "locked" ? true : false}
          msg={accountLocked}
          setoff={() => {
            setregResData(false);
          }}
        />
      )}
      {LoginApiRes === "approval" && (
        <Alertpopup
          showDialog={LoginApiRes === "approval" ? true : false}
          msg={accountLocked}
          setoff={() => {
            setregResData(false);
          }}
        />
      )}

      {/* (FORGOT PASSWORD CARD) */}

      <Modal
        open={forgotPasswordOpen}
        // onClose={() => setForgotPasswordOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            maxWidth: 500,
            minHeight: 250,
            mx: "auto",
            my: 5,
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
          }}
        >
          <CardContent>
            {localStorage.getItem('theme') === 'dark' ? <LockIcon sx={{ color: 'rgba(165, 165, 165, 1)', fontSize: '2rem' }} /> :
              <img
                src="forgot-password 1.png"
                alt="forgot-password-icon"
                className="forgot-password-icon"
              ></img>
            }
            <Typography className="forgot-password-heading" sx={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff!important' }}>
              Forgot Password?
            </Typography>
            <Typography className="forgot-password-instruction" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)!important' }}>
              No worries! We’ll send you an OTP to reset your Password
            </Typography>
            <Typography className="forgot-password-label" sx={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff!important' }}>
              E-Mail ID{" "}
            </Typography>
            <input
              id="forgot_password_mail"
              type="text"
              placeholder="Enter your email id"
              onChange={(e) => setMail(e.target.value)}
              InputLabelProps={{ shrink: false }}
              size="small"
              className="forgot-password-input"
              style={{
                background: localStorage.getItem('theme') === 'dark' && 'rgba(141, 141, 141, 0.4)',
                color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
              }}
            />
            <Typography className="inputlableerror" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }}>
              {usernameErrorData}
            </Typography>
            <Typography className="inputlableerror" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }}>
              {forgotPasswordButtonStatus === "error"
                ? "Please enter valid E-mail"
                : ""}
            </Typography>
            <Button
              variant="text"
              className="forgot-password-button"
              sx={{
                background: localStorage.getItem('theme') === 'dark' && "rgba(18, 116, 59, 1)!important",
              }}
              onClick={() => {
                setforgotPasswordButtonStatus("");
                setUsernameErrordata("");
                getOtp();
              }}
            >
              Get OTP
            </Button>
            <br />
            <img
              src="arrow (1) 1.png"
              alt="arrow"
              className="forgot-password-arrow"
              onClick={() => {
                setForgotPasswordOpen(false);
                //setloginOpen(true);
              }}
            ></img>
            <Button
              variant="text"
              className="forgot-password-link"
              onClick={() => {
                setForgotPasswordOpen(false);
                //setloginOpen(true);
              }}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </Modal>

      {/* (OTP CARD TO SET NEW PASSWORD) */}

      <Modal
        open={otpOpen}
        // onClose={() => setOtpOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            maxWidth: 500,
            minHeight: 250,
            mx: "auto",
            my: 17,
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
          }}
        >
          <CardContent>
            <CancelIcon
              sx={{
                marginLeft: "90%",
                color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)',
                cursor: 'pointer'
              }}
              onClick={() => {
                setOtpOpen(false);
                setForgotPasswordOpen(true);
              }}
            ></CancelIcon>
            <Typography className="otp-heading" sx={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff!important' }}>Enter OTP</Typography>

            <Typography className="forgot-password-instruction" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)!important' }}>
              We’ve sent an OTP on {mail}
            </Typography>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                id="forgot_password_otp"
                key={index}
                type="text"
                style={{
                  background: localStorage.getItem('theme') === 'dark' && 'rgba(141, 141, 141, 0.4)',
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onKeyPress={(e) => {
                  const keyValue = e.key;
                  if (!/^\d+$/.test(keyValue)) {
                    e.preventDefault();
                  }
                }}
                className="otp-input"
                maxLength="1"
                size="small"
                ref={inputRefs.current[index]}
              />
            ))}
            {forgotPasswordOtpOTPdata === "error" && (
              <Typography className="inputotperror">Invalid OTP</Typography>
            )}
            <Button
              className="otp-button"
              onClick={() => {
                inputRefs.current.forEach((inputRef) => {
                  inputRef.current.value = "";
                });

                submitOtp();
                setForgotPasswordOtpOTPdata();
              }}
              sx={{ background: localStorage.getItem('theme') === 'dark' && "rgba(18, 116, 59, 1)!important" }}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </Modal>

      {/* (SET NEW PASSWORD CARD) */}

      <Modal
        open={NewPasswordOpen}
        onClose={() => setSetNewPasswordOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            maxWidth: 500,
            minHeight: 250,
            mx: "auto",
            my: 7,
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
          }}
        >
          <CardContent>
            <Typography className="set-new-password-heading" sx={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff!important' }}>
              Set New Password
            </Typography>
            <Typography className="forgot-password-instruction" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)!important' }}>
              Your Password must have at least 8 characters
            </Typography>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: "1.25vh",
                marginLeft: "1.6vw!important",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff!important'
              }}
            >
              New Password <span style={{ color: "#FF0000" }}>*</span>
            </Typography>

            <TextField
              id="set_new_password"
              label={newPassword === "" ? "Enter your new password" : ""}
              onChange={(e) => setNewPassword(e.target.value)}
              InputLabelProps={{ shrink: false }}
              size="small"
              sx={{
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",
                width: "96%",
                borderRadius: "5px",
                marginBottom: "3vh",
                color: "00000080",
                marginLeft: "0vw!important",
                paddingLeft: "0px!important",
                height: "51px!important",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                "& .MuiInputLabel-root": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
                "& .MuiOutlinedInput-input": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }
              }}
              type={regPasswordshow ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="setnewpassword-eye-icon"
                      onClick={() => setregPasswordshow(!regPasswordshow)}
                      edge="end"
                    >
                      {regPasswordshow ? <Visibility sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} /> : <VisibilityOff sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: "1.25vh",
                marginLeft: "1.6vw!important",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff!important'
              }}
            >
              Confirm New Password <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="set_confirm_new_password"
              label={
                newPasswordConfirm === "" ? "Confirm your new password" : ""
              }
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              InputLabelProps={{ shrink: false }}
              size="small"
              sx={{
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",
                width: "96%",
                borderRadius: "5px",
                marginBottom: "3vh",
                color: "00000080",
                marginLeft: "0vw!important",
                paddingLeft: "0px!important",
                height: "51px!important",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                "& .MuiInputLabel-root": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
                "& .MuiOutlinedInput-input": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }
              }}
              type={regPasswordReEntershow ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="setnewpassword-eye-icon"
                      onClick={() =>
                        setregPasswordReEntershow(!regPasswordReEntershow)
                      }
                      edge="end"
                    >
                      {regPasswordReEntershow ? (
                        <Visibility sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} />
                      ) : (
                        <VisibilityOff sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Typography className="setnewpassworderror">
              {newPasswordConfirmButtonStatus === "error1"
                ? "Password field should not be empty"
                : ""}
            </Typography>
            <Typography className="setnewpassworderror">
              {newPasswordConfirmButtonStatus === "error2"
                ? "Passwords does not match"
                : ""}
            </Typography>
            <Typography className="setnewpassworderror">
              {newPasswordConfirmButtonStatus === "error3"
                ? "Password should contain one special character, one Upper case letter and should be of length greater than 7 and less than 13"
                : ""}
            </Typography>
            <Typography className="setnewpassworderror">
              {newPasswordConfirmButtonStatus === "old password"
                ? `${accountLocked}`
                : ""}
            </Typography>
            <Button
              variant="text"
              className="set-new-password-button"
              onClick={() => {
                handleClickSetNewPassword();
              }}
              sx={{ background: localStorage.getItem('theme') === 'dark' && "rgba(18, 116, 59, 1)!important" }}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </Modal>

      {/* (PASSWORD RESET SUCCESSFULL CARD) */}
      <Modal
        open={successCardOpen}
        onClose={() => setSuccessCardOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            maxWidth: "max-content",
            mx: "auto",
            my: 10,
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000!important',
          }}
          className="Password-confirmation-card"
        >
          <CardContent>
            <Typography className="password-confirmation-card-content">
              New Password set successfully !
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default Login;
