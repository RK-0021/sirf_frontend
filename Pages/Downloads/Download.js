import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import image from "../../assets/images/image.svg";
import GalleryCarousel from "../../components/GalleryCarousel/Carousel";
import Header from "../../components/Menubar/menuBar";
import "./Download.css";
import vector1 from '../../assets/EnhancedImages/Vector1.png'
import { downloads_GET_Call } from "../../services/DownloadApi";
import { useEffect } from "react";
import { useFont } from "../../components/context/FontChangesContext";

export default function CustomizedTables() {
  // Destructure and use the 'tableheadfont','tablebodyfont' value from the useFont custom hook
  const { number, setNumbers, tableheadfont, setTableheadfont, tablebodyfont, setTablebodyfont } =  useFont();

  // custom styled component for TableCell using the styled function.
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:localStorage.getItem('theme')==='dark'?'rgba(37, 37, 37, 1)': "#DFDFDF",
      color:localStorage.getItem('theme')==='dark'?'rgba(255, 255, 255, 1)': "#252525",
      borderBottom:localStorage.getItem('theme')==='dark'&&'none',
      padding: "8px 0px",
      fontSize: `${tableheadfont}px`,
      fontWeight: '500',
      fontFamily: "Roboto",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: `${tablebodyfont}px`,
      fontFamily: "Roboto",
      fontWeight: '500',
    },
  }));
  
  //custom vstyled component for TableRow using the styled function.
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor:localStorage.getItem('theme')!=='dark'&& "#FFFFFF",
    },
  }));

  // Function to create a data object with the given parameters.
  function createData(No, Manual, Date, Download) {
    return { No, Manual, Date, Download };
  }
  const rows = [
    createData( //data object for the first row.
      "1.",
      "Self Improvement Dummy File.",
      "23/02/2023",
      "Download file"
    ),
    createData( //data object for the second row.
      "2.",
      "Self Improvement Dummy File.",
      "23/01/2023",
      "Download file"
    ),
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //function triggered when Download file is clicked
  const handleClick = () => {
    //api call to download file as pdf
    downloads_GET_Call("Dummy Document Sample.pdf")
      .then((response) => {
        if (response) {
          const blob = new Blob([response], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Dummy Document Sample.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("No Data found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="downloads_caption" style={{ fontSize: '30px', color:localStorage.getItem('theme')==='dark' && '#ffffff' }}>
        Downloads
      </div>
      <div className="download_app">
        {/* Four Tables are displayed below */}
        <div>
          <Table sx={{ minWidth: 700, margin: "20px 0" }} >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width="20px"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                  Sl No.
                </StyledTableCell>
                <StyledTableCell align="center" width="200px">
                  Manuals
                </StyledTableCell>
                <StyledTableCell align="center" width="30px">
                  Date
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="130px"
                  // style={{ borderRadius: "0px 10px 25px 0px" }}
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  Download
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { borderBottom: "0" },
                    '&:first-child td, &:first-child th': { borderBottom: "0" }
                  }}>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.No}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Manual}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Date}</StyledTableCell>
                  <StyledTableCell
                    onClick={handleClick}
                    align="center"
                    style={{ color: "#378ACA", cursor: "pointer" }}
                  >
                    <div>
                      <img
                        alt=""
                        src={image}
                        style={{
                          width: "9%",
                          height: "5%",
                          marginRight: "13px",
                        }}
                      />
                      {row.Download}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width="20px"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                  Sl No.
                </StyledTableCell>
                <StyledTableCell align="center" width="200px">
                  Reports
                </StyledTableCell>
                <StyledTableCell align="center" width="30px">
                  Date
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="130px"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  Download
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name} sx={{
                  '&:last-child td, &:last-child th': { borderBottom: "0" },
                  '&:first-child td, &:first-child th': { borderBottom: "0" }
                }}>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.No}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Manual}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Date}</StyledTableCell>
                  <StyledTableCell
                    onClick={handleClick}
                    align="center"
                    style={{ color: "#378ACA", cursor: "pointer" }}
                  >
                    <div>
                      <img
                        alt=""
                        src={image}
                        style={{
                          width: "9%",
                          height: "5%",
                          marginRight: "13px",
                        }}
                      />
                      {row.Download}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width="20px"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                  Sl No.
                </StyledTableCell>
                <StyledTableCell align="center" width="200px">
                  Data Capturing Formats
                </StyledTableCell>
                <StyledTableCell align="center" width="30px">
                  Date
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="130px"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  Download
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { borderBottom: "0" },
                    '&:first-child td, &:first-child th': { borderBottom: "0" }
                  }}
                >
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.No}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Manual}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Date}</StyledTableCell>
                  <StyledTableCell
                    onClick={handleClick}
                    align="center"
                    style={{ color: "#378ACA", cursor: "pointer" }}
                  >
                    <div>
                      <img
                        alt=""
                        src={image}
                        style={{
                          width: "9%",
                          height: "5%",
                          marginRight: "13px",
                        }}
                      />
                      {row.Download}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width="20px"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                  Sl No.
                </StyledTableCell>
                <StyledTableCell align="center" width="200px">
                  Best Practices
                </StyledTableCell>
                <StyledTableCell align="center" width="30px">
                  Date
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="130px"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  Download
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { borderBottom: "0" },
                    '&:first-child td, &:first-child th': { borderBottom: "0" }
                  }}>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.No}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Manual}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:localStorage.getItem('theme')==='dark'&&'rgba(255, 255, 255, 0.6)'}}>{row.Date}</StyledTableCell>
                  <StyledTableCell
                    onClick={handleClick}
                    align="center"
                    style={{ color: "#378ACA", cursor: "pointer" }}
                  >
                    <div>
                      <img
                        alt=""
                        src={image}
                        style={{
                          width: "9%",
                          height: "5%",
                          marginRight: "13px",
                        }}
                      />
                      {row.Download}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <GalleryCarousel />
        </div>
      </div>
    </div>
  );
}
