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
			dispatch(loadImagesThunk())
		},
		[dispatch, user]
	);

	// function createButton() {
	// 	if (user !== null) {
	// 		return history.push("/albums/new-album")
	// 	}
	// }
	return (
		<div>
			<div>
				<img
					className='topImg'
					src={displayImages[0]?.url}
				></img>
			</div>
			<div className='underTopImgContainer'>
				{/* <button className="createButton" onClick={createButton}>Create Album</button> */}
				<p>{user && <CreateAlbum />}</p>
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
							<p className='title'>{album.title}</p>
							<p>{album.description}</p>
						</div>
					))}
				</div> */}
				<h3>My Albums</h3>
				<div className='display-image-main'>
					{albums?.map((album, i) => {
						return (
							<>
								<div className={`display-image-outer img${i}`}>
									<NavLink to={`/albums/${album.id}`}>
										<div className='display-img-outer'>
											<img
												src={album.url}
												className={`display-image-img img${i}`}
												alt={album.id}
											/>
										</div>
									</NavLink>
								</div>
								{/* <hr></hr> */}
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default UserAlbums;
