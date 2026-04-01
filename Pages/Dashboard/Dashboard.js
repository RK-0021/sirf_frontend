import React, { useEffect, useState } from 'react';
import Header from "../../components/Menubar/menuBar";
import DashboardPieChart from '../../components/DashboardPieChart/DashboardPieChart';
import { SubmittedPercentage_GET_Call, SubmittedPercentageAdmin_GET_Call } from '../../services/DasboardApi';
import Criteria from '../../components/DashboardDropdown/Criteria';
import Chart from "react-apexcharts"
import Parameters from '../../components/DashboardDropdown/Parameters';
import Filter from '../../components/DashboardDropdown/Filter';
import { useNavigate } from 'react-router-dom';
import {
  LatestTotalScoresForAdmin_GET_Call,
  LatestCriteriaScoresForAdmin_GET_Call,
  ParameterScoresForAdmin_GET_Call,
  LatestCriteriaUniversityScores_GET_Call,
  ParameterScoresForUniv_GET_Call,
} from '../../services/DasboardApi';
import { InstitutionIndicator_GET_Call, Criteria_GET_Call } from '../../services/MockAssessmentPage';
import { Colleges_GET_Call } from '../../services/MockAssessmentPage';
import { Get_Parameter } from '../../services/AssessmentManagement'
import Alertpopup from '../../components/alert/Alertpopup';
import Errorpopup from '../../components/alert/Errorpopup';
import Cookies from 'js-cookie';
import './Dashboard.css'
import { onLogout } from '../../utils'
import { Typography } from '@mui/material';
import { useFont } from "../../components/context/FontChangesContext";

