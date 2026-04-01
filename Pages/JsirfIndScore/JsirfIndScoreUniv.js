import React, { useEffect } from 'react'
import Header from "../../components/Menubar/menuBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../MockAssesment/MockAssesment.css';
import { useNavigate } from "react-router-dom";
import { Total_Assessment_Score_GET_Call } from '../../services/MockAssessmentPage';
import { IndScore_GET_Call, Score_POST_Call } from '../../services/JsirfIndScoreApi';
import Cookies from "js-cookie";
import { useState } from 'react';
import Errorpopup from '../../components/alert/Errorpopup';
import { InstitutionIndicator_GET_Call } from '../../services/MockAssessmentPage';
import JSIRFIndicativeTabs from '../../Pages/JsirfIndScore/JsirfIndicativeTabs';
import '../../components/AllScores/AllScoreTable.css'
import { onLogout } from '../../utils/index.js';
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back.js';
import { useFont } from "../../components/context/FontChangesContext";

const JsirfIndScoreUniv = () => {
  //Destructure and use the 'tableheadfont', 'tablebodyfont' value from the useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  //usestate hooks to store the various values including api response data
  const [TotalScoreRes, setTotalScoreRes] = useState('')
  const [institutionTypeIndicator, setInstitutionTypeIndicator] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [grade, setGrade] = useState('')
  const [score, setScore] = useState('')
  const [aisheCode, setAisheCode] = useState('')

  //function triggered in useEffect when the institutionTypeIndicator is not null
  const temp = (val) => {
    //api call to get the indicative score based on the aishe code and institution type indicator
    IndScore_GET_Call(Cookies.get('aishe'), val)
      .then((response) => {
        if (response.status === 200) {
          setTotalScoreRes('success')
          if (response.data.institutionName === null) {
            setInstitutionName(response.data.aisheCode) //if institution name is null, aishe code is assigned as institution name
          }
          else {
            setInstitutionName(response.data.institutionName)
          }
          setScore(response.data.scoreTotal)
          setAisheCode(response.data.aisheCode)
        }
        //if score not found, a post call is made where aisheCode,institutionTypeIndicator, surveyYear and 
        //assessmentIndicator are passed as data 
        else if (response.response.status === 404) {
          const data = {
            aisheCode: Cookies.get('aishe'),
            institutionTypeIndicator: val,
            surveyYear: "2021-22",
            assessmentIndicator: "JSIRF"
          }
          Score_POST_Call(data)
            .then((response) => {
              if (response.status === 200) {
                //if post call is successful, get call is made to get the indicative score based on the aishe code and institution type indicator
                IndScore_GET_Call(Cookies.get('aishe'), val)
                  .then((response) => {
                    if (response.status === 200) {
                      setTotalScoreRes('success')
                      if (response.data.institutionName === null) {
                        setInstitutionName(response.data.aisheCode)
                      }
                      else {
                        setInstitutionName(response.data.institutionName)
                      }
                      setScore(response.data.scoreTotal)
                      setAisheCode(response.data.aisheCode)
                    }
                    else if (response.response.status === 404) {
                      setTotalScoreRes(response.response.data.message)
                    }
                    else if (response.response?.status === 401) {
                      setTotalScoreRes(response?.response?.data?.message + " Please login for Access!");
                      onLogout();
                      localStorage.removeItem('theme')
                    }
                    else {
                      setTotalScoreRes('error')
                    }
                  })
                  .catch((error) => {
                    alert(error)
                  })
              }
              else if (response.response?.status === 401) {
                onLogout();
                localStorage.removeItem('theme')
              }
            })
            .catch((error) => {
              alert(error)
            })
        }
        else if (response.response?.status === 401) {
          setTotalScoreRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setTotalScoreRes('error')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
  useEffect(() => {
    //api call to get the institution type indicator based on the aishe code
    InstitutionIndicator_GET_Call(Cookies.get('aishe'))
      .then((response) => {
        if (response.status === 200) {
          //if institutionTypeIndicator is null, prompt the user to select HEI type
          if (response.data.institutionTypeIndicator === null) {
            setTotalScoreRes(
              "Please select your HEI type."
            );
            setTimeout(() => {
              window.location.href = "/profile";
            }, 3000);
            return;
          }
          else {
            setInstitutionTypeIndicator(response.data.institutionTypeIndicator)
            temp(response.data.institutionTypeIndicator)
          }
        }
        else if (response.response?.status === 401) {
          setTotalScoreRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          console.log('error', response?.response?.data.message)
          setTotalScoreRes(response?.response?.data.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  const navigate = useNavigate();

  //triggered when the user clicks on any institution name
  const handleClickInstitution = () => {
    //navigate to the JsirfIndicativeTabs page with the institution type indicator, institution name and aishe code as state
    navigate(
      '/JsirfIndicativeTabs',
      {
        state: {
          institutionTypeIndicator: institutionTypeIndicator,
          CollegeName: institutionName,
          aisheCode: aisheCode
        }
      })
  }
  return (
    <div>
      <div className='mock-content'>
        <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}>Results (Indicative Score)</Typography>
        {/* Table component to display the indicative score of various institutions */}
        <TableContainer sx={{ marginTop: '10px', overflowX: 'unset' }}>
          <Table >
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow >
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderRadius: "5px 0 0 0px",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Ranking</TableCell>
                <TableCell className="allscoretableheader"
                  align='left' sx={{ fontSize: `${tableheadfont}px`, paddingBottom: '4px!important', paddingTop: '22px!important' }}>
                  Institution Name
                  <Typography className='statusinfomsg' sx={{ marginLeft: '0%!important', marginTop: '0px!important' }}> *Click on institution name to view criteria-specific score</Typography>
                </TableCell>
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderRadius: "0 5px 0px 0",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Indicative Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {TotalScoreRes === 'success' &&
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000'
                  }}
                  className='mock-row tableborder'
                >
                  <TableCell align='center' component="th" scope="row" style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px` }}>1</TableCell>
                  <TableCell align='left' style={{ fontSize: `${tablebodyfont}px`, cursor: "pointer", color: localStorage.getItem('theme') === 'dark' && '#ffffff' }} onClick={() => handleClickInstitution()}>{institutionName}</TableCell>
                  <TableCell align='center' style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px` }}>{score}</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Conditional rendering of error popup based on api response */}
      {TotalScoreRes !== '' && TotalScoreRes !== 'success' && (
        <Errorpopup
          showDialog={TotalScoreRes !== '' ? true : false}
          msg={TotalScoreRes}
          setoff={() => {
            setTotalScoreRes('')
          }}
        />
      )}
    </div>
  )
}

export default JsirfIndScoreUniv
