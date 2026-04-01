import React from "react";
import Header from "../../components/Menubar/menuBar";
import JsirfDashboardFilters from "../../components/JsirfDashboardFilters/JsirfDashboardFilters";
import DoubleBarChart from "../../components/DoubleBarChart/DoubleBarChart";
import RectHeatmap from "../../components/RectHeatmap/RectHeatmap";
import DashboardPieChart from "../../components/DashboardPieChart/DashboardPieChart";
import SingleBarChart from "../../components/SingleBarChart/SingleBarChart";
import "../JsirfDashboardPublic/JsirfDashboardPublic.css";
import { SubmittedPercentage_GET_Call } from "../../services/DasboardApi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const JsirfDashboardUni = () => {
  useEffect(() => {
    SubmittedPercentage_GET_Call(Cookies.get("aishe"))
      //SubmittedPercentage_GET_Call('U-0203')
      .then((response) => {
        if (response.status === 200) {
          setPercentage(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  const [percentage, setPercentage] = useState();
  const [barScore, setBarScore] = useState();
  const [rectMapScore, setRectMapScore] = useState();
  const handleBarScore = (item) => {
    setBarScore(item);
  };
  const handleRectMapScore = (item) => {
    setRectMapScore(item);
  };
  return (
    <>
      <div className="row1">
        <div className="jsirfr1left">
          <DashboardPieChart percentage={percentage} />
        </div>
        <div className="jsirfr1right">
          <SingleBarChart />
        </div>
      </div>
      <div className="row2">
        <div className="jsirfr1left">
          <JsirfDashboardFilters
            change={handleBarScore}
            visualizationType="BAR_GRAPH"
          />
        </div>
        <div className="jsirfr1right">
          <DoubleBarChart score={barScore} />
        </div>
      </div>
      <div className="row2">
        <div className="jsirfr2left">
          <RectHeatmap score={rectMapScore} />
        </div>
        <div className="jsirfr2right">
          <JsirfDashboardFilters
            change={handleRectMapScore}
            visualizationType="RECTHEATMAP"
          />
        </div>
      </div>
      <div className="row2">
        <div className="jsirfr1left">
          <JsirfDashboardFilters
            change={handleRectMapScore}
            visualizationType="RECTHEATMAP"
          />
        </div>
        <div className="jsirfr1right">
          <RectHeatmap score={rectMapScore} />
        </div>
      </div>
    </>
  );
};

export default JsirfDashboardUni;
