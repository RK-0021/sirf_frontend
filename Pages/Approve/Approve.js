import React, { useState, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import removeIMG from "../../assets/images/remove.jpg";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Menubar/menuBar";
import Button from "@mui/material/Button";
import "../LoginRegister/Regestration.css";
import { To_Approve_GET_Call } from "../../services/ApproveApi";
import { Approved_Post_Call } from "../../services/ApproveApi";
import { Rejected_Post_Call } from "../../services/ApproveApi";
import { useEffect } from "react";
import Alertpopup from "../../components/alert/Alertpopup";
import Errorpopup from "../../components/alert/Errorpopup";
import { onLogout } from "../../utils";
const Approvestyle = {
    //boxShadow: "0px 4px 10px 0px #00000040",
    //textAlign:'center',
    //borderRadius: "5px",
    bgcolor: "#ffffff",
    width: '100%',
    //paddingTop: '30px',
    height: "430px",
    //paddingLeft:'17px',
    overflowY: 'auto'
};
const Approve = () => {
    const [boxes, setBoxes] = useState([]);
    const [getCallResponse, setGetCallResponse] = useState();
    const [emptyListmsg, setEmptyListmsg] = useState("");
    const [rejectResponse, setRejectResponse] = useState()
    const [acceptResponse, setAcceptResponse] = useState()
    const [name, setName] = useState('')
    useEffect(() => {
        To_Approve_GET_Call()
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    setGetCallResponse(true);
                    setBoxes(response.data);
                } else if (response.status === 200 && response.data.length === 0) {
                    setEmptyListmsg("No pending Requests");
                    setGetCallResponse(false);
                }
                else if (response?.response?.status === 401) {
                    onLogout();
                    localStorage.removeItem('theme')
                }
                else {
                    setGetCallResponse(false);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    const navigate = useNavigate();
    const handleClickApprove = (action, username) => {
        if (action === "accept") {
            const approve_data = {
                username: username,
            };
            Approved_Post_Call(username, approve_data)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        setName(response?.data?.aisheCode)
                        setAcceptResponse('acceptsuccess')
                        setBoxes(boxes.filter((box) => {
                            return box.username !== response.data.username
                        }))
                    }
                    else if (response?.response?.status === 401) {
                        onLogout();
                        localStorage.removeItem('theme')
                    }
                    else {
                        setAcceptResponse('acceptfail')
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
        else if (action === "reject") {
            const reject_data = {
                username: username,
            };
            Rejected_Post_Call(username, reject_data)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setName(response?.data?.aisheCode)
                        setRejectResponse('rejectsuccess')
                        setBoxes(boxes.filter((box) => {
                            return box.username !== response.data.username
                        }))
                    }
                    else if (response?.response?.status === 401) {
                        onLogout();
                        localStorage.removeItem('theme')
                    }
                    else {
                        setRejectResponse('rejectfail')
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };
    return (
        <div>
            <Grid
                sx={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}
            >
                {/* <Grid item xs={2.5}></Grid> */}
                {/* <Grid item xs={8}> */}
                <Typography
                    sx={{
                        fontFamily: "PoppinsBold",
                        //fontFamily: "Garamond",
                        fontSize: "35px",
                        fontWeight: "700",
                        lineHeight: " 39px",
                        letterSpacing: "0em",
                        //textAlign: "left",
                        //marginBottom: "1.5vh",
                    }}
                >
                    Registration Requests
                </Typography>
                {/* </Grid> */}
                {/* <Grid item xs={1.25}></Grid>
                    <Grid item xs={0.25}></Grid> */}
            </Grid>


            {emptyListmsg === "No pending Requests" ? (
                <Box
                    sx={{
                        height: "52px",
                        borderRadius: "5px",
                        background: "#DFE7DECC",
                        boxShadow: "0px 4px 15px 0px #00000040",
                        margin: "30px",
                        padding: "15px",
                        width: '300px',
                        marginLeft: '33%'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Roboto",
                            fontSize: "15px",
                            fontWeight: "400",
                            lineHeight: "18px",
                            letterSpacing: "0em",
                            textAlign: "center",
                            color: "#B26A6A",
                        }}
                    >
                        There are no pending Requests
                    </Typography>
                </Box>
            ) : (
                ""
            )}

            {getCallResponse &&
                <Box sx={Approvestyle}>
                    {boxes.map((box, index) => (
                        <Box
                            sx={{
                                width: "490px",
                                height: "max-content",
                                borderRadius: "5px",
                                background: "#DFE7DECC",
                                boxShadow: "0px 4px 15px 0px #00000040",
                                margin: "30px",
                                padding: "15px",
                                marginLeft: '23%'
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                >
                                    {`${index + 1}.`}
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    HEI Name:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.heiName}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                ></Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    AISHE Code:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.aisheCode}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                ></Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    Mobile Number:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.mobileNo}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                ></Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    Nodal Officer:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.nodalOfficer}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                ></Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    Role:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.role}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    marginBottom: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        flexBasis: "10%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#00000080",
                                    }}
                                ></Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "30%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "300",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000CC",
                                    }}
                                >
                                    Username:
                                </Typography>
                                <Typography
                                    sx={{
                                        flexBasis: "60%",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#000000",
                                    }}
                                >
                                    {box.username}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginRight: "10px",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleClickApprove("accept", box.username)
                                    }
                                    sx={{
                                        marginRight: "10px",
                                        backgroundColor: "#000000",
                                        width: "71px",
                                        height: "30px",
                                        borderRadius: "5px",
                                        textTransform: "none",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#ffffff",
                                        ":hover": {
                                            bgcolor: "#000000",
                                        },
                                    }}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleClickApprove("reject", box.username)
                                    }
                                    sx={{
                                        backgroundColor: "#000000",
                                        width: "71px",
                                        height: "30px",
                                        borderRadius: "5px",
                                        textTransform: "none",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                        color: "#ffffff",
                                        ":hover": {
                                            bgcolor: "#000000",
                                        },
                                    }}
                                >
                                    Reject
                                </Button>
                            </div>
                        </Box>
                    ))}</Box >
            }

            {acceptResponse === "acceptsuccess" && (
                <Alertpopup
                    showDialog={acceptResponse === "acceptsuccess" ? true : false}
                    msg={`Registration Request for ${name} is Accepted`}
                    setoff={() => {
                        navigate('/profile');
                    }}
                />
            )}
            {rejectResponse === "rejectsuccess" && (
                <Errorpopup
                    showDialog={rejectResponse === "rejectsuccess" ? true : false}
                    msg={`Registration Request for ${name} is Rejected`}
                    setoff={() => {
                        navigate('/profile');
                    }}
                />
            )}
        </div>
    );
};

export default Approve;
