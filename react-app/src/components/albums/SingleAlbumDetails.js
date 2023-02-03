import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { loadImagesThunk } from "../../store/image";
import { oneAlbumThunk, removeAlbumThunk, updateAlbumThunk} from "../../store/album";
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
		dispatch(updateAlbumThunk(albumId))
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
		<div>
			<div>
				<img
					className='topImg'
					src={displayImages[0]?.url}
				></img>
			</div>
			<div className='card-container'>
				<h2>My Album Images</h2>
				<h3>Album Title: {album.title}</h3>
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
				<div className='display-image-main'>
					{album.images?.map((image, i) => (
						<div className={`display-image-outer img${i}`}>
							<div
								className='display-img-outer'
								onClick={() => history.push(`/images/${image.id}`)}
							>
								<img
									className={`display-image-img img${i}`}
									alt='Album'
									src={image.url}
								/>
								<p className='imageTitle'>{image.title}</p>
							</div>
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
