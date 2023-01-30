import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
	loadOneImageThunk,
	deleteImageThunk,
	loadImagesThunk,
	editImageThunk
} from "../store/image";
import SingleImageCards from "./SingleImageCard";

const DisplayOneImage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { imageId } = useParams();
	const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
	const user = useSelector((state) => state.session.user);
	console.log("user----------------", user);
	const image = useSelector((state) => state.images?.allImages)[imageId];
	console.log(image, "image--------");
	// const imgUserId = useSelector(state => state.images?.singleImage.user_id)

	useEffect(() => {
		dispatch(loadImagesThunk());
		dispatch(loadOneImageThunk(imageId));
	}, [dispatch, imageId]);

	useEffect(() => {
    if (image) {
        setTitle(image.title);
        setDescription(image.description);
        // setUrl(image.url)
    }
  }, [image])


	// const deleteButton = async (e, id) => {
	//     e.preventDefault()

	//     return history.push(`/photos/${id}/delete-confirm`)
	// }

	const updateTitle = (e) => {
		setTitle(e.target.value)
		}
		const updateDescription = (e) => {
			setDescription(e.target.value)
		}

		const onSubmit = async (e) => {
			e.preventDefault()
			// const updatedData = (
			// 	image.title = title,
			// 	image.description=description,
			// )

		const updatedData = (title, description)


				dispatch(editImageThunk(updatedData, imageId))
					.then(() => {
						history.push(`/images/${imageId}`)
						alert('success')
					})
					.catch(() => {
				alert('Failed')
			})

				// dispatch(getImageByIdThunk(id))

		}

  const deleteImage = (e) => {
	  e.preventDefault();
	  return dispatch(deleteImageThunk(image.id)).then(history.push("/images"));
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
				{/* {image && (
					<div className='showroom-image-div'>
						<img
							className='showroom-image'
							src={image?.url}
						/>
					</div>
				)} */}
				<div>
					{/* {user && image && user.id === image.user_id  ( */}
					<div className=''>
						{/* {Object.values(image) && ( */}
						{/* <SingleImageCards
              // key={id}
              // title={title}
              // description={description}
              // url={url}
              // id={id}
              image={image}
            /> */}
						{/* )} */}
						<div className='display-img-outer'>
							<img
                src={image?.url}
                style={{width:500, height:500}}
								// className={`display- img${i}`}
								alt={image?.id}
							/>
						</div>
						<div>{image?.title}</div>
						<div>{image?.description}</div>
						{/* //incoming */}
						{user && image && user.id === image.user_id && (
							<div className="update-image-form-container">
									<div className='sign-up-form'>
											<div className="confirm-delete-message">
													<span>What would you like to edit about this images details?</span>
											</div>
											<form onSubmit={onSubmit}>

													<div className='all-sign-up-form-inputs-labels'>
															<label>Title</label>
															<input
																	className='sign-up-form-inputs-only'
																	placeholder="Please enter title"
																	type="text"
																	onChange={updateTitle}
																	value={title}
															/>
													</div>

													<div className='all-sign-up-form-inputs-labels'>
															<label>Description</label>
															<input
																	className='sign-up-form-inputs-only'
																	placeholder="Please enter description"
																	type="text"
																	onChange={updateDescription}
																	value={description}
															/>
													</div>
													<div className='delete-cancel-button-div'>
															<button className='sign-up-submit-button' type='submit'>Save Changes</button>
															{/* <button className='sign-up-submit-button' onClick={event => cancelButton(event, id)}>Cancel</button> */}
													</div>
											</form >
									</div>
							</div>
						)}
						{/* //incoming end */}
            {/* {user && image && user.id === image.user_id && (
						<button
							className='edit-btn'
							onClick={editButton}
						>
							Edit Image
						</button>
					)} */}
					</div>
					{user && image && user.id === image.user_id && (
              <button
                className="delete-btn"
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
