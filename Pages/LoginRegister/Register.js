import React, { useState, useRef } from "react";
import "./Regestration.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography, colors } from "@mui/material";
import validator from "validator";
import CancelIcon from '@mui/icons-material/Cancel';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import removeIMG from "../../assets/images/remove.jpg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import {
  Register_Post_Call,
  Register_OTP_Call,
} from "../../services/LoginRegister";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const Register = () => {
  const [regHEIname, setregHEIname] = useState("");
  const [regPOCname, setregPOCname] = useState("");
  const [regMailId, setregMailId] = useState("");
  const [regAISHEcode, setregAISHEcode] = useState("");
  const [regPassword, setregPassword] = useState("");
  const [regPasswordReEnter, setregPasswordReEnter] = useState("");
  const [regPasswordshow, setregPasswordshow] = useState(false);
  const [regPasswordReEntershow, setregPasswordReEntershow] = useState(false);
  const [regContactNum, setregContactNum] = useState("");
  const [regUserType, setregUserType] = useState("");
  const [regDeclaration, setregDeclaration] = useState("");
  const [regbuttonstatus, setregbuttonstatus] = useState("");
  const [regResData, setregResData] = useState(false);
  const [regloader, setregloader] = useState();
  const [regError, setRegError] = useState("");

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    upperCase: null,
    specialChar: null,
  });

  const [regotp, setregotp] = useState(["", "", "", "", "", ""]);
  const [regotpAPImsgpopup, setregotpAPImsgpopup] = useState("");
  const [regotpOTPdata, setregotpOTPdata] = useState("");
  const [regOTPOpen, setregOTPOpen] = useState(false);

  const inputRefs = useRef([
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]);

  //when otp eneterd while registering (otp card)
  const registerOtpHandling = (value, index) => {
    if (value.length <= 1) {
      const newOTP = [...regotp];
      newOTP[index] = value;
      setregotp(newOTP);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  // handles key down events in the OTP input fields
  const handleKeyDownReg = (event, index) => {
    if (event.key === "Backspace" && !regotp[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  //password validation
  function password_validate(newPassword) {
    return (
      !/[A-Z]+/.test(newPassword) ||
      !/[-\#\$\.\%\&\@\!\+\=\<\>\*]+/.test(newPassword) ||
      newPassword.length < 8 ||
      newPassword.length > 12
    );
  }

  //AISHE code validation
  function AISHE_validate(code) {
    return /[A-Z]+/.test(code) && /[0-9]+/.test(code);
  }

  const navigate = useNavigate();

  //OTP submit function
  const regOTPsubmit = () => {
    const fullOTP = regotp.join("");
    if (fullOTP.length === 6) {
      const OTPdata = {
        token: regResData?.token,
        otp: fullOTP,
      };
      //api call to verify otp
      //sends token and otp as parameter data
      Register_OTP_Call(OTPdata).then((response) => {
        if (response.status === 200) {
          setregotpOTPdata("sucess");
          setregOTPOpen(false);
          setregotpAPImsgpopup(true);
        } else {
          setregotpOTPdata("error");
        }
      });
    }
  };

  //triggered when user clicks on submit (register box)
  const RegestrationSubmit = () => {
    if (
      AISHE_validate(regAISHEcode) &&
      regHEIname.length > 2 &&
      regPOCname.length > 2 &&
      validator.isEmail(regMailId) &&
      regContactNum.length > 9 &&
      !password_validate(regPassword) &&
      regPassword.length > 7 &&
      regPasswordReEnter.length > 7 &&
      regUserType &&
      regDeclaration &&
      regPassword === regPasswordReEnter
    ) { //passes all the validations
      const regdata = {
        aisheCode: regAISHEcode,
        heiName: regHEIname,
        nodalOfficer: regPOCname,
        userName: regMailId,
        mobileNumber: regContactNum,
        password: regPassword,
        type: regUserType,
      };
      //api call to register
      Register_Post_Call(regdata)
        .then((response) => {
          if (response.status === 200) {
            setregResData(response?.data);
            setregOTPOpen(true);
            setregloader(false);
          } else {
            setregResData("Some thing went wrong retry");
            setregloader(false);
            setRegError(response?.response?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setregbuttonstatus("error");
    }
  };

  //when user enters password
  const onChangePassword = (password) => {
    setregPassword(password);
    setPasswordValidity({
      minChar: password.length > 7 ? true : false,
      upperCase: /[A-Z]+/.test(password) ? true : false,
      specialChar: /[-\#\$\.\%\&\@\!\+\=\<\>\*]+/.test(password) ? true : false,
    });
  };

  return (
    <div>
      {/* Register box */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        bgcolor: localStorage.getItem('theme') === 'dark' ? '#000000' : 'background.paper',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
      }}>

        {/* Heading part for Register */}
        <Grid
          container
          sx={{
            marginTop: "-2vh",
          }}
        >
          <Grid item xs={4.5}></Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontFamily: "PoppinsBold",
                fontSize: "32.5px",
                fontWeight: "700",
                lineHeight: " 39px",
                letterSpacing: "0em",
                textSlign: "left",
                marginBottom: "1.5vh",
                color: localStorage.getItem('theme') === 'dark' && '#ffffff'
              }}
            >
              REGISTER
            </Typography>
          </Grid>
          <Grid item xs={3.25}></Grid>
          <Grid item xs={0.25}>
            <CancelIcon sx={{
              fontSize: '2rem',
              color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)',
              cursor: 'pointer'
            }}
              onClick={() => {
                navigate("/login");
              }} />
          </Grid>
        </Grid>

        {/* Content Part for Register (input fields, declaration, submit) */}
        <Grid container>

          {/* First Column of Input Fiels */}
          <Grid
            item
            xs={5.7}
            sx={{
              marginRight: "2.5vw",
            }}
          >
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
              HEI's Name <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="hei_name"
              label={regHEIname === "" ? "Enter the HEI's name" : ""}
              value={regHEIname}
              onChange={(e) => {
                const regex = /^[a-zA-Z ]*$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setregHEIname(e.target.value);
                }
              }}
              InputLabelProps={{
                shrink: false,
                backgroundColor: "#DFE7DE",
              }}
              InputProps={{
                backgroundColor: "#DFE7DE",
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
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
              {regbuttonstatus === "error" && regHEIname.length < 3
                ? "HEI's Name should be atleast 3 characters"
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
              E-mail ID <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="reg_mail_id"
              label={regMailId === "" ? "Enter your email id" : ""}
              value={regMailId}
              onChange={(e) => setregMailId(e.target.value)}
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
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
              {regbuttonstatus === "error" && !regMailId
                ? "Please Enter Valid E-mail"
                : ""}
              {regbuttonstatus === "error" &&
                regMailId &&
                !validator.isEmail(regMailId)
                ? "Please Enter Valid E-mail"
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
              Password <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="reg_pass"
              onFocus={() => setPasswordFocused(true)}
              inputProps={{ maxLength: 12 }}
              label={regPassword === "" ? "Enter your Password" : ""}
              value={regPassword ? regPassword : ""}
              onChange={(e) => {
                const isLetters = (str) =>
                  /^[^|^;$%'"<>+!\[\]{}~`\\]*$/.test(str);
                if (isLetters(e.target.value)) {
                  onChangePassword(e.target.value);
                }
              }}
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
                marginBottom: "1vh",
                color: "00000080",
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
                color: "#FF0000 ",
                margin: "-0.5vh 0 1vh 1vw ",
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
              }}
            >
              {regbuttonstatus === "error" && regPassword.length < 8
                ? "Please Enter Password"
                : ""}
            </Typography>
            {passwordFocused && (
              <PasswordStrengthIndicator validity={passwordValidity} />
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
              Nodal officer's Contact Number{" "}
              <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="nodal_contact"
              // helperText={(regbuttonstatus === "error" && !regContactNum) && "Please enter valid phone number"}
              // error={regbuttonstatus === "error" && !regContactNum}
              label={
                regContactNum === ""
                  ? "Enter Nodal officer's contact number"
                  : ""
              }
              value={regContactNum}
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                "& .MuiInputLabel-root": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                },
                "& .MuiOutlinedInput-input": {
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }
              }}
              variant="outlined"
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setregContactNum(e.target.value);
                }
              }}
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
              {regbuttonstatus === "error" && regContactNum.length < 10
                ? "Please Enter Valid Phone Number"
                : ""}
            </Typography>
          </Grid>

          {/* Second Column of Input Fields */}
          <Grid item xs={5.7} className="rightcolumn">
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
              Nodal Officer's Name <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="nodal_name"
              label={regPOCname === "" ? "Enter the Nodal Officer's name" : ""}
              value={regPOCname}
              onChange={(e) => {
                const regex = /^[a-zA-Z ]*$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setregPOCname(e.target.value);
                }
              }}
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
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
              {regbuttonstatus === "error" && regPOCname.length < 3
                ? "Nodal Officer's name should be atleast 3 characters"
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
              AISHE Code <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="aishe_code"
              label={regAISHEcode === "" ? "Enter your AISHE code" : ""}
              value={regAISHEcode}
              onChange={(e) => setregAISHEcode(e.target.value)}
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
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
              {regbuttonstatus === "error" &&
                (!regAISHEcode || !AISHE_validate(regAISHEcode))
                ? "Please Enter Valid AISHE Code"
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
              Re-Enter Password <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <TextField
              id="reg_confirm_pass"
              inputProps={{ maxLength: 12 }}
              type={regPasswordReEntershow ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
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
              label={regPasswordReEnter === "" ? "Re-Enter your Password" : ""}
              value={regPasswordReEnter ? regPasswordReEnter : ""}
              onChange={(e) => {
                const isLetters = (str) =>
                  /^[^|^;$%'"<>+!\[\]{}~`\\]*$/.test(str);
                if (isLetters(e.target.value)) {
                  setregPasswordReEnter(e.target.value);
                }
              }}
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
                marginBottom: "1vh",
                color: "00000080",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
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
              {regbuttonstatus === "error" && !regPasswordReEnter
                ? "Please Enter Password"
                : regbuttonstatus === "error" &&
                  regPassword !== regPasswordReEnter
                  ? "Dosen't match with password"
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
              User Type <span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <Select
              id="reg_user_type"
              label={regUserType === "" ? "Choose your type" : ""}
              value={regUserType}
              onChange={(e) => setregUserType(e.target.value)}
              size="small"
              sx={{
                fontSize: "14.7px",
                padding: "0.2vw",
                fontFamily: "Roboto",
                fontWeight: "400",
                lineHeight: "14px",
                letterSpacing: "0em",
                textAlign: "left",
                width: "100%",
                borderRadius: "5px",
                marginBottom: "1vh",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : "#DFE7DE",
                color: "00000080"
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(141, 141, 141)'
                  },
                },
              }}
            >
              <MenuItem value={"UNIVERSITY"}>University</MenuItem>
              <MenuItem value={"COLLEGE"}>College</MenuItem>
              <MenuItem value={"STANDALONE_INSTITUTE"}>
                Standalone Institute
              </MenuItem>
            </Select>
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
              {regbuttonstatus === "error" && !regUserType
                ? "Please Select User Type"
                : ""}
            </Typography>
          </Grid>

          <div>
            {/* Checkbox */}
            <span style={{ marginRight: "2.5vh" }}>
              <input
                type="checkbox"
                checked={regDeclaration}
                onClick={() => {
                  setregDeclaration(!regDeclaration);
                }}
              />
            </span>
            <h style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}>Declaration</h>
            <div>
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
                {regbuttonstatus === "error" && !regDeclaration
                  ? "Please Select Declaration"
                  : ""}
              </Typography>
            </div>
          </div>

          {/* DECLARATION MESSAGE */}
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
              color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)'
            }}
          >
            I Declare that the above information is true to the best of my
            knowledge. Any discrepancy found will lead to the cancellation of
            registration. I do accept the terms and conditions as defined by the
            department and shall abide to the same.
          </div>

          {/* Submit Button */}
          <Button
            sx={{
              width: "120%",
              height: "7vh",
            }}
            style={{
              color: "#FFFFFF",
              margin: "2.5vh 0 -2.5vh 0",
              background: localStorage.getItem('theme') === 'dark' ? "rgba(18, 116, 59, 1)" : "#000000"
            }}
            onClick={() => {
              RegestrationSubmit();
              setregloader(true);
            }}
          >
            Submit
          </Button>
        </Grid>
      </Box>

      {/* Conditional rendering of alert and error popups */}
      {regResData === "user exist" && (
        <Alertpopup
          showDialog={regResData === "user exist" ? true : false}
          msg={"User already exist"}
          setoff={() => setregResData(false)}
        />
      )}
      {regResData === "Some thing went wrong retry" && (
        <Errorpopup
          showDialog={
            regResData === "Some thing went wrong retry" ? true : false
          }
          msg={regError}
          setoff={() => setregResData(false)}
        />
      )}

      {/* register otp popup */}
      <Modal
        open={regOTPOpen}
        // onClose={() => setregOTPOpen(false)}
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
              onClick={() => { setregOTPOpen(false) }}
            >
            </CancelIcon>
            <Typography className="otp-heading" sx={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff!important' }}>Enter OTP</Typography>
            <Typography className="forgot-password-instruction" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(165, 165, 165, 1)!important' }}>
              Please enter the OTP sent on your Email ID.
            </Typography>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                id="reg_otp"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                key={index}
                type="text"
                onChange={(e) => registerOtpHandling(e.target.value, index)}
                onKeyDown={(e) => handleKeyDownReg(e, index)}
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
                style={{
                  background: localStorage.getItem('theme') === 'dark' && 'rgba(141, 141, 141, 0.4)',
                  color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.5)'
                }}
              />
            ))}
            {regotpOTPdata === "error" && (
              <Typography className="inputotperror">Invalid OTP</Typography>
            )}
            <Button
              className="otp-button"
              onClick={() => {
                inputRefs.current.forEach((inputRef) => {
                  inputRef.current.value = "";
                });

                regOTPsubmit();
                setregotpOTPdata();
              }}
              sx={{ background: localStorage.getItem('theme') === 'dark' && "rgba(18, 116, 59, 1)!important" }}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </Modal>

      {/* otp sucess msg popup */}
      {regotpAPImsgpopup && (
        <Alertpopup
          showDialog={regotpAPImsgpopup}
          msg={
            "The Department of Higher and Technical Education is verifying your details. You will receive a notification of approval on the registered email shortly."
          }
          setoff={() => {
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default Register;
