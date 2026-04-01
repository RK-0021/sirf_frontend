import React, { useEffect, useState } from 'react'
import Header from "../../components/Menubar/menuBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import JsirfCriteria from '../../components/JsirfCriteria/JsirfCriteriaNew';
import JsirfFilters from '../../components/JsirfFilters/JsirfFiltersNew';
import JsirfTable from '../../components/JsirfTable/JsirfTable';
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Errorpopup from '../../components/alert/Errorpopup';
import '../MockAssesment/MockAssesment.css'
import { LatestScore_GET_Call } from '../../services/JsirfIndScoreApi';
import { onLogout } from '../../utils/index.js';
import Back from '../../components/BackButton/Back.js';
const JsirfIndScore = () => {
  const [rows, setRows] = useState([])
  const { state } = useLocation(); //values received from the previous page
  const aisheCode = state?.aisheCode
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [detailsname, setDetailsname] = useState('')
  const [detailsHeader, setDetailsHeader] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorRes, setErrorRes] = useState('')

  //Function passed onto <JsirfCriteria /> child component (Child to parent communication)
  //criteria is selected from child component and passed back to the function
  function handleDetailsHeaderState(newValue, newName, assessmentIndicator) {
    setDetailsname(newName)
    setDetailsHeader(newValue);
    setSelectedQuestion('')
    //API call to get the latest score based on the selected criteria, assessment indicator and aishecode
    LatestScore_GET_Call(aisheCode, assessmentIndicator, newValue)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setRows(response?.data)
        }
        else if((response?.response?.data?.message).includes("as no DCF question is associated with it")){
          setErrorMsg('fail')
          setErrorRes(response?.response?.data?.message)
          setRows([])
          setSelectedQuestion('')
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
          setRows([])
          setSelectedQuestion('')
        }
        else if (response.response?.status === 401) {
          setErrorMsg('fail')
          setRows([])
          setSelectedQuestion('')
          setErrorRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setErrorMsg('fail')
          setErrorRes(response?.response?.data?.message)
          setRows([])
          setSelectedQuestion('')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  // Autocomplete component dropdown option list
  const questionsdropdownlist = rows.map((item) => {
    return { label: item.keyIndicatorDescription }
  })

  //Filter function to display  only the selected question
  function displayQuestion(obj) {
    return (obj.keyIndicatorDescription === selectedQuestion || selectedQuestion === '');
  }

  //final set of rows to be displayed
  const newrows = rows.filter(displayQuestion)
  console.log(newrows)
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: '27%' }}>
          <Back />
          <JsirfCriteria change={handleDetailsHeaderState} institutionTypeIndicator={state?.institutionTypeIndicator} assessmentIndicator='JSIRF' />
        </div>
        <Autocomplete
          value={selectedQuestion}
          inputValue={selectedQuestion}
          disablePortal
          onInputChange={(event, newInputValue) => {
            setSelectedQuestion(newInputValue);
          }}
          options={questionsdropdownlist}
          renderInput={(params) => <TextField {...params} placeholder="Search for specific Key Indicator" sx={{
            width: "450px",
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
        {/* Filter component called with state as props */}
        {Cookies.get("role") === 'UNIVERSITY' ? (
          <JsirfFilters state={state} />
        ) :
          ("")
        }
      </div>

      {/* Table component */}
      <div style={{ marginTop: '20px' }}>
        <JsirfTable state={state} detailsHeader={detailsHeader} detailsname={detailsname} newrows={newrows} />
      </div>

      {/* Conditional rendering of Errorpopup component */}
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
  )
}

export default JsirfIndScore
