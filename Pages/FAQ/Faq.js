import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Menubar/menuBar";
import vector1 from '../../assets/EnhancedImages/Vector1.png';
import "./Faq.css";
import { useEffect } from "react";
import { useFont } from "../../components/context/FontChangesContext";

export default function BasicAccordion() { //faq component
  // Destructure and use the 'faqfont' value from the useFont custom hook
  const { number, setNumbers, faqfont } = useFont();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll the window to the top-left corner (0, 0) when the component mounts
  }, []);

  return (
    <div>
      <div className="faq_caption" style={{ color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 1)' }}>
        Frequently Asked Questions
      </div>
      <div className="faq_margin">
        {/* Six mui accordions are displayed below. Each accordion contains a question and an answer in accordion summary and accordion details respectively. 
        The user can click on the accordion to view the answer. */}
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)",
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              1.What data does the Analytical Dashboard use?{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              The Analytical Dashboard uses data from All India Survey of Higher
              Education, 2020- 21.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)", "&:before":
            {
              backgroundColor: "transparent !important"
            }
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              2. Why was the Jharkhand State Institutional Ranking Framework
              developed?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              The Jharkhand State Institutional Ranking Framework was developed
              so that the state could track performance of HEIs on
              state-specific, customized standards of performance.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)", "&:before":
            {
              backgroundColor: "transparent !important"
            }
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              3. What are the metrics used for ranking in the Jharkhand State
              Institutional Ranking Framework?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              The Jharkhand State Institutional Ranking Framework assesses HEIs
              on eight criteria:
              <br />
              a. Curricular Aspects
              <br />
              b. Teaching - Learning and Evaluation
              <br />
              c. Research, Innovations, and Extension
              <br />
              d. Infrastructure and Learning Resources <br /> e. Student Support
              and Progression <br /> f. Governance, Leadership, and Management{" "}
              <br /> g. Implementation of State Initiatives <br /> h. Best
              Practices
              <br /> To know more, click <a href="/">here</a>.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)", "&:before":
            {
              backgroundColor: "transparent !important"
            }
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              4. How is Jharkhand State Institutional Ranking Framework
              different from National Institutional Ranking Framework (NIRF) and
              the National Assessment and Accreditation Council (NAAC)?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              The Jharkhand State Institutional Ranking Framework has different
              weightages for different parameters. While there is an overlap
              between the key indicators, the weightages given to them vary as
              per state priorities. Additionally, there are also new indicators
              added as per state discretion to track parameters of interest,
              specific for Jharkhand.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)", "&:before":
            {
              backgroundColor: "transparent !important"
            }
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              5. How good is the data on which ranking has been done?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              The institutions have given this data certifying that it is
              correct. Even then, the data has been checked with reference to
              the data validations that have been built in. Additionally, the
              data used has been extracted from All India Survey of Higher
              Education to ensure reliability.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "20px",
            boxShadow: "none",
            borderRadius: "0px !important",
            backgroundColor: localStorage.getItem('theme') === 'dark' ? 'rgba(37, 37, 37, 1)' : "rgba(242, 242, 242, 1)", "&:before":
            {
              backgroundColor: "transparent !important"
            }
          }}
        >
          <AccordionSummary
            expandIcon={
              <div style={{ position: "relative", zIndex: 1 }}>
                <ExpandMoreIcon style={{ color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 1)' : "rgba(18, 68, 45, 1)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 1,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              </div>
            }
            sx={{ height: "5rem" }}
          >
            <Typography style={{ fontWeight: "bold", color: localStorage.getItem('theme') === 'dark' ? 'rgba(255, 255, 255, 0.8)' : "rgba(18, 68, 45, 1)", fontSize: `${faqfont}px` }}>
              6. Where can we send it other questions?{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: `${faqfont}px`, color: localStorage.getItem('theme') === 'dark' && 'rgba(255, 255, 255, 0.8)' }}>
              Other relevant questions can be mailed to{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=sirf.jharkhand@gmail.com"
                target="_blank"
              >
                {" "}
                sirf.jharkhand@gmail.com{" "}
              </a>{" "}
              with the subject line “Queries Regarding SIRF”.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
