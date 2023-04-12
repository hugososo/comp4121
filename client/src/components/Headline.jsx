import React from "react";
// Import the styles from the CSS file
import classes from "./Headline.module.css";


function Headline(props) {
    return (
      <div className={classes.headline}>
		  {props.headline} 
      </div>
    );
  }

export default Headline;