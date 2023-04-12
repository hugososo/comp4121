import React, { Component } from 'react';
import classes from "./BrowseLatest.module.css";
import background from '../assets/branded-phone-case-gradient-linear-icon-vector.png';

function BrowseLatest() {
  
    return (
	<div className={classes.browseLatest2}>
		<div className={classes.browseLeft}>
			<h1>Also Check Out Our Latest Products </h1>;
			<button>shop</button>;
		</div>
		<img src={background} alt="Background" />;

	 </div>
    );
 
}
export default BrowseLatest;