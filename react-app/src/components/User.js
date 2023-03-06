import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getUserAlbumThunk } from "../store/album";
import { loadMyImagesThunk } from "../store/image";

function UserPage() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
	const { userId } = useParams();
  const albums = useSelector((state) => state.albums?.myAlbums);
  console.log('Albumsssss', albums)
  const images = useSelector((state) => state.images?.myImages);
  const myImages = Object.values(images)
  console.log('MYImagesiiiiiiii', myImages)
  useEffect(
		(e) => {
			dispatch(getUserAlbumThunk(user.id));
			dispatch(loadMyImagesThunk(user.id));
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
				<div>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
				</div>
				{/* ---------------------Album Div-------------------------- */}
        <h3 className='myAlbums'>My Albums</h3>
				<div className='display-image-main'>
					<div className='img-container'>
						{albums?.map((album, i) => {
							return (
								<>
									<div>
										<NavLink to={`/albums/${album.id}`}>
											<div>
												<img
													src={album.url}
													className={`img-item`}
													alt={album.id}
												/>
											</div>
											<p className='title'>{album.title}</p>
										</NavLink>
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
										<NavLink to={`/albums/${image.id}`}>
											<div>
												<img
													src={image.url}
													className={`img-item`}
													alt={image.id}
												/>
											</div>
											<p className='title'>{image.title}</p>
										</NavLink>
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
