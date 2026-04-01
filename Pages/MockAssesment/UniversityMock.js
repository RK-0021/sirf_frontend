import React, { useEffect } from 'react'
import Header from "../../components/Menubar/menuBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './MockAssesment.css';
import { useNavigate } from "react-router-dom";
import { Total_Assessment_Score_GET_Call } from '../../services/MockAssessmentPage';
import Cookies from "js-cookie";
import { useState } from 'react';
import Errorpopup from '../../components/alert/Errorpopup';
import { onLogout } from '../../utils'
import '../../components/AllScores/AllScoreTable.css'
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back';
import { useFont } from "../../components/context/FontChangesContext";

const UniversityMock = () => {
  //Destructure and use the 'tableheadfont', 'tablebodyfont' value from the useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  //usestate hooks to store the various values including api response data
  const [TotalScoreRes, setTotalScoreRes] = useState('')
  const [institutionTypeIndicator, setInstitutionTypeIndicator] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [grade, setGrade] = useState('')
  const [score, setScore] = useState('')
  const [aisheCode, setAisheCode] = useState('')
  useEffect(() => {
    Total_Assessment_Score_GET_Call(Cookies.get('aishe'))
      //api call to get the total assessment score based on the aishe code
      .then((response) => {
        if (response.status === 200) {
          setTotalScoreRes('success')
          setInstitutionTypeIndicator(response.data.institutionTypeIndicator)
          if (response.data.institutionName === null) {
            setInstitutionName(response.data.aisheCode)
          }
          else {
            setInstitutionName(response.data.institutionName)
          }
          setGrade(response.data.grade)
          setScore(response.data.scoreTotal)
          setAisheCode(response.data.aisheCode)
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else if (response?.response?.status === 500) {
          setTotalScoreRes("Internal Server Error. Try Again!")
        }
        else if (response.response.status === 404) {
          setTotalScoreRes(response.response.data.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
    window.scrollTo(0, 0); // Scroll the window to the top-left corner (0, 0) when the component mounts
  }, [])
  const navigate = useNavigate();

  //triggered when the user clicks on any institution name
  const handleClickInstitution = () => {
    //navigate to the mockAssesment page with the institution type indicator, institution name and aishe code as state
    navigate('/mockAssesment',
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
        <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D'}}>Results (Self-Improvement)</Typography>
        {/* Table component to display the grade and total score of various institutions */}
        <TableContainer sx={{ marginTop: '10px', overflowX: "unset" }}>
          <Table >
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow >
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom: 'none',
                    fontSize: `${tableheadfont}px`,
                    borderRadius: "5px 0 0 0px",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Sl No.</TableCell>
                <TableCell className="allscoretableheader"
                  align='left'
                  sx={{ borderBottom: 'none', fontSize: `${tableheadfont}px`, paddingBottom: '4px!important', paddingTop: '22px!important' }}>
                  Institution Name
                  <Typography className='statusinfomsg' sx={{ marginLeft: '0%!important', marginTop: '0px!important' }}> *Click on Institution name to view criteria-specific score</Typography>
                </TableCell>
                <TableCell sx={{ fontSize: `${tableheadfont}px`, borderBottom: 'none',color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important' }} className="allscoretableheader"
                  align='center'>Grade</TableCell>
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderBottom: 'none',
                    borderRadius: "0 5px 0px 0",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {TotalScoreRes === 'success' &&
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)'}}
                  className='mock-row tableborder'
                >
                  <TableCell style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff',fontSize: `${tablebodyfont}px` }} align='center' component="th" scope="row">1</TableCell>
                  <TableCell align='left' style={{color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px`, cursor: "pointer" }} onClick={() => handleClickInstitution()}>{institutionName}</TableCell>
                  <TableCell style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff',fontSize: `${tablebodyfont}px` }} align='center'>{grade}</TableCell>
                  <TableCell align='center' style={{ fontSize: `${tablebodyfont}px`, color:localStorage.getItem('theme')==='dark'?'#ffffff': ((score >= 0 && score < 1) ? '#E23636' : (score >= 4) ? '#00871E' : '#000000') }}>{score}</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Conditional rendering of the error popup based on api response */}
      {TotalScoreRes !== '' && TotalScoreRes !== 'success' && (
        <Errorpopup
          showDialog={TotalScoreRes !== '' ? true : false}
          msg={TotalScoreRes}
          setoff={() => {
            setTotalScoreRes('')
          }}
          initialNavValue={true}
        />
      )}
    </div>
  )
}

export default UniversityMock
