import React from 'react'
import Header from "../../components/Menubar/menuBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import JsirfFilters from '../../components/JsirfFilters/JsirfFiltersNew'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useFont } from "../../components/context/FontChangesContext";
import TableRow from '@mui/material/TableRow';
import '../MockAssesment/MockAssesment.css';
import { useEffect } from 'react';
import { Colleges_GET_Call } from '../../services/JsirfIndScoreApi';
import Cookies from "js-cookie";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Errorpopup from '../../components/alert/Errorpopup';
import JSIRFIndicativeTabs from '../../Pages/JsirfIndScore/JsirfIndicativeTabs';
import '../../components/AllScores/AllScoreTable.css'
import { onLogout } from '../../utils/index.js';
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back.js';

const JsirfIndScoreClg1 = () => {
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  const [res, setRes] = useState('')
  const { state } = useLocation();
  const navigate = useNavigate();
  const [collegeList, setCollegeList] = useState([])
  const [getCollegeRes, setGetCollegeRes] = useState()
  const collegeDropdownList = collegeList.map((item) => {
    return { label: item.collegeName }
  })

  const [selectedCollege, setSelectedCollege] = useState('')
  function displayColleges(obj) {
    return (obj.collegeName === selectedCollege || selectedCollege === '');
  }
  const newrows = collegeList.filter(displayColleges)
  useEffect(() => {
    Colleges_GET_Call(Cookies.get('aishe'))
      .then((response) => {
        if (response.status === 200) {
          setCollegeList(response.data)
          setGetCollegeRes(true)
          setRes('success')
        }
        else if (response.response?.status === 401) {
          setGetCollegeRes(false)
          setRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setGetCollegeRes(false)
          setRes(response?.response?.data?.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  const handleClickCollege = (obj) => {
    navigate(
      // '/indiscore',
      '/JsirfIndicativeTabs',
      {
        state: {
          aisheCode: obj.aisheCode,
          institutionTypeIndicator: obj.institutionTypeIndicator,
          CollegeName: obj.collegeName
        }
      }
    )
  }
  return (
    <>
    <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D',marginLeft:'2%'}}>Results (Indicative Score)</Typography>
      <div className='mock-header'>
      <div style={{display:'flex'}}>
        <Back />
        <Autocomplete
          inputValue={selectedCollege}
          disablePortal
          onInputChange={(event, newInputValue) => {
            setSelectedCollege(newInputValue);
          }}
          options={collegeDropdownList}
          renderInput={(params) => <TextField {...params} placeholder="Search for colleges" sx={{
            width: "450px",
            marginLeft:'15px',
            height: "48px",
            borderRadius: "5px",
            background: "#DFE7DE",
            boxShadow: "0px 4px 15px 0px #00000040",
            "& .MuiOutlinedInput-input": {
              //fontFamily: "Roboto!important",
              fontSize: "15px!important",
              fontWeight: "400!important",
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
              paddingTop: "0px!important"
            },
            "& .MuiAutocomplete-input": {
              padding: "2.5px 4px 7.5px 5px!important"
            },
            "& .MuiOutlinedInput-root": {
              paddingRight: '20px!important'
            }
          }} />}
        />
        </div>
        <JsirfFilters state={state} />
      </div>
      <div className='mock-content'>
        <TableContainer sx={{overflowX:'unset'}}>
          <Table >
            <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
              <TableRow >
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom:'none',
                    borderRadius: "5px 0 0 0px",
                    fontSize: `${tableheadfont}px`,
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Ranking</TableCell>
                <TableCell className="allscoretableheader"
                  align='left' sx={{fontSize: `${tableheadfont}px`,paddingBottom:'4px!important', paddingTop:'22px!important',borderBottom:'none'}}>
                  Institution Name
                  <Typography className='statusinfomsg' sx={{marginLeft:'0%!important', marginTop:'0px!important'}}> *Click on institution name to view criteria-specific score</Typography>
                </TableCell>
                {/* <TableCell className="allscoretableheader"
                align='center'>
                  Grade
                </TableCell> */}
                <TableCell className="allscoretableheader"
                  sx={{
                    borderBottom:'none',
                    borderRadius: "0 5px 0px 0",
                    fontSize: `${tableheadfont}px`,
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                  }} align='center'>Indicative Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableborder">
              {getCollegeRes && newrows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)') }}
                  className='mock-row tableborder'
                >
                  <TableCell align='center' component="th" scope="row" style={{color: localStorage.getItem('theme') === 'dark' && '#ffffff',fontSize: `${tablebodyfont}px`,borderBottom:'none'}}>
                    {`${index + 1}.`}
                  </TableCell>
                  <TableCell align='left' style={{color: localStorage.getItem('theme') === 'dark' && '#ffffff',fontSize: `${tablebodyfont}px`, cursor: "pointer",borderBottom:'none' }} onClick={() => handleClickCollege(row)}>{row.collegeName}</TableCell>
                  {/* <TableCell align='center'>{row.grade}</TableCell> */}
                  <TableCell align='center' style={{color: localStorage.getItem('theme') === 'dark' && '#ffffff',fontSize: `${tablebodyfont}px`,borderBottom:'none'}}>{row.totalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {res !== '' && res !== 'success' && (
        <Errorpopup
          showDialog={(res !== '' && res !== 'success') ? true : false}
          msg={res}
          setoff={() => {
            setRes('')
          }}
        />
      )}
    </>
  )
}

export default JsirfIndScoreClg1