import React from "react";
import Header from "../../components/Menubar/menuBar";
import JsirfDashboardFilters from "../../components/JsirfDashboardFilters/JsirfDashboardFilters";
import DoubleBarChart from "../../components/DoubleBarChart/DoubleBarChart";
import RectHeatmap from "../../components/RectHeatmap/RectHeatmap";
import "../JsirfDashboardPublic/JsirfDashboardPublic.css";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./JsirfDashboard.css";

const JsirfDashboardClg = () => {
  const [barScore, setBarScore] = useState();
  const handleBarScore = (item) => {
    setBarScore(item);
  };
  const [rectMapScore, setRectMapScore] = useState();
  const handleRectMapScore = (item) => {
    setRectMapScore(item);
  };
  return (
    <>
      <div className="row1">
        <div className="jsirfr2left">
          <DoubleBarChart score={barScore} />
        </div>
        <div className="jsirfr2right">
          <JsirfDashboardFilters
            change={handleBarScore}
            visualizationType="BAR_GRAPH"
          />
        </div>
      </div>
      <div className="row2">
        <div className="jsirfr1left">
          <JsirfDashboardFilters
            change={handleRectMapScore}
            visualizationType="RECTHEATMAP"
          />
        </div>
        <div className="dashboard-right">
          <TableContainer>
            <Table sx={{ marginTop: "0px", borderCollapse: "collapse" }}>
              <TableHead sx={{ borderRadius: "5px" }}>
                <TableRow sx={{ borderBottom: "1px solid black" }}>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "10%",
                      borderRadius: "5px 0 0 5px",
                    }}
                    align="center"
                  >
                    Sr. No.
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "20%",
                    }}
                    align="center"
                  >
                    Details
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "15%",
                    }}
                    align="center"
                  >
                    College 1
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "15%",
                    }}
                    align="center"
                  >
                    College 2
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "15%",
                    }}
                    align="center"
                  >
                    College 3
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "0em",
                      color: "#656565",
                      width: "15%",
                    }}
                    align="center"
                  >
                    College 4
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 1 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjG"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 2 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjR"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 3 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjR"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 4 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjR"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 5 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjG"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 6 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjR"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}> 7 </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    Lorem Ipsum{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recjG"></div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {" "}
                    <div className="recj"></div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <RectHeatmap score={rectMapScore}/>  */}
        </div>
      </div>
    </>
  );
};

export default JsirfDashboardClg;
