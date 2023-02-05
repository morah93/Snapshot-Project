import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams, NavLink } from "react-router-dom";
import { getUserAlbumThunk } from "../../store/album";
import { loadImagesThunk } from "../../store/image";
import "../homepage.css";
import CreateAlbum from "./CreateAlbum";

function UserAlbums() {
	// const { user_id } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	// if (user === null) return <Redirect to={"/images"} />;
	const albums = useSelector((state) => state.albums?.myAlbums);
	const images = useSelector((state) => state.images?.allImages);
	const imgArr = Object.values(images);
	const randomImages = imgArr.sort(() => 0.5 - Math.random());
	const displayImages = randomImages.slice(0);
	// console.log("albums/////////////",albums)
	// let allAlbums;
	// if (albums !== undefined) {
	// 	allAlbums = Object.values(albums)
	// }
	// console.log("allAlbums??????????????",allAlbums)
	useEffect(
		(e) => {
			dispatch(getUserAlbumThunk(user.id));
			dispatch(loadImagesThunk());
		},
		[dispatch, user]
	);

	const home = (e) => {
		e.preventDefault();
		history.push("/");
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
				<div className='albumPageButtonsDiv'>
					<p>{user && <CreateAlbum />}</p>
					<button
						className='createButton'
						onClick={home}
					>
						Home
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
			</div>
		</div>
	);
}

export default UserAlbums;
