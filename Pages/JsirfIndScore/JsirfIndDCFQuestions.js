import React, { useEffect, useState } from 'react';
// import "../../components/JSIRFDataValidation/JSIRFQuestionsDCF";
import { Box, Stepper, Step, StepConnector, StepLabel, stepConnectorClasses, StepIcon, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/material/Autocomplete';
import JsirfCriteria from '../../components/JsirfCriteria/JsirfCriteriaNew';
import { useFont } from "../../components/context/FontChangesContext";
import JsirfFilters from '../../components/JsirfFilters/JsirfFiltersNew';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PageLoader from "../../components/loader/PageLoader";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import { useLocation } from "react-router-dom";
import { JSIRF_QuestionScore } from "../../services/JsirfAssessment.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { onLogout } from '../../utils/index.js';
import { LatestScore_GET_Call } from '../../services/JsirfIndScoreApi';
import LatestUpdate from "../../components/JSIRFDataValidation/JSIRFUpdates.js";
import '../../components/AllScores/AllScoreTable.css'
import Back from '../../components/BackButton/Back.js';

const DataValApprove = () => {
  //Destructuring and using font size from usefont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont } = useFont();
  const [isloading, setIsloading] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [getUniversityRes, setGetUniversityRes] = useState(false)
  const { state } = useLocation(); //values received from the previous page
  const navigate = useNavigate();
  const aisheCode = state?.aisheCode
  const [rows, setRows] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [detailsname, setDetailsname] = useState('')
  const [detailsHeader, setDetailsHeader] = useState('')

  //function passed onto <JsirfCriteria /> child component (Child to parent communication)
  //criteria selected from child component 
  function handleDetailsHeaderState(newValue, newName, assessmentIndicator) {
    setIsloading(true);
    setSelectedQuestion('')
    //API call to get score based on the selected criteria and aishecode
    JSIRF_QuestionScore(newValue, state.aisheCode)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length <= 0) {
            setGetUniversityRes(true)
          }
          setGetUniversityRes(false)
          setIsloading(false);
          setQuestions(response.data)
        }
        else if (response.response?.status === 404) {
          setIsloading(false);
          setQuestions([])
          setSelectedQuestion('')
          setErrorMessage(response?.response?.data?.message);
        }
        else if (response.response?.status === 401) {
          setIsloading(false);
          setQuestions([])
          setSelectedQuestion('')
          setErrorMessage(response?.response?.data?.message + " Please login for Access!");
          onLogout();
          localStorage.removeItem('theme')
        }
        else if (response?.response?.status === 500) {
          setIsloading(false);
          setQuestions([])
          setSelectedQuestion('')
          setErrorMessage("Internal Server Error. Try Again!")
        }
        else {
          setIsloading(false);
          setQuestions([])
          setSelectedQuestion('')
          setErrorMessage("Error fetching Data" + response.response?.data?.message);
        }
      })
      .catch((error) => {
        setIsloading(false);
        setErrorMessage("Error fetching Data", error);
      });
  }

  const [questions, setQuestions] = useState([])

  //autocomplete dropdown list
  const questionsdropdownlist = questions.map((item) => {
    return { label: item.questionDescription }
  })

  //Filter function to display only the selected question
  function displayQuestion(obj) {
    return (obj.questionDescription === selectedQuestion || selectedQuestion === '');
  }

  //final set of rows to be displayed
  const newrows = questions.filter(displayQuestion)
  const userType = Cookies.get("userType");

  return (
    <>

      <div>
        <LatestUpdate />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <div style={{ display: "flex" }}>
            <Back />
            <Autocomplete
              value={selectedQuestion}
              inputValue={selectedQuestion}
              disablePortal
              onInputChange={(event, newInputValue) => {
                setSelectedQuestion(newInputValue);
              }}
              options={questionsdropdownlist}
              renderInput={(params) => <TextField {...params} placeholder="Search for Questions" sx={{
                width: "450px",
                marginLeft: '15px',
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
          <JsirfCriteria change={handleDetailsHeaderState} institutionTypeIndicator={state?.institutionTypeIndicator} assessmentIndicator='JSIRF' />
        </div>
        {isloading ? (<PageLoader />) :
          <div style={{ marginTop: '20px' }}>
            <Box>
              {/* Table component to display questions and the extracted values */}
              <TableContainer >
                <Table>
                  <TableHead sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}>
                    <TableRow >
                      <TableCell className="allscoretableheader"
                        sx={{
                          borderBottom: 'none',
                          width: "5%",
                          fontSize: `${tableheadfont}px`,
                          borderRadius: "5px 0 0 0px",
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }} align='center'>Sl No.</TableCell>
                      <TableCell className="allscoretableheader"
                        sx={{
                          borderBottom: 'none',
                          textAlign: "left",
                          width: "20%",
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }} align='left'>
                        Details
                      </TableCell>
                      <TableCell className="allscoretableheader"
                        sx={{
                          borderBottom: 'none',
                          width: "10%",
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }} align='left'></TableCell>
                      <TableCell className="allscoretableheader"
                        sx={{
                          borderBottom: 'none',
                          borderRadius: "0 5px 0px 0",
                          width: "8%",
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }} align='center'>Extracted Value</TableCell>
                    </TableRow>
                  </TableHead>
                  {getUniversityRes ? (
                    // <TableBody>
                    // <div>
                    <TableBody>
                      <TableCell align='left' style={{ borderBottom: 'none' }}>
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none' }}>
                        <p
                          style={{
                            color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)!important' : "red",
                            textAlign: "left",
                            marginTop: "15px",
                            marginLeft: "350px",
                            // fontFamily: "Roboto",
                            fontSize: "17px",
                            fontWeight: 400,
                            overflowX: "hidden",
                            width: "280px"
                            // display:"flex"
                          }}
                        >
                          {/* <Typography sx={{
                          textAlign: "center",
                          marginTop: "10px",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "21px",
                          letterSpacing: "0em",
                          color: "red",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginLeft:"-400px"
                        }}> */}
                          Data is not available for this Criteria
                          {/* </Typography> */}
                        </p>
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none' }}>
                      </TableCell>
                    </TableBody>
                    // </div>
                  )
                    : (
                      <TableBody className="tableborder">
                        {newrows?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)') }}
                            className='mock-row tableborder'
                          >
                            <TableCell align='center' component="th" scope="row" sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important', fontSize: `${tablebodyfont}px`, borderBottom: 'none' }}>
                              {`${index + 1}.`}
                            </TableCell>
                            <TableCell align='justify' sx={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important' }}>
                              {row.questionDescription}
                            </TableCell>
                            <TableCell align='left' style={{ fontSize: `${tablebodyfont}px`, borderBottom: 'none' }}>
                            </TableCell>
                            <TableCell align='center' sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important', fontSize: `${tablebodyfont}px`, marginLeft: "100px", borderBottom: 'none' }}>
                              {row.extractedValue}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
                </Table>
              </TableContainer>
            </Box>

            {/* Conditional rendering of Alertpopup and Errorpopup */}
            {showAlert && (
              <Alertpopup
                showDialog={showAlert}
                msg={showAlert}
                setoff={() => setShowAlert(false)}
              />
            )}
            {errorMessage && (
              <Errorpopup
                showDialog={errorMessage}
                msg={errorMessage}
                setoff={() => setErrorMessage(false)}
              />
            )}
          </div >}
      </div>
    </>
  );
}

export default DataValApprove;
