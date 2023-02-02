import { useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "../homepage.css";

function SingleAlbum() {
  const { albumId } = useParams();
	console.log("albumId//------------//", albumId);

	const history = useHistory();
	// setPath(`/albums/${albumId}`)
  const user = useSelector((state) => state.session.user);
	const album = useSelector((state) => state.session.user.albums.filter(album => album.id == albumId)[0]);
	// console.log("images//------------//", album);
	const images = album.images;
	// console.log("images//------------//", images);

	if (!album) return <Redirect to={"/albums"} />;
  // if (!images) return null
	return (
		<div>
			<div className='card-container'>
				{images.map((image) => (
					<div
						className='album-card'
						onClick={() => history.push(`/images/${image.id}`)}
					>
						<img
							className='album-image'
							alt='Album'
							src={image.url}
						/>
						{/* <p className='title'>{image.title}</p>
						<p>{album.description}</p> */}
					</div>
				))}
			</div>
		</div>
	);
}

export default SingleAlbum;