const Dashboard = () => {
  const { pageheadfont } = useFont(); // Destructure and use the 'pageheadfont' value from the useFont custom hook
  // States to track the status and store values of various variables using useState hook
  const [filterState, setFilterState] = useState('')
  const [criteriaState, setCriteriaState] = useState('')
  const [percentage, setPercentage] = useState()
  const [scores, setScores] = useState([])
  const [aisheCodes, setAisheCodes] = useState([])
  const [institutionTypeIndicator, setInstitutionTypeIndicator] = useState('')
  const [criteriaId, setCriteriaId] = useState('')
  const [parameter, setParameter] = useState('')
  const [criteriaList, setCriteriaList] = useState([])
  const [parameterList, setParameterList] = useState([])
  const [names, setNames] = useState([])
  const [res, setRes] = useState('')
  const navigate = useNavigate();
  const [resUni, setResUni] = useState('')
  const [maxvalue, setMaxvalue] = useState(0)
  const [displayerror, setdisplayerror] = useState(false)

  // useEffect is used to make the api calls as soon as the component loads
  useEffect(() => {
    if (Cookies.get('role') !== 'ADMIN' && Cookies.get('role') !== 'HEAD') {
      // Fetch percentage scores using AISHE code (for pie chart)
      SubmittedPercentage_GET_Call(Cookies.get('aishe'))
        .then((response) => {
          if (response.status === 200) {
            setPercentage(response.data)
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404) {
            setResUni("No colleges found")
            setRes(response?.response?.data?.message)
          }
          else {
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }, [])

  // handleFilter function is passed on to child component <Filter /> as a prop.
  // institutionTypeIndicator will be selected from the child component and passed onto the function (child to parent communication)
  function handleFilter(institutionTypeIndicator, filterState) {
    setFilterState(filterState)
    setInstitutionTypeIndicator(institutionTypeIndicator)
    if (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') {
      // Fetch total scores for admin/head based on the selected institution type (for bar chart)
      LatestTotalScoresForAdmin_GET_Call(institutionTypeIndicator)
        .then((response) => {
          if (response.status === 200) {
            setdisplayerror(false)
            setAisheCodes(response.data.map((item) => item.aisheCode))
            setNames(response.data.map((item) => item.institutionName))
            setScores(response.data.map((item) => item.score))
            setMaxvalue(Math.max(...response.data.map((item) => item.score)))
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404 || response?.response?.status === 400) {
            setdisplayerror(true)
            setRes(`Scores not found for the selected filter: ${institutionTypeIndicator}`)
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })

      // Fetch percentage scores for admin/head based on the selected institution type (for pie chart)
      SubmittedPercentageAdmin_GET_Call(institutionTypeIndicator)
        .then((response) => {
          if (response.status === 200) {
            setPercentage(response?.data)
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }

    else if (Cookies.get('role') === 'UNIVERSITY') {
      // Fetch college scores for university user based on it's aishe code (for bar chart)
      Colleges_GET_Call(Cookies.get('aishe'))
        .then((response) => {
          if (response.status === 200) {
            const filteredlist = response.data.filter(
              (obj) => obj.institutionTypeIndicator === institutionTypeIndicator
            );
            if (filteredlist.length !== 0) {
              setdisplayerror(false)
              setAisheCodes(filteredlist.map((item) => item.aisheCode))
              setNames(filteredlist.map((item) => item.collegeName))
              setScores(filteredlist.map((item) => item.totalScore))
              setMaxvalue(Math.max(...filteredlist.map((item) => item.totalScore)))
            }
            else {
              setdisplayerror(true)
              setAisheCodes([])
              setNames([])
              setScores([])
              setMaxvalue(0)
              setRes('No college scores found for the selected filter')
            }
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else {
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }

    // Fetch criteria list based on the selected institution type indicator
    Criteria_GET_Call(institutionTypeIndicator, 'MOCK')
      .then((response) => {
        if (response.status === 200) {
          setCriteriaList(response?.data)
        }
        else if (response?.response?.status === 500) {
          setRes("Internal Server Error. Try Again!")
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else {
          //alert(response?.response?.data?.message)
          setRes(response?.response?.data?.message)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  // handleCriteria function is passed on to child component <Criteria /> as a prop.
  // criteria will be selected from the child component and the id and name of the selected criteria will be passed onto the function (child to parent communication)
  function handleCriteria(criteriaId, cname, filterState, criteriaState) {
    setFilterState(filterState)
    setCriteriaState(criteriaState)
    setCriteriaId(criteriaId)
    if (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') {
      // Fetch scores for the admin/head based on the selected criteria and institution type (for bar chart)
      LatestCriteriaScoresForAdmin_GET_Call(institutionTypeIndicator, criteriaId)
        .then((response) => {
          if (response.status === 200) {
            setdisplayerror(false)
            setAisheCodes(response.data.map((item) => item.aisheCode))
            setNames(response.data.map((item) => item.institutionName))
            setScores(response.data.map((item) => item.score))
            setMaxvalue(Math.max(...response.data.map((item) => item.score)))
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404 || response?.response?.status === 400) {
            setdisplayerror(true)
            setRes(`Scores not found for the selected Criteria: ${cname}`)
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
    else {
      // Fetch scores for the university user based on the selected criteria and aishe code (for bar chart)
      LatestCriteriaUniversityScores_GET_Call(Cookies.get('aishe'), criteriaId)
        .then((response) => {
          if (response.status === 200) {
            setdisplayerror(false)
            setNames(response.data.map((item) => item.collegeName))
            setAisheCodes(response.data.map((item) => item.aisheCode))
            setScores(response.data.map((item) => item.scoreCriteria))
            setMaxvalue(Math.max(...response.data.map((item) => item.scoreCriteria)))
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404 || response?.response?.status === 400) {
            setdisplayerror(true)
            setRes(`Scores not found for the selected Criteria: ${cname}`)
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }

    // Fetch parameter list based on the selected criteria and institution type indicator
    Get_Parameter(institutionTypeIndicator, 'MOCK', criteriaId)
      .then((response) => {
        if (response.status === 200) {
          setParameterList(response?.data.filter((obj) => obj.sumWeight !== null))
        }
        else if (response?.response?.status === 401) {
          onLogout();
          localStorage.removeItem('theme')
        }
        else if (response?.response?.status === 500) {
          setRes("Internal Server Error. Try Again!")
        }
        else {
          //alert(response?.response?.data?.message)
          setRes(response?.response?.data?.message)
        }
      })
      .catch((error) => {
        alert(error)
      })

  }

  // handleParameter function is passed on to child component <Parameters /> as a prop.
  // parameter will be selected from the child component and the id and name of the selected parameter will be passed onto the function (child to parent communication)
  function handleParameter(paramId, pname, filterState, criteriaState) {
    setFilterState(filterState)
    setCriteriaState(criteriaState)
    setParameter(paramId)
    if (Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') {
      // Fetch scores for the admin/head based on the selected parameter and institution type (for bar chart)
      ParameterScoresForAdmin_GET_Call(paramId, institutionTypeIndicator)
        .then((response) => {
          if (response.status === 200) {
            setdisplayerror(false)
            setAisheCodes(response.data.map((item) => item.aisheCode))
            setNames(response.data.map((item) => item.institutionName))
            setScores(response.data.map((item) => item.score))
            setMaxvalue(Math.max(...response.data.map((item) => item.score)))
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404 || response?.response?.status === 400) {
            setdisplayerror(true)
            setRes(`Scores not found for the selected Parameter: ${pname}`)
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
    else {
      // Fetch scores for university user based on the selected parameter and aishe code (for bar chart)
      ParameterScoresForUniv_GET_Call(paramId, Cookies.get('aishe'))
        .then((response) => {
          if (response.status === 200) {
            setdisplayerror(false)
            setAisheCodes(response.data.map((item) => item.collegeAisheCode))
            setNames(response.data.map((item) => item.collegeName))
            setScores(response.data.map((item) => item.scoreParameter))
            setMaxvalue(Math.max(...response.data.map((item) => item.scoreParameter)))
          }
          else if (response?.response?.status === 401) {
            onLogout();
            localStorage.removeItem('theme')
          }
          else if (response?.response?.status === 500) {
            setRes("Internal Server Error. Try Again!")
          }
          else if (response?.response?.status === 404 || response?.response?.status === 400) {
            setdisplayerror(true)
            setRes(`Scores not found for the selected Parameter: ${pname}`)
          }
          else {
            //alert(response?.response?.data?.message)
            setRes(response?.response?.data?.message)
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  // Initialize the state object for configuring the chart
  const state = {
    series: [{
      name: 'Score',
      data: scores
    }],
    options: {
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ['rgba(71,97,120,1)'],
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: scores.length >= 4 ? '29px' : '60px',
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val.toFixed(0);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },

      xaxis: {
        tickPlacement: 'on',
        categories: aisheCodes,
        position: 'bottom',
        axisBorder: {
          show: true,
          color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#B1B1B1'
        },
        axisTicks: {
          show: true,
          color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#B1B1B1'
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: localStorage.getItem('theme') === 'dark' && aisheCodes.map(() => 'rgba(255, 255, 255, 0.8)')
          }
        }
      },
      yaxis: {
        min: 0,
        max: Math.round(maxvalue + 1),
        tickAmount: 5,
        axisBorder: {
          show: true,
          color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#B1B1B1'
        },
        axisTicks: {
          show: true,
          color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#B1B1B1'
        },
        labels: {
          show: true,
          format: '{value}',
          style: {
            colors: localStorage.getItem('theme') === 'dark' && ['rgba(255, 255, 255, 0.8)'],
          }
        }
      },
      grid: {
        show: false
      },
      title: {
        text: '',
      },
      tooltip: {
        enabled: true, // Enable custom tooltips
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          const value = series[seriesIndex][dataPointIndex];
          const category = names[dataPointIndex];
          const text = `${category} <br> Score: ${value}`;
          return (
            '<div class="custom-tooltip">' +
            '<span>' +
            text +
            '</span>' +
            '</div>'
          );
        }
      }
    },
  };

  return (
    <>
      <Typography className="page-heading" sx={{ fontSize: `${pageheadfont}px`, color: localStorage.getItem('theme') === 'dark' ? '#ffffff!important' : '#12442D', marginLeft: '2%' }}>Dashboard (Self-improvement)</Typography>
      {(Cookies.get('role') === 'ADMIN' || Cookies.get('role') === 'HEAD') ?
        <Typography className='statusinfomsg'>*You can see data for Universities by default, select other filters to check data for other HEIs</Typography> :
        <Typography className='statusinfomsg'>*Select filter to generate graph for UG/PG</Typography>
      }
      <div className='dashboard-wrapper' style={{ marginTop: '20px' }}>
        <div className='dashboard-left' style={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(37, 37, 37, 1)' }}>
          <DashboardPieChart percentage={percentage} />
        </div>
        <div className='dashboard-right' style={{ backgroundColor: localStorage.getItem('theme') === 'dark' && 'rgba(37, 37, 37, 1)' }}>
          <div className='dashboard-dropdown'>
            {institutionTypeIndicator !== '' && criteriaId !== '' && // Conditional rendering of parameter dropdown based on the selected filter and criteria
              <div style={{ marginRight: '20px' }}>
                <Parameters criteriaState={criteriaState} filterState={filterState} parameterList={parameterList} criteriaId={criteriaId} institutionTypeIndicator={institutionTypeIndicator} change={handleParameter} />
              </div>
            }
            <div style={{ marginRight: '20px' }}>
              <Filter filterState={filterState} change={handleFilter} />
            </div>
            {institutionTypeIndicator !== '' && // Conditional rendering of criteria dropdown based on the selected filter
              <div>
                <Criteria criteriaState={criteriaState} filterState={filterState} criteriaList={criteriaList} change={handleCriteria} institutionTypeIndicator={institutionTypeIndicator} />
              </div>
            }
          </div>
          {displayerror ? <div style={{ display: 'flex', color: '#D22B2B', alignItems: 'center', justifyContent: 'center', fontFamily: 'Roboto', fontSize: '1rem', fontWeight: '500', marginTop: '12%' }}>No Scores found for the selected Hei Type/Criteria/Parameter</div> :
            <Chart options={state.options} series={state.series} type="bar" height={350} />
          }
        </div>
      </div>

      {/* Conditional rendering of error popup */}
      {res !== '' && (
        <Errorpopup
          showDialog={res !== '' ? true : false}
          msg={res}
          setoff={() => {
            resUni.includes("No colleges found") ? navigate("/") : setRes('');
          }}
        />
      )}
    </>
  );
}

export default Dashboard;
