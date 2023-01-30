import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
	loadOneImageThunk,
	deleteImageThunk,
	loadImagesThunk,
} from "../store/image";
import SingleImageCards from "./SingleImageCard";

const DisplayOneImage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { imageId } = useParams();
	const user = useSelector((state) => state.session.user);
	console.log("user----------------", user);
	const image = useSelector((state) => state.images?.allImages)[imageId];
	console.log(image, "image--------");
	// const imgUserId = useSelector(state => state.images?.singleImage.user_id)

	useEffect(() => {
		dispatch(loadImagesThunk());
		dispatch(loadOneImageThunk(imageId));
	}, [dispatch, imageId]);

	// useEffect(() => {
	//     window.scrollTo(0, 0)
	// }, [])

	// const deleteButton = async (e, id) => {
	//     e.preventDefault()

	//     return history.push(`/photos/${id}/delete-confirm`)
	// }

  const deleteImage = (e) => {
	  e.preventDefault();
	  return dispatch(deleteImageThunk(image.id)).then(history.push("/"));
	};

	const editButton = async (e, imageId) => {
		e.preventDefault();

		return history.push(`/images/${image?.id}/edit`);
	};

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
            {user && image && user.id === image.userId && (
						<button
							className='edit-btn'
							onClick={editButton}
						>
							Edit Image
						</button>
					)}
					</div>
					{user && image && user.id === image.user_id && (
              <button
                className="delete-btn"
                onClick={deleteImage}
              >
                Delete
              </button>
           )}

				</div>
			</div>
		</>
	);
};

export default DisplayOneImage;
