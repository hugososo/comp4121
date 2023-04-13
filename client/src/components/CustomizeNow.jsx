import React, { Component } from 'react';
import classes from "./CustomizeNow.module.css";
import background from '../assets/CustomizedCase.png';
import { Link } from "react-router-dom";

function CustomizeNow() {
  
    return (
	<div className={classes.CN2}>
		<div className={classes.CNL}>
			<h1> Phone cases that express yourself </h1>;
			<Link to="/Home" className={classes.brand}>
				<button> Go to customize </button>;
			</Link>
		</div>
		<img src={background} alt="Background" />;

	 </div>
    );
 
}
export default CustomizeNow;