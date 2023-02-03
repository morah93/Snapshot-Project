import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from './auth/DemoButton'
import { logout } from '../store/session';
import "./homepage.css";
import { loadImagesThunk } from "../store/image";
import logo from "../static/app-icon.png";

// import title from "../static/snapshot-title.png";
const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const handleImgClick = (e) => {
		e.preventDefault();
		history.push("/");
	};

	const onLogout = async (e) => {
		e.preventDefault();
		await dispatch(logout());
		history.push('/login')
  };



	const handleUploadClick = (e) => {
		e.preventDefault();
		history.push("/upload-image");
	};

	useEffect(() => {
		dispatch(loadImagesThunk());
	}, [dispatch]);

	return (
		<>
			<div className='nav-background'>
						{/* <div className='title'>
							<img src={title} className='title'/>
						</div> */}
				<div className='nav'>
						<div className='logo'>
							<img
								src={logo}
								onClick={handleImgClick}
								className='logo'
							/>
						</div>
					{user && (
						<div className='welcomeDiv'>
							<strong>Welcome: {user.username}</strong>
						</div>
					)}
					{user === null && (
						<>
							<div className="createButton">
								<DemoButton />
							</div>
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
						<button className='createButton' onClick={handleUploadClick}>Upload Image</button>
					)}

					{user && (
						<button className='createButton' onClick={onLogout}>Logout</button>
						)}


					{/* <p>{user !== null && <LogoutButton /> }</p> */}
				</div>
			</div>
		</>
	);
};

export default NavBar;
