import React, { useState } from "react";
import "../../components/DataValDropdown/DataValDropdown.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import JDataEntry from "../JSIRFDataEntry/jDataEntry";
import { Typography, Button, Stack } from "@mui/material";
import GradB from "../../assets/images/graduationBlack.svg";
import GradW from "../../assets/images/graduationWhite.svg";
import Back from "../../components/BackButton/Back";
import { useFont } from "../../components/context/FontChangesContext";

const MainDeNew = () => {
  //destructuring font size
  const { pageheadfont } = useFont();
  const navigate = useNavigate();
  const userType = Cookies.get("userType");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  //navigate to /jsirfDataEntryAdminview page when user selects HEI type
  //passes selected HEI type as state
  const handleClickDrawDataSample = (selectedHei) => {
    navigate("/jsirfDataEntryAdminview", {
      state: {
        instType: selectedHei,
      },
    });
  };

  if (userType === "HEAD" || userType === "ADMIN") {
    return (
      <>
        <Typography
          className="page-heading"
          sx={{ fontSize:`${pageheadfont}px`, marginLeft: "2%", marginBottom: "20px", color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D' }}
        >
          View Questionnaire (JSIRF)
        </Typography>

        {/* Component to Select hei type */}
        <div className="datavaldiv">
          <Typography
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px",color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 1)!important' }}
          >
            Choose HEI Type
          </Typography>
          <Stack
            justifyContent="space-evenly"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ paddingRight: "5%" }}
          >
            <Button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                width: "20%",
                height: "200px",
                fontSize:"1.2rem",
                flexDirection: "column",
                textTransform: "capitalize",
                backgroundColor:localStorage.getItem('theme')==='dark'?'rgba(46, 46, 46, 1)': "#EAEAEA",
                color:localStorage.getItem('theme')==='dark'?'rgba(255, 255, 255, 1)': "black",
                "&:hover": {
                  backgroundColor: "#1FA065",
                  color: "white",
                },
              }}
              onClick={() => {
                handleClickDrawDataSample("UNIVERSITY");
              }}
            >
              <img src={isHovered ? GradW : GradB} alt="Graduation Cap Icon" />
              University
            </Button>
            <Button
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
              sx={{
                width: "20%",
                height: "200px",
                flexDirection: "column",
                textTransform: "capitalize",
                backgroundColor:localStorage.getItem('theme')==='dark'?'rgba(46, 46, 46, 1)': "#EAEAEA",
                fontSize:"1.2rem",
                color:localStorage.getItem('theme')==='dark'?'rgba(255, 255, 255, 1)': "black",
                "&:hover": {
                  backgroundColor: "#1FA065",
                  color: "white",
                },
              }}
              onClick={() => {
                handleClickDrawDataSample("UG");
              }}
            >
              <img src={isHovered1 ? GradW : GradB} alt="Graduation Cap Icon" />
              UG
            </Button>
            <Button
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
              sx={{
                width: "20%",
                height: "200px",
                flexDirection: "column",
                textTransform: "capitalize",
                backgroundColor:localStorage.getItem('theme')==='dark'?'rgba(46, 46, 46, 1)': "#EAEAEA",
                fontSize:"1.2rem",
                color: localStorage.getItem('theme')==='dark'?'rgba(255, 255, 255, 1)':"black",
                "&:hover": {
                  backgroundColor: "#1FA065",
                  color: "white",
                },
              }}
              onClick={() => {
                handleClickDrawDataSample("PG");
              }}
            >
              <img src={isHovered2 ? GradW : GradB} alt="Graduation Cap Icon" />
              PG
            </Button>
          </Stack>
        </div>
      </>
    );
  } else {
    return <JDataEntry />;
  }
};

export default MainDeNew;
