import React from "react";
import Header from "../../components/Menubar/menuBar";
import JsirfDashboardFilters from "../../components/JsirfDashboardFilters/JsirfDashboardFilters";
import DoubleBarChart from "../../components/DoubleBarChart/DoubleBarChart";
import JsirfYearWiseTable from "../../components/Jsirfyearwisetable/Jsirfyearwisetable";
import Jsirfheatmap from "../../components/JSIRFHeatmap/JSIRFheatmap";
import "./JsirfDashboardPublic.css";
import { useState } from "react";
const JsirfDashboardPublic = () => {
  const [Barscore, setBarScore] = useState();
  const handleBarScore = (item) => {
    setBarScore(item);
  };
  return (
    <>
      <JsirfYearWiseTable />
    </>
  );
};

export default JsirfDashboardPublic;
