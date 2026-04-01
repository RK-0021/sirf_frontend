import React from 'react'
//import MenuBar from '../../components/MenuBar/MenuBar'
import MenubarNew from '../../components/MenuBar/menuBarNew'
import banner from '../../assets/EnhancedImages/homepagebannerpic.svg'
import LatestUpdates from "../../Pages/Home/LatestUpdates"
import './Home.css'
import Hero from "../../components/Middle/Hero"
import About from "../../components/about/About"
import HeaderNew from '../../components/HeaderNew/IndexNew'
import ErrorBoundary from '../../components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <ErrorBoundary><HeaderNew /> </ErrorBoundary>
      {/* <MenuBar /> */}
      <MenubarNew />
      <LatestUpdates />
      <Hero />
      <About />

      <div className="banner-container">
        <img 
          src={banner} 
          alt="Banner"
          className="banner-image"
        />

        {/* Overlay */}
        <div className="banner-overlay"></div>

        {/* Text Content */}
        <div className="banner-text">
          <h4>Welcome to</h4>

          <h1>
            Jharkhand State Institutional Ranking Framework
          </h1>

          <h5>
            Department of Higher and Technical Education
          </h5>

          <h6>
            Government of Jharkhand
          </h6>

          <p>
            The portal provides tools for the higher education institutions 
            of the state to visualise their performance, track their progress, 
            and assess their quality in comparison to their peers.
          </p>
        </div>
      </div>
    </>
  )
}