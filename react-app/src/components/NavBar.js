import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./DemoButton";
import "./homepage.css";
import logo from "../static/app-icon.png";
// import title from "../static/snapshot-title.png";
const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	const handleImgClick = (e) => {
		e.preventDefault();
		history.push("/images");
	};

	const handleUploadClick = (e) => {
		e.preventDefault();
		history.push("/images/upload");
	};

	return (
		<>
			<div>
				<img
					className='nav-background'

					// style={{ zIndex: 0 }}
					// src='https://i.natgeofe.com/k/49f3dd21-d3b5-476e-a85e-4c5b34651cd1/Denali-mountain_3x2.jpg'
				/>
					<div className='logo-container'>
						<div className='logo'>
							<img src={logo} onClick={handleImgClick} className='logo' />
						</div>
						{/* <div className='title'>
							<img src={title} className='title'/>
						</div> */}
					</div>
				<div className='nav'>
					{user === null && (
						<>
							<p>
								<DemoButton />
							</p>
							<p>
								<NavLink
									to='/sign-up'
									exact={true}
									activeClassName='active'
									className='sign-up-btn'
								>
									Sign Up
								</NavLink>
							</p>
							<p>
								<NavLink
									to='/login'
									exact={true}
									activeClassName='active'
									className='login-btn'
								>
									Log in
								</NavLink>
							</p>
						</>
					)}
					{user !== null && (
					<button onClick={handleUploadClick}>Upload Image</button>
					)}
					<p>{user !== null && <LogoutButton />}</p>
				</div>
			</div>
		</>
	);
};

export default NavBar;
