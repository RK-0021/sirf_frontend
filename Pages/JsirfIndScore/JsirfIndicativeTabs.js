import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import JSIRFIndScore from "./JsirfIndScore";
import Header from "../../components/Menubar/menuBar";
import { useLocation } from "react-router-dom";
import JSIRFIndDcfQuestions from "../JsirfIndScore/JsirfIndDCFQuestions";
import Back from '../../components/BackButton/Back';
import { useFont } from "../../components/context/FontChangesContext";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const { pageheadfont } = useFont();//Destructuring and using pageheadfont from usefont custom hook
    const [value, setValue] = React.useState(0);
    const { state } = useLocation();//values received from the previous page

    //Function to handle the tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("State Details:", { state })
    return (
        <>
            <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, marginLeft: '2%', color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D' }}>Criteria-Specific Indicative Score</Typography>
            <Box sx={{ width: '100%' }}>
                {/* Display Tabs (DCF Key Indicator, DCF Questions) */}
                <div style={{ marginLeft: "35%" }}>
                    <Box sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Tabs value={value} onChange={handleChange}
                            indicatorColor="primary"
                            sx={{
                                "& .MuiTab-root.Mui-selected": {
                                    color: localStorage.getItem('theme') === 'dark' ? 'rgba(255,255,255,1)!important' : "#309A34 !important",
                                },
                                "& .MuiTabs-indicator": {
                                    backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(255,255,255,1)!important' : "#309A34 !important",
                                },
                                "&.MuiButtonBase-root": {
                                    color: "red !important"
                                }
                            }}
                        >
                            <Tab label="DCF Key Indicator" {...a11yProps(0)}
                                sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important' }} />
                            <Tab label="DCF Questions" {...a11yProps(1)}
                                sx={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.6)!important' }} />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <JSIRFIndScore state={state} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <JSIRFIndDcfQuestions state={state} />
                </CustomTabPanel>
            </Box>

        </>
    );
}
