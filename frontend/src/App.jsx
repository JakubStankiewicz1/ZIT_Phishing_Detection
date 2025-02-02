import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Detect from './components/Detect/Detect';
import HowItWorks from './components/HowItWorks/HowItWorks';
import './index.css';
import Usage from './components/Usage/Usage';
import LetsTalk from './components/LetsTalk/LetsTalk';
import Technologies from './components/Technologies/Technologies';
import ReportPhishing from './components/ReportPhishing/ReportPhishing';

function App() {
  return (
    <div className="container">
      <div className="pageElement" id="detect">
        <Navbar />
        <Detect />
      </div>
      <div className="pageElement" id="howItWorks">
        <HowItWorks />
      </div>
      <div className="pageElement">
        <Technologies />
      </div>
      <div className="pageElement">
        <ReportPhishing />
      </div>
      <div className="pageElement" id="usage">
        <Usage />
      </div>
      <div className="pageElement" id="letsTalk">
        <LetsTalk />
      </div>
      
    </div>
  );
}

export default App;
