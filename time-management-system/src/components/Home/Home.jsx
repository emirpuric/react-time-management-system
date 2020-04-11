import React, { useState } from 'react';
import './Home.css'
import Login from '../Login/Login';
import Register from '../Register/Register';

const Home = () => {
    const [page, showPage] = useState('login');
    let form, switchMessage;

    if (page ==='login') {
        form = <Login />
        switchMessage = (
            <span>
                Don't have an account? <a href="" onClick={() => showPage('register')}>Sign up</a>
            </span>
        )
    } else {
        form = <Register />
        switchMessage = (
            <span>
                Have an account? <a href="" onClick={() => showPage('login')}>Log in</a>
            </span>
        )
    }

    return (
        <div>
            <div>
                {form}
            </div>
            <div className="Bottom-message">
                {switchMessage}
            </div>
        </div>
    )
}


export default Home;