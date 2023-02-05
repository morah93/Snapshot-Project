import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { loadImagesThunk } from "../../store/image";
import {
	oneAlbumThunk,
	removeAlbumThunk,
	updateAlbumThunk,
} from "../../store/album";
import "../homepage.css";

function SingleAlbum() {
	const { albumId } = useParams();
	// console.log('albumId//////////', albumId)
	const history = useHistory();
	const dispatch = useDispatch();
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
		dispatch(oneAlbumThunk(albumId));
		dispatch(updateAlbumThunk(albumId));
	}, [dispatch, albumId]);

	const editAlbum = (albumId) => {
		if (user.id === album.user_id) {
			return history.push(`/albums/${album.id}/edit`);
		}
	};
	const deleteAlbum = (e) => {
		e.preventDefault();
		return dispatch(removeAlbumThunk(album.id)).then(history.push("/albums"));
	};

	if (!album) return <Redirect to={"/albums"} />;
	// if (!images) return null
	return (
		<div className='homepageContainer'>
			<div className='topImgDiv'>
				<img
					className='topImg'
					src={
						"https://images.unsplash.com/photo-1483425571841-9662f86c7154?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2932&q=80"
					}
				></img>
			</div>
			<h2 className='myAlbums'>My Album Images</h2>
			<h3 className='myAlbums'>{album.title}</h3>
			<div className='albumPageButtonsDiv'>
				<button
					className='createButton'
					onClick={editAlbum}
				>
					Edit Album
				</button>
				<button
					className='createButton'
					onClick={deleteAlbum}
				>
					Delete Album
				</button>
			</div>
			<div className='display-image-main'>
				{/* <div className='display-image-main'> */}
				<div className='img-container'>
					{album.images?.map((image, i) => (
						<div>
							{/* <NavLink onClick={() => history.push(`/images/${image.id}`)}> */}
							<NavLink to={(`/images/${image.id}`)}>
								<img
									className={`img-item`}
									alt='Album'
									src={image.url}
								/>
								<p className='title'>{image.title}</p>
							</NavLink>
						</div>
					))}
				</div>
				{/* <div className="removeImageButton">
					<button>Remove Image From Album</button>
				</div> */}
			</div>
		</div>
	);
}

export default SingleAlbum;
