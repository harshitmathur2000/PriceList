import React from 'react';
import './NavBar.css';

import profile from './assets/profile.png';
const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="navbar-left">
                <img src= {profile} alt="Profile" className="profile-pic" />
                <span className="username">John Doe</span>
            </div>
            <div className="navbar-right">
                <img src={'https://storage.123fakturere.no/public/flags/GB.png'} alt="English UK" className="flag-pic" />
                <span className="language">English (UK)</span>
            </div>
            
        </nav>
    );
};

export default NavBar;
