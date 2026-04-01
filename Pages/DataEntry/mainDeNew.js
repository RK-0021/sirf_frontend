import React, { useState } from "react";
import "../../components/DataValDropdown/DataValDropdown.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataEntry from "../DataEntry/DataEntry";
import { Typography, Button, Stack } from "@mui/material";
import GradB from "../../assets/images/graduationBlack.svg";
import GradW from "../../assets/images/graduationWhite.svg";
import Back from "../../components/BackButton/Back";
import { useFont } from "../../components/context/FontChangesContext";

const MainDeNew = () => {
  //Destructure and use the 'pageheadfont' value from the useFont custom hook
  const { pageheadfont } = useFont();
  const navigate = useNavigate();
  const userType = Cookies.get("userType");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  //Function to navigate to /dataentryAdminview page with the selected HEI type
  const handleClickDrawDataSample = (selectedHei) => {
    navigate("/dataentryAdminview", {
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
          sx={{ fontSize: `${pageheadfont}px`, marginLeft: "2%", marginBottom: "20px", color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}
        >
          View Questionnaire (Self-Improvement)
        </Typography>

        {/* HEI type selection component for admin/head user */}
        <div className="datavaldiv">
          <Typography
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px", color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important' }}
          >
            Choose HEI Type
          </Typography>
          <Stack
            justifyContent="space-between"
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
                fontSize: "1.2rem",
                flexDirection: "column",
                textTransform: "capitalize",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(46, 46, 46, 1)' : "#EAEAEA",
                color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black",
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
                fontSize: "1.2rem",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(46, 46, 46, 1)' : "#EAEAEA",
                color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black",
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
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(46, 46, 46, 1)' : "#EAEAEA",
                color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black",
                fontSize: "1.2rem",
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
            <Button
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
              sx={{
                width: "20%",
                height: "200px",
                flexDirection: "column",
                textTransform: "capitalize",
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(46, 46, 46, 1)' : "#EAEAEA",
                color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#1FA065",
                  color: "white",
                },
              }}
              onClick={() => {
                handleClickDrawDataSample("AUTONOMOUS");
              }}
            >
              <img src={isHovered3 ? GradW : GradB} alt="Graduation Cap Icon" />
              Autonomous
            </Button>
          </Stack>
        </div>
      </>
    );
  } else {
    return <DataEntry />;
  }
};

export default MainDeNew;
