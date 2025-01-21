import React from "react";
import "./reportPhishing.css";
import video from "../../assets/reportPhishing.gif";

const ReportPhishing = () => {
  return (
    <div className="phishing">
      <div className="phishingCart">
        <div className="phishingCartText">
          <h3 className="phishingCartTextTitle">
            Co robić, gdy dostaniesz mail phishingowy?
          </h3>
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
          <p className="phishingCartTextEle">
            <strong>Jeśli kliknąłeś w link z podejrzanej wiadomości e-mail i wprowadziłeś swoje dane logowania na fałszywej stronie:</strong>
            <ul>
              <li>Natychmiast zmień swoje hasła do wszystkich powiązanych kont.</li>
              <li>Włącz uwierzytelnianie dwuskładnikowe (2FA), jeśli to możliwe.</li>
            </ul>
          </p>
          <p className="phishingCartTextEle">
            <strong>Jeśli wysłałeś komuś pieniądze:</strong>
            <ul>
              <li>Niezwłocznie skontaktuj się z bankiem i zgłoś incydent.</li>
              <li>Rozważ zgłoszenie sprawy na policję.</li>
            </ul>
          </p>
          <p className="phishingCartTextEle">
            Działaj szybko, ale nie poddawaj się panice – każdy krok zwiększa Twoje szanse na zminimalizowanie skutków ataku.
          </p>
        </div>
        <img src={video} alt="Phishing animation" className="phishingCartImg" />
      </div>
    </div>
  );
};

export default ReportPhishing;
