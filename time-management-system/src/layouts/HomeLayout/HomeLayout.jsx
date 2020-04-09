import React from 'react';
import './HomeLayout.css';
import logo from './logo.png';

const HomeLayout = props => {
    return (
        <div className="Home-background">
            <header>
                <img src={logo} className="Home-logo" alt="logo" />
            </header>
            <div className="Home-content">
                {props.children}
            </div>
        </div>
    );
}

export default HomeLayout;