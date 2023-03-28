import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams, NavLink } from "react-router-dom";
// import { getUserAlbumThunk } from "../../store/album";
import { loadMyImagesThunk } from "../../store/image";
import "../homepage.css";
// import UploadImage from "./AddImage";
// import CreateAlbum from "./CreateAlbum";

function UserImages() {
	// const { user_id } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	// if (user === null) return <Redirect to={"/images"} />;
	// const albums = useSelector((state) => state.albums?.myAlbums);
	const images = useSelector((state) => state.images?.myImages);
	const imgArr = Object.values(images);
	// const randomImages = imgArr.sort(() => 0.5 - Math.random());
	// const displayImages = randomImages.slice(0);
	// console.log("albums/////////////",albums)
	// let allAlbums;
	// if (albums !== undefined) {
	// 	allAlbums = Object.values(albums)
	// }
	// console.log("allAlbums??????????????",allAlbums)
	useEffect(
		(e) => {
			dispatch(loadMyImagesThunk(user.id));
		},
		[dispatch, user]
	);

	const home = (e) => {
		e.preventDefault();
		history.push("/");
	};
	const UploadImage = (e) => {
		e.preventDefault();
		history.push("/upload-image");
	};
	// function createButton() {
	// 	if (user !== null) {
	// 		return history.push("/albums/new-album")
	// 	}
	// }
	return (
		<div className='homepageContainer'>
			<div className='topImgDiv'>
				<img
					className='topImg'
					src={
						"https://images.pexels.com/photos/1154504/pexels-photo-1154504.jpeg"
					}
				></img>
			</div>
			<div className='underTopImgContainer'>
				<div className='imagePageButtonsDiv'>
					{/* <p>{user && <UploadImage />}</p> */}
					<button
						className='createButton'
						onClick={home}
					>
						Home
					</button>
					<button
						className='createButton'
						onClick={UploadImage}
					>
						Upload Image
					</button>
				</div>

				{/* <div className='card-container'>
					{user.albums.map((album) => (
						<div
							className='album-card'
							onClick={() => history.push(`/albums/${album.id}`)}
						>
							<img
								className='album-image'
								alt='Album'
								src={album.url}
							/>
							<p>{album.description}</p>
							</div>
							))}
						</div> */}
				<h3 className='myAlbums'>My Images</h3>
				<div className='display-image-main'>
					<div className='img-container'>
						{imgArr?.map((image, i) => {
							return (
								<>
									<div>
										<NavLink to={`/images/${image.id}`}>
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
		</div>
	);
}

export default UserImages;
