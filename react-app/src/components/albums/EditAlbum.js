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
import {useHistory, useParams} from "react-router-dom";
import { updateAlbumThunk, oneAlbumThunk } from "../../store/album";
import "../homepage.css";
// buttonOn is an boolean that will determine what this component renders

const EditAlbumForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.singleAlbum);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description)
  const [url, setUrl] = useState(album.url)
  const [user_id, setUser_id] = useState(album.user_id)
  const [error, setError] = useState([]);
  let ErrorMessage = [];


  useEffect(() => {
		dispatch(oneAlbumThunk(albumId));
	}, [dispatch, albumId]);

  useEffect(() => {
		if (album) {
			setTitle(album.title);
			setDescription(album.description);
      setUrl(album.url);
      // setUser_id(album.user_id)
		}
  }, [album]);

  const updateTitle = (e) => {
		setTitle(e.target.value);
	};
	const updateDescription = (e) => {
		setDescription(e.target.value);
	};
	const updateUrl = (e) => {
		setUrl(e.target.value);
	};


  const onSubmit = async (e) => {
		e.preventDefault();
		setError([]);
		// if (!title || title.length < 1 || title.length > 20) ErrorMessage.push("*Must have a title that is less than 20 characters.");
		// if (!description || description.length < 1 || description.length > 500) ErrorMessage.push("*Must have a description that is less than 500 characters.");
		// if (!url) ErrorMessage.push('Image Url cannot be empty.')
		setError(ErrorMessage);

		if (ErrorMessage?.length) return;

		const formData = new FormData();


		await fetch(`/api/albums/${albumId}`, {
      method: "PUT",
			body: formData,
		});
    // console.log('formData------', formData)
    const newAlbum = {
			description,
			title,
      url,
      // user_id: album.user_id
		};

		// console.log('newAlbum------', newAlbum)
		dispatch(updateAlbumThunk(newAlbum, albumId))
			.then(() => {
				alert("success");
				history.push(`/albums/${albumId}`);
			})
			.catch(() => {
				alert("Failed");
			});


	};


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const editedAlbum = { ...album };
  //   editedAlbum.title = title;
  //   return dispatch(updateAlbumThunk(editedAlbum, index))
  //     .then(dispatch(oneAlbumThunk(album.id)))
  //     .then(history.push(`/albums/${album.id}`))
  //     // .then(setButtonOn(false));
  // };

  // const renderForm = (e) => {
  //   e.preventDefault();
  //   // setButtonOn(true);
  // };

  const cancel = (e) => {
    e.preventDefault();
    // setButtonOn(false);
    history.push(`/users/${user.id}`)
  };

  // if (!buttonOn) {
  //   return (
  //     <button onClick={renderForm} className="demo-btn" >
  //       Edit Album Details
  //     </button>
  //   );
  // } else {
  return (
    <div className="formPageContainer">
      <img
					className='loginImg'
					src={
						"https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg"
					}
          style={{height:350}}
				></img>
      <h2>Edit details</h2>
      <form className='loginForm' onSubmit={onSubmit}>
        <div>

        </div>
        <div>
        <label >Title</label>
        <input
          className="album-input"
          type="text"
          value={title}
          onChange={updateTitle}
          placeholder="Title"
          required
          />
        </div>
        <label >Description</label>
        <div>
        <input
          className="album-input"
          type="text"
          value={description}
          onChange={updateDescription}
          placeholder="Description"
        />
        </div>
        <div>
        <label>Image Url</label>
        <input
          className="album-input"
          type="text"
          value={url}
          onChange={updateUrl}
          placeholder="Image Url"
        />
        </div>
        <button className='createButton' type="submit">
          Save Changes
        </button>
        <button className='createButton' onClick={cancel} >
          Cancel
        </button>
      </form>
      </div>
    );
  // }
};

export default EditAlbumForm;
