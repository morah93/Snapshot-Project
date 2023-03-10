import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./auth/DemoButton";
import ProfileButton from "./profileDropdown";
import { logout } from "../store/session";
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
		history.push("/login");
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
			{/* <div className='nav-background'> */}
			{/* <div className='title'>
							<img src={title} className='title'/>
						</div> */}
			<div className='nav'>
				<div className='logoDiv'>
					<img
						src={logo}
						onClick={handleImgClick}
						className='logo'
					/>
				</div>

				{/* <div class='dropdown'>
					<button class='dropdown-toggle'>Profile</button>
					<div class='dropdown-menu'>
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
					</div>
				</div> */}

				{/* {user  (
					// <div className='welcomeDiv'>
					// 	<strong>Welcome: {user.username}</strong>
					// </div>
					<div className='navBar-link-profile'>
						<ProfileButton user={user} />
					</div>
				)} */}
				<div className='authDiv'>
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
									style={{ color: "black" }}
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
									style={{ color: "black" }}
								>
									Log in
								</NavLink>
							</p>
						</>
					)}
					{user && (
					<p>Welcome: { user.username }</p>
					)}
					{user !== null && (
						<button
							className='createButton'
							onClick={handleUploadClick}
						>
							Upload Image
						</button>
					)}

					{user && (
						<button
							className='createButton'
							onClick={onLogout}
						>
							Logout
						</button>
					)}
				</div>

				{/* <p>{user !== null && <LogoutButton /> }</p> */}
			</div>
			{/* </div> */}
		</>
	);
};

export default NavBar;
