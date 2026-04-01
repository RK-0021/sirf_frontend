import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Menubar from "../../components/Menubar/menuBar";
import { MockReport_GET_Call, MockReportUpdate_Post_Call } from "../../services/MockReport";
import './Report.css'
import Checkmark from "../../assets/images/check.svg";
import { onLogout } from "../../utils";
import { useFont } from "../../components/context/FontChangesContext";

export const Report = () => {
  // Destructuring font sizes of report contents from useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont, reportokfont } = useFont();

  // State for storing index of all viewed reports
  const [disabled, setDisabled] = useState([])

  // State for storing report data
  const [data, setData] = useState([])

  // State for storing the result of the data fetch operation (true/false)
  const [dataRes, setDataRes] = useState()

  // State for storing the result of the update operation (true/false)
  const [updateRes, setUpdateRes] = useState()

  // Function to get the report data through API call
  function refresh() {
    MockReport_GET_Call()
      .then((response) => {
        if (response?.status === 200) {
          setDataRes(true)
          setData(response?.data)
        }
        // If unauthorized access, log out the user
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setDataRes(false)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  // to call the refresh function as soon as the page loads
  useEffect(() => {
    refresh();
  }, [])

  // Function to handle the ok button click (viewed report)
  const handleViewScore = (id, index) => {
    setDisabled([...disabled, index])//adds index of the viewed report to the disabled array
    const MockReportUpdate_data = {
      id: id
    };
    // post API call to update the report as viewed. passes the id of the viewed report to the api
    MockReportUpdate_Post_Call(id, MockReportUpdate_data)
      .then((response) => {
        if (response.status === 200) {
          setUpdateRes(true)
          refresh();
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          setUpdateRes(false)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <>
      <div className="de-content" style={{ marginTop: "1.5rem" }}>
        <div style={{ display: "flex" }}>
          <div className="ScoreCard_caption" style={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)' }}>Report</div>
          <div className="totalcount" style={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.9)' }}>Total Institution Count: {data.length}</div>
        </div>

        {/* Table for displaying report */}
        <TableContainer
          sx={{
            borderRadius: "10px",
            backgroundColor: "rgba(246, 246, 246, 0.49)",
            borderRadius: "5px",
          }}
        >
          <Table>
            <TableHead >
            </TableHead>
            <TableBody >
              {dataRes && data.map((row, index) => (
                <TableRow key={index} sx={{ borderBottom: localStorage.getItem('theme') !== 'dark' && "1px solid rgba(224, 224, 224, 1)", backgroundColor: localStorage.getItem('theme') === 'dark' && '#000000' }}>
                  <TableCell align="center" component="th" scope="row" style={{
                    fontWeight: "500", fontSize: `${tablebodyfont}px`,
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none',
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)'
                  }}>
                    {`${index + 1}.`}
                  </TableCell>
                  <TableCell align="left" style={{
                    fontWeight: "500", fontSize: `${tablebodyfont}px`,
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none',
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)',
                    width: "50%"
                  }}>{`${row.instituteName} have scored`}</TableCell>
                  <TableCell align="left" style={{
                    fontWeight: "600", fontSize: `${tablebodyfont}px`,
                    borderBottom: localStorage.getItem('theme') === 'dark' && 'none',
                    color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)',
                    width: "35%"
                  }}>{"Grade " + row.grade}</TableCell>
                  <TableCell align="center" sx={{ width: "8%", fontSize: `${tablebodyfont}px`, borderBottom: localStorage.getItem('theme') === 'dark' && 'none' }}>
                    {" "}
                    {(row.isActive || disabled.includes(index)) ?
                      // If the report is viewed (clicked on ok), display a checkmark image. Else, display ok button
                      (<img src={Checkmark} alt="img" />)
                      : (
                        <Button
                          key={index}
                          className="button_edit reportButtonDisable"
                          onClick={() => handleViewScore(row.id, index)}
                          style={{ backgroundColor: "rgba(70, 134, 85, 1)", fontSize: `${reportokfont}px` }}
                        >
                          OK
                        </Button>
                      )

                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
