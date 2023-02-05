import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import AddImageToAlbumButton from "../albums/addImageToAlbumButton";
import {
	loadOneImageThunk,
	deleteImageThunk,
	loadImagesThunk,
	editImageThunk,
} from "../../store/image";
import { getUserAlbumThunk } from "../../store/album";
import CreateAlbum from "../albums/CreateAlbum";
// import SingleImageCards from "./SingleImageCard";

const DisplayOneImage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { imageId } = useParams();
	const [title, setTitle] = useState("");
	const [photo, setPhoto] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const user = useSelector((state) => state.session.user);
	console.log("user----------------", user);
	const myAlbums = useSelector((state) => state.albums?.myAlbums);
	const images = useSelector((state) => state.images?.allImages);
	const image = useSelector((state) => state.images?.allImages)[imageId];
	// console.log(image, "image--------");
	// const imgUserId = useSelector(state => state.images?.singleImage.user_id)

	const [error, setError] = useState([]);
	let ErrorMessage = [];

	useEffect(() => {
		// dispatch()
		dispatch(loadImagesThunk());
		dispatch(loadOneImageThunk(imageId));
		dispatch(getUserAlbumThunk(user?.id));
	}, [dispatch, imageId]);

	useEffect(() => {
		if (image) {
			setTitle(image.title);
			setDescription(image.description);
			setUrl(image.url);
		}
	}, [image]);

	// const deleteButton = async (e, id) => {
	//     e.preventDefault()

	//     return history.push(`/photos/${id}/delete-confirm`)
	// }

	const updateTitle = (e) => {
		setTitle(e.target.value);
	};
	const updateDescription = (e) => {
		setDescription(e.target.value);
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
		// const data = response.json()
		// if (!image) {
		// 	// console.log('imageUrl from front end -- before setImageUrl', imageUrl)
		// 	setImageUrl(image.image_url)
		// 	// console.log('imageUrl from front end -- after setImageUrl', imageUrl)
		// 	// setImage(image)
		// }
		// formData.append("image", image);
		await fetch(`/api/images/:imageId`, {
			method: "PUT",
			body: formData,
		});
		const newImage = {
			title,
			description,
			url: image.url,
		};

		// console.log('newImage------', newImage)
		dispatch(editImageThunk(newImage, imageId))
			.then(() => {
				alert("success");
				history.push(`/`);
			})
			.catch(() => {
				alert("Failed");
			});

		// dispatch(getImageByIdThunk(id))
	};

	const deleteImage = (e) => {
		e.preventDefault();
		return dispatch(deleteImageThunk(image.id)).then(history.push("/"));
	};

	// const editButton = async (e, imageId) => {
	// 	e.preventDefault();

	// 	return history.push(`/images/${image?.id}/edit`);
	// };

	// const cancelButton = async (e, id) => {
	//   e.preventDefault()
	//   history.push(`/photos/${id}`)
	// }

	return (
		<>
			<div className='singleImageContainer'>
				<div>
					<div className=''>
						<div className='display-img-outer'>
							<img
								src={image?.url}
								style={{ width: 700, height: 700 }}
								// className={`display- img${i}`}
								alt={image?.id}
							/>
						</div>
						<div>{image?.title}</div>
						<div>{image?.description}</div>
						{user && image && user.id === image.user_id && (
							<div className='update-image-form'>
								<div className='confirm-delete-message'>
									<span>
										What would you like to edit about this images details?
									</span>
								</div>
								<form onSubmit={onSubmit}>
									<div className='all-sign-up-form-inputs-labels'>
										<label>Title</label>
										<input
											className='sign-up-form-inputs-only'
											placeholder='Please enter title'
											type='text'
											onChange={updateTitle}
											value={title}
										/>
									</div>

									<div className='all-sign-up-form-inputs-labels'>
										<label>Description</label>
										<input
											className='sign-up-form-inputs-only'
											placeholder='Please enter description'
											type='text'
											onChange={updateDescription}
											value={description}
										/>
									</div>
									<div className='delete-cancel-button-div'>
										<button
											className='sign-up-submit-button'
											type='submit'
										>
											Save Changes
										</button>
										{/* <button className='sign-up-submit-button' onClick={event => cancelButton(event, id)}>Cancel</button> */}
									</div>
								</form>
							</div>
						)}

						{/* <div className="add-image-to-album">
            	<select
              	className="image-input-option"
              	value={photo}
              	onChange={(e) => setPhoto(e.target.value)}
           		>
              	{user.albums.map((album) => (
                	<option key={album} value={album}>
                  {album.title}
                	</option>
              	))}
            	</select>
          	</div> */}

						<div>
							{user && myAlbums?.length ? (
								<AddImageToAlbumButton
									image={image}
								/>
							) : (
								<p className='createButton'>{user && <CreateAlbum />}</p>
							)}
						</div>
					</div>
					{user && image && user.id === image.user_id && (
						<button
							className='delete-btn'
							onClick={deleteImage}
						>
							Delete Image
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default DisplayOneImage;
