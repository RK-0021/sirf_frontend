import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Typography,
  Stack,
  TextField,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "../../components/Menubar/menuBar";
import "./Student.css";
import logo from "../../assets/images/add.svg";
import pdf from "../../assets/images/pdf.svg";
import Cookies from "js-cookie";
import { postUploadSurveyApi, getUploadApi, API_KEY } from "../../constants";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import InfoPopup from "../../components/ImagePopUp/imagePopUp";
import client from "../../utils/axios-interceptor";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import PageLoader from "../../components/loader/PageLoader";

const StudentSurvey = () => {
  const [year, setYear] = React.useState("");
  const [teachingFile, setTeachingFile] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [aisheCode, setAisheCode] = React.useState("");
  const [previouslyUploadedTeachingFiles, setPreviouslyUploadedTeachingFiles] =
    React.useState([]);
  const [infoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [uploadedFilesByYear, setUploadedFilesByYear] = React.useState({});

  const handleInfoButtonClick = () => {
    setInfoPopupOpen(true);
  };

  const handleCloseInfoPopup = () => {
    setInfoPopupOpen(false);
  };

  const handleChange = (event) => {
    setDisabled(false);
    setYear(event.target.value);
    // getApi(Cookies.get("username"), event.target.value);
  };

  const handleTeachingDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds the limit of 25MB');
      return;
    }
    setTeachingFile(acceptedFiles[0]);
  };

  React.useEffect(() => {
    const storedAisheCode = Cookies.get("aishe");
    setAisheCode(storedAisheCode);
    setDisabled(true);
  }, []);

  function handleFile() {
    setIsloading(true);
    var formData = new FormData();
    formData.append("file", teachingFile);

    client
      .post(
        `${API_KEY}${postUploadSurveyApi}?surveyYear=${year}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setIsloading(false);
          if (teachingFile) {
            setPreviouslyUploadedTeachingFiles([
              ...previouslyUploadedTeachingFiles,
              teachingFile.name,
            ]);
          }
          const uploadedFiles = { ...uploadedFilesByYear };
          uploadedFiles[year] = uploadedFiles[year] || [];
          if (teachingFile) {
            uploadedFiles[year].push(teachingFile.name);
          }
          setUploadedFilesByYear(uploadedFiles);
          setShowAlert(res?.data);
          setDisabled(true);
          return res;
        }
        else {
          setIsloading(false);
          setErrorMessage(res?.response?.data?.message + ". Please Try Again!");
          setDisabled(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err)
        setErrorMessage(err?.response?.data?.message + ". Please Try Again!");
        setDisabled(false);
      });
  }

//   function getApi(year) {
//     client
//       .get(
//         `${API_KEY}${getUploadApi}/${Cookies.get("aishe")}?surveyyear=${year}`
//       )
//       .then((res) => {
//         if (res.data.status === "INPROCESS") {
//           console.log(res);
//           setShowAlert("Data Extraction in Process. Please Wait!");
//           setLoading(true);
//           setDisabled(true);
//         } else if (res.data.status === "SUCCESS") {
//           setShowAlert("File has been Successfully Extracted!");
//           setDisabled(false);
//         } else if (res.data.status === "FAILED") {
//           setErrorMessage("Failed! Please try again.");
//           setDisabled(false);
//         }
//       })
//       .catch((error) => {
//         console.log("GET API error:", error);
//         setLoading(false);
//       });
//   }

  const handleFileDelete = (fileType) => {
    if (fileType === "teaching") {
      setTeachingFile(null);
    }
  };

  const teachingDropzone = useDropzone({
    onDrop: handleTeachingDrop,
    maxFiles: 1,
    accept: { "application/xlsx": [".xlsx"] },
    disabled: !!teachingFile,
  });

  return (
    <>
      {isloading?(<PageLoader/>):
      <div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          fontSize="25px"
          fontWeight="700"
          fontFamily="PoppinsBold"
          style={{ margin: "4% 0" }}
        >
          Upload Satisfaction Survey Form
        </Typography>

        {/* Stack Starts Here  */}
        <Stack
          spacing={2}
          sx={{
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="stack"
        >
          <Typography fontSize="15px" className="text12">
            AISHE Code
          </Typography>

          <TextField
            disabled
            className="box"
            id="filled-basic"
            hiddenLabel
            variant="filled"
            InputProps={{ disableUnderline: true }}
            sx={{
              boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
              },
            }}
            value={aisheCode}
          />

          <Typography fontSize="15px" className="text12">
            Survey Year (as per DCF) <span className="red"> * </span>
          </Typography>

          <Select
            value={year}
            onChange={handleChange}
            className="box"
            label="Year"
            isClearable
            sx={{ boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)" }}
          >
            <MenuItem value="2020-21">2020-21</MenuItem>
            <MenuItem value="2021-22">2021-22</MenuItem>
            <MenuItem value="2022-23">2022-23</MenuItem>
            {/* <MenuItem value={2023}>2023</MenuItem> */}
          </Select>

          {/* Teaching DCF */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack>
              <Typography fontSize="15px" className="text12">
                Upload Student Survey Form (excel) <span className="red"> * </span>
              </Typography>
            </Stack>
            <Stack>
              <IconButton
                sx={{ color: "black"}}
                // onClick={handleInfoButtonClick}
              >
                <InfoIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div className="App1 box2" {...teachingDropzone.getRootProps()}>
            {teachingFile ? (
              // Teaching file after upload UI
              <>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#DFE7DE",
                    borderRadius: 2,
                    boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <img src={pdf} className="pdfLogo" alt="logo" />
                  <span className="teachFile">{teachingFile.name}</span>
                  <Button
                    onClick={() => handleFileDelete("teaching")}
                    className={isDisabled ? "disabledButton" : "deleteBtn"}
                    disabled={isDisabled}
                  >
                    Delete
                  </Button>
                </Box>
                <input
                  disabled={isLoading || !!teachingFile}
                  {...teachingDropzone.getInputProps()}
                />
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
                      {...teachingDropzone.getInputProps()}
                      style={{
                        opacity: 0,
                        position: "absolute",
                      }}
                    />
                    Drag & Drop or <span className="color"> Choose a file </span>
                    to upload
                </p>
              </Box>
            )}
          </div>
          {infoPopupOpen && (
            <InfoPopup open={infoPopupOpen} onClose={handleCloseInfoPopup} />
          )}
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
          <Button
              sx={{
                width: "100%",
                height: "7vh",
              }}
              className={isDisabled ? "disabledButton" : ""}
              style={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                margin: "30px 0 30px 0",
              }}
              onClick={() => {
                if (!year || !teachingFile) {
                  setErrorMessage("Please fill all mandatory fields");
                } else {
                  const filesForYear = uploadedFilesByYear[year] || [];
                  if (
                    filesForYear.includes(teachingFile?.name)
                  ) {
                    setErrorMessage(
                      "File already uploaded for the selected year."
                    );
                  } else if (
                    previouslyUploadedTeachingFiles.includes(teachingFile.name)
                  ) {
                    setErrorMessage(
                      "File already has been uploaded."
                    );
                  } else {
                    handleFile();
                  }
                }
              }}
              disabled={isDisabled}
          >
              Upload
            </Button>
        </Stack>
      </Box>
      </div>}
    </>
  );
};

export default StudentSurvey;
