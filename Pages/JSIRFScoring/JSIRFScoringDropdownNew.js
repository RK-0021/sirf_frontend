import React, { useState } from "react";
// import "./MockAssessDropdown.css";
import "../../components/DataValDropdown/DataValDropdownNew.css";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Grid from '@mui/material/Grid';
import _without from "lodash/without";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CancelChip from "../../assets/images/CancelChip.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Back from "../../components/BackButton/Back";
import { useFont } from "../../components/context/FontChangesContext";

//List of all Districts in Jharkhand
const names = [
  'Bokaro',
  'Chatra',
  'Deoghar',
  'Dhanbad',
  'Dumka',
  'East Singhbhum',
  'Garhwa',
  'Giridih',
  'Godda',
  'Gumla',
  'Hazaribagh',
  'Jamtara',
  'Khunti',
  'Koderma',
  'Latehar',
  'Lohardaga',
  'Pakur',
  'Palamu',
  'Ramgarh',
  'Ranchi',
  'Sahebganj',
  'Seraikela Kharsawan',
  'Simdega',
  'West Singhbhum',
];

//List of hei types
const name1 = [
  'University',
  'College'
];
const MenuProps = {
  PaperProps: {
    sx: {
      height: "80px !important",
      width: "140px !important",
      borderRadius: "4px !important"
    }
  },
};
const MenuProps1 = {
  autoFocus: false,
  PaperProps: {
    className: 'MenuPropsNew',
  },
};

