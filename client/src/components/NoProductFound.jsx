import React from 'react';
import classes from '../components/NotFound.module.css';
import { Link } from 'react-router-dom';

const NoProducts = () => {

    return (
        <div className={classes.notFoundPage}>
            <p className={classes.title}>There are no products available at this time.</p>
            <p>Please check back later or adjust your filters.</p>
            <Link to="/" className={classes.returnHome}>
                Go back to the homepage
            </Link>
        </div>
    );
};

export default NoProducts;
