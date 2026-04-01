import React from 'react';
import DataValidation from "../../components/JSIRFDataValidation/JSIRFDataValidation";
import Header from "../../components/Menubar/menuBar";
import JSIRFTabs from "../../components/JSIRFDataValidation/JSIRFTabs";
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back';
import { useFont } from "../../components/context/FontChangesContext";

const DataApprove = () => {
  const { pageheadfont } = useFont(); //Destructure and use the 'pageheadfont' from the useFont custom hook

  return (
    <div>
      <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, marginLeft:'2%', color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D'}}>Assessment validation (JSIRF)</Typography>
      <div style={{marginLeft:'2%'}}>
      </div>
      <JSIRFTabs/>
   </div>
  );
}

export default DataApprove;