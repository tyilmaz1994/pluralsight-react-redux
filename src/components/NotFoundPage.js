import React from 'react';
import { Link } from "react-router-dom";

const NotFoundPage = () => {

    return (
        <div>
            <h2>Oops ! page not found.</h2>
            <p>be sure that url is correct.</p>
            <Link to='/' className="btn btn-success">
                Home
            </Link>
        </div>
    );

};

export default NotFoundPage;