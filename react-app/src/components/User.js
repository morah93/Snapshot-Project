import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getUserAlbumThunk } from "../store/album";
import { loadMyImagesThunk } from "../store/image";
import "./homepage.css";

function UserPage() {
	const [user, setUser] = useState({});
	const dispatch = useDispatch();
	const { userId } = useParams();
	const albums = useSelector((state) => state.albums?.myAlbums);
	// console.log('Albumsssss', albums)
	const images = useSelector((state) => state.images?.myImages);
	const myImages = Object?.values(images);
	// console.log('MYImagesiiiiiiii', myImages)
	useEffect(
		(e) => {
			dispatch(getUserAlbumThunk(user?.id));
			dispatch(loadMyImagesThunk(user?.id));
		},
		[dispatch, user]
	);
	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	if (!user) {
		return null;
	}

	return (
		<>
			<div>
				{/* <div>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
				</div> */}

				<div className='userInfo'>
					<img
						className='profileLogo'
						src='https://images.pexels.com/lib/avatars/grey.png?w=130&h=130&fit=crop&dpr=1'
					></img>
					<p>
						<h1>{user.username}</h1>
					</p>
				</div>
				{/* ---------------------Album Div-------------------------- */}
				<h3 className='myAlbums'>My Albums</h3>
				<div className='display-image-main'>
					<div className='img-container'>
						{albums?.map((album, i) => {
							return (
								<>
									<div className='userAlbumDiv'>
										<div>
											<NavLink to={`/albums/${album.id}`}>
												<img
													src={album.url}
													className={`img-item`}
													alt={album.id}
												/>
											</NavLink>
										</div>
										<div className='albumTitle'>
											<NavLink
												to={`/albums/${album.id}`}
												style={{ textDecoration: "none" }}
											>
												<p className='title'>{album.title}</p>
											</NavLink>
										</div>
									</div>
									{/* <hr></hr> */}
								</>
							);
						})}
					</div>
				</div>
				{/* ---------------------Image Div-------------------------- */}
				<h3 className='myAlbums'>My Images</h3>
				<div className='display-image-main'>
					<div className='img-container'>
						{myImages?.map((image, i) => {
							return (
								<>
									<div>
										<div>
											<NavLink to={`/images/${image.id}`}>
												<img
													src={image.url}
													className={`img-item`}
													alt={image.id}
												/>
											</NavLink>
										</div>
										<div className='albumTitle'>
											<NavLink
												to={`/images/${image.id}`}
												style={{ textDecoration: "none" }}
											>
												<p
													className='title'
													style={{ textDecoration: "none" }}
												>
													{image.title}
												</p>
											</NavLink>
										</div>
									</div>
									{/* <hr></hr> */}
								</>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
export default UserPage;
