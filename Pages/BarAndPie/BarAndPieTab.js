import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FilterAndQuestions from "../../components/FilterAndQuestions/FilterAndQuestions";
import { Questions_GET_Call } from "../../services/QuestionApi";
import { useEffect } from "react";
import { useQuestions } from '../../components/context/FilterQuestionsContext';

// Defines a functional component named CustomTabPanel that renders content based on the current tab selection.
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

// Specifies the expected prop types for the CustomTabPanel component.
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// Defines a function named a11yProps to generate accessibility props for tabs.
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BarAndPieTab() {
    const graph_type1 = 'BAR_GRAPH'
    const graph_type2 = 'PIE_CHART'

    // Destructure and use setBarQuestion, setPieQuestion value from the useQuestions custom hook
    const { setBarQuestion, setPieQuestion } = useQuestions();

    const [value, setValue] = React.useState(0);

    // Function to handle tab change.
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fetch and store list of questions for bar chart and pie chart from API call as soon as the component is mounted.
    useEffect(() => {
        Questions_GET_Call(graph_type1)//for bar graph
            .then((response) => {
                if (response?.message !== "Network Error") {
                    setBarQuestion(response);
                } else {
                    alert(response?.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
        Questions_GET_Call(graph_type2)//for pie chart
            .then((response) => {
                if (response?.message !== "Network Error") {
                    setPieQuestion(response);
                } else {
                    alert(response?.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    return (
        <>
            {/* Box component to display the tabs for bar and pie chart */}
            <Box sx={{ width: '100%' }}>
                <div style={{ marginLeft: "42%" }}>
                    <Box sx={{ alignItems: "center", justifyContent: "center" }}>
                        {/* Horizontal Tabs */}
                        <Tabs value={value} onChange={handleChange}
                            indicatorColor="primary"
                            sx={{
                                "& .MuiTab-root.Mui-selected": {
                                    fontSize: '16px',
                                    color: '#45988E',
                                    fontWeight: '700px'
                                },
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#45988E",
                                    height: '5px',
                                },
                                "& .MuiTab-root": {
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500px',
                                    color: '#888888',
                                    textTransform: 'none'
                                }
                            }}
                        >
                            <Tab label="Bar Graph" {...a11yProps(0)} />
                            <Tab label="Pie Chart" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                </div>
                {/* CustomTabPanel for Bar Chart */}
                <CustomTabPanel value={value} index={0}>
                    <div className='top' style={{ marginTop: '0px' }}>
                        <FilterAndQuestions visualizationType={graph_type1} />
                    </div>
                </CustomTabPanel>

                {/* CustomTabPanel for Pie Chart */}
                <CustomTabPanel value={value} index={1}>
                    <div className='top' style={{ marginTop: '0px' }}>
                        <FilterAndQuestions visualizationType={graph_type2} />
                    </div>
                </CustomTabPanel>
            </Box>

        </>
    );
}
