import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Detect from './components/Detect/Detect';
import HowItWorks from './components/HowItWorks/HowItWorks';
import './index.css';
import Usage from './components/Usage/Usage';
import LetsTalk from './components/LetsTalk/LetsTalk';

function App() {
  return (
    <div className="container">
      <div className="pageElement">
        <Navbar />
        <Detect />
      </div>
      <div className="pageElement">
        <HowItWorks />
      </div>
      <div className="pageElement">
        <Usage />
      </div>
      <div className="pageElement">
        <LetsTalk />
      </div>
    </div>
  );
}

export default App;