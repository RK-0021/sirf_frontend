import React, { useState } from 'react';
import Header from "../../components/Menubar/menuBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Criteria from '../../components/Criteria/CriteriaNew';
import MockFilters from '../../components/MockFilters/MockFiltersNew';
import MockTable from '../../components/mockTable/MockTable';
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Errorpopup from '../../components/alert/Errorpopup';
import ClearIcon from '@mui/icons-material/Clear';
//import { useNavigate } from "react-router-dom";
import './MockAssesment.css';
import {
  Assessment_Score_GET_Call
} from '../../services/MockAssessmentPage';
import { onLogout } from '../../utils';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import { GetAllScores } from '../../services/MockAssessmentPage';
import { GetSpecificScores } from '../../services/MockAssessmentPage';
import AllScoreTable from '../../components/AllScores/AllScoreTable';
import Back from '../../components/BackButton/Back';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFont } from "../../components/context/FontChangesContext";

const MockAssesment = () => {
  const { pageheadfont } = useFont(); //Destrcuturing and using pageheadfont from usefont custom hook
  const [allscoreclicked, setAllscoreclicked] = useState('')//state to check if all scores button is clicked
  
  //states storing all api responses and other values 
  const [displayScore, setDisplayScore] = useState(false)
  const [rows, setRows] = useState([])
  const [allScoreRows, setAllScoreRows] = useState([])
  const { state } = useLocation();
  const aisheCode = state.aisheCode
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [detailsname, setDetailsname] = useState('')
  const [detailsHeader, setDetailsHeader] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorRes, setErrorRes] = useState('')

  //Function to get all scores and specific scores(/0/1/2/3/4)
  //triggered when all scores button is clicked
  const handleClickAllScores = (score) => {
    setAllscoreclicked('clicked')
    setSelectedQuestion('')
    setDisplayScore(true)
    if (score === 'all') {
      //to fetch all scores based on aishe code
      GetAllScores(aisheCode)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            setRows(response.data)
          }
          else if (response?.response?.data?.errorName === "Not Found") {
            setErrorMsg('fail');
            {
              (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') ?
                setErrorRes(
                  `No Scores Found for the selected Institution: ${state.institutionName}`
                ) :
                setErrorRes(
                  `No Assessment Scores Found for the selected Institution: ${state.CollegeName}`
                )
            }
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setErrorMsg('fail')
            setErrorRes("Internal Server Error. Try Again!")
          }
          else {
            setErrorMsg('fail')
            setErrorRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
    else {
      //if any score selected, fetches that specific score list based on aishe code and selected score
      GetSpecificScores(aisheCode, score)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            setRows(response.data)
          }
          else if (response?.response?.data?.errorName === "Not Found") {
            setErrorMsg('fail');
            {
              (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') ?
                setErrorRes(
                  `No Scores Found for the selected Institution: ${state.institutionName}, and selected Score: ${score}`
                ) :
                setErrorRes(
                  `No Scores Found for the selected Institution: ${state.CollegeName}, and selected Score: ${score}`
                )
            }
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setErrorMsg('fail')
            setErrorRes("Internal Server Error. Try Again!")
          }
          else {
            setErrorMsg('fail')
            setErrorRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  //Function passed onto <Criteria /> child component (Child to parent communication)
  //criteria is selected from child component and passed back to the function
  function handleDetailsHeaderState(newValue, newName, assessmentIndicator) {
    setAllscoreclicked('')
    setDisplayScore(false)
    setDetailsname(newName)
    setDetailsHeader(newValue);
    setSelectedQuestion('');
    //fetch score based on the selected criteria, assessment indicator and aishecode
    Assessment_Score_GET_Call(aisheCode, assessmentIndicator, newValue)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setRows(response.data)
        }
        else if (response?.response?.data?.errorName === "Not Found") {
          setErrorMsg('fail');
          {
            (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') ?
              setErrorRes(
                `No Assessment Scores Found for the selected Institution: ${state.institutionName}, and selected Criteria: ${newName}`
              ) :
              setErrorRes(
                `No Assessment Scores Found for the selected Institution: ${state.CollegeName}, and selected Criteria: ${newName}`
              )
          }
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else if (response?.response?.status === 500) {
          setErrorMsg('fail')
          setErrorRes("Internal Server Error. Try Again!")
        }
        else {
          setErrorMsg('fail')
          setErrorRes(response?.response?.data?.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  //Autocomplete component dropdown option list
  const questionsdropdownlist = rows.map((item) => {
    return { label: item.keyIndicatorDescription }
  })

  //Filter function to display  only the selected question
  function displayQuestion(obj) {
    return (obj.keyIndicatorDescription === selectedQuestion || selectedQuestion === '');
  }

  //final list of rows to be displayed
  const newrows = rows.filter(displayQuestion)

  return (
    <>
      <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D', marginLeft: '2%' }}>Criteria-Specific Score</Typography>
      <div className='mock-header' style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex' }}>
          <Back />
          <Criteria change={handleDetailsHeaderState} institutionTypeIndicator={state.institutionTypeIndicator} assessmentIndicator='MOCK' clicked={allscoreclicked} />
          <Button
            sx={{
              // width: '141px',
              width: '5.6rem',
              height: '48px',
              borderRadius: '5px',
              backgroundColor: '#218356',
              fontFamily: 'Roboto',
              fontSize: '15px',
              color: '#ffffff',
              marginRight: '10px',
              marginLeft: '10px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#218356',
              },
            }}
            onClick={() => handleClickAllScores('all')}>
            All Scores
          </Button>

          {/* Specific Scores selection Component */}
          {displayScore &&
            <div style={{ display: 'flex' }}>
              <Box
                onClick={() => handleClickAllScores(0)}
                sx={{
                  marginRight: '2px',
                  cursor: 'pointer',
                  width: '63px',
                  height: '48px',
                  borderRadius: '5px 0px 0px 5px',
                  bgcolor: '#F04534',
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  paddingTop: '11px',
                  '&:hover': {
                    height: '57px',
                    marginTop: '-4px',
                    paddingTop: '15px'
                  },
                }}
              >
                0
              </Box>
              <Box
                onClick={() => handleClickAllScores(1)}
                sx={{
                  marginRight: '2px',
                  cursor: 'pointer',
                  width: '63px',
                  height: '48px',
                  borderRadius: '0px',
                  bgcolor: '#FFAC04',
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  paddingTop: '11px',
                  '&:hover': {
                    height: '57px',
                    marginTop: '-4px',
                    paddingTop: '15px'
                  },
                }}
              >
                1
              </Box>
              <Box
                onClick={() => handleClickAllScores(2)}
                sx={{
                  marginRight: '2px',
                  cursor: 'pointer',
                  width: '63px',
                  height: '48px',
                  borderRadius: '0px',
                  bgcolor: '#DFD300',
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  paddingTop: '11px',
                  '&:hover': {
                    height: '57px',
                    marginTop: '-4px',
                    paddingTop: '15px'
                  },
                }}
              >
                2
              </Box>
              <Box
                onClick={() => handleClickAllScores(3)}
                sx={{
                  marginRight: '2px',
                  cursor: 'pointer',
                  width: '63px',
                  height: '48px',
                  borderRadius: '0px',
                  bgcolor: '#669E0E',
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  paddingTop: '11px',
                  '&:hover': {
                    height: '57px',
                    marginTop: '-4px',
                    paddingTop: '15px'
                  },
                }}
              >
                3
              </Box>
              <Box
                onClick={() => handleClickAllScores(4)}
                sx={{
                  cursor: 'pointer',
                  width: '63px',
                  height: '48px',
                  borderRadius: '0px 5px 5px 0px',
                  bgcolor: '#00B319',
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  paddingTop: '11px',
                  '&:hover': {
                    height: '57px',
                    marginTop: '-4px',
                    paddingTop: '15px'
                  },
                }}
              >
                4
              </Box>
            </div>
          }
        </div>
        <Autocomplete
          value={selectedQuestion}
          inputValue={selectedQuestion}
          disablePortal
          onInputChange={(event, newInputValue) => {
            setSelectedQuestion(newInputValue);
          }}
          options={questionsdropdownlist}
          ListboxProps={{
            sx: {
              backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 1)':'#ffffff',
              color: '#ffffff',
              '& .MuiAutocomplete-option.Mui-focused': {
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(0,0,0,0.5)':'#2F664D',
                color: '#ffffff',
              },
            },
          }}
          renderInput={(params) => (<TextField {...params} placeholder="Search for specific Key Indicator" sx={{
            width: "450px",
            height: "48px",
            borderRadius: "5px",
            background: localStorage.getItem('theme') === 'dark' ? "rgba(141, 141, 141, 0.4)" : "#DFE7DE",
            boxShadow: "0px 4px 15px 0px #00000040",
            "& .MuiOutlinedInput-input": {
              fontFamily: "Roboto!important",
              fontSize: "15px!important",
              fontWeight: "400!important",
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
              paddingTop: "0px!important",
            },
            "& .MuiAutocomplete-input": {
              padding: "2.5px 4px 7.5px 5px!important"
            },
            "& .MuiOutlinedInput-root": {
              paddingRight: '20px!important'
            },
          }}
            InputProps={{ ...params.InputProps, endAdornment: selectedQuestion && <ClearIcon onClick={() => setSelectedQuestion('')} cursor='pointer' /> }} />)}
        />

        {/* Filter component called with state as props */}
        {Cookies.get("role") === 'UNIVERSITY' ? (
          <MockFilters state={state} />
        ) :
          ("")
        }
      </div>

      {/* Conditional rendering of Table Component */}
      {/* If all score button clicked, all score table is called */}
      <div className='mock-content' >
        {displayScore ? <AllScoreTable institutionName={state.institutionName} newrows={newrows} /> :
          (Cookies.get("role") === 'ADMIN' || Cookies.get("role") === 'HEAD') ?
            <MockTable institutionName={state.institutionName} detailsHeader={detailsHeader} detailsname={detailsname} newrows={newrows} /> :
            <MockTable state={state} detailsHeader={detailsHeader} detailsname={detailsname} newrows={newrows} />
        }
      </div>

      {/* Conditional rendering of Errorpopup  */}
      {errorMsg === 'fail' && (
        <Errorpopup
          showDialog={errorMsg === 'fail' ? true : false}
          msg={errorRes}
          setoff={() => {
            setErrorMsg('')
          }}
        />
      )}
    </>
  );
}

export default MockAssesment;
