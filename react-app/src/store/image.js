

const LOAD_IMAGES = "images/LOAD_IMAGES";
const LOAD_ONE_IMAGE = "images/LOAD_ONE_IMAGE";
// const LOAD_MY_IMAGES = "images/LOAD_MY_IMAGES";
const ADD_IMAGE = "images/ADD_IMAGE";
const EDIT_IMAGE = "images/EDIT_IMAGES";
const DELETE_IMAGE = "images/DELETE_IMAGE";

// ACTION CREATORS

const loadImages = (images) => ({
	type: LOAD_IMAGES,
	images,
});
const loadOneImage = (singleImage) => ({
	type: LOAD_ONE_IMAGE,
	singleImage,
});
// const loadMyImages = (data) => ({
// 	type: LOAD_MY_IMAGES,
// 	data,
// });
const addImage = (newImage) => ({
	type: ADD_IMAGE,
	newImage,
});
const editImage = (singleImage) => ({
	type: EDIT_IMAGE,
	singleImage,
});
const deleteImage = (imageId) => ({
	type: DELETE_IMAGE,
	imageId,
});

// THUNKS

export const loadImagesThunk = () => async (dispatch) => {
	const response = await fetch("/api/images/");

	if (response.ok) {
		const data = await response.json();
		// console.log("data------", data);
		dispatch(loadImages(data.images));
		// return data;
	}
};

export const loadOneImageThunk = (imageId) => async (dispatch) => {
	const response = await fetch(`/api/images/${imageId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadOneImage(data));
		// return data;
	}
};

// export const loadMyImagesThunk = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/images/user/${id}`);
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(loadMyImages(data));
// 		return data;
// 	}
// };

export const addImageThunk = (newImage) => async (dispatch) => {
	console.log('newImage////////', JSON.stringify(newImage))
	const response = await fetch(`/api/upload-images`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newImage),
	});
	if (response.ok) {
		const addedImage = await response.json();
		dispatch(addImage(addedImage));
		return addedImage;
	}
};

export const editImageThunk = (payload, imageId) => async (dispatch) => {
	const { title, description, url } = payload;
	console.log('payload in thunk-------', payload)
	const response = await fetch(`/api/images/${imageId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({title, description, url}),
	});

	if (response.ok) {
		const updatedImage = await response.json();
		dispatch(editImage(updatedImage));
		console.log('updatedImage-in-thunk', updatedImage)
		return editImage;
	}
	if(response.status >= 400) throw response
};

export const deleteImageThunk = (imageId) => async (dispatch) => {
	const response = await fetch(`/api/images/${imageId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteImage(imageId));
		return response;
	}
};

//STATE
const initialState = { allImages: {}, singleImage: {}, /*myImages: {}*/ };

// REDUCER

const imageReducer = (state = initialState, action) => {
	let newState = {}
	switch (action.type) {
		case LOAD_IMAGES: {
			newState = {
				...state,
				allImages: {},
				// singleImage: { ...state.singleImage },
			};
			// newState.allImages = {}
			action.images.forEach(image => {
				newState.allImages[image.id] = image;
			});
			return newState;
		}

		case LOAD_ONE_IMAGE: {
			// const newState = { ...state }
			// newState.singleImage = {}
			// const image = action.images.singleImage
			// newState.singleImage = image
			// return newState;

			// const newState = {
			// 	...state,
			// 	allImages: {},
			// 	singleImage: { ...state.singleImage },

			// };
			// 	newState = action.image
			// const newState = { ...state, singleImage: { ...action.image } };
			// return newState;

			// const newState = {
			//   allImages: { ...state.allImages },
			//   singleImage: action.singleImage,
			//   myImages: { ...state.myImages },
			// };

		// 	newState = {
		// 		...state,
		// 		singleImage: { ...action.singleImage }
		// }
		// 	return newState;
		// }
			newState = {
				allImages: { ...state.allImages },
				singleImage: action.image,
				// myPlaylists: { ...state.myPlaylists },
			}
			return newState;
		}

		// case LOAD_MY_IMAGES: {
		// 	const newState = {
		// 		...state,
		// 		allImages: { ...state.allImages },
		// 		singleImage: { ...state.singleImage },
		// 		myImages: {},
		// 	};

		// 	Object.values(action.data.images).forEach((image) => {
		// 		newState.myImages[image.id] = image;
		// 	});
		// 	return newState;
		// }

		case ADD_IMAGE: {
			const newState = {
				allImages: { ...state.allImages },
				singleImage: state.singleImage,
				// myImages: { ...state.myImages },
			};
			// updates the image in the allImages store
			newState.allImages[action.image.id] = action.image;
			// newState.myImages[action.image.id] = action.image;
			// if there are keys and values in single image
			// we want to overwrite that image if it's in the single image State
			if (Object.values(newState.singleImage).length) {
				if (newState.singleImage.id === action.image.id) {
					newState.singleImage = action.image;
				}
			}
			return newState;
		}

		case EDIT_IMAGE: {
			// const newState = {
			// 	allImages: { ...state.allImages },
			// 	singleImage: { ...state.singleImage },
			// 	myImages: { ...state.myImages },
			// };
			// newState.allImages[action.image.id] = action.image;
			// newState.myImages[action.image.id] = action.image;
			// newState.singleImage = action.image;
			// return newState;

			newState = {
				...state,
				singleImage: { ...action.singleImage }
		}
			return newState
		}

		case DELETE_IMAGE: {
			const newState = {
				allImages: { ...state.allImages },
				singleImage: {},
				// myImages: { ...state.myImages },
			};
			delete newState.allImages[action.imageId];
			// delete newState.myImages[action.imageId];
			return newState;
		}

		default:
			return state;
	}
};

export default imageReducer;
