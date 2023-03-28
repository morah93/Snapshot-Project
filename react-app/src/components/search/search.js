import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserAlbumThunk } from "../../store/album";
import * as imageThunks from "../../store/image";
import "./search.css";
import "../homepage.css";

const Search = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [albums, setAlbums] = useState([]);
	const [images, setImages] = useState([]);
	// const [tags, setTags] = useState([]);
	// const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.session.user);
  const userId = user.id
  const manyImages = useSelector((state) => state.images?.allImages);
  // console.log('manyImages/////////////',manyImages)
  const allImages = Object.values(manyImages);
  // console.log('allImages---------------',allImages)
  const myAlbums = useSelector((state) => state.albums?.myAlbums);
  // console.log('myAlbums*****************',myAlbums)
	const [searchInput, setSearchInput] = useState("");
	const [searchShow, setSearchShow] = useState(false);
	// const [showAlbums, setShowAlbums] = useState(false);

	useEffect(() => {
		(async () => {
			const images = await dispatch(imageThunks.loadImagesThunk());
			setImages(images);
			const userAlbums = await dispatch(getUserAlbumThunk());
			setAlbums(userAlbums);
		})();
		// (async () => {
		//   const allAlbumReturns = await fetch("/api/albums/");
		//   console.log("albums", allAlbumReturns);
		//   const allAlbums = await allAlbumReturns.json();
		//   setAlbums(allAlbums.albums);
		// })();
		// (async () => {
		//   const allImagesReturns = await fetch("/api/images/");
		//   console.log("images", allImagesReturns);
		//   const allImages = await allImagesReturns.json();
		//   setImages(allImages.images);
		// })();
		// (async () => {
		//   const allUsersReturns = await fetch("/api/users");
		//   const allUsers = await allUsersReturns.json();
		//   setUsers(allUsers);
		// })();
	}, [
		dispatch,
		fetch,
		setImages,
		setAlbums,
		// setTags,
		// setUsers,
		searchShow,
	]);

	// console.log("users", users);
	// console.log("tags", tags);

	const handleInput = (e) => {
		setSearchInput(e.target.value);
		if (e.target.value === "") {
			setSearchShow(false);
		} else {
			setSearchShow(true);
		}
	};

	const albumClick = (e, album) => {
		e.preventDefault();
		history.push(`/albums/${album.id}`);
		setSearchShow(false);
	};
  const imageClick = (e, image) => {
    console.log('image/////////', image)
    // console.log('image.id/////////', image.id)
		e.preventDefault();
		history.push(`/images/${image.id}`);
		setSearchShow(false);
	};

	return (
		<div className='main-container'>
			<div className='topImgDiv'>
				<img
					className='topImg'
					src={
						"https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg"
					}
				></img>
			</div>
			<div className='inputDiv'>
				<h2>
					The best free stock photos, royalty free images & videos shared by
					creators.
				</h2>
				<input
					type='search'
					placeholder='Search for free photos'
					onChange={handleInput}
					value={searchInput}
					style={{
						marginLeft: "4%",
						marginTop: "20px",
						paddingLeft: "35px",
						borderRadius: "25px",
						height: "45px",
						width: "400px",
						position: "sticky",
						top: "2px",
						border: "none",
					}}
				></input>
				<i
					id='search-button-icon'
					type='submit'
					class='fa-solid fa-magnifying-glass'
				></i>
			</div>

			{/*---------------- album div -----------------*/}

			{/* <div className='album-container'> */}
			<div className='display-image-main'>
				<h1 hidden={searchShow ? false : true}> Albums </h1>
				{/* <div className='search-results-container'> */}
				<div className='img-container'>
					{myAlbums
						.filter((album) => {
							if (searchInput === "") {
								return album;
							} else if (
								album.title.toLowerCase().includes(searchInput.toLowerCase())
							) {
								return album;
							}
						})
						.map(
							(album, index) =>
								searchShow === true && (
									<div
										// onClick={(e) => history.push(`/album/${album.id}`)}
										onClick={albumClick}
										className='album-cards'
										key={index}
										setSearchShow={false}
									>
										<img
											// className='album-image'
											className='image-item'
											src={album.url}
										/>
										<p>{album.title}</p>
									</div>
								)
						)}
				</div>

				{/*---------------- Images div -----------------*/}

				<h1 hidden={searchShow ? false : true}> Images </h1>
				<div className='search-results-container'>
					{allImages
						.filter((image) => {
							if (searchInput === "") {
								return image;
							} else if (
								image.title.toLowerCase().includes(searchInput.toLowerCase())
							) {
								return image;
							}
						})
						.map(
							(image, index) =>
								searchShow === true && (
									<div
										// onClick={(e) => history.push(`/images/${image.id}`)}
										onClick={imageClick}
										className='playlist-cards'
										key={index}
										setSearchShow={false}
									>
										<img
											className='playlist-search-image'
											src={image.url}
										/>
										<p>{image.title}</p>
										<span style={{ marginLeft: "15px", paddingBottom: "20px" }}>
											{/* By {playlist.user.username} */}
											{image.description}
										</span>
									</div>
								)
						)}
				</div>

				{/*---------------- Tags div -----------------*/}

				{/* <h1 hidden={searchShow ? false : true}> Songs </h1>
        <div className="search-results-container">
          {songs
            .filter((song) => {
              if (searchInput === "") {
                return song;
              } else if (
                song.title.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return song;
              }
            })
            .map(
              (song, index) =>
                searchShow === true && (
                  <div
                    onClick={(e) => history.push(`/song/${song.id}`)}
                    className="album-cards"
                    key={index}
                  >
                    {/* <img className="album-image" src={song.song_img_url} /> */}
				{/* <img className="album-image" src={songImage} /> */}
				{/* <p>{song.title}</p> */}
				{/* </div> */}
				{/* ) */}
				{/* )} */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default Search;
