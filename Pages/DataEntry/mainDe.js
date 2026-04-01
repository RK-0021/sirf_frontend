import React, { useState } from "react";
import Header from "../../components/Menubar/menuBar";
import "../../components/DataValDropdown/DataValDropdown.css"
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import _without from "lodash/without";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataEntry from "../DataEntry/DataEntry";
import {Box} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const MainDe = () => {
    const navigate = useNavigate();
    const userType = Cookies.get("userType");
    const [isDis, setIsDis] = useState(true);
    const [selectedHei, setSelectedHei] = useState('');
  
    const handleClickDrawDataSample=(selectedHei)=>{
      navigate(
        '/dataentryAdminview',
        {
          state: {
            instType: selectedHei,
          }
        }
      )
    }
  
    const handleChange = (event) => {
      const selectedVal = event.target.value;
      setSelectedHei(selectedVal);
      setIsDis(false);

    };
  

    if (userType === 'HEAD' || userType === 'ADMIN') {
        return (
          <div>
            <div className="datavaldiv">
            <Box display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            > 
              <table
              style={{marginTop: "55px", marginBottom: "30px"}}>
                <tbody>
                  <tr>
                    <th className='profile-main-th' width='200px'>HEI Type</th>
                    <td className='profile-main-td'>
                      <FormControl sx={{
                          "& .MuiSvgIcon-root": {
                              width: '14px!important',
                              height: '14px!important',
                              border: '1px'
                          },
                          "& .MuiTypography-root": {
                              fontFamily: 'Roboto',
                              fontSize: '16px',
                              fontWeight: '400',
                              lineHeight: '19px',
                              letterSpacing: '0em'
                          },
                          "& .MuiFormControlLabel-root": {
                              marginRight: '50px'
                          }
                      }}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleChange}
                        >
                          <FormControlLabel value="UNIVERSITY" control={<Radio />} label="University" />
                          <FormControlLabel value="UG" control={<Radio />} label="UG" />
                          <FormControlLabel value="PG" control={<Radio />} label="PG" />
                          <FormControlLabel value="AUTONOMOUS" control={<Radio />} label="Autonomous" />
                        </RadioGroup>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button 
                onClick={()=>handleClickDrawDataSample()}
                disabled = {isDis}
                className= {isDis? "Custom-Mui-disabled" : ""}
                style={{marginTop: "55px", marginBottom: "30px", color: "white", fontSize: "14px", backgroundColor: "black", textTransform: "none", width: "15%", height: "50px" }}>
                  View Questionnarie
              </Button>
            </Box>     
            </div >
          </div>
        );
      } else {
        return <DataEntry />;
      }
  }
  
  export default MainDe;