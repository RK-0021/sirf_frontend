import React, { useState } from 'react'
import Header from "../../components/Menubar/menuBar";
import FilterAndQuestions from "../../components/FilterAndQuestions/FilterAndQuestions";
import { Questions_GET_Call } from "../../services/QuestionApi";
import { useEffect } from "react";
import { useQuestions } from '../../components/context/FilterQuestionsContext';
import './BarAndPie.css'
const BarAndPie = () => {
  const graph_type1 = 'BAR_GRAPH'
  const graph_type2 = 'PIE_CHART'
  const { setBarQuestion, setPieQuestion } = useQuestions();

  useEffect(() => {
    Questions_GET_Call(graph_type1)
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
    Questions_GET_Call(graph_type2)
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
    <div>
      <div className='top'>
        <FilterAndQuestions visualizationType={graph_type1} />
      </div>
      <div className='bottom'>
        <FilterAndQuestions visualizationType={graph_type2} />
      </div>
    </div>
  )
}

export default BarAndPie
