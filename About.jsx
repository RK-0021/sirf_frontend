import React from 'react'
import styles from './About.module.css'
const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap1}>
        <div className={styles.text}>
          <div className={styles.caption_about}>About JSIRF
          <img src='Vector.png' alt='vector' className={styles.vector}/></div>
          <div className={styles.details_about}>
            Jharkhand State Institutional Ranking Framework (JSIRF) is a specialized and customizable tool for performance audit of higher education institutions in Jharkhand. It aims to evaluate the institutions based on pre-defined state-specific parameters, thereby assisting them in identifying key areas of improvement. The gap-identification, feedback, and monitoring of performance is expected to lead to an enhanced education ecosystem in the state.
          </div>
        </div>
        <img src='./img2.jpg' alt='pic1' className={styles.image11}></img>
        <img src='./img1.jpg' alt='pic2' className={styles.image12}></img>
      </div>
      <div className={styles.wrap2}>
        <img src='./img3.jpg' alt='pic3' className={styles.image1} />
        <img src='./img4.jpg' alt='pic4' className={styles.image2} />
        <div className={styles.text}>
          <div className={styles.caption_obj}>
          <img src='Vector_rev.png' alt='vector' className={styles.vector_rev}/>Objective</div>
          <div className={styles.details_obj}>
            To outline a state-wide methodology to rank institutions and provide support for national/international accreditations through data driven analysis and detailed feedback reports.
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
