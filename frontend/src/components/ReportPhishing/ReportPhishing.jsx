import React from 'react';
import "./reportPhishing.css";
import video from "../../assets/reportPhishing.gif";

const ReportPhishing = () => {
  return (
    <div className="phishing-card">
      <img src={video} alt="" />
      <h3>Co robić, gdy dostaniesz mail phishingowy?</h3>
      <p>
        Jeśli otrzymasz podejrzany e-mail, nie klikaj w żadne linki ani nie pobieraj załączników. 
        Zgłoś ten e-mail na stronie:
      </p>
    </div>
  );
};

export default ReportPhishing;