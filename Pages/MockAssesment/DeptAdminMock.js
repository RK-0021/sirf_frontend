import React, { useEffect, useState } from 'react'
import Header from "../../components/Menubar/menuBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './MockAssesment.css';
import { useNavigate } from "react-router-dom";
import { University_GET_Call } from '../../services/MockAssessmentPage';
import { useLocation } from "react-router-dom";
import { onLogout } from '../../utils';
import Errorpopup from '../../components/alert/Errorpopup';
import '../../components/AllScores/AllScoreTable.css'
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back';
import { useFont } from "../../components/context/FontChangesContext";

const DeptAdminMock = () => {
  //Destructuring and using font size from usefont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  const [errorRes, setErrorRes] = useState('')
  const { state } = useLocation(); //values received from the previous page
  const [getUniversityRes, setGetUniversityRes] = useState()
  useEffect(() => {
    //API call to get the institution list with their mock assessment grade and score
    University_GET_Call(state.heitype, state.districts)
      .then((response) => {
        if (response.status === 200) {
          setGetUniversityRes(true)
          setRows(response.data)
        }
        else if (response?.response?.data?.errorName === "Not Found") {
          setGetUniversityRes(false)
          setErrorRes(`No University found for the selected Hei Type and Districts`)
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setGetUniversityRes(false)
          setErrorRes(response?.response?.data?.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  const navigate = useNavigate();
  const [rows, setRows] = useState([])

  //navigate to /mockAssesment page when user clicks on any institution name
  //selected institution details are passed to the next page
  const handleClickUniversity = (institutionName, aisheCode, institutionTypeIndicator, assessmentIndicator) => {
    navigate(
      '/mockAssesment',
      {
        state: {
          institutionTypeIndicator: institutionTypeIndicator,
          assessmentIndicator, assessmentIndicator,
          institutionName: institutionName,
          aisheCode: aisheCode
        }
      }
    )
  }

  return (
    <div>
      <div className='mock-content'>
        <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}>HEI-Specific Results</Typography>
        <Back />
        {/* Table component to display the list of institutions with their mock assessment grade and score */}
        <TableContainer sx={{ marginTop: '10px', overflowX: 'unset' }}>
          <Table >
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow >
                <TableCell className="allscoretableheader"
                  sx={{
                    fontSize: `${tableheadfont}px`,
                    borderBottom: 'none',
                    borderRadius: "5px 0 0 0px",
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Sl No.</TableCell>
                <TableCell className="allscoretableheader"
                  align='left'
                  sx={{ fontSize: `${tableheadfont}px`, borderBottom: 'none', paddingBottom: '4px!important', paddingTop: '22px!important' }}>
                  Institution Name
                  <Typography className='statusinfomsg' sx={{ marginLeft: '0%!important', marginTop: '0px!important'}}> *Click on Institution name to view criteria-specific score</Typography>
                </TableCell>
                <TableCell className="allscoretableheader"
                  align='center' sx={{ fontSize: `${tableheadfont}px`, borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important' }}>Grade</TableCell>
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom: 'none',
                    borderRadius: "0 5px 0px 0",
                    fontSize: `${tableheadfont}px`,
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {getUniversityRes && rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)') }}
                  className='mock-row tableborder'
                >
                  <TableCell align='center' component="th" scope="row" style={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}>
                    {`${index + 1}.`}
                  </TableCell>
                  <TableCell align='left' style={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none', cursor: "pointer", color: localStorage.getItem('theme') === 'dark' && '#ffffff' }} onClick={() => handleClickUniversity(row.institutionName, row.aisheCode, row.institutionTypeIndicator, row.assessmentIndicator)}>{row.institutionName}</TableCell>
                  <TableCell align='center' style={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && '#ffffff' }}>{row.grade}</TableCell>
                  <TableCell align='center' style={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' ? '#ffffff' : ((row.score >= 0 && row.score < 1) ? '#E23636' : (row.score >= 4) ? '#00871E' : '#000000') }}>{row.score}</TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Conditional rendering of error popup */}
      {getUniversityRes === false && (
        <Errorpopup
          showDialog={getUniversityRes === false ? true : false}
          msg={errorRes}
          setoff={() => {
            setGetUniversityRes()
          }}
        />
      )}
    </div>
  )
}

export default DeptAdminMock