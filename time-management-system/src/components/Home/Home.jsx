import React, { useState } from 'react';
import './Home.css'
import Login from '../Login/Login';
import Register from '../Register/Register';
import { HomeContext, LOGIN, REGISTER } from '../../contexts';

const Home = () => {
    const [page, showPage] = useState(LOGIN);
    let form, switchMessage;

    if (page === LOGIN) {
        form = <Login />
        switchMessage = (
            <span>
                Don't have an account? <button className="Link-button" onClick={() => showPage(REGISTER)}>Sign up</button>
            </span>
        )
    } else {
        form = <Register />
        switchMessage = (
            <span>
                Have an account? <button className="Link-button" onClick={() => showPage(LOGIN)}>Log in</button>
            </span>
        )
    }

    return (
        <HomeContext.Provider value={showPage}>
            <div>
                {form}
            </div>
            <div className="Bottom-message">
                {switchMessage}
            </div>
        </HomeContext.Provider>
    )
}


export default Home;