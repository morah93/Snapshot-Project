// import { useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import {createAlbumThunk} from "../../store/album";
// import { loadImagesThunk } from "../../store/image";

// function CreateAlbumForm() {
// 	const history = useHistory();
// 	const dispatch = useDispatch();
// 	const user = useSelector((state) => state.session.user);
//   const userImages = user.images
//   const images = useSelector((state) => state.session.user.images);
// 	const imgArr = Object.values(images);
// 	const randomImages = imgArr.sort(() => 0.5 - Math.random());
// 	const displayImages = randomImages.slice(0);
// 	// console.log('displayImages----------------', displayImages)
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");
//   const [selected, setSelected] = useState(false)
// 	const [validationErrors, setValidationErrors] = useState([]);

// 	function checkExt(name) {
// 		const allowed = ["png", "jpg", "jpeg"];
// 		for (let ext of allowed) {
// 			if (name.toLowerCase().endsWith(ext)) return false;
// 		}
// 		return true;
//   }
//   useEffect(() => {
// 		dispatch(loadImagesThunk());
// 	}, [dispatch ]);

// 	useEffect(() => {
// 		setValidationErrors([]);
// 	}, [title, url]);

// 	async function onSubmit(e) {
// 		e.preventDefault();
// 		const errors = [];
// 		if (image && checkExt(image.name))
// 			errors.push("The file must be a png, jpg, or jpeg file.");
// 		if (!title || !title.replace(/\s/g, "").length)
// 			errors.push("Title is required");
//       if (title.length > 30) errors.push("Title must be less than 30 characters");
//       if (!url || !url.replace(/\s/g, "").length)
//         errors.push("Url is required");
//     setValidationErrors(errors);

// 		if (errors.length) return;

// 		const formData = new FormData();
// 		formData.append("title", title);
// 		formData.append("description", description);
//     formData.append("image", image);
//     formData.append("url", url)
// 		formData.append("userId", user.id);
// 		const newAlbum = await dispatch(createAlbumThunk(formData));
// 		history.push(`/albums/`);
// 	}

// 	if (user === null) return <Redirect to={"/"} />;

// 	return (
//     <>
//       <div className="forms">
//       <div>
// 						<img
// 							className='topImg'
// 							src={displayImages[0].url}
// 						></img>
// 					</div>
// 			<form
// 				className='form'
// 				onSubmit={onSubmit}
// 			>
// 				<h3>Create your new album </h3>
// 				<ul>
// 					{validationErrors.map((error) => (
// 						<li className='error'>{error}</li>
// 					))}
// 				</ul>
// 				<div>
// 					<label>What is the title of your album?</label>
// 					<input
// 						placeholder='Enter your title here.'
// 						value={title}
// 						onChange={(e) => setTitle(e.target.value)}
// 					/>
// 				</div>
// 				<div>
// 					<label>Enter the description of your album</label>
// 					<textarea
// 						placeholder='Optional'
// 						value={description}
// 						onChange={(e) => setDescription(e.target.value)}
// 					/>
// 				</div>
// 				<div>
// 					<label>Enter url for album cover</label>
// 					<textarea
// 						placeholder='Required'
// 						value={url}
// 						onChange={(e) => setUrl(e.target.value)}
// 					/>
// 				</div>
// 				{/* <div>
// 					<label>Upload images to the album</label>
// 					<input
// 						type='file'
// 						onChange={(e) => setImage(e.target.files[0])}
// 						accept='image/*'
// 					/>
// 				</div> */}
// 				<button
// 					type='submit'
// 					className='login-button'
// 					disabled={validationErrors.length}
// 				>
// 					Create your album
// 				</button>
// 				<button
// 					className='login-button'
// 					onClick={() => history.push("/albums")}
// 				>
// 					Cancel
// 				</button>
// 			</form>
//       </div>
// 		</>
// 	);
// }

// export default CreateAlbumForm;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/album";
import "../homepage.css";

const CreateAlbum = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const albums = useSelector((state) => state.albums.myAlbums);
	const user = useSelector((state) => state.session.user);
	const [userAlbumNumber, setUserAlbumNumber] = useState(1);
	const [title, setTitle] = useState("My Album");
	// const [images, setImages] = useState([])
	const [description, setDescription] = useState("Please add description");
	const [url, setUrl] = useState(
		"https://images.pexels.com/photos/48207/sunset-sky-sun-cloud-48207.jpeg"
	);

	useEffect(() => {
		let count = 1;
		albums?.forEach((album) => {
			if (album.owner_id === user.id) {
				count++;
			}
		});
		setUserAlbumNumber(count);
	}, [albums, user]);

	const submit = async (e) => {
		e.preventDefault();
		const newAlbum = {
			title: `${title} ${userAlbumNumber}`,
			url: url,
			description: description,
			user_id: user.id,
		};

		// console.log('newAlbum[[[[[[[[[[[[[', newAlbum)
		history.push(`/users/${user.id}`);
		return dispatch(createAlbumThunk(newAlbum));
		// .then((album) => {
		// // const { id } = newAlbum;
		// });
	};

	return (
		<>
			<div className="homepageButtons">
			{user && (
				<button
					className='createButton'
					onClick={submit}
				>
					Create Album
				</button>
			)}
			</div>
		</>
	);
};

export default CreateAlbum;
