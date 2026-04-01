import React, { useState, useEffect, useMemo } from "react";
import { useFont } from "../../components/context/FontChangesContext";
import "./dataEntry.css";
import {
  Button,
  Box,
  Stepper,
  Step,
  StepConnector,
  StepLabel,
  stepConnectorClasses,
  StepIcon,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import { useManagement } from "../../components/context/AssessmentManagementContext";
import Grid from "@mui/material/Grid";
import Header from "../../components/Menubar/menuBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import {
  InstitutionIndicator_GET_Call,
  Start_GET_Call,
  GetMockQuestions_GET_Call,
  Criteria_GET_Call,
  Total_Assessment_Score_GET_Call,
} from "../../services/MockAssessmentPage";
import Cookies from "js-cookie";
import client from "../../utils/axios-interceptor";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDropzone } from "react-dropzone";
import logo from "../../assets/images/add.svg";
import pdf from "../../assets/images/pdf.svg";
import QueryIcon from "../../assets/images/Query raised icon.png";
import ApprovedIcon from "../../assets/images/Completed status .png";
import CommentWindow from "../../components/Comments/comments";
import PageLoader from "../../components/loader/PageLoader";
import { onLogout } from "../../utils";
import eye from "../../assets/EnhancedImages/eye1.png";
import pdficon from "../../assets/EnhancedImages/pdficon.png";
import "../../components/AllScores/AllScoreTable.css";
import EyeEnabled from "../../assets/EnhancedImages/eyeEnabled.svg";
import PdfEnabled from "../../assets/EnhancedImages/PdfEnabled.svg";
import CommentIMG from "../../assets/images/userComment.png";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import pdfdark from '../../assets/DarkTheme/darkpdf.svg'

