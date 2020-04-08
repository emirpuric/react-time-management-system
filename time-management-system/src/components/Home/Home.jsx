import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Home = () => {
    const [page, showPage] = useState('login');
    let form, switchMessage;

    if (page == 'login') {
        form = <Login />
        switchMessage = (
            <a onClick={() => showPage('register')}>Sign Up</a>
        )
    } else {
        form = <Register />
        switchMessage = (
            <a onClick={() => showPage('login')}>Login</a>
        )
    }

    return (
        <div>
            <h3>Home</h3>
            <div>
                {form}
            </div>
            <div>
                {switchMessage}
            </div>
        </div>
    )
}


export default Home;