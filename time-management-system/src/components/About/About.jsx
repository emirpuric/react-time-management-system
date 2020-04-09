import React from 'react';

const About = () => {
    localStorage.removeItem('current-user');

    return (
        <div>
            <h3>About</h3>
        </div>
    );
};

export default About;