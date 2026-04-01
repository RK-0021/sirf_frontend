import React, { useEffect } from "react";
import Header from "../../components/Menubar/menuBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../MockAssesment/MockAssesment.css";
import { useNavigate } from "react-router-dom";
import { JsirfScore_GET_Call } from "../../services/JsirfScoringApi";
import Cookies from "js-cookie";
import { useState } from "react";
import Errorpopup from "../../components/alert/Errorpopup";
import '../../components/AllScores/AllScoreTable.css'
import { onLogout } from '../../utils/index.js';
import { InstitutionIndicator_GET_Call } from '../../services/MockAssessmentPage';
import { Typography } from "@mui/material";
import Back from '../../components/BackButton/Back'
import { useFont } from "../../components/context/FontChangesContext";

const JsirfScoringUniv = () => {
  //Destructure and use the 'tableheadfont', 'tablebodyfont' value from the useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  //usestate hooks to store the various values including api response data
  const [TotalScoreRes, setTotalScoreRes] = useState("");
  const [institutionTypeIndicator, setInstitutionTypeIndicator] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [grade, setGrade] = useState("");
  const [score, setScore] = useState("");
  const [aisheCode, setAisheCode] = useState("");
  const [heires, setHeiRes] = useState("");
  useEffect(() => {
    InstitutionIndicator_GET_Call(Cookies.get('aishe'))
      //api call to get the institution type indicator based on the aishe code
      .then((response) => {
        if (response.status === 200) {
          if (response.data.institutionTypeIndicator !== null) {
            setHeiRes("success")
            // if institutionTypeIndicator is not null, api call is made to get the jsirf score based on the aishe code
            JsirfScore_GET_Call(Cookies.get("aishe"))
              .then((response) => {
                if (response.status === 200) {
                  setTotalScoreRes("success");
                  setInstitutionTypeIndicator(response.data.institutionTypeIndicator);
                  if (response.data.institutionName === null) {
                    setInstitutionName(response.data.aisheCode);
                  } else {
                    setInstitutionName(response.data.institutionName);
                  }
                  //setGrade(response.data.grade)
                  setScore(response.data.scoreTotal);
                  setAisheCode(response.data.aisheCode);
                }
                else if (response.response.status === 404) {
                  setTotalScoreRes(response.response.data.message);
                }
                else if (response.response?.status === 401) {
                  setTotalScoreRes(response?.response?.data?.message + " Please login for Access!");
                  onLogout();
                  localStorage.removeItem('theme')
                }
                else {
                  setTotalScoreRes("error");
                }
              })
              .catch((error) => {
                alert(error);
              });
            window.scrollTo(0, 0);
          }
          else {
            //if institutionTypeIndicator is null, prompt the user to select HEI type
            setHeiRes("null")
            setTotalScoreRes("Please select your HEI type.");
          }
        }
        else if (response.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setTotalScoreRes(response?.response?.data.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, []);
  const navigate = useNavigate();

  //triggered when the user clicks on any institution name
  const handleClickInstitution = () => {
    //navigate to the /jsirfscore page with the institution type indicator, institution name and aishe code as state
    navigate("/jsirfscore", {
      state: {
        institutionTypeIndicator: institutionTypeIndicator,
        CollegeName: institutionName,
        aisheCode: aisheCode,
      },
    });
  };
  return (
    <div>
      <div className="mock-content">
        <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}>Results (JSIRF Score)</Typography>
        {/* Table component to display the jsirf score of various institutions */}
        <TableContainer sx={{ marginTop: '10px', overflowX: "unset" }}>
          <Table>
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow>
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderRadius: "5px 0 0 0px",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important',
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none'
                  }}
                  align="center"
                >
                  Ranking
                </TableCell>
                <TableCell className="allscoretableheader"
                  align="left"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    paddingBottom: '4px!important',
                    paddingTop: '22px!important',
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none'
                  }}
                >
                  Institution Name
                  <Typography className='statusinfomsg' sx={{ marginLeft: '0%!important', marginTop: '0px!important' }}> *Click on institution name to view criteria-specific score</Typography>
                </TableCell>
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderRadius: "0 5px 0px 0",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important',
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none'
                  }}
                  align="center"
                >
                  JSIRF Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {TotalScoreRes === "success" && (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000'
                  }}
                  className="mock-row tableborder"
                >
                  <TableCell align="center" component="th" scope="row" style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px` }}>
                    1
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontSize: `${tablebodyfont}px`, cursor: "pointer", color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}
                    onClick={() => handleClickInstitution()}
                  >
                    {institutionName}
                  </TableCell>
                  {/* <TableCell align='left'>{grade}</TableCell> */}
                  <TableCell align="center" style={{ fontSize: `${tablebodyfont}px`, color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}>{score}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Conditional rendering of error popups based on api response */}
      {TotalScoreRes !== "" && TotalScoreRes !== "success" && (
        <Errorpopup
          showDialog={(TotalScoreRes !== "" && TotalScoreRes !== "success") ? true : false}
          msg={TotalScoreRes}
          setoff={() => {
            setTotalScoreRes("");
          }}
          initialNavValue={true}
        />
      )}
      {heires === "null" && (
        <Errorpopup
          showDialog={heires === "null" ? true : false}
          msg={TotalScoreRes}
          setoff={() => {
            setHeiRes("");
            setTotalScoreRes("");
            navigate("/profile");
          }}
        />
      )}
    </div>
  );
};

export default JsirfScoringUniv;
