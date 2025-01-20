import React from 'react';
import "./navbar.css";
import logo from "../../assets/logoIcon.png";

const Navbar = () => {
  const smoothScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navbarLeftPart">
          <p className="navbarTitle"><img src={logo} alt="" className="navbarIconImg" />PhishGuard</p>
        </div>
        <div className="navbarRightPart">
          <p className="navbarItem" onClick={() => smoothScroll("howItWorks")}>How it works?</p>
          <p className="navbarItem" onClick={() => smoothScroll("usage")}>Usage</p>
          <p className="navbarItem" onClick={() => smoothScroll("letsTalk")}>Let's Talk</p>
        </div>
      </div>
    </div>
  );
  
};

export default Navbar;
