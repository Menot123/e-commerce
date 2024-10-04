import React from 'react';
import './Home.css';
import loginBackground from '/login-background.jpg'

const Home: React.FC = () => {
    return (

        <div className='home-container'>
            <img src={loginBackground} alt="Home Background" />
        </div>

    );
};

export default Home;