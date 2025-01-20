import React from 'react';
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbarWrapper">
            <div className="navbarLeftPart">
                <p className="navbarTitle">PhishGuard</p>
            </div>
            <div className="navbarRightPart">
                <p className="navbarItem">How it works?</p>
                <p className="navbarItem">Usage</p>
                <p className="navbarItem">Let's Talk</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar;