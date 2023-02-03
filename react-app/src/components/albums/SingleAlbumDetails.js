import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { loadImagesThunk } from "../../store/image";
import { oneAlbumThunk } from "../../store/album";
import "../homepage.css";

function SingleAlbum() {
	const { albumId } = useParams();
	// console.log('albumId//////////', albumId)
	const history = useHistory();
	const dispatch = useDispatch()
	const user = useSelector((state) => state.session.user);

	const album = useSelector((state) => state.albums.singleAlbum);
	// console.log('userAlbums----------------', userAlbums)
	// const album = userAlbums.filter(album => album.id === albumId)
	// console.log("album//------------//", album);

	const images = album.images;
	const allImages = useSelector((state) => state.images?.allImages);
	const imgArr = Object.values(allImages);
	const randomImages = imgArr.sort(() => 0.5 - Math.random());
	const displayImages = randomImages.slice(0);
	// console.log("images//------------//", displayImages);
	// console.log("images//------------//", images);

	useEffect(() => {
		dispatch(loadImagesThunk());
		dispatch(oneAlbumThunk(albumId))
	}, [dispatch]);

	const editAlbum = (albumId) => {
		if (user.id === album.user_id) {
			return history.push(`/albums/${albumId}/edit`)
		}
	}

	if (!album) return <Redirect to={"/albums"} />;
  // if (!images) return null
	return (
		<div>
			<div>
						<img
							className='topImg'
							src={displayImages[0]?.url}
						></img>
			</div>
			<div className='card-container'>
				<h3>My Album Images</h3>
				<button className="createButton" onClick={editAlbum}>Edit Album</button>
				{album.images?.map((image) => (
					<div
						className='album-card'
						onClick={() => history.push(`/images/${image.id}`)}
					>
						<img
							className='album-image'
							alt='Album'
							src={image.url}
						/>
					</div>
				))}
				{/* <div className="removeImageButton">
					<button>Remove Image From Album</button>
				</div> */}
			</div>
		</div>
	);
}

export default SingleAlbum;
