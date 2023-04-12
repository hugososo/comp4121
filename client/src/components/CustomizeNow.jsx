import React, { Component } from 'react';
import classes from "./CustomizeNow.module.css";
import background from '../assets/CustomizedCase.png';

function CustomizeNow() {
  
    return (
	<div className={classes.CN2}>
		<div className={classes.CNL}>
			<h1> Phone cases that express yourself </h1>;
			<button> Go to customize </button>;
		</div>
		<img src={background} alt="Background" />;

	 </div>
    );
 
}
export default CustomizeNow;