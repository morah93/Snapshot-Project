import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./DemoButton";
import "./homepage.css";
import { loadImagesThunk } from "../store/image";
import logo from "../static/app-icon.png";

// import title from "../static/snapshot-title.png";
const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const images = useSelector((state) => state.images.allImages);
	const imgArr = Object.values(images)
	// const randomImages = imgArr.sort((a, b) => 0.5 - Math.random());
	// const navImage = randomImages[0].url
	console.log('imagesinnav*******', imgArr)
	const history = useHistory();
	const dispatch = useDispatch();


	const handleImgClick = (e) => {
		e.preventDefault();
		history.push("/images");
	};

	const handleUploadClick = (e) => {
		e.preventDefault();
		history.push("/upload-image");
	};

	useEffect(() => {
    dispatch(loadImagesThunk())
  }, [dispatch]);

	return (
		<>
			<div className="nav-background">
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
