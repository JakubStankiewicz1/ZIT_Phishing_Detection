import React from 'react';
// import './PhishingCard.css'; // Import CSS for styling
// import screenshot from '../../assets/reporting-site-screenshot.jpg'; // Replace with your screenshot path
import "./reportPhishing.css";
import video from "../../assets/reportPhishing.gif";

const ReportPhishing = () => {
  return (
    <div className="phishing-card">
      {/* <img src={screenshot} alt="Screenshot of reporting site" className="screenshot" /> */}
      <img src={video} alt="" />
      <h3>Co robić, gdy dostaniesz mail phishingowy?</h3>
      <p>
        Jeśli otrzymasz podejrzany e-mail, nie klikaj w żadne linki ani nie pobieraj załączników. 
        Zgłoś ten e-mail na stronie:
        <a href="https://example.com/report" target="_blank" rel="noopener noreferrer" className="report-link"> Zgłoś tutaj</a>.
      </p>
      <button className="report-button">
        <a href="https://example.com/report" target="_blank" rel="noopener noreferrer">Zgłoś teraz</a>
      </button>
    </div>
  );
};

export default ReportPhishing;