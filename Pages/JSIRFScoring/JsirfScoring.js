import React, { useEffect, useState } from "react";
import Header from "../../components/Menubar/menuBar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import JsirfScoreFilters from "../../components/JsirfScoreFilters/JsirfScoreFiltersNew";
import JsirfScoreCriteria from "../../components/JsirfScoreCriteria/JsirfScoreCriteriaNew";
import JsirfScoreTable from "../../components/JsirfScoreTable/JsirfScoreTable";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Errorpopup from "../../components/alert/Errorpopup";
import "../MockAssesment/MockAssesment.css";
import { LatestScore_GET_Call } from "../../services/JsirfScoringApi";
import { onLogout } from '../../utils/index.js';
import { Typography } from "@mui/material";
import Back from "../../components/BackButton/Back.js";
import { useFont } from "../../components/context/FontChangesContext";

const JsirfScoring = () => {
  const { pageheadfont } = useFont(); //Destrcuturing and using pageheadfont from usefont custom hook
  const [rows, setRows] = useState([]);
  const { state } = useLocation(); //state holds the values received from the previous page
  const aisheCode = state.aisheCode;

  //usestate to store selected question and other values
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [detailsname, setDetailsname] = useState("");
  const [detailsHeader, setDetailsHeader] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorRes, setErrorRes] = useState("");

  //Function passed on to <JsirfScoreCriteria /> child component
  //criteria is selected from child component and passed back to the function (Child to parent communication)
  function handleDetailsHeaderState(newValue, newName, assessmentIndicator) {
    setDetailsname(newName);
    setDetailsHeader(newValue);
    setSelectedQuestion('')
    //API call to get the latest score based on the selected criteria, assessment indicator and aishecode
    LatestScore_GET_Call(aisheCode, assessmentIndicator, newValue)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRows(response.data);
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
          setRows([])
          setSelectedQuestion('')
          setErrorMsg("fail");
          setErrorRes(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setRows([])
          setSelectedQuestion('')
          setErrorMsg("fail");
          setErrorRes(response?.response?.data?.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Autocomplete component dropdown option list
  const questionsdropdownlist = rows.map((item) => {
    return { label: item.keyIndicatorDescription };
  });

  //Filter function to display  only the selected question
  //displays all questions if no question is chosen
  function displayQuestion(obj) {
    return (
      obj.keyIndicatorDescription === selectedQuestion ||
      selectedQuestion === ""
    );
  }

  //final set of rows to be displayed
  const newrows = rows.filter(displayQuestion);

  return (
    <>
      <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D', marginLeft: '2%' }}>Criteria-Specific JSIRF Score</Typography>
      <div className="mock-header">
        <div style={{ display: 'flex', width: '27%', justifyContent: 'space-between' }}>
          <Back />
          {/* Criteria Component */}
          <JsirfScoreCriteria
            change={handleDetailsHeaderState}
            institutionTypeIndicator={state.institutionTypeIndicator}
            assessmentIndicator="MOCK"
          />
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
              backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 1)' : '#ffffff',
              color: '#ffffff',
              '& .MuiAutocomplete-option.Mui-focused': {
                backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(0,0,0,0.5)' : '#2F664D',
                color: '#ffffff',
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for specific Key Indicator"
              sx={{
                width: "450px",
                height: "48px",
                borderRadius: "5px",
                background: localStorage.getItem('theme') === 'dark' ? "rgba(141, 141, 141, 0.4)" : "#DFE7DE",
                boxShadow: "0px 4px 15px 0px #00000040",
                "& .MuiOutlinedInput-input": {
                  //fontFamily: "Roboto!important",
                  fontSize: "15px!important",
                  fontWeight: "400!important",
                  lineHeight: "18px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  paddingTop: "0px!important",
                },
                "& .MuiAutocomplete-input": {
                  padding: "2.5px 4px 7.5px 5px!important",
                },
                "& .MuiOutlinedInput-root": {
                  paddingRight: '20px!important'
                },
              }}
            />
          )}
        />

        {/* Filter Component called with state as props */}
        {Cookies.get("role") === "UNIVERSITY" ? (
          <JsirfScoreFilters state={state} />
        ) : (
          ""
        )}
      </div>

      {/* Table component called with state and other table details as props */}
      <div className="mock-content">
        <JsirfScoreTable
          state={state} //state received from the previous page
          detailsHeader={detailsHeader} //selected criteria header
          detailsname={detailsname} //selected criteria
          newrows={newrows} //final list of rows to be displayed
        />
      </div>

      {/* Conditional rendering of Errorpopup */}
      {errorMsg === "fail" && (
        <Errorpopup
          showDialog={errorMsg === "fail" ? true : false}
          msg={errorRes}
          setoff={() => {
            setErrorMsg("");
          }}
        />
      )}
    </>
  );
};

export default JsirfScoring;
