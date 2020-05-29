import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () =>{
    return (
        <div className="jumbotron">
            <h1>Tyilmaz Administration</h1>
            <p>React, Redux and React Router for ultra-responsive web application.</p>
            <Link to="/about" className="btn btn-primary btn-lg">
                Learn More
            </Link>
        </div>
    );
};

export default HomePage;