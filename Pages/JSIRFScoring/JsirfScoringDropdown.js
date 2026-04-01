import React, { useState } from "react";
import "../MockAssesment/DataValDropdown.css";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import _without from "lodash/without";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Header from "../../components/Menubar/menuBar";
import { useNavigate } from "react-router-dom";

const names = [
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribagh",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahebganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",
];

const name1 = [
  "University",
  "College",
  // 'Standalone Institute',
];

const MenuProps = {
  autoFocus: false,
  PaperProps: {
    style: {
      background: "#2C665F",
    },
    className: "MenuProps",
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "538C74" : "#538C74",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const customStyle = {
  paddingRight: "100px !important",
};

function MultipleSelect() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [personName1, setPersonName1] = useState();
  const [personName2, setPersonName2] = useState([]);

  const [itemsChecked, setItemsChecked] = useState(false);

  const [placeholderVisible1, setPlaceholderVisible1] = useState(true);
  const [placeholderVisible2, setPlaceholderVisible2] = useState(true);

  const handleClickDrawData = () => {
    navigate("/jsirfscoreadmin", {
      state: {
        heitype: personName1.toUpperCase(),
        districts: personName2,
      },
    });
  };

  const handleChange1 = (event) => {
    const selectedNames = event.target.value;
    if (selectedNames === "Standalone Institute") {
      setPersonName1("Standalone_Institute");
      setPlaceholderVisible1(selectedNames === null);
    } else {
      setPersonName1(selectedNames);
      setPlaceholderVisible1(selectedNames === null);
    }
  };

  const handleDelete1 = (value) => {
    setPersonName1(null);
    setPlaceholderVisible1(true);
    // setPersonName1((current) => _without(current, value));
    // setPlaceholderVisible1(personName1.length === 0);
  };

  // const handleChange1 = (event) => {
  //   const selectedNames = event.target.value;
  //   setPersonName1(selectedNames);
  //   setPlaceholderVisible1(selectedNames.length === 0);
  // };

  // const handleDelete1 = (value) => {
  //   setPersonName1((current) => _without(current, value));
  //   setPlaceholderVisible1(personName1.length === 1);
  // };

  const handleChange2 = (event) => {
    const selectedNames = event.target.value;
    setPersonName2(selectedNames);
    setPlaceholderVisible2(selectedNames.length === 0);
  };

  const selectItem = (event) => {
    const { checked } = event.target;
    const selectedNames = names;
    setPlaceholderVisible2(selectedNames.length === 0);
    if (checked) {
      setPersonName2(selectedNames);
      setItemsChecked(checked);
    } else {
      setPersonName2([]);
      setItemsChecked(checked);
    }
    setPlaceholderVisible2(!checked);
  };

  const handleDelete2 = (value) => {
    setPersonName2((current) => _without(current, value));
    setPlaceholderVisible2(personName2.length === 1);
  };

  return (
    <>
      <div className="datavaldiv">
        <Grid container style={{ marginBottom: "-10px" }}>
          <Grid item xs={2.2}>
            <Item className="custom-MuiPaper-root">
              <FormControl
                className="formControl"
                sx={{
                  width: "55%",
                  // marginRight: "100px !important",
                  "& .MuiInputLabel-root": {
                    fontFamily: "Roboto!important",
                    fontSize: "14px!important",
                    fontWeight: "400!important",
                    lineHeight: "18px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "#ffff !important",
                    // paddingRight: '100px !important'
                  },
                  "& .MuiSelect-icon": {
                    fill: "#ffff",
                  },
                }}
              >
                <InputLabel
                  id="demo-multiple-chip-label1"
                  className="dataval-text"
                  // sx={{paddingRight: '100px !important'}}
                  shrink={false}
                  style={customStyle}
                >
                  HEI Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label1"
                  id="demo-multiple-chip1"
                  multiple={false}
                  // value={selectedPersonName}
                  // onChange={handleSingleChange}
                  value={personName1}
                  onChange={handleChange1}
                  input={
                    <OutlinedInput id="select-multiple-chip1" label="Chip" />
                  }
                  // IconComponent={KeyboardArrowDownIcon}
                  MenuProps={MenuProps}
                  renderValue={(selected) => {}}
                >
                  {name1.map((name) => (
                    <MenuItem
                      className="selectdrop"
                      key={name}
                      value={name}
                      sx={{
                        fontSize: "13px!important",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "black",
                        },
                        "&.Mui-selected:": {
                          backgroundColor: "black",
                        },
                      }}
                      // style={{backgroundColor:'#2C665F',color:'#fff',padding:'4px'}}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={9.5}>
            <Item className="custom-root">
              {/* {personName1.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                clickable
                                className="chip"
                                onDelete={() => handleDelete1(value)}
                                onClick={() => console.log("clicked chip")}
                            />
                            ))} */}
              {personName1 && (
                <Chip
                  key={personName1}
                  label={personName1}
                  clickable
                  className="chip"
                  onDelete={() => handleDelete1()}
                  //onClick={() => console.log("clicked chip")}
                />
              )}
              {placeholderVisible1 && !personName1 && (
                <div className="placeholder-text">
                  Choose HEI Type from the dropdown
                </div>
              )}
            </Item>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2.2} sx={{ marginTop: "2.5px" }}>
            <Item className="custom-MuiPaper-root1">
              <FormControl
                className="formControl"
                sx={{
                  width: "55%",
                  "& .MuiInputLabel-root": {
                    fontFamily: "Roboto!important",
                    fontSize: "14px!important",
                    fontWeight: "400!important",
                    lineHeight: "18px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: "#ffffff",
                    // paddingTop: "0px!important"
                  },
                  "& .MuiSelect-icon": {
                    fill: "#ffffff",
                  },
                }}
              >
                <InputLabel
                  id="demo-mutiple-chip-checkbox-label"
                  className="dataval-text"
                  shrink={false}
                >
                  Location
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-checkbox-label"
                  id="demo-mutiple-chip-checkbox"
                  multiple
                  value={personName2}
                  onChange={handleChange2}
                  //onOpen={() => console.log("select opened")}
                  // IconComponent={KeyboardArrowDownIcon}
                  MenuProps={MenuProps}
                  renderValue={(selected) => {}}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "0px !important",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#2C665F",
                      borderRadius: "2px",
                    },
                    //     MenuProps= {{ PaperProps :{
                    //      sx:{
                    //       '&::-webkit-scrollbar': {
                    //         width: '0px !important'},
                    //         '&::-webkit-scrollbar-thumb': {
                    //           backgroundColor: '#2C665F',
                    //           borderRadius: '2px',
                    //         },
                    //     }
                    //   }
                    // }}
                  }}
                >
                  <InputLabel
                    className="dataval-text1"
                    sx={{
                      "& .MuiCheckbox-root": {
                        width: "30px",
                        height: "20px",
                      },
                      "&:not(:last-child)": {
                        marginTop: "2px",
                        marginBottom: "6px",
                        marginRight: "20px",
                      },
                    }}
                  >
                    <Checkbox
                      style={{ color: "white", size: "10px" }}
                      checked={itemsChecked}
                      onChange={selectItem}
                    />
                    Select All
                  </InputLabel>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "12px",
                        },
                        "& .MuiCheckbox-root": {
                          width: "30px",
                          height: "20px",
                        },
                        "&:not(:last-child)": {
                          marginTop: "2px",
                          marginBottom: "3px",
                        },
                        "& .MuiMenu-list": {
                          "&::-webkit-scrollbar": {
                            width: "1px !important",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#2C665F",
                            borderRadius: "2px",
                          },
                        },
                        // '&.Mui-selected:':{
                        //   backgroundColor:'white',
                        // }
                      }}
                    >
                      <Checkbox
                        checked={personName2.includes(name)}
                        style={{ color: "white", size: "10px" }}
                      />
                      <ListItemText
                        primary={name}
                        style={{ color: "white", fontSize: "13px !important" }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={9.5} sx={{ marginTop: "2.5px" }}>
            <Item className="custom-root1">
              {personName2.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  clickable
                  className="chip"
                  onDelete={() => handleDelete2(value)}
                  //onClick={() => console.log("clicked chip")}
                />
              ))}
              {placeholderVisible2 && (
                <div className="placeholder-text1">
                  Choose Location from the dropdown
                </div>
              )}
            </Item>
          </Grid>
        </Grid>

        {personName1 === undefined ||
        personName1 === null ||
        personName2?.length === 0 ? (
          <Button
            onClick={() => handleClickDrawData()}
            disabled
            className="Custom-Mui-disabled"
            style={{
              marginLeft: "42%",
              marginTop: "55px",
              marginBottom: "30px",
              color: "white",
              fontSize: "14px",
              backgroundColor: "black",
              textTransform: "none",
              width: "15%",
              height: "50px",
            }}
          >
            Check Results
          </Button>
        ) : (
          <Button
            onClick={() => handleClickDrawData()}
            style={{
              marginLeft: "42%",
              marginTop: "55px",
              marginBottom: "30px",
              color: "white",
              fontSize: "14px",
              backgroundColor: "black",
              textTransform: "none",
              width: "15%",
              height: "50px",
            }}
          >
            Check Results
          </Button>
        )}
      </div>
    </>
  );
}

export default MultipleSelect;
