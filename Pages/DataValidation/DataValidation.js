import React from 'react';
// import DatVal from "../../components/DataValDropdown/DataValDropdown";
import DatVal from "../../components/DataValDropdown/DataValDropdownNew";
import Header from "../../components/Menubar/menuBar";
import { Typography } from '@mui/material';
import { useFont } from "../../components/context/FontChangesContext";

const DataValidation = () => {
  const { pageheadfont } = useFont();//Destructure and use the 'pageheadfont' from the useFont custom hook
  return (
    <div>
      <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, marginLeft:'2%', marginBottom:'21px', color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D'}}>Assessment Status (Self-Improvement)</Typography>
      <DatVal />
    </div>
  );
}

export default DataValidation;
