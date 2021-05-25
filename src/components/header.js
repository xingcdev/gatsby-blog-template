import React from 'react';
import { Link } from 'gatsby';

const Header = ({ title }) => {
	return (
		<header className="global-header">
			<div className="header-content centered-wrapper">
				<span className="logo">
					<Link to="/">{title}</Link>
				</span>
				<nav>
					<Link to="/about/">Propos</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
