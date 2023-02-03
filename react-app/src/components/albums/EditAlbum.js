// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import "../homepage.css";
// import * as allAlbumThunks from "../../store/album";

// const EditAlbumForm = () => {
//   const { albumId } = useParams();
//   console.log('albumId[[[[[[[[', albumId)
// 	const dispatch = useDispatch();
// 	const user = useSelector((state) => state.session.user);

// 	const userAlbums = useSelector((state) => state.albums.myAlbums); // all playlist

// 	// const albumArray = Object.values(userAlbums);

// 	const album = useSelector((state) => state.albums.singleAlbum);

// 	// const [url, setUrl] = useState("");
// 	const [image, setImage] = useState("");
// 	const [errors, setErrors] = useState([]);
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");
// 	const formData = new FormData(); // captures form inputs as kvp-object of form

// 	useEffect(async () => {
// 		await dispatch(allAlbumThunks.oneAlbumThunk(albumId));
// 		await dispatch(allAlbumThunks.getUserAlbumThunk(user.id));
// 	}, [dispatch, albumId, user]);
// 	useEffect(() => {
// 		const errorList = [];
// 		if (title.length <= 0) errorList.push("Album title is required");
// 		setErrors(errorList);
// 	}, [title.length]);
// 	if (!user) {
// 		return null;
// 	}
// 	if (!albumId) {
// 		return null;
// 	}

// 	let correctFile = true;
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (errors.length) return;
// 		setErrors([]);
// 		setImage("");
// 		const errorList = [];
// 		if (title.length > 15)
// 			errorList.push("Album title should be 15 characters or less!");
// 		// if (description.length > 80 || description.length < 10) errorList.push("Description should be between 10 and 80 characters!")
// 		let imageInput = document.querySelector("#file-input");
// 		setErrors(errorList);
// 		// if(errorList.length){
// 		//     return
// 		// }
// 		for (let i = 0; i < imageInput.files.length; i++) {
//       let img = imageInput.files[i];

// 			if (
// 				img.type !== "image/gif" &&
// 				img.type !== "image/jpeg" &&
// 				img.type !== "image/png"
// 			) {
// 				correctFile = false;
// 			}
// 			formData.append("file", img);
//     }

// 		if (correctFile === false)
// 			errorList.push("You may only upload .GIF, .JPEG/.JPG, and .PNG files!");
//     setErrors(errorList);

// 		if (errorList.length) return;
// 		let img = imageInput.files[0];
//     formData.append("file", img);

