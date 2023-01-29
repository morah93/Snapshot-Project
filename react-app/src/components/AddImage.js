import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UploadImage = () => {
	const history = useHistory(); // so that we can redirect after the image upload is successful
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [validationErrors, setValidationErrors] = useState([]);
	const [disable, setDisable] = useState(true)
	// const user = useSelector(state => state.session.user)

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
		if (errors.length > 0) return;
		const formData = new FormData();
		formData.append("image", image);
		formData.append("title", title);
		formData.append("description", description);

		// Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
		}

		// aws uploads can be a bit slow—displaying
		// some sort of loading message is a good idea
		setImageLoading(true);

		const response = await fetch("/api/images", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			await response.json();
			// console.log('data-------', data)
			setImageLoading(false);
			alert("Image Successfully Uploaded");
			history.push("/images");
		} else {
			// const data = await response.json();
      // if(data){
      //      setErrors(data)
      //    }
			setImageLoading(false);

			// a real app would probably use more advanced
			// error handling
			// const data = response.json();
			// if (data && data.errors) setErrors(data.errors);
			console.log("error");
		}
	};

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const updateTitle = (e) => {
		setTitle(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	return (
		// <form onSubmit={handleSubmit}>
		//     <input
		//       type="file"
		//       accept="image/*"
		//       onChange={updateImage}
		//     />
		//     <button type="submit">Submit</button>
		//     {(imageLoading)&& <p>Loading...</p>}
		// </form>
		<div
			className='uploadPage'
			style={{ paddingTop: 350 }}
		>
			<form onSubmit={handleSubmit}>
				<div className='errors-for-sign-up'>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div className=''>
					<input
						className='choose-file-button'
						type='file'
						accept='image/*'
						onChange={updateImage}
					/>
				</div>
				<div className='sign-up-form-inputs'>
					<label>Title</label>
					<input
						className='title-input'
						placeholder='Not Required'
						type='text'
						onChange={updateTitle}
						value={title}
					/>
				</div>
				<div className='sign-up-form-inputs'>
					<label>Description</label>
					<input
						className='description-inputs'
						placeholder='Not Required'
						type='text'
						onChange={updateDescription}
						value={description}
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
