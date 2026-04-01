import React, { useEffect, useState } from "react";
import "../../components/DataValApprove/DataValApprove.css";
import { useFont } from "../../components/context/FontChangesContext";
import {
  TextField,
  Box,
  Stepper,
  Step,
  StepConnector,
  StepLabel,
  stepConnectorClasses,
  StepIcon,
  RadioGroup,
  Radio,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import { useLocation } from "react-router-dom";
import {
  Criteria_GET_Call,
  GetAdminQuestions_GET_Call,
} from "../../services/MockAssessmentPage";
import Header from "../../components/Menubar/menuBar";
import { onLogout } from "../../utils";
import PageLoader from "../../components/loader/PageLoader";
import "../../components/AllScores/AllScoreTable.css";
import Back from "../../components/BackButton/Back";

const DataAdmApprove = () => {
  // Destructure and use the values from useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  //usestate hooks to store the various values including api response data
  const [criteriaData, setCriteriaData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [currentCriteriaId, setCurrentCriteriaId] = useState(0);

  //steps and stepnumbers are created using the criteriaData
  //steps indicates the criteria and stepnumbers indicates the index in 2 digits (01,02..)
  const steps = criteriaData.map((data) => data.criteria);
  const stepNumbers = criteriaData.map((data, index) => {
    const stepNumber = (index + 1).toString().padStart(2, "0");
    return stepNumber;
  });

  useEffect(() => {
    setIsloading(true);
    //criteria api
    Criteria_GET_Call(state.instType, "JSIRF")
      .then((res) => {
        if (res.status === 200) {
          setCriteriaData(res.data);
          setCurrentCriteriaId(res.data[0].id);

          // fetching questions here
          GetAdminQuestions_GET_Call(res.data[0].id)
            .then((res) => {
              if (res?.status === 200) {
                setIsloading(false);
                setQuestions(res.data);
              } else if (res?.response?.status === 500) {
                setErrorMessage("Internal Server Error. Try Again!");
                setIsloading(false);
              } else if (res?.response?.status === 401) {
                onLogout();
                localStorage.removeItem('theme')
              } else {
                setErrorMessage(res?.response?.data?.message);
                setIsloading(false);
                setQuestions([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setIsloading(false);
              setQuestions([]);
            });
        } else if (res?.response?.status === 500) {
          setErrorMessage("Internal Server Error. Try Again!");
          setIsloading(false);
        } else if (res?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else {
          setErrorMessage(res?.response?.data?.message);
          setIsloading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsloading(false);
        setQuestions([]);
      });
  }, []);

  //function to handle the click on the step label
  const handleStepLabelClick = (stepIndex) => {
    setIsloading(true);
    setActiveStep(stepIndex);
    const selectedCriteriaId = criteriaData[stepIndex].id;
    setCurrentCriteriaId(selectedCriteriaId);
    //fetching questions based on the selected criteria
    GetAdminQuestions_GET_Call(selectedCriteriaId)
      .then((response) => {
        setIsloading(false);
        if (response.status === 200) {
          setQuestions(response.data);
        } else if (response.response?.status === 404) {
          setErrorMessage(response?.response?.data?.message);
          setQuestions([]);
        } else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else {
          setErrorMessage(
            "Error fetching Data" + response.response?.data?.message
          );
          setQuestions([]);
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      {isloading ? (
        <PageLoader />
      ) : (
        <div>
          <Typography
            className="page-heading"
            sx={{ fontSize: `${pageheadfont}px`, marginLeft: "2%", marginBottom: "20px", color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}
          >
            Assessment Questionnaire (JSIRF)
          </Typography>
          <div style={{ marginLeft: "25px" }}>
            <Back />
          </div>
          {/* Stepper component */}
          {steps.length !== 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "5px",
                padding: "20px",
                borderRadius: "3px",
                paddingTop: "125px",
                border: "0.5px solid",
                marginBottom: "35px",
                marginLeft: "25px",
                marginRight: "25px"
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  connector={
                    <StepConnector
                      sx={{
                        [`&.${stepConnectorClasses.active}`]: {
                          [`& .${stepConnectorClasses.line}`]: {
                            borderColor: "#289D68",
                          },
                        },
                        [`&.${stepConnectorClasses.completed}`]: {
                          [`& .${stepConnectorClasses.line}`]: {
                            borderColor: "#289D68",
                          },
                        },
                        [`& .${stepConnectorClasses.line}`]: {
                          borderColor: "transparent",
                          borderTopWidth: 3,
                          borderRadius: 1,
                        },
                        visibility: "visible",
                      }}
                    />
                  }
                >
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel
                        onClick={() => handleStepLabelClick(index)}
                        sx={{
                          cursor: "pointer",
                          "& .MuiStepLabel-label.Mui-active": {
                            color: localStorage.getItem('theme') === 'dark' && "#ffffff",
                          },
                          "& .MuiStepLabel-label.Mui-completed": {
                            color: localStorage.getItem('theme') === 'dark' && "#ffffff",
                          },
                          "& .MuiStepLabel-labelContainer": {
                            color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.4)!important'
                          }
                        }}
                      >
                        <StepIcon
                          sx={{
                            "&.MuiStepIcon-active": {
                              color: "#289D68 !important",
                              border: "0px solid !important",
                            },
                            "&.MuiStepIcon-completed": {
                              color: "#289D68 !important",
                              border: "0px solid !important",
                            },
                          }}
                        />
                        <div className="stepNo" >{stepNumbers[index]}</div>
                        <div className="label" >{label}</div>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                    </Box>
                  </React.Fragment>
                </div>
              </Box>
            </div>
          )}
          <div className="de-content2">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/* Table Component for displaying the questions and input fields */}
              <TableContainer>
                <Table>
                  <TableHead
                    sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}
                  >
                    <TableRow>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          borderBottom: 'none',
                          width: "8%",
                          borderRadius: "5px 0 0 5px",
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        Sl No.
                      </TableCell>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          width: "35%",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="left"
                      >
                        Details
                      </TableCell>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          width: "25%",
                          borderRadius: "0px 5px 5px 0px",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        Input Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableborderJDA">
                    {questions?.length !== 0 &&
                      questions?.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)'),
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="de-rowJDA"
                        >
                          <TableCell align="center" component="th" scope="row" style={{
                            fontSize: `${tablebodyfont}px`, borderBottom: 'none',
                            color: localStorage.getItem('theme') === 'dark' && '#ffffff',
                          }}>
                            {`${index + 1}.`}
                          </TableCell>
                          <TableCell align="left" style={{
                            borderBottom: 'none', fontSize: `${tablebodyfont}px`, color: localStorage.getItem('theme') === 'dark' && '#ffffff',
                          }}>
                            {row.question.questionDescription}
                          </TableCell>
                          <TableCell style={{
                            borderBottom: 'none', fontSize: `${tablebodyfont}px`
                          }}>
                            {row.question.questionType === "TEXT" ? (
                              // Render a single text field
                              <TextField
                                required
                                id="outlined-requireds"
                                disabled
                                sx={{
                                  width: "100% !important",
                                  height: "40px !important",
                                  padding: "0 !important",
                                  border: localStorage.getItem('theme') === 'dark' ? '1px dashed rgba(255, 255, 255, 0.6)' : "1px dashed #000",
                                  backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
                                  borderRadius: "5px",
                                  textAlign: "center",
                                }}
                              />
                            ) : row.question.questionType === "RADIO" ? (
                              <RadioGroup
                                aria-labelledby={`radio-group-label-${index}`}
                                name={`radio-group-${index}`}
                              >
                                {row.questionOptionsList.map((option) => (
                                  <FormControlLabel
                                    // sx={{
                                    //   '& .MuiButtonBase-root-MuiCheckbox-root.Mui-disabled':{
                                    //     color:'white'
                                    //   }
                                    // }}
                                    sx={{
                                      "& .MuiFormControlLabel-label.Mui-disabled": {
                                        color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important'
                                      }
                                    }}
                                    id="text_form"
                                    key={option.optionId}
                                    value={option.option}
                                    control={
                                      <Radio
                                        sx={{
                                          paddingTop: "0px",
                                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important'
                                        }}
                                      />
                                    }
                                    label={option.option}
                                    disabled
                                  />
                                ))}
                              </RadioGroup>
                            ) : row.question.questionType === "CHECKBOX" ? (
                              <>
                                <FormGroup>
                                  {row.questionOptionsList.map((option) => (
                                    <FormControlLabel
                                      // sx={{
                                      //   '& .MuiFormControlLabel-root .MuiFormControlLabel-label.Mui-disabled':{
                                      //     color:'white'
                                      //   }
                                      // }}
                                      id="check_form"
                                      sx={{
                                        "& .MuiFormControlLabel-label.Mui-disabled": {
                                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important'
                                        }
                                      }}
                                      key={option.optionId}
                                      value={option.option}
                                      label={option.option}
                                      control={<Checkbox className="check"
                                        sx={{
                                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important'
                                        }}
                                      // sx={{
                                      //   '& .MuiButtonBase-root-MuiCheckbox-root.Mui-disabled':{
                                      //     color:'white'
                                      //   }
                                      // }} 
                                      />}
                                      disabled
                                    />
                                  ))}
                                </FormGroup>
                              </>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Conditional rendering of the alert and error popups */}
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
          </div>
        </div>
      )}
    </>
  );
};

export default DataAdmApprove;