// 		if (img === undefined && !description) {
// 			const editedAlbum = {
// 				title,
// 				description: " ",
// 				url: "",
//       };
//       console.log("editedAlbum1----------", editedAlbum)
// 			const newAlbum = await dispatch(
// 				allAlbumThunks.updateAlbumThunk(editedAlbum, user.id)
//       );
//       console.log("newAlbum1----------", newAlbum)
// 			if (newAlbum) {
// 				await dispatch(allAlbumThunks.oneAlbumThunk(albumId));
// 				await dispatch(allAlbumThunks.getUserAlbumThunk(user.id));
// 			}
// 		} else if (img === undefined && description) {
// 			const editedAlbum = {
// 				title,
// 				description,
// 				url: "",
//       };
//       console.log("editedAlbum2----------", editedAlbum)
// 			const newAlbum = await dispatch(
// 				allAlbumThunks.updateAlbumThunk(editedAlbum, user.id)
//       );
//       console.log("newAlbum2----------", newAlbum)
// 			if (newAlbum) {
// 				await dispatch(allAlbumThunks.oneAlbumThunk(albumId));
// 				await dispatch(allAlbumThunks.getUserAlbumThunk(user.id));
// 			}
// 		} else if (img !== undefined && !description) {
// 			const picture = await fetch(`/api/albums/${album.id}`, {
// 				method: "POST",
// 				body: formData,
// 			});
// 			const image = await picture.json();
// 			const editedAlbum = {
// 				title,
// 				description: " ",
// 				url: image.url,
//       };
//       console.log("editedAlbum3----------", editedAlbum)
// 			const newAlbum = await dispatch(
// 				allAlbumThunks.updateAlbumThunk(editedAlbum, albumId)
//       );
//       console.log("newAlbum3----------", newAlbum)
// 			if (newAlbum) {
// 				await dispatch(allAlbumThunks.oneAlbumThunk(albumId));
// 				await dispatch(allAlbumThunks.getUserAlbumThunk(user.id));
// 			}
// 		} else {
// 			const picture = await fetch("/api/playlists/images/upload", {
// 				method: "POST",
// 				body: formData,
// 			});
// 			const image = await picture.json();
// 			const editedAlbum = {
// 				title,
// 				description,
// 				url: image.url,
//       };
//       console.log("editedAlbum4----------", editedAlbum)
// 			const newAlbum = await dispatch(
// 				allAlbumThunks.updateAlbumThunk(editedAlbum, user.id)
//       );
//       console.log("newAlbum4----------", newAlbum)
// 			if (newAlbum) {
// 				await dispatch(allAlbumThunks.oneAlbumThunk(albumId));
// 				await dispatch(allAlbumThunks.getUserAlbumThunk(user.id));
// 			}
// 		}
// 	};
// 	return (
// 		<div className='edit-project-container'>
// 			<h2>Edit details</h2>
// 			<form
// 				className='edit-project-form'
// 				onSubmit={handleSubmit}
// 			>
// 				<div>
// 					{errors.map((error) => {
// 						return <span>{error}</span>;
// 					})}
// 				</div>
// 				<br />
// 				<div className='edit-project-components'>
// 					<div
// 						style={{ width: "200px", height: "200px" }}
// 						className='edit-image-container'
// 					>
// 						<label htmlFor='file-input'>
// 							<img style={{ width: "200px", height: "210px" }} />
// 						</label>
// 						<input
// 							id='file-input'
// 							type='file'
// 							name='file'
// 							encType='multipart/form-data'
// 						/>
// 					</div>
// 					<div className='name-description-container'>
// 						<label>title</label>
// 						<input
// 							id='edit-name-input'
// 							name='name'
// 							type='text'
// 							value={title}
// 							onChange={(e) => setTitle(e.target.value)}
// 						/>
// 						<br />
// 						<label>Description</label>
// 						<textarea
// 							placeholder='Add a description'
// 							id='description-textarea'
// 							name='description'
// 							type='text'
// 							value={description}
// 							onChange={(e) => setDescription(e.target.value)}
// 						/>
// 					</div>
// 				</div>
// 				<div id='submit-edit-button-div'>
// 					<button
// 						id='submit-edit-button'
// 						type='submit'
// 					>
// 						Save
// 					</button>
// 				</div>
// 			</form>
// 			<div
// 				style={{ fontSize: "11.5px", marginTop: "10px", marginLeft: "10px" }}
// 			></div>
// 		</div>
// 	);
// };

// export default EditAlbumForm;

import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { updateAlbumThunk, oneAlbumThunk } from "../../store/album";
import "../homepage.css";
// buttonOn is an boolean that will determine what this component renders

const EditAlbumForm = ({ buttonClicked, index }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [buttonOn, setButtonOn] = useState(buttonClicked);
  const album = useSelector((state) => state.albums.singleAlbum);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description)

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedAlbum = { ...album };
    editedAlbum.title = title;
    return dispatch(updateAlbumThunk(editedAlbum, index))
      .then(dispatch(oneAlbumThunk(album.id)))
      .then(history.push(`/albums/${album.id}`))
      // .then(setButtonOn(false));
  };

  const renderForm = (e) => {
    e.preventDefault();
    // setButtonOn(true);
  };

  const cancel = (e) => {
    e.preventDefault();
    // setButtonOn(false);
  };

  // if (!buttonOn) {
  //   return (
  //     <button onClick={renderForm} className="demo-btn" >
  //       Edit Album Details
  //     </button>
  //   );
  // } else {
  return (
    <div className="edit-project-container">
      <h2>Edit details</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="song-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          className="song-title-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={cancel} className="demo-btn" >
          Cancel
        </button>
        <button className="demo-btn" type="submit">
          Save
        </button>
      </form>
      </div>
    );
  // }
};

export default EditAlbumForm;
