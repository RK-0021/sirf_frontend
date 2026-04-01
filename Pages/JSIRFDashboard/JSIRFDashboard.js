import React from 'react'
import Header from '../../components/Menubar/menuBar'
import JsirfDashboardFiltersNew from '../../components/JsirfDashboardFiltersNew/JsirfDashboardFiltersNew'
import JsirfYearWiseTable from '../../components/Jsirfyearwisetable/Jsirfyearwisetable'
import '../BarAndPie/BarAndPie.css'
import './JSIRFDashboard.css'
import Cookies from 'js-cookie'
const JSIRFDashboard = () => {
  return (
    <>
      {/* <div className='topp'>
        <JSIRFDashboardFilters visualizationType='HEATMAP' />
      </div>
      <div className='middle'>
        <JSIRFDashboardFilters visualizationType='BAR_GRAPH' />
      </div>
      <div className='bottomm'>
        <JSIRFDashboardFilters visualizationType='PIE_CHART' />
      </div> */}
      <div className='middle'>
      {/* {(Cookies.get('role') !== 'HEAD') || (Cookies.get('role') !== 'ADMIN') ?
          <JsirfYearWiseTable/>
           : 
         <><JsirfDashboardFiltersNew visualizationType='BAR_GRAPH' /></>
      }  */}
       <JsirfDashboardFiltersNew visualizationType='BAR_GRAPH' />
      </div>
      {(Cookies.get('role') !== 'HEAD' &&
        Cookies.get('role') !== 'ADMIN' &&
        Cookies.get('role') !== 'UNIVERSITY' &&
        Cookies.get('role') !== 'COLLEGE' &&
        Cookies.get('role') !== 'STANDALONE_INSTITUTE') ?
        <div className='topp'>
          <JsirfDashboardFiltersNew visualizationType='HEATMAP' />
        </div> :
        <div className='bottomm'>
          <JsirfDashboardFiltersNew visualizationType='PIE_CHART' />
        </div>
      }
      {/* <div className='middle'>
        <JsirfDashboardFiltersNew visualizationType='BAR_GRAPH' />
      </div> */}
    </>
  )
}

export default JSIRFDashboard
