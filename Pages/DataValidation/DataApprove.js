import React from 'react';
import DataValApprove from "../../components/DataValApprove/DataValApprove";
import Header from "../../components/Menubar/menuBar";
import { Typography } from '@mui/material';
import Back from '../../components/BackButton/Back';
import { useFont } from "../../components/context/FontChangesContext";

const DataApprove = () => {
  const { pageheadfont } = useFont(); //Destructure and use the 'pageheadfont' value from the useFont custom hook
  return (
    <div>
      <Typography className="page-heading" sx={{fontSize:`${pageheadfont}px`, marginLeft:'2%', color:localStorage.getItem('theme')==='dark'?'#ffffff!important': '#12442D'}}>Assessment validation (Self-Improvement)</Typography>
      <div style={{marginLeft:'2%'}}>
      <Back />
      </div>
      <DataValApprove/>
   </div>
  );
}

export default DataApprove;