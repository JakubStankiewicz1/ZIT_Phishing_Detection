import React from "react";
import "./technologies.css";
import pythonLogo from "../../assets/python-logo-generic.svg";
import flaskLogo from "../../assets/Flask.png";
import scikitLearn from "../../assets/scikitLearn.png";
import pandas from "../../assets/Pandas.png";
import react from "../../assets/React.png";

const Technologies = () => {
  return (
    <div className="technologies">
      <h3>Jakie technologie są używane? 🛠️</h3>
      <ul className="technologiesList">
        <li>
          <img src={pythonLogo} alt="Python Logo" className="iconLogo" />
          <strong className="technologiesBoldText">Python:</strong> Używany jako główny język programowania backendu.
          <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="learn-more">Dowiedz się więcej</a>
        </li>
        <li>
          <img src={flaskLogo} alt="Flask Logo" className="iconLogo" />
          <strong className="technologiesBoldText">Flask:</strong> Framework do budowy API, umożliwiający komunikację między frontendem a modelem uczenia maszynowego.
          <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer" className="learn-more">Dowiedz się więcej</a>
        </li>
        <li>
          <img src={scikitLearn} alt="Scikit-learn Logo" className="iconLogo" />
          <strong className="technologiesBoldText">Scikit-learn:</strong> Biblioteka do uczenia maszynowego, używana do trenowania i obsługi modelu.
          <a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" className="learn-more">Dowiedz się więcej</a>
        </li>
        <li>
          <img src={pandas} alt="Pandas Logo" className="iconLogo" />
          <strong className="technologiesBoldText">Pandas:</strong> Narzędzie do analizy danych, używane do wstępnego przetwarzania i oczyszczania zbioru danych e-maili.
          <a href="https://pandas.pydata.org/" target="_blank" rel="noopener noreferrer" className="learn-more">Dowiedz się więcej</a>
        </li>
        <li>
          <img src={react} alt="React Logo" className="iconLogo" />
          <strong className="technologiesBoldText">React:</strong> Biblioteka JavaScript, umożliwiająca tworzenie dynamicznego i interaktywnego interfejsu użytkownika.
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="learn-more">Dowiedz się więcej</a>
        </li>
      </ul>
    </div>
  );
};

export default Technologies;