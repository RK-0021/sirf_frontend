import React, { useEffect, useState } from "react";
import Header from "../../components/Menubar/menuBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../MockAssesment/MockAssesment.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { JsirfScore_Institutions_GET_Call } from "../../services/JsirfScoringApi";
import Errorpopup from "../../components/alert/Errorpopup";
import { useFont } from "../../components/context/FontChangesContext";
import '../../components/AllScores/AllScoreTable.css'
import { onLogout } from '../../utils/index.js';
import { Typography } from "@mui/material";
import Back from "../../components/BackButton/Back.js";

const JsirfScoringAdmin = () => {

  //Destructuring and using font size from usefont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  const { state } = useLocation();//values received from the previous page
  const [getUniversityRes, setGetUniversityRes] = useState();
  const [res, setRes] = useState("");
  useEffect(() => {
    //API call to get the institution list with their JSIRF score
    JsirfScore_Institutions_GET_Call(state.districts, state.heitype)
      .then((response) => {
        if (response.status === 200) {
          setGetUniversityRes(true);
          setRows(response.data);
          setRes("success");
        }
        else if (response.response?.status === 401) {
          setGetUniversityRes(false);
          setRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setGetUniversityRes(false);
          setRes(response?.response?.data?.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  //Function to navigate to /jsirfscore page when user clicks on any institution name
  //selected institution details are passed to the next page
  const handleClickUniversity = (
    institutionName,
    aisheCode,
    institutionTypeIndicator,
    assessmentIndicator
  ) => {
    navigate("/jsirfscore", {
      state: {
        institutionTypeIndicator: institutionTypeIndicator,
        assessmentIndicator,
        assessmentIndicator,
        institutionName: institutionName,
        aisheCode: aisheCode,
      },
    });
  };
  return (
    <div>
      <div className="mock-content">
        <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}>Results (JSIRF Score)</Typography>
        <Back />
        {/* Tbale component that display institution names with their JSIRF score */}
        <TableContainer sx={{ marginTop: '10px', overflowX: 'unset' }}>
          <Table>
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow>
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom: 'none',
                    borderRadius: "5px 0 0 0px",
                    fontSize: `${tableheadfont}px`,
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }}
                  align="center"
                >
                  Ranking
                </TableCell>
                <TableCell className="allscoretableheader"

                  align="left"
                  sx={{ fontSize: `${tableheadfont}px`, paddingBottom: '4px!important', paddingTop: '22px!important', borderBottom: 'none'}}
                >
                  Institution Name
                  <Typography className='statusinfomsg' sx={{ marginLeft: '0%!important', marginTop: '0px!important' }}> *Click on institution name to view criteria-specific score</Typography>
                </TableCell>
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom: 'none',
                    borderRadius: "0 5px 0px 0",
                    fontSize: `${tableheadfont}px`,
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }}
                  align="center"
                >
                  JSIRF Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {getUniversityRes &&
                rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 }, backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)') }}
                    className="mock-row tableborder"
                  >
                    <TableCell align="center" component="th" scope="row" style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px`, borderBottom: 'none' }}>
                      {`${index + 1}.`}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontSize: `${tablebodyfont}px`, cursor: "pointer", borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}
                      onClick={() =>
                        handleClickUniversity(
                          row.institutionName,
                          row.aisheCode,
                          row.institutionTypeIndicator,
                          row.assessmentIndicator
                        )
                      }
                    >
                      {row.institutionName}
                    </TableCell>
                    <TableCell align="center" style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px`, borderBottom: 'none' }}>{row.score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Conditional rendering of Errorpopup */}
      {res !== "" && res !== "success" && (
        <Errorpopup
          showDialog={res !== "" && res !== "success" ? true : false}
          msg={res}
          setoff={() => {
            setRes("");
          }}
        />
      )}
    </div>
  );
};

export default JsirfScoringAdmin;
