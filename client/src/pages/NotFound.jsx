import React from 'react';
import classes from '../components/NotFound.module.css';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={classes.notFoundPage}>
            <h1>404 - Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to='/' className={classes.returnHome}>Go back to the homepage</Link>
        </div>
    );
}

export default NotFound;
