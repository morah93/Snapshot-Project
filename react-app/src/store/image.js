const LOAD_IMAGES = "images/LOAD_IMAGES";
const LOAD_MY_IMAGES = "images/LOAD_MY_IMAGES";
const LOAD_ONE_IMAGE = "images/LOAD_ONE_IMAGE";
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
const loadMyImages = (images) => ({
	type: LOAD_MY_IMAGES,
	payload: images
});
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

export const loadMyImagesThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/images/user/${userId}`);
	if (response.ok) {
		const data = await response.json();
		const imgArr = data.images;
		dispatch(loadMyImages(imgArr));
		return data;
	}
};

export const addImageThunk = (newImage) => async (dispatch) => {
	// console.log('newImage////////', JSON.stringify(newImage))
	const response = await fetch(`/api/images/`, {
		method: "POST",
		body: newImage,
	});
	if (response.ok) {
		const addedImage = await response.json();
		console.log('addedImage////////', addedImage)
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
const initialState = { allImages: {}, singleImage: {}, myImages: {} };

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
		case LOAD_MY_IMAGES: {
			newState = {
				...state,
				myImages: {},
			};
			const images = action.payload
			newState.myImages = images;
			return newState;
		}

		// case LOAD_USER_ALBUMS: {
		// 	newState = { ...state, myAlbums: {} };
		// 	const albums = action.payload;
		// 	// console.log('action.payload', action.payload)
		// 	newState.myAlbums = albums;
		// 	return newState;
		// }

		case LOAD_ONE_IMAGE: {

			newState = {
				allImages: { ...state.allImages },
				singleImage: action.image,
				// myPlaylists: { ...state.myPlaylists },
			}
			return newState;
		}

		case ADD_IMAGE: {
			const newState = {
				allImages: { ...state.allImages },
				singleImage: state.singleImage,
				// myImages: { ...state.myImages },
			};

			newState.allImages[action.newImage.id] = action.newImage;

			if (newState.singleImage.length) {
				if (newState.singleImage.id === action.newImage.id) {
					newState.singleImage = action.newImage;
				}
			}
			// if (Object.values(newState.singleImage).length) {
			// 	if (newState.singleImage.id === action.newImage.id) {
			// 		newState.singleImage = action.newImage;
			// 	}
			// }
			return newState;
		}

		case EDIT_IMAGE: {
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
