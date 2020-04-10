import React from 'react';
import { Link } from 'react-router-dom';
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
            <div>
                <Link className='Footer-link' to='/about'>About</Link>
            </div>
        </div>
    );
}

export default HomeLayout;