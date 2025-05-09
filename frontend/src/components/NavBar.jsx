import React from 'react';
import './NavBar.css';


const NavBar = () => {
    return (
        <nav class="navbar">
            <div class="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="navbar-left">
                <img src={'https://storage.123fakturere.no/public/flags/GB.png'} alt="Profile" class="profile-pic" />
                <span class="username">John Doe</span>
            </div>
            <div class="navbar-right">
                <img src={'https://storage.123fakturere.no/public/flags/GB.png'} alt="English UK" className="profile-pic" />
                <span class="language">English (UK)</span>
            </div>
            
        </nav>
    );
};

export default NavBar;