const DataEntry = () => {
  //Destructure and use the 'tableheadfont', 'tablebodyfont', 'pageheadfont' value from the useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, pageheadfont } = useFont();
  const [activeStep, setActiveStep] = useState(0);
  const { queryListArr, setQueryListArr } = useManagement();

  //usestate hooks to store the various values including api response data
  const [criteriaData, setCriteriaData] = useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileuploaded, setFileUploaded] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [questions, setQuestions] = useState([]);
  const [userEnteredValues, setUserEnteredValues] = useState([]);
  const [currentCriteriaId, setCurrentCriteriaId] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUp, setDialogUp] = useState(false);
  const [upFile, setUpFile] = React.useState([]);
  const [upFileName, setUpFileName] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isDisabled, setDisabled] = React.useState(false);
  const [isSaveDis, setIsSaveDis] = React.useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState({});
  const [hasQueriedCriteria, setHasQueriedCriteria] = useState(false);
  const [queriedCriteriaIds, setQueriedCriteriaIds] = useState([]);
  const [textFieldsValues, setTextFieldsValues] = React.useState([]);
  const [subDisable, setSubDisable] = useState(false);
  const [checkErrors, setCheckErrors] = useState(
    new Array(questions.length).fill(false)
  );
  const [updatedSelectedCheckboxes, setUpdatedSelectedCheckboxes] = useState(
    []
  );
  const [commentText, setCommentText] = useState("");
  const [commentErrors, setCommentErrors] = useState(
    Array(questions.length).fill(false)
  );
  const [commentTexts, setCommentTexts] = useState(
    Array(questions.length).fill("")
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [institutionName, setInstitutionName] = useState("");
  const [queryLastAd, setQueryLastAd] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [commentErrorMsg, setCommentErrorMsg] = useState("");
  const [questionDisable, setQuestionDisable] = useState(false);

  //steps and stepnumbers are created using the criteriaData
  //steps indicates the criteria and stepnumbers indicates the index in 2 digits (01,02..)
  const steps = criteriaData.map((data) => data.criteria);
  const stepNumbers = criteriaData.map((data, index) => {
    const stepNumber = (index + 1).toString().padStart(2, "0");
    return stepNumber;
  });

  // Function to save the answer and handle the response
  function save_call(answer) {
    client
      .post( //POST request to save the answer
        "https://sirfqa-backend.centralindia.cloudapp.azure.com/api/assessment/mock/save",
        JSON.stringify(answer)
      )
      .then((response) => {
        if (response?.status === 201) {
          const isLastStep = activeStep === stepNumbers.length - 1;
          if (isLastStep) {
            setIsSaved(true);
            setLoading(false);
          } else {
            const currentStepIndex = criteriaData.findIndex(
              (criteria) => criteria.id === currentCriteriaId
            );
            if (currentStepIndex < criteriaData.length - 1) {
              const nextCriteriaId = criteriaData[currentStepIndex + 1].id;
              setCurrentCriteriaId(nextCriteriaId);
              setIsloading(true);
              const storedAisheCode = Cookies.get("aishe");
              //fetching questions for the next criteria
              GetMockQuestions_GET_Call(storedAisheCode, nextCriteriaId)
                .then((questionsRes) => {
                  if (questionsRes?.status === 200) {
                    setIsloading(false);
                    setQuestions(questionsRes.data);
                    setTextFieldsValues([]);
                    setQueryListArr([]);
                    setCommentTexts([]);
                    setCommentErrors([]);
                    setCommentText("");
                    setUserEnteredValues(questionsRes.data.map((i) => ""));
                    setSelectedOptionIds({});
                    setLoading(false);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    if (hasQueriedCriteria) {
                      setUpFile(null);
                      setUpFileName("");
                    }
                    setQuestionIndex(0);
                    setUpFile([]);
                    setUpFileName([]);
                  } else if (questionsRes?.response?.status === 401) {
                    onLogout();
                    localStorage.removeItem('theme')
                  } else if (questionsRes?.response?.status === 500) {
                    setErrorMessage("Internal Server Error. Try Again!");
                    setIsSaveDis(true);
                    setIsloading(false);
                  } else {
                    setIsloading(false);
                    setErrorMessage(questionsRes?.response?.data?.message);
                    setLoading(false);
                    setIsSaveDis(true);
                  }
                })
                .catch((error) => {
                  setIsloading(false);
                  setLoading(false);
                  setIsSaveDis(true);
                  setErrorMessage(error?.response?.data?.message);
                  console.error("Error fetching data:", error);
                });
            }
          }
        } else if (response?.response?.status === 500) {
          setErrorMessage("Internal Server Error. Try Again!");
        } else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else {
          setErrorMessage(response?.response?.data?.message);
        }
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    setIsloading(true);
    const storedAisheCode = Cookies.get("aishe");
    //fetching the institution type indicator
    InstitutionIndicator_GET_Call(storedAisheCode)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.institutionTypeIndicator === null) { //prompting the user to select the HEI type if not selected
            setIsloading(false);
            setErrorMessage("Please select your HEI type.");
            setTimeout(() => {
              window.location.href = "/profile";
            }, 3000);
            return;
          } else {
            const institutionTypeIndicator = res.data.institutionTypeIndicator;
            Cookies.set("instiType", res.data.institutionTypeIndicator);

            if (res.data.requestedInstitutionTypeIndicator !== null) {
              if (
                res.data.approvalStatus === null ||
                res.data.approvalStatus !== "ACCEPTED"
              ) {
                setErrorMessage(
                  "Access Denied! Approval Status is pending for institution change."
                );
                setIsSaveDis(true);
                setIsloading(false);
                return;
              }
            }

            setInstitutionName(
              res.data.institutionName
                ? res.data.institutionName
                : "USER COMMENT"
            );

            //start the assesment api
            Start_GET_Call(storedAisheCode, institutionTypeIndicator)
              .then((res) => {
                if (res.status === 200) {
                  setHasQueriedCriteria(res.data.queriedCriteriaIds.length > 0);
                  setQueriedCriteriaIds(res.data.queriedCriteriaIds);
                  //criteria api
                  Criteria_GET_Call(institutionTypeIndicator, "MOCK")
                    .then((res) => {
                      if (res.status === 200) {
                        setCriteriaData(res.data);
                        setCurrentCriteriaId(res.data[0].id);

                        // fetching questions here
                        GetMockQuestions_GET_Call(
                          storedAisheCode,
                          res.data[0].id
                        )
                          .then((res) => {
                            if (res?.status === 200) {
                              setIsloading(false);
                              setQuestions(res.data);
                            } else if (res?.response?.status === 500) {
                              setErrorMessage(
                                "Internal Server Error. Try Again!"
                              );
                              setIsSaveDis(true);
                              setIsloading(false);
                            } else if (res?.response?.status === 401) {
                              onLogout();
                              localStorage.removeItem('theme')
                            } else {
                              setErrorMessage(res?.response?.data?.message);
                              setIsSaveDis(true);
                              setIsloading(false);
                            }
                          })
                          .catch((error) => {
                            console.error("Error fetching data:", error);
                            setIsSaveDis(true);
                            setIsloading(false);
                          });
                      } else if (res?.response?.status === 500) {
                        setErrorMessage("Internal Server Error. Try Again!");
                        setIsSaveDis(true);
                        setIsloading(false);
                      } else if (res?.response?.status === 401) {
                        onLogout();
                        localStorage.removeItem('theme')
                      } else {
                        setErrorMessage(res?.response?.data?.message);
                        setIsSaveDis(true);
                        setIsloading(false);
                      }
                    })
                    .catch((error) => {
                      console.error("Error fetching data:", error);
                      setIsSaveDis(true);
                      setIsloading(false);
                    });
                } else if (res?.response?.status === 500) {
                  setErrorMessage("Internal Server Error. Try Again!");
                  setIsSaveDis(true);
                  setIsloading(false);
                } else if (res?.response?.status === 401) {
                  onLogout();
                  localStorage.removeItem('theme')
                } else {
                  setErrorMessage(res?.response?.data?.message);
                  setIsSaveDis(true);
                  setIsloading(false);
                }
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
                setIsSaveDis(true);
                setIsloading(false);
              });
          }
        } else if (res?.response?.status === 500) {
          setErrorMessage("Internal Server Error. Try Again!");
          setIsSaveDis(true);
          setIsloading(false);
        } else if (res?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else if (res?.response?.data?.errorName === "Not Found") {
          setIsloading(false);
          setIsSaveDis(true);
          setErrorMessage(res?.response?.data?.message);
          setTimeout(() => {
            window.location.href = "/upload";
          }, 2000);
        } else {
          setErrorMessage(res?.response?.data?.message);
          setIsSaveDis(true);
          setIsloading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        setErrorMessage(
          error?.response?.data?.message + " Please login again Access!"
        );
        setIsSaveDis(true);
      });
  }, []);

  //useEffect to set the initial values for the textfields, checkboxes, radio buttons, pdfs and comments
  useEffect(() => {
    const initialTextFieldsValues = questions.map((item) => {
      if (
        item.question.questionType === "TEXT" &&
        item.question.numberOfResponses > 1
      ) {
        if (item.response) {
          const responses = item.response.split(",");
          while (responses.length < item.question.numberOfResponses) {
            responses.push("");
          }
          return responses;
        } else {
          return Array(item.question.numberOfResponses).fill("");
        }
      }
      return null;
    });
    setTextFieldsValues(initialTextFieldsValues);

    const initialTextFieldsValue = questions.map((item) => {
      if (item.question.questionType === "TEXT") {
        if (item.response) {
          const response = item.response;
          return response;
        } else {
          return "";
        }
      }
      return null;
    });
    setUserEnteredValues(initialTextFieldsValue);

    const checkValues = questions.map((item) => {
      if (item.question.questionType === "CHECKBOX") {
        if (item.response) {
          const optionIds = item.response.split(",").map((id) => id.trim());
          const checkedOptions = item.questionOptionsList
            .filter((option) => optionIds.includes(option.optionId.toString()))
            .map((option) => option.option);

          return checkedOptions;
        }
        return null;
      }

      return null;
    });
    setUpdatedSelectedCheckboxes(checkValues);

    const queriedPdfs = questions.map((item) => {
      if (item.attachment) {
        const attach = item.attachment;
        return attach;
      }
      return null;
    });
    setUpFile(queriedPdfs);

    const queriedPdfsName = questions.map((item) => {
      if (item.fileName) {
        const attach = item.fileName;
        return attach;
      }
      return null;
    });
    setUpFileName(queriedPdfsName);

    const lastUserComments = questions.map((item) => {
      if (item.queryList && item.queryList.length > 0) {
        const lastQuery = item.queryList[item.queryList.length - 1];
        return lastQuery.commentedBy !== "ADMIN" ? lastQuery.comment : "";
      }
      return "";
    });

    setCommentTexts(lastUserComments);
  }, [questions]);

  //pdf part
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 1.5 * 1024 * 1024) {
      setErrorMessage("File size exceeds the limit of 1.5MB");
      return;
    }

    const updatedNames = [...upFileName];
    updatedNames[questionIndex] = acceptedFiles[0].name;
    setUpFileName(updatedNames);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const updatedPdfs = [...upFile];
      updatedPdfs[questionIndex] = reader.result;
      setUpFile(updatedPdfs);
      setFileUploaded("Pdf uploaded successfully");
    };
  };

  //useDropzone hook to handle the file drop
  const dropZone = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    accept: { "application/pdf": [".pdf"] },
    disabled: !!upFile[questionIndex],
  });

  //function to delete the pdf
  const deletePdf = () => {
    const deletePdfs = [...upFile];
    const deleteNames = [...upFileName];

    deletePdfs[questionIndex] = null;
    deleteNames[questionIndex] = null;

    setUpFile(deletePdfs);
    setUpFileName(deleteNames);
  };

  // Function to get the current timestamp in the format MM/DD/YYYY HH:MM:SS
  function getCurrentTimestamp() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const timestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    return timestamp;
  }

  //comments part
  const handleSaveQuery = (id) => {
    const comment = commentTexts[selectedRowIndex]?.trim();

    const onlySpecialCharactersRegex = /^[,:\.\/\(\)\-' ]*$/;
    if (comment?.length === 0 || comment === undefined) {
      const newCommentErrors = [...commentErrors];
      newCommentErrors[selectedRowIndex] = true;
      setCommentErrors(newCommentErrors);
      setCommentErrorMsg("Comments must be present for querying question.");
      return;
    }
    if (comment?.length > 5000) {
      const newCommentErrors = [...commentErrors];
      newCommentErrors[selectedRowIndex] = true;
      setCommentErrors(newCommentErrors);
      setCommentErrorMsg("Comment exceeds the limit of 5000 characters.");
      return;
    }

    if (
      onlySpecialCharactersRegex.test(comment) &&
      !/[a-zA-Z0-9]/.test(comment)
    ) {
      const newCommentErrors = [...commentErrors];
      newCommentErrors[selectedRowIndex] = true;
      setCommentErrors(newCommentErrors);
      setCommentErrorMsg("Only special characters are not allowed.");
      return;
    }
    const notAllowedSpecialCharactersRegex = /[^a-zA-Z0-9,:\.\/\(\)\-' ]/;
    if (notAllowedSpecialCharactersRegex.test(comment)) {
      const newCommentErrors = [...commentErrors];
      newCommentErrors[selectedRowIndex] = true;
      setCommentErrors(newCommentErrors);
      setCommentErrorMsg(
        "Allowed special characters , : . / ( ) - '\nAny other special characters are not allowed."
      );
      return;
    }

    const newCommentTexts = [...commentTexts];
    newCommentTexts[selectedRowIndex] = commentTexts[selectedRowIndex];
    setCommentTexts(newCommentTexts);

    const newCommentErrors = [...commentErrors];
    newCommentErrors[selectedRowIndex] = false;
    setCommentErrors(newCommentErrors);

    setDialogOpen(false);
  };

  const handleCancelQuery = () => {
    const newCommentTexts = [...commentTexts];
    if (
      newCommentTexts[selectedRowIndex] !== null &&
      newCommentTexts[selectedRowIndex] !== undefined
    ) {
      newCommentTexts[selectedRowIndex] =
        newCommentTexts[selectedRowIndex].trim();
    } else {
      newCommentTexts[selectedRowIndex] = "";
    }

    const newCommentErrors = [...commentErrors];
    newCommentErrors[selectedRowIndex] = false;
    setCommentErrors(newCommentErrors);

    setCommentTexts(newCommentTexts);
    setDialogOpen(false);
    setCommentText("");
  };

  // Function to convert date-time string from "DD/MM/YYYY HH:MM:SS" format to "DD-MM-YYYY" format
  function timeconv(value) {
    const [datePart, timePart] = value.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    let formattedDate = "";
    if (!isNaN(date.getTime())) {
      let formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      let formattedDay = date.getDate().toString().padStart(2, "0");
      let formattedYear = date.getFullYear();
      formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
    }

    return formattedDate;
  }

  //onChange Functions
  const handleChange = (event, index) => {
    const updatedValues = [...userEnteredValues];
    updatedValues[index] = event.target.value;
    setUserEnteredValues(updatedValues);
  };

  const handleRadioChange = (event, index) => {
    const selectedOptionValue = event.target.value;
    const optionIndex = questions[index].questionOptionsList.findIndex(
      (option) => option.option === selectedOptionValue
    );

    if (optionIndex !== -1) {
      const selectedOptionLetter = String.fromCharCode(65 + optionIndex);
      setSelectedOptionIds((prevSelectedOptionIds) => ({
        ...prevSelectedOptionIds,
        [index]: selectedOptionLetter,
      }));
    }
  };

  const handleMultiResponseChange = (event, questionIndex, responseIndex) => {
    const updatedValues = [...textFieldsValues];
    const value = event.target.value;
    if (!updatedValues[questionIndex]) {
      updatedValues[questionIndex] = [];
    }
    updatedValues[questionIndex][responseIndex] = value;
    setTextFieldsValues(updatedValues);
  };

  // Function to get option IDs from a response string
  // If an option is provided, it checks if the option's ID is included in the response
  // Otherwise, it returns an array of option IDs
  const getOptionIdsFromResponse = (response, option) => {
    const optionIds = response.split(",").map((id) => id.trim());
    if (option) {
      return optionIds.includes(option.optionId.toString());
    }
    return optionIds;
  };

  // Function to get the option for a response based on its index
  // The response is expected to be a single character (e.g., 'A', 'B', 'C')
  // The index is used to access the corresponding question's options list
  const getOptionIdForResponse = (response, index) => {
    const optionIndex = response.charCodeAt(0) - 65;

    if (
      optionIndex >= 0 &&
      optionIndex < questions[index].questionOptionsList.length
    ) {
      return questions[index].questionOptionsList[optionIndex].option;
    }

    return "";
  };

  const handleCheckChange = (event, index) => {
    const selectedValue = event.target.value;
    const updatedCheckboxes = [...updatedSelectedCheckboxes];

    if (!updatedCheckboxes[index]) {
      updatedCheckboxes[index] = [];
    }

    if (updatedCheckboxes[index].includes(selectedValue)) {
      updatedCheckboxes[index] = updatedCheckboxes[index].filter(
        (value) => value !== selectedValue
      );
    } else {
      updatedCheckboxes[index] = [...updatedCheckboxes[index], selectedValue];
    }

    const hasNoneOfTheAbove = updatedCheckboxes[index].some((option) =>
      option.toLowerCase().includes("none")
    );

    if (updatedCheckboxes[index].length > 1 && hasNoneOfTheAbove) {
      const updatedErrors = [...checkErrors];
      updatedErrors[index] = true;
      setCheckErrors(updatedErrors);
    } else {
      const updatedErrors = [...checkErrors];
      updatedErrors[index] = false;
      setCheckErrors(updatedErrors);
    }

    setUpdatedSelectedCheckboxes(updatedCheckboxes);
  };
  
  //array of references for text fields based on the questions array
  const textFieldsRefs = questions.map((item) => {
    if (
      item.question.questionType === "TEXT" &&
      item.question.numberOfResponses > 1
    ) {
      return Array.from({ length: item.question.numberOfResponses }, () =>
        React.createRef()
      );
    }
    return null;
  });

  // Function to handle the "Enter" key press event for multi-response text fields
  const handleMultiResponseKeyDown = (event, index, i) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const nextResponseIndex =
        (i + 1) % questions[index].question.numberOfResponses;
      const nextQuestionIndex = nextResponseIndex === 0 ? index + 1 : index;
      const nextTextField =
        textFieldsRefs?.[nextQuestionIndex]?.[nextResponseIndex]?.current;

      if (nextTextField) {
        nextTextField.focus();
        nextTextField.select();
      }
    }
  };

  //handle input change for multi-response fields
  const handleInputChange = (event, index, i) => {
    const forbiddenCharacters = /[|&;$%@"'\\<>()+\r\n,]/g;
    const { value } = event.target;

    if (!forbiddenCharacters.test(value)) {
      handleMultiResponseChange(event, index, i);
    }
  };

  //handle input change for single-response fields
  const handleInputChange2 = (event, index) => {
    const forbiddenCharacters = /[|&;$%@"'\\<>()+\r\n,]/g;
    const { value } = event.target;

    if (!forbiddenCharacters.test(value)) {
      handleChange(event, index);
    }
  };

  //queried criterias
  const criteriaIdToStepMapping = {};
  criteriaData.forEach((criteria, index) => {
    criteriaIdToStepMapping[index] = criteria.id;
  });

  const currentStepIndex = criteriaData.findIndex(
    (criteria) => criteria.id === currentCriteriaId
  );

  //HANDLE SAVE
  const handleSave = () => {
    setLoading(true);
    const updatedQuestions = JSON.parse(JSON.stringify(questions));

    //all field validation
    const isEmptyOrWhitespace = (str) => {
      return !str || /^\s*$/.test(str);
    };

    const fieldErrorMessages = [];
    updatedQuestions.forEach((row, index) => {
      if (
        row.question.questionType === "TEXT" &&
        row.question.numberOfResponses > 1
      ) {
        // For multi-response text
        const userResponses = textFieldsValues[index];
        const hasEmptyResponse = userResponses.some((response) =>
          isEmptyOrWhitespace(response)
        );
        if (hasEmptyResponse) {
          fieldErrorMessages.push(
            `Question ${index + 1} requires all fields to be filled.`
          );
        }
      } else if (row.question.questionType === "RADIO") {
        // For radio
        const userSelectedOption = selectedOptionIds[index];
        if (!userSelectedOption && !row.response) {
          fieldErrorMessages.push(
            `Question ${index + 1} requires a selection.`
          );
        }
      } else if (row.question.questionType === "CHECKBOX") {
        // For checkbox
        const userSelectedOptions = updatedSelectedCheckboxes[index] || [];
        if (userSelectedOptions.length === 0) {
          fieldErrorMessages.push(
            `Question ${index + 1
            } requires at least one checkbox to be checked.`
          );
        }
      } else {
        // For other question types
        const userEnteredValue = userEnteredValues[index];
        if (!userEnteredValue) {
          fieldErrorMessages.push(`Question ${index + 1} requires an input.`);
        }
      }
    });

    if (fieldErrorMessages.length > 0) {
      setErrorMessage(fieldErrorMessages.join(" "));
      setLoading(false);
      return;
    }

    const isInputValid = (input) => {
      const validPattern = /^[.\d]*$/;
      return validPattern.test(input);
    };

    //wrong characters validation for save
    const errorMessages = [];
    updatedQuestions.forEach((question, index) => {
      if (
        question.question.questionType === "TEXT" &&
        question.question.numberOfResponses > 1
      ) {
        const responses = textFieldsValues[index];
        if (responses) {
          for (const response of responses) {
            if (!isInputValid(response)) {
              errorMessages.push(`Invalid input for question ${index + 1}`);
              break;
            }
          }
        }
      } else {
        if (question.question.questionType === "TEXT") {
          const userEnteredValue = userEnteredValues[index];
          if (!isInputValid(userEnteredValue)) {
            errorMessages.push(`Invalid input for question ${index + 1}`);
          }
        }
      }
    });

    if (errorMessages.length > 0) {
      setErrorMessage(errorMessages.join(","));
      setLoading(false);
      return;
    }

    //checkboxes none of the above validation
    const isNoneWrong = !updatedQuestions.some((row, index) => {
      if (row.question.questionType === "CHECKBOX") {
        const selectedCheckboxes = updatedSelectedCheckboxes[index].map(
          (option) => option.toLowerCase()
        );
        const hasNone = selectedCheckboxes.some((option) =>
          option.startsWith("none")
        );
        const hasOtherSelections = selectedCheckboxes.length > 1;

        if (hasNone && hasOtherSelections) {
          return true;
        }
      }
      return false;
    });

    if (!isNoneWrong) {
      setErrorMessage(
        "You cannot choose another option with None of the Above."
      );
      setLoading(false);
      return;
    }

    if (!hasQueriedCriteria) {
      //the answers

      updatedQuestions.forEach((question, index) => {
        if (
          question.question.questionType === "TEXT" &&
          question.question.numberOfResponses > 1
        ) {
          // Case 1: For multi-response text questions
          question.response = textFieldsValues[index]
            ? textFieldsValues[index].join(",")
            : question.response;
        } else if (
          question.question.questionType === "TEXT" &&
          question.question.numberOfResponses <= 1
        ) {
          // Case 2: For text questions with one or zero responses
          const userEnteredValue = userEnteredValues[index];
          question.response = userEnteredValue
            ? userEnteredValue
            : question.response;
          // console.log(question.response);
        } else if (question.question.questionType === "RADIO") {
          // Case 3: For radio questions
          const userEnteredValue = selectedOptionIds[index];
          question.response = userEnteredValue
            ? userEnteredValue
            : question.response;
          // console.log(question.response);
        } else if (question.question.questionType === "CHECKBOX") {
          // Case 4: For checkbox questions
          const selectedValue = updatedSelectedCheckboxes[index] || [];
          const selectedOptions = selectedValue.map((selectedCheckbox) =>
            questions[index].questionOptionsList.find(
              (option) => option.option === selectedCheckbox
            )
          );
          const optionIds = selectedOptions
            .map((option) => String(option.optionId))
            .join(",");
          question.response = optionIds ? optionIds : question.response;

          let countOfResponses = 0;
          if (
            selectedOptions.some((option) =>
              option.option.toLowerCase().startsWith("none")
            )
          ) {
            countOfResponses = 0;
          } else {
            countOfResponses = selectedOptions.length;
          }
          question.countOfResponses = countOfResponses;
        }
      });

      save_call(updatedQuestions);
    } else {
      // queried type
      const queriedQuestions = updatedQuestions
        .map((question, index) => ({ ...question, originalIndex: index }))
        .filter((question) => question.approvalStatus !== "ACCEPTED");

      queriedQuestions.forEach((question) => {
        const index = question.originalIndex;

        if (
          question.question.questionType === "TEXT" &&
          question.question.numberOfResponses > 1
        ) {
          question.response = textFieldsValues[index]
            ? textFieldsValues[index].join(",")
            : question.response;
        } else if (
          question.question.questionType === "TEXT" &&
          question.question.numberOfResponses <= 1
        ) {
          const userEnteredValue = userEnteredValues[index];
          question.response = userEnteredValue
            ? userEnteredValue
            : question.response;
        } else if (question.question.questionType === "RADIO") {
          const userEnteredValue = selectedOptionIds[index];
          question.response = userEnteredValue
            ? userEnteredValue
            : question.response;
        } else if (question.question.questionType === "CHECKBOX") {
          const selectedValue = updatedSelectedCheckboxes[index] || [];
          const selectedOptions = selectedValue.map((selectedCheckbox) =>
            questions[index].questionOptionsList.find(
              (option) => option.option === selectedCheckbox
            )
          );
          const optionIds = selectedOptions
            .map((option) => String(option.optionId))
            .join(",");
          question.response = optionIds ? optionIds : question.response;

          let countOfResponses = 0;
          if (
            selectedOptions.some((option) =>
              option.option.toLowerCase().startsWith("none")
            )
          ) {
            countOfResponses = 0;
          } else {
            countOfResponses = selectedOptions.length;
          }
          question.countOfResponses = countOfResponses;
        }
      });

      const missingPDFs = [];
      const missingComments = [];

      queriedQuestions.forEach((question) => {
        const index = question.originalIndex;
        if (upFile[index] === null) {
          missingPDFs.push(index + 1);
        }
        if (!commentTexts[index]) {
          missingComments.push(index + 1);
        }
      });

      const errorMessages = [];

      if (missingPDFs.length > 0) {
        errorMessages.push(
          `No PDF found: Question ${missingPDFs.join(" and ")}`
        );
      }

      if (missingComments.length > 0) {
        errorMessages.push(
          `No comment found: Question ${missingComments.join(" and ")}`
        );
      }

      if (errorMessages.length > 0) {
        setErrorMessage(errorMessages.join(". "));
        setLoading(false);
        return;
      }

      queriedQuestions.forEach((question) => {
        const index = question.originalIndex;

        if (upFileName.length !== 0) {
          question.attachment = upFile[index] !== null ? upFile[index] : null;
          question.fileName =
            upFileName[index] !== null ? upFileName[index] : null;
        }

        if (commentTexts[index]) {
          const userName = Cookies.get("username");
          const l = question.queryList.length;
          const lastQuery = question.queryList[l - 1];

          if (lastQuery.commentedBy === "ADMIN") {
            const modifiedQuery = {
              comment: commentTexts[index]?.trim(),
              commentedBy: userName,
              submissionTimestamp: getCurrentTimestamp(),
              responseId: question.responseId,
            };
            question.queryList = [modifiedQuery];
          } else {
            const modifiedQuery = {
              queryId: lastQuery.queryId,
              comment: commentTexts[index]?.trim(),
              commentedBy: userName,
              submissionTimestamp: getCurrentTimestamp(),
              responseId: question.responseId,
            };
            question.queryList = [modifiedQuery];
          }
        } else {
          question.queryList = [];
        }
      });

      const queriedQuestionsForApi = queriedQuestions.map(
        ({ originalIndex, ...questionForApi }) => questionForApi
      );
      save_call(queriedQuestionsForApi);
    }
  };


  //handle submission
  const handleSubmit = () => {
    setQuestionDisable(true);
    const storedAisheCode = Cookies.get("aishe");
    const institutionTypeIndicator = Cookies.get("instiType");
    //POST request to submit the assessment data
    client
      .post(
        `https://sirfqa-backend.centralindia.cloudapp.azure.com/api/assessment/mock/submit?aisheCode=${storedAisheCode}&institutionTypeIndicator=${institutionTypeIndicator}`
      )
      .then((response) => {
        if (response.status === 201) {
          setShowAlert(
            "The Department of Higher and Technical Education is verifying your details. You will get to see your assessment report after the Department Head Approves."
          );
          setIsSaveDis(true);
          setSubDisable(true);
          setIsloading(false);
        } else {
          setErrorMessage(response?.response?.data?.message);
          setQuestionDisable(false);
        }
      })

      .catch((error) => {
        setQuestionDisable(false);
        if (error?.response?.status === 400) {
          setErrorMessage(error?.response?.data?.message);
        }
        console.error("Error fetching data:", error);
      });
  };

  // handle the click event on a step label
  const handleStepLabelClick = (stepIndex) => {
    setIsloading(true);
    setActiveStep(stepIndex);
    setQuestions([]);
    const storedAisheCode = Cookies.get("aishe");
    const selectedCriteriaId = criteriaData[stepIndex].id;
    setCurrentCriteriaId(selectedCriteriaId);
    //fetching the questions based on the selected criteria id and aishe code
    GetMockQuestions_GET_Call(storedAisheCode, selectedCriteriaId)
      .then((questionsRes) => {
        if (questionsRes?.status === 200) {
          setQuestions(questionsRes.data);
          setIsloading(false);
          setUserEnteredValues(questionsRes.data.map((i) => ""));
          setTextFieldsValues([]);
          setSelectedOptionIds({});
          setCommentTexts([]);
          setCommentErrors([]);
          setCommentText("");
          setQuestionIndex(0);
          setQueryListArr([]);
          setUpFile([]);
          setUpFileName([]);
        } else if (questionsRes?.response?.status === 500) {
          setErrorMessage("Internal Server Error. Try Again!");
          setIsSaveDis(true);
          setIsloading(false);
        } else if (questionsRes?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        } else {
          setErrorMessage(questionsRes?.response?.data?.message);
          setIsSaveDis(true);
          setIsloading(false);
        }
      })
      .catch((error) => {
        setIsloading(false);
        setErrorMessage(error?.response?.data?.message);
        console.error("Error fetching data:", error);
        setIsSaveDis(true);
      });
  };

  // open PDF in a new browser tab from base64PdfData (base64 encoded string)
  function openPdfInNewTab(base64PdfData) {
    const base64Cleaned = base64PdfData.replace(/^data:application\/pdf;base64,/, '');
    try {
      const byteCharacters = atob(base64Cleaned);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error decoding base64 string:', error);
    }
  }

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
            Assessment Questionnaire (Self-Improvement)
          </Typography>

          {/* Stepper component to display the criteria */}
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
                marginRight: "25px",
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
                        visibility: hasQueriedCriteria ? "hidden" : "visible",
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
                        <div className="stepNo">
                          {stepNumbers[index]}
                          {queriedCriteriaIds.includes(
                            criteriaIdToStepMapping[index]
                          ) ? (
                            <span className="red-dot">•</span>
                          ) : null}
                        </div>
                        <div className="label">{label}</div>
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
          <div className="de-content">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/* Table displaying the questions, input fields, pdfs and comments */}
              <TableContainer sx={{ overflow: "hidden" }}>
                <Table>
                  <TableHead
                    sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(141, 141, 141, 0.4)' : 'rgba(223, 223, 223, 0.5)' }}
                  >
                    <TableRow>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          width: "8%",
                          borderRadius: "5px 0 0 5px",
                          borderBottom: 'none',
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
                          width: "40%",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        Details
                      </TableCell>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          width: hasQueriedCriteria ? "20%" : "30%",
                          textAlign: "center",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        Input Value
                      </TableCell>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          width: hasQueriedCriteria ? "10%" : "50px",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        PDF
                      </TableCell>
                      <TableCell
                        className="allscoretableheader"
                        sx={{
                          borderRadius: hasQueriedCriteria
                            ? "0"
                            : "0 5px 5px 0",

                          width: hasQueriedCriteria ? "10%" : "50px",
                          borderBottom: 'none',
                          fontSize: `${tableheadfont}px`,
                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                        }}
                        align="center"
                      >
                        Comment
                      </TableCell>
                      {hasQueriedCriteria ? (
                        <TableCell
                          className="allscoretableheader"
                          sx={{
                            borderRadius: "0 5px 5px 0",
                            borderBottom: 'none',
                            fontSize: `${tableheadfont}px`,
                            color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important'
                          }}
                          align="center"
                        >
                          Status
                        </TableCell>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableborderDE">
                    {questions.length !== 0 &&
                      questions.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: index % 2 === 0 ? (localStorage.getItem('theme') === 'dark' ? '#000000' : '') : (localStorage.getItem('theme') === 'dark' ? '#000000' : 'rgba(240, 240, 240, 0.5)'), "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="de-rowDE"
                        >
                          <TableCell align="center" component="th" scope="row" style={{ color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px`, borderBottom: 'none' }}>
                            {`${index + 1}.`}
                          </TableCell>
                          <TableCell align="left" style={{ borderBottom: 'none', color: localStorage.getItem('theme') === 'dark' && '#ffffff', fontSize: `${tablebodyfont}px` }}>
                            {row.question.questionDescription}
                          </TableCell>
                          <TableCell align="left" style={{ borderBottom: 'none', fontSize: `${tablebodyfont}px` }}>
                            {row.question.questionType === "TEXT" ? (
                              row.question.numberOfResponses > 1 ? (
                                // Render multiple text fields based on numberOfResponses
                                <div>
                                  {textFieldsRefs[index].map((ref, i) => (
                                    <>
                                      <input
                                        required
                                        ref={ref}
                                        placeholder={2021 - i}
                                        key={i}
                                        id="outlined-requireds"
                                        value={
                                          textFieldsValues[index] &&
                                          textFieldsValues[index][i]
                                          // row.response? row.response.split(',')[i]
                                          // row.response !== null ? row.response.split(',')[i] : ""
                                        }
                                        onChange={(event) =>
                                          handleInputChange(event, index, i)
                                        }
                                        onKeyDown={(event) =>
                                          handleMultiResponseKeyDown(
                                            event,
                                            index,
                                            i
                                          )
                                        }
                                        style={{
                                          marginTop: "5px",
                                          display: "block",
                                          height: "40px !important",
                                          padding: "0 !important",
                                          border: localStorage.getItem('theme') === 'dark' ? '1px dashed rgba(255, 255, 255, 0.6)' : "1px dashed #000",
                                          backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
                                          borderRadius: "5px",
                                          textAlign: "center",
                                        }}
                                        disabled={
                                          (row.approvalStatus === "ACCEPTED" &&
                                            row.approvalStatus !== null) ||
                                          questionDisable
                                        }
                                      />
                                    </>
                                  ))}
                                </div>
                              ) : (
                                // Render a single text field
                                <TextField
                                  required
                                  value={userEnteredValues[index]}
                                  id="outlined-required"
                                  onChange={(event) =>
                                    handleInputChange2(event, index)
                                  }
                                  sx={{
                                    display: "block",
                                    height: "40px",
                                    padding: "0",
                                    // border: "1px dashed #000",
                                    borderRadius: "5px",
                                    border: localStorage.getItem('theme') === 'dark' ? '1px dashed rgba(255, 255, 255, 0.6)' : "1px dashed #000",
                                    backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000',
                                    textAlign: "center",
                                  }}
                                  disabled={
                                    (row.approvalStatus === "ACCEPTED" &&
                                      row.approvalStatus !== null) ||
                                    questionDisable
                                  }
                                />
                              )
                            ) : row.question.questionType === "RADIO" ? (
                              <RadioGroup
                                aria-labelledby={`radio-group-label-${index}`}
                                name={`radio-group-${index}`}
                                defaultValue={
                                  row.response
                                    ? getOptionIdForResponse(
                                      row.response,
                                      index
                                    )
                                    : null
                                }
                                onChange={(event) =>
                                  handleRadioChange(event, index)
                                }
                              >
                                {row.questionOptionsList.map((option) => (
                                  <FormControlLabel
                                    id="text_form"
                                    sx={{
                                      color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)'
                                    }}
                                    key={option.optionId}
                                    value={option.option}
                                    control={
                                      <Radio
                                        sx={{
                                          paddingTop: "0px",
                                          color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)'
                                        }}
                                      />
                                    }
                                    label={option.option}
                                    disabled={
                                      (row.approvalStatus === "ACCEPTED" &&
                                        row.approvalStatus !== null) ||
                                      questionDisable
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            ) : row.question.questionType === "CHECKBOX" ? (
                              <>
                                <FormGroup>
                                  {row.questionOptionsList.map((option) => (
                                    <FormControlLabel
                                      id="check_form"
                                      sx={{
                                        color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)'
                                      }}
                                      key={option.optionId}
                                      value={option.option}
                                      label={option.option}
                                      control={
                                        <Checkbox
                                          className="check"
                                          defaultChecked={
                                            row.response
                                              ? getOptionIdsFromResponse(
                                                row.response,
                                                option
                                              )
                                              : null
                                          }
                                          sx={{
                                            color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)'
                                          }}
                                          onChange={(event) =>
                                            handleCheckChange(event, index)
                                          }
                                        />
                                      }
                                      disabled={
                                        (row.approvalStatus === "ACCEPTED" &&
                                          row.approvalStatus !== null) ||
                                        questionDisable
                                      }
                                    />
                                  ))}
                                </FormGroup>
                                {checkErrors[index] && (
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      color: "red",
                                    }}
                                  >
                                    *You cannot choose other options along with
                                    None of the above
                                  </Typography>
                                )}
                              </>
                            ) : (
                              <>{/* handle other type here */}</>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: `${tablebodyfont}px`,
                              borderBottom: 'none',
                              color: "#3386A9",
                              opacity:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "100%"
                                  : "60%",
                              cursor:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "pointer"
                                  : "",
                              fontWeight:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "bold"
                                  : "",
                            }}
                            onClick={() => {
                              if (
                                row.approvalStatus !== "ACCEPTED" &&
                                row.approvalStatus !== null
                              ) {
                                setDialogUp(true);
                                setQuestionIndex(index);
                              }
                            }}
                          >
                            {/* <img src={pdficon} alt="pdficon" /> */}
                            {localStorage.getItem('theme') === 'dark' ?
                              <img src={pdfdark} alt="pdfdark" /> :
                              <img src={PdfEnabled} alt="pdficon" />
                            }
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: `${tablebodyfont}px`,
                              borderBottom: 'none',
                              color: "#3386A9",
                              opacity:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "100%"
                                  : "60%",
                              cursor:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "pointer"
                                  : "",
                              fontWeight:
                                row.approvalStatus !== "ACCEPTED" &&
                                  row.approvalStatus !== null
                                  ? "bold"
                                  : "",
                            }}
                            onClick={() =>
                              row.approvalStatus !== "ACCEPTED" &&
                                row.approvalStatus !== null
                                ? (setDialogOpen(true),
                                  setSelectedRowIndex(index),
                                  setQueryListArr(row.queryList),
                                  setQueryLastAd(
                                    row.queryList[row.queryList.length - 1]
                                      .commentedBy === "ADMIN"
                                  ))
                                : ""
                            }
                          >
                            {/* <img src={eye} alt="eye" /> */}
                            {/* <img src={EyeEnabled} alt="view" /> */}
                            <InsertCommentIcon sx={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(32,81,43,0.8)', fontSize: '1.7rem' }} />
                          </TableCell>
                          {hasQueriedCriteria ? (
                            row.approvalStatus !== "ACCEPTED" &&
                              row.approvalStatus !== null ? (
                              <>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontSize: `${tablebodyfont}px`,
                                    borderBottom: 'none',
                                    // color: "black",
                                    color: localStorage.getItem('theme') === 'dark' ? '#ffffff' : '#000000'
                                  }}
                                >
                                  <img
                                    src={QueryIcon}
                                    className="qLogo"
                                    alt="logo"
                                  />{" "}
                                  Query Raised
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell
                                  align="center"
                                  sx={{
                                    borderBottom: 'none',
                                    // color: "black",
                                    color: localStorage.getItem('theme') === 'dark' ? '#ffffff' : '#000000',
                                    fontSize: `${tablebodyfont}px`
                                  }}
                                >
                                  <img
                                    src={ApprovedIcon}
                                    className="qLogo"
                                    alt="logo"
                                  />{" "}
                                  Approved
                                </TableCell>
                              </>
                            )
                          ) : (
                            <></>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Save and Submit Buttons */}
              <div> 
                <LoadingButton
                  sx={{
                    minWidth: "200px",
                    height: "7vh",
                    alignItems: "center",
                  }}
                  className="btn"
                  onClick={handleSave}
                  style={{
                    backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(70, 134, 85, 1)' : "#000000",
                    color: "#FFFFFF",
                    margin: "30px 0 0 0",
                  }}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  disabled={isSaveDis}
                >
                  Save
                </LoadingButton>
                {isSaved ? (
                  <Button
                    sx={{
                      minWidth: "200px",
                      height: "7vh",
                    }}
                    className="btn"
                    style={{
                      backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(70, 134, 85, 1)' : "#000000",
                      color: "#FFFFFF",
                      margin: "30px 0 0 30px",
                    }}
                    onClick={handleSubmit}
                    disabled={subDisable}
                  >
                    Submit
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </Box>
            {/* pdf part */}
            <div>
              <Dialog
                open={dialogUp}
                onClose={() => { }}
                PaperProps={{
                  style: {
                    backgroundColor: "#DFE7DE",
                  },
                }}
              >
                <CancelIcon
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    width: '0.9em',
                    color: "#83C273",
                    marginBottom: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDialogUp(false)}
                />

                <div className="App1 box2" {...dropZone.getRootProps()}>
                  <>
                    {upFile[questionIndex] ? (
                      // file after upload UI
                      <>
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: "#DFE7DE",
                            height: '100px',
                            borderRadius: 2,
                            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <img src={pdf} className="pdfLogo" alt="logo" style={{ marginRight: '10px' }} />
                          <span className="teachFile">
                            {upFileName[questionIndex]}
                          </span>
                          <DeleteIcon sx={{
                            cursor: isDisabled ? "" : "pointer",
                            marginLeft: "5px !important",
                            marginRight: "5px !important",
                          }} onClick={() => {
                            deletePdf();
                          }} />
                          <VisibilityIcon sx={{
                            cursor: isDisabled ? "" : "pointer",
                            marginLeft: "5px !important",
                            marginRight: "5px !important",
                          }}
                            onClick={() => openPdfInNewTab(upFile[questionIndex])}
                          />
                          <input
                            disabled={!!upFileName[questionIndex]}
                            {...dropZone.getInputProps()}
                          />
                        </Box>
                      </>
                    ) : (
                      <Box
                        sx={{
                          p: 4,
                          backgroundColor: "#DFE7DE",
                          borderRadius: 2,
                          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <img src={logo} className="logo" alt="logo" />
                        <br />
                        <p>
                          <input
                            {...dropZone.getInputProps()}
                            style={{
                              opacity: 0,
                              position: "absolute",
                            }}
                          />
                          Drag & Drop or{" "}
                          <span className="color"> Choose a file </span>
                          to upload
                        </p>
                      </Box>
                    )}
                  </>
                </div>
              </Dialog>
            </div>
            {/* comments part */}
            <div>
              <Dialog
                open={dialogOpen}
                PaperProps={{
                  style: {
                    backgroundColor: "#DFE7DE",
                    width: "60%",
                  },
                }}
              >
                <CancelIcon
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    color: "#83C273",
                    width: '0.9em',
                    cursor: "pointer",
                    marginBottom: "5%",
                  }}
                  onClick={() => setDialogOpen(false)}
                />

                <span
                  style={{
                    marginBottom: "5%",
                  }}
                ></span>

                {queryListArr.map((data, index) => {
                  const isLastComment = index === queryListArr.length - 1;
                  const isAdminComment = data.commentedBy === "ADMIN";
                  const isLastUserComment = isLastComment && !isAdminComment;

                  return isLastUserComment ? null : (
                    <React.Fragment key={index}>
                      {/* Check if the comment is made by ADMIN */}
                      {data.commentedBy === "ADMIN" ? (
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="space-between"
                        >
                          <Box align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{ marginLeft: "10px" }}
                            >
                              <img
                                src={CommentIMG}
                                alt=""
                                style={{ height: "24px" }}
                              />
                              <DialogTitle
                                sx={{
                                  backgroundColor: "#DFE7DE",
                                  color: "#626262",
                                  fontSize: "15px",
                                  paddingLeft: "5px !important",
                                }}
                              >
                                ADMIN&emsp;{" "}
                                <span
                                  style={{
                                    fontSize: "10px",
                                    marginLeft: "-8px",
                                  }}
                                >
                                  on &ensp; {timeconv(data.submissionTimestamp)}
                                </span>
                              </DialogTitle>
                            </Stack>

                            <DialogContent
                              sx={
                                {
                                  // padding: "0px 24px !important",
                                }
                              }
                              className="dialogOverflow"
                            >
                              <Typography>{data.comment}</Typography>
                            </DialogContent>
                          </Box>
                        </Stack>
                      ) : (
                        // USER COMMENTS
                        <Stack
                          direction="row"
                          justifyContent={"flex-end"}
                          spacing={1}
                        >
                          <Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{ marginLeft: "10px" }}
                            >
                              <img
                                src={CommentIMG}
                                alt=""
                                style={{ height: "24px", marginTop: "-8px" }}
                              />
                              <DialogTitle
                                sx={{
                                  backgroundColor: "#DFE7DE",
                                  color: "#626262",
                                  fontSize: "15px",
                                  paddingLeft: "5px",
                                  paddingBottom: "0px"
                                }}
                              >
                                {institutionName}&emsp;
                                <span
                                  style={{ fontSize: "10px", marginLeft: "0px" }}
                                >
                                  on &ensp; {timeconv(data.submissionTimestamp)}
                                </span>
                              </DialogTitle>
                            </Stack>
                            <DialogContent className="dialogOverflow">
                              <Typography>{data.comment}</Typography>
                            </DialogContent>
                          </Box>
                        </Stack>
                      )}
                    </React.Fragment>
                  );
                })}
                <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
                  <Box>
                    <DialogTitle
                      sx={{
                        backgroundColor: "#DFE7DE",
                        color: "#626262",
                        fontSize: "15px",
                      }}
                    >
                      {institutionName}
                    </DialogTitle>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ marginRight: "10px" }}
                    >
                      <img src={CommentIMG} alt="" style={{ height: "24px" }} />
                      <DialogTitle
                        sx={{
                          backgroundColor: "#ffff",
                          color: "#626262",
                          fontSize: "15px",
                          paddingLeft: "8px",
                        }}
                      >
                        {institutionName}
                      </DialogTitle>
                    </Stack>
                  </Box>
                </Stack>
                {queryLastAd ? (
                  <>
                    {/* Add the TextField for ADMIN to edit the comment */}
                    <DialogContent
                      sx={{
                        padding: "0px 24px !important",
                      }}
                      className="dialogOverflow"
                    >
                      <TextField
                        id="outlined-multiline-static"
                        placeholder="Write your comment here"
                        multiline
                        rows={3}
                        className="dialogOverflow"
                        fullWidth
                        style={{
                          border: "1.5px dashed #00000099",
                          borderRadius: "5px",
                          textAlign: "center",
                          marginTop: "2px",
                          width: "100%",
                        }}
                        defaultValue={commentTexts[selectedRowIndex]}
                        // value={queryListArray[(queryListArray.length)-1].comment? queryListArray[(queryListArray.length)-1].comment : commentText}
                        onChange={(e) => {
                          const newCommentTexts = [...commentTexts];
                          newCommentTexts[selectedRowIndex] = e.target.value;
                          setCommentTexts(newCommentTexts);
                          const newCommentErrors = [...commentErrors];
                          newCommentErrors[selectedRowIndex] = false;
                          setCommentErrors(newCommentErrors);
                        }}
                        error={commentErrors[selectedRowIndex]}
                      />
                      <Typography
                        variant="body2"
                        color="error"
                        backgroundColor="#DFE7DE"
                        margin="6px"
                        sx={{
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {commentErrors[selectedRowIndex]
                          ? commentErrorMsg
                          : null}
                      </Typography>
                    </DialogContent>
                  </>
                ) : queryListArr.length !== 0 ? (
                  <>
                    {/* Add the TextField for ADMIN to edit the comment */}
                    <DialogContent
                      className="dialogOverflow"
                      sx={{
                        padding: "0px 24px !important",
                      }}
                    >
                      <TextField
                        id="outlined-multiline-static"
                        placeholder="Write your comment here"
                        multiline
                        rows={3}
                        fullWidth
                        style={{
                          border: "1.5px dashed #00000099",
                          borderRadius: "5px",
                          textAlign: "center",
                          marginTop: "2px",
                          width: "100%",
                        }}
                        defaultValue={commentTexts[selectedRowIndex]}
                        //defaultValue={queryListArr.length !== 0? queryListArr[(queryListArr.length)-1].comment : commentText}
                        onChange={(e) => {
                          const newCommentTexts = [...commentTexts];
                          newCommentTexts[selectedRowIndex] = e.target.value;
                          setCommentTexts(newCommentTexts);
                          const newCommentErrors = [...commentErrors];
                          newCommentErrors[selectedRowIndex] = false;
                          setCommentErrors(newCommentErrors);
                        }}
                        error={commentErrors[selectedRowIndex]}
                      />
                      <Typography
                        variant="body2"
                        color="error"
                        backgroundColor="#DFE7DE"
                        margin="6px"
                        sx={{
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {commentErrors[selectedRowIndex]
                          ? commentErrorMsg
                          : null}
                      </Typography>
                    </DialogContent>
                  </>
                ) : (
                  <></>
                )}
                <DialogActions
                  sx={{
                    backgroundColor: "#DFE7DE",
                  }}
                >
                  <Button
                    onClick={handleSaveQuery}
                    size="small"
                    style={{
                      color: "#ffff",
                      backgroundColor: "black",
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => handleCancelQuery()}
                    size="small"
                    style={{
                      color: "#ffff",
                      backgroundColor: "black",
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            {/* Alert and Error Popups */}
            {showAlert && (
              <Alertpopup
                showDialog={showAlert}
                msg={showAlert}
                setoff={() => setShowAlert(false)}
              />
            )}
            {fileuploaded && (
              <Alertpopup
                showDialog={fileuploaded}
                msg={fileuploaded}
                setoff={() => setFileUploaded(false)}
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

export default DataEntry;
