import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { addImageThunk } from "../store/image";

const UploadImage = () => {
	const history = useHistory(); // so that we can redirect after the image upload is successful
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	// const [validationErrors, setValidationErrors] = useState([]);
	const [disable, setDisable] = useState(true)
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		const errors = [];
		if (image) {
			if (
				image.type !== "image/png" &&
				image.type !== "image/jpg" &&
				image.type !== "image/jpeg"
			) {
				errors.push(
					"File Type Not Supported. Please upload a png, jpg, or jpeg"
				);
				setTitle(image.name.split('.')[0]);
				//   setTitle(image.name.split('.')[0])
			} else setTitle("")
			if (!image) errors.push('Please upload image to continue')
	      if (errors.length > 0) setDisable(true)
	      if (errors.length === 0) setDisable(false)
	      setErrors(errors)
			}
		// if (!image) errors.push("Please upload an image");
		// setValidationErrors(errors);
	}, [image, disable]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		// if (errors.length > 0) return;
		const formData = new FormData();
		formData.append("image", image);
		formData.append("title", title);
		formData.append("description", description);

		console.log(formData, 'formdata----------')
		// if (!title || title.length < 1 || title.length > 20) errors.push("*Must have a title that is less than 20 characters.");
		// if (!description || description.length < 1 || description.length > 500) errors.push("*Must have a description that is less than 500 characters.");
		if (!image) errors.push("*Must upload an image file");

		setErrors(errors);

		if (errors.length) {
			return;
		} else {
			setImageLoading(true);

			// aws uploads can be a bit slow—displaying
			// some sort of loading message is a good idea
			setImageLoading(true);

			let res = await dispatch(addImageThunk(formData))
			if (res) {
				setImageLoading(false);
				history.push("/images");
			}

		}
	};

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};


	return (

		<div
			className='uploadPage'
			style={{ paddingTop: 350 }}
		>
			<form onSubmit={handleSubmit}>
				<div className='errors-for-sign-up'>
					<div>
						{errors.map((error, ind) => (
							<li key={ind}>{error}</li>
						))}
					</div>
				</div>

				<div className='sign-up-form-inputs'>
					<label>Title</label>
					<input
						className='title-input'
						placeholder='Not Required'
						type='text'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div className='sign-up-form-inputs'>
					<label>Description</label>
					<input
						className='description-inputs'
						placeholder='Not Required'
						type='text'
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
				</div>
				<div className=''>
					<input
						className='choose-file-button'
						type='file'
						accept='image/*'
						onChange={updateImage}
					/>
				</div>

				<div className='submit-button-div'>
					<button
						disabled={disable}
						className='submit-button'
						type='submit'
					>
						Upload
					</button>
					{imageLoading && <p>Loading...</p>}
				</div>
			</form>
		</div>
	);
};

export default UploadImage;
