import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar(props) {
	const isLoggedIn = false;
	// const isLoggedIn = true;
	const username = "Alice";

	// Log in element
  const loginLink = <Link to="/login">Log in</Link>;

	// Log out element
  const logoutLink = <Link>Log out</Link>;

  // Username element
  const userLink = <Link to="/cart">Hello, {username}!</Link>;
	
  return (
	<div className={classes.rowFlex}>
		<div className={classes.navbar}>
		
		<Link to="/" className={classes.brand}>
			{props.brand}
		</Link>
		<Link to="/Home" className={classes.brand}>
			<h1> Customize Phone Cases </h1>
		</Link>
		<Link to="/" className={classes.brand}>
			<h1> Shop </h1>
		</Link>
		<Link to="/Catalog" className={classes.brand}>
			<h1> Catalog </h1>
		</Link>
		</div>
		<div className={classes.navLinks}>
			{isLoggedIn && userLink}
			{isLoggedIn ? logoutLink : loginLink}
		</div>
	</div>
  );
}

export default Navbar;