import React from "react";
import "./reportPhishing.css";
import video from "../../assets/reportPhishing.gif";

const ReportPhishing = () => {
  return (
    <div className="phishing">
      <div className="phishingCart">
        <div className="phishingCartText">
          <h3 className="phishingCartTextTitle">Co robić, gdy dostaniesz mail phishingowy?</h3>
          <p className="phishingCartTextEle">
            Jeśli otrzymasz podejrzany e-mail, nie klikaj w żadne linki ani nie pobieraj załączników.
            <br />
            <br />
            Zgłoś ten e-mail na stronie:{" "}
            <a
              href="https://incydent.cert.pl/#!/lang=pl,entityType=notObligatedEntity,easyIncidentType=email"
              target="_blank"
              rel="noopener noreferrer"
              className="websiteUrl"
            >
              incydent.cert.pl
            </a>
          </p>
        </div>

        <img src={video} alt="" className="phishingCartImg" />
      </div>
    </div>
  );
};

export default ReportPhishing;
