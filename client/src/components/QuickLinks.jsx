import React, { Component } from 'react';
import classes from "./QuickLinks.module.css";

function QuickLinks() {
  
    return (
	<div className={classes.QL2}>
		<h1> Quick Links </h1>
		<div className={classes.QL}>
			<button> Search </button>
			<button> FAQ </button>
			<button> Contact Us </button>
			<button> Privacy Policy </button>
			<button> Refund Policy </button>
			<button> Shipping Policy </button>
		</div>
		<button> Terms of Service </button>
	 </div>
    );
 
}
export default QuickLinks;