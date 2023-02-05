import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./auth/DemoButton";
import "./homepage.css";

const ProfileButton = ({ user }) => {
	const [showMenu, setShowMenu] = useState();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<div className='navbar-profile-container'>
			<div
				onClick={openMenu}
				className='navbar-profile-button'
			>
				<i
					className='fa-solid fa-user'
					style={{ marginRight: 5 }}
				></i>
				{/* <i class="fa-solid fa-circle-user"></i> */}
				<i class='fa-solid fa-sort-down'></i>
			</div>
			{showMenu && (
				<>
					<div className='profile-dropdown'>
						<div className='dropdown-item-top'>
							<div className='profile-user-img'>
								<i className='fa-solid fa-user'></i>
							</div>
							<div className='profile-name'>{`${user.username}`}</div>
						</div>
						{user === null && (
							<>
								<div className='createButton'>
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
                <p>
                <LogoutButton />
                </p>
							</>
						)}

						{/* <div className='dropdown-item'>
            <div className='sign-out-img'><i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i></div> */}
						{/* </div> */}
					</div>
				</>
			)}
		</div>
	);
};

export default ProfileButton;