// custom styled component for Paper using the styled function.
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#538C74' : 'rgba(244, 244, 244, 1)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
// Custom style object for styling.
const customStyle = {
  paddingRight: '100px !important',
};
function MultipleSelect() {
  const { pageheadfont } = useFont();//Destructure and use the 'pageheadfont' value from the useFont custom hook
  const navigate = useNavigate();
  const theme = useTheme();

  //usestate hooks to store the selected values
  const [personName1, setPersonName1] = useState();
  const [personName2, setPersonName2] = useState([]);
  const [itemsChecked, setItemsChecked] = useState(false);
  const [placeholderVisible1, setPlaceholderVisible1] = useState(true);
  const [placeholderVisible2, setPlaceholderVisible2] = useState(true);

  // function triggered when Check Results button is clicked
  const handleClickDrawDataSample = () => {
    //navigates to the /jsirfscoreadmin with the selected hei type and districts as state
    navigate("/jsirfscoreadmin", {
      state: {
        heitype: personName1.toUpperCase(),
        districts: personName2,
      },
    });
  };

  //function triggered when hei type is selected
  const handleChange1 = (event) => {
    const selectedNames = event.target.value;
    if (selectedNames === 'Autonomous') {
      setPersonName1('Standalone_Institute');
      setPlaceholderVisible1(selectedNames === null); // Set placeholder visibility based on whether the selected value is null.
    }
    else {
      setPersonName1(selectedNames);
      setPlaceholderVisible1(selectedNames === null); // Set placeholder visibility based on whether the selected value is null.
    }
  };

  // Function to handle the deletion of the selected hei type (chip)
  const handleDelete1 = (value) => {
    setPersonName1(null);
    setPlaceholderVisible1(true);
  };

  //function triggered when districts are selected
  const handleChange2 = (event) => {
    const selectedNames = event.target.value;
    setPersonName2(selectedNames);
    setPlaceholderVisible2(selectedNames.length === 0);
  };

  //function to handle 'Select All' checkbox
  const selectItem = (event) => {
    const { checked } = event.target;
    const selectedNames = names;
    setPlaceholderVisible2(selectedNames.length === 0);
    if (checked) {
      setPersonName2(selectedNames);
      setItemsChecked(checked);
    }
    else {
      setPersonName2([]);
      setItemsChecked(checked);
    }
    setPlaceholderVisible2(!checked);
  }

  // Function to handle the deletion of the selected districts (chip)
  const handleDelete2 = (value) => {
    setPersonName2((current) => _without(current, value));
    setPlaceholderVisible2(personName2.length === 1);
  };

  return (
    <div className="datavaldiv">
      <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D', marginBottom: "17px" }}>Results (JSIRF Score) </Typography>
      
      {/* Grids to select HEI type on the left and view the selected HEI type as chips on the right  */}
      <Grid container style={{ marginBottom: '-10px', marginTop: '10px' }}>
        <Grid item xs={2.2} >
          <Item className="custom-MuiPaper-rootNew" sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(60, 60, 60, 1)' }}>
            <FormControl className="formControl"
              sx={{
                width: "55%",
                "& .MuiInputLabel-root": {
                  fontFamily: "Roboto!important",
                  fontSize: "14px!important",
                  fontWeight: "400!important",
                  lineHeight: "18px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black !important",
                  // paddingRight: '100px !important'
                },
                "& .MuiSelect-icon": {
                  fill: localStorage.getItem('theme') === 'dark' ? 'rgba(125, 120, 120, 1)' : "black"
                }
              }}>
              <InputLabel id="demo-multiple-chip-label1" className="dataval-text"
                shrink={false}
                style={customStyle}>HEI Type</InputLabel>
              <Select
                labelId="demo-multiple-chip-label1"
                id="demo-multiple-chip1"
                multiple={false}
                value={personName1}
                onChange={handleChange1}
                input={<OutlinedInput id="select-multiple-chip1" label="Chip" />}
                MenuProps={MenuProps}
                renderValue={(selected) => { }}
              >
                {name1.map((name) => (
                  <MenuItem
                    className="selectdrop"
                    key={name}
                    value={name}
                    sx={{
                      color: "black",
                      fontSize: "13px!important",
                      fontWeight: "500",
                      '&:hover': {
                        backgroundColor: 'rgba(81, 140, 83, 1)',
                        color: 'white'
                      },
                      '&.Mui-selected:hover': {
                        color: 'black'
                      },
                    }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={9.5}>
          <Item className="custom-rootNew" sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(46, 46, 46, 1)!important' }}>
            {personName1 && (
              <Chip
                key={personName1}
                label={personName1}
                clickable
                className="chipNew"
                onDelete={() => handleDelete1()}
                deleteIcon={<img src={CancelChip} />}
                sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important', backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(77, 183, 119, 0.29)!important' }}
              />
            )}
            {placeholderVisible1 && !personName1 && ( //displayed when no hei type is chosen
              <div className="placeholder-textNew" style={{color:localStorage.getItem('theme')==='dark'&&'#ffffff'}}>
                Choose HEI Type from the dropdown
              </div>
            )}
          </Item>
        </Grid>
      </Grid>

      {/* Grids to select Locations on the left and view the selected Location as chips on the right  */}
      <Grid container>
        <Grid item xs={2.2} sx={{ marginTop: "2.5px" }}>
          <Item className="custom-MuiPaper-rootNew1" sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(60, 60, 60, 1)' }}>
            <FormControl className="formControl"
              sx={{
                width: "55%",
                "& .MuiInputLabel-root": {
                  fontFamily: "Roboto!important",
                  fontSize: "14px!important",
                  fontWeight: "400!important",
                  lineHeight: "18px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "black !important",
                  // paddingRight: '100px !important'
                },
                "& .MuiSelect-icon": {
                  fill: localStorage.getItem('theme') === 'dark' ? 'rgba(125, 120, 120, 1)' : "black"
                }
              }}
            >
              <InputLabel id="demo-mutiple-chip-checkbox-label" className="dataval-text" shrink={false} >Location</InputLabel>
              <Select
                labelId="demo-mutiple-chip-checkbox-label"
                id="demo-mutiple-chip-checkbox"
                multiple
                value={personName2}
                onChange={handleChange2}
                MenuProps={MenuProps1}
                renderValue={(selected) => { }}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '0px !important'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#2C665F !important',
                    borderRadius: '2px !important',
                  },
                }}
              >
                <InputLabel
                  sx={{
                    fontSize: "13px!important",
                    fontWeight: "500 !important",
                    color: "black !important",
                    fontFamily: "Roboto !important",
                    '& .MuiCheckbox-root': {
                      width: '30px',
                      height: '20px',
                    },
                    '&:not(:last-child)': {
                      marginTop: '2px',
                      marginBottom: '6px',
                      marginRight: '20px'
                    },
                  }}
                >
                  <Checkbox style={{ color: 'black' }} size='small' checked={itemsChecked} onChange={selectItem} />
                  Select All
                </InputLabel>
                {names.map((name) => (
                  <MenuItem key={name} value={name}
                    sx={{
                      // overflow:"scroll",                  
                      '& .MuiListItemText-primary': {
                        fontSize: '13px',
                        fontWeight: "500 !important",
                      },
                      '& .MuiCheckbox-root': {
                        width: '25px',
                        height: '20px',
                      },
                      '&:not(:last-child)': {
                        marginTop: '2px',
                        marginBottom: '3px'
                      },
                      '& .MuiMenu-list': {
                        '&::-webkit-scrollbar': {
                          width: '1px !important',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#2C665F !important',
                          borderRadius: '2px',
                        },
                      }
                    }}>
                    <Checkbox checked={personName2.includes(name)}
                      style={{ color: 'black' }}
                      size='small'
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid sx={{ marginTop: "30px" }}>
              {(personName1 === undefined || personName1 === null || personName2?.length === 0) ?
                (
                  <Button
                    onClick={() => handleClickDrawDataSample()}
                    disabled
                    className="Custom-Mui-disabled-head"
                    style={{ color: "white", fontSize: "14px", backgroundColor: "rgba(70, 134, 85, 1)", textTransform: "none", width: "100%" }}>
                    Check Results
                  </Button>
                ) : (
                  <Button onClick={() => handleClickDrawDataSample()}
                    style={{ color: "white", fontSize: "14px", backgroundColor: "rgba(70, 134, 85, 1)", textTransform: "none", width: "100%" }}>
                    Check Results
                  </Button>
                )}
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={9.5} sx={{ marginTop: "2.5px" }}>
          <Item className="custom-rootNew1" sx={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(46, 46, 46, 1)!important' }}>
            {personName2.map((value) => (
              <Chip
                key={value}
                label={value}
                clickable
                className="chipNew"
                onDelete={() => handleDelete2(value)}
                deleteIcon={<img src={CancelChip} />}
                sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)!important', backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(77, 183, 119, 0.29)!important' }}
              />
            ))}
            {placeholderVisible2 && ( //displayed when no district is chosen
              <div className="placeholder-textNew1" style={{color:localStorage.getItem('theme')==='dark'&&'#ffffff'}}>
                Choose Location from the dropdown
              </div>
            )}
          </Item>
        </Grid>
      </Grid>
    </div >
  );
}

export default MultipleSelect;

