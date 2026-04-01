import React from 'react';
// import DataValDropdown from "../../components/JSIRFDropdown/JSIRFDropdown";
import DataValDropdown from "../../components/JSIRFDropdown/JSIRFDropdownNew";
import Header from "../../components/Menubar/menuBar";
import { Typography } from '@mui/material';
import { useFont } from "../../components/context/FontChangesContext";

const DataValidationDropdown = () => {
  const { pageheadfont } = useFont();//Destructure and use the 'pageheadfont' value from the useFont custom hook

  return (
    <div>
      <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, marginLeft:'2%', marginBottom:'21px', color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D'}}>Assessment Status (JSIRF)</Typography>
      <DataValDropdown/>
   </div>
  );
}

export default DataValidationDropdown;
