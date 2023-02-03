const LOAD_ALBUMS = "albums/USER_ALBUMS";
const LOAD_USER_ALBUMS = "albums/USER_ALBUMS";
const LOAD_SINGLE_ALBUM = "album/SINGLE_ALBUM";
const CREATE_ALBUM = "album/CREATE_ALBUM";
const EDIT_ALBUM = "album/EDIT_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";
const ADD_IMAGE_TO_ALBUM = "album/ADD_IMAGE_TO_ALBUM";

const userAlbums = (albums) => ({
	type: LOAD_USER_ALBUMS,
	payload: albums,
});

const allAlbum = (album) => ({
	type: LOAD_ALBUMS,
	payload: album,
});

const singleAlbum = (album) => ({
	type: LOAD_SINGLE_ALBUM,
	payload: album,
});

const createAlbum = (album) => ({
	type: CREATE_ALBUM,
	payload: album,
});

const editAlbum = (album) => ({
	type: EDIT_ALBUM,
	payload: album,
});

const deleteAlbum = (album) => ({
	type: DELETE_ALBUM,
	payload: album,
});

const addImageToAlbum = (singleAlbum) => ({
	type: ADD_IMAGE_TO_ALBUM,
	singleAlbum,
});

// THUNKS
// export const getUserAlbumsThunk = (userId) => async (dispatch) => {
// 	const response = await fetch(`/api/albums`);
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(userAlbums(data));
// 		return data;
// 	}
// };

export const allAlbumThunk = () => async (dispatch) => {
	const response = await fetch(`/api/albums/`);
	if (response.ok) {
		const data = await response.json();
		dispatch(allAlbum(data));
		return data;
	}
};

export const getUserAlbumThunk = (userId) => async (dispatch) => {
	// console.log('userIdLLLLLLLL', userId)
	const response = await fetch(`/api/albums/users/${userId}`);
	if (response.ok) {
		const data = await response.json(); //object
		// console.log('dataLLLLLLLL', data)
		const albumsArr = data.albums; //array [{}, {}]
		// console.log('albumsArr;;;;;;;;;;;;;', albumsArr)
		dispatch(userAlbums(albumsArr));
		return data;
	}
};

export const oneAlbumThunk = (album_id) => async (dispatch) => {
	// console.log('id------', album_id)
	const response = await fetch(`/api/albums/${album_id}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(singleAlbum(data));
		return data;
	}
};

//////CREATE ALBUM THUNK NOT USED
// export const createAlbumThunk = (payload) => async (dispatch) => {
// 	// const { name, description, images, url, user_id } = payload;
//   console.log('payloadInThunk--------', payload)
// 	const response = await fetch("/api/albums/", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body:  payload,
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		await dispatch(createAlbum(data));
// 		return data;
// 	}    const data = await response.json();
//   if(data.errors) {
//       return data.errors
//   }
//  else return ['An error occurred. Please try again.']
// };

//CREATE ALBUM
export const createAlbumThunk = (newAlbum) => async (dispatch) => {
	// console.log("inthunknewalbum///////", newAlbum);
	const response = await fetch(`/api/albums/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newAlbum),
	});
	if (response.ok) {
		const newCreatedAlbum = await response.json();
		dispatch(createAlbum(newCreatedAlbum));
		return newCreatedAlbum;
	}
};

export const updateAlbumThunk = (payload, album_id) => async (dispatch) => {
	const { title, description, url, user_id } = payload;
	// console.log('payloadInThunk///////', payload);
	console.log('album_id///////', album_id);
	console.log('payloadInThunk///////', payload);
	const response = await fetch(`/api/albums/${album_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({title, description, url, user_id}),
	});
	if (response.ok) {
		const updatedAlbum = await response.json();
		dispatch(editAlbum(updatedAlbum));
		console.log('updatedImage-in-thunk', updatedAlbum)
		return editAlbum;
	}
	if(response.status >= 400) throw response
};

export const removeAlbumThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/albums/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteAlbum(data));
		return data;
	}
};

export const addImageToAlbumThunk = (imageId, albumId) => async (dispatch) => {
	const response = await fetch(`/api/albums/${albumId}/images/${imageId}`, {
		method: "POST",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addImageToAlbum(data));
		return data;
	} else {
		return response;
	}
};

// REDUCER
// const initialState = { userAlbums: {}, singleAlbum: {} };

const initialState = { allAlbums: {}, singleAlbum: {}, myAlbums: [] };

const albumReducer = (state = initialState, action) => {
	let newState = initialState;
	switch (action.type) {
		case LOAD_USER_ALBUMS: {
			newState = { ...state, myAlbums: {} };
			const albums = action.payload;
			// console.log('action.payload', action.payload)
			newState.myAlbums = albums;
			return newState;
		}

		// case LOAD_ALBUMS:
		//   return action.payload

		case LOAD_ALBUMS:
			newState = { ...state, allAlbums: {} };
			action.albums.forEach((album) => {
				newState.allAlbums[album.id] = album;
			});
			return newState;

		case LOAD_SINGLE_ALBUM: {
			newState = {
				allAlbums: { ...state.allAlbums },
				singleAlbum: action.payload,
			};
			console.log("action.payload",action.payload)
			return newState
		}

		case CREATE_ALBUM: {
			// if (!state[action.id]) {
			// 	const newState = {
			// 		...state,
			// 		[action.payload.id]: {
			// 			id: action.payload.id,
			// 			name: action.payload.name,
			// 			description: action.payload.description,
			// 		},
			// 	};
			// 	return newState;
			// }
			// break;
			const newState = { ...state };
			// console.log("newStatelllllllllllll", newState);
			// console.log("payloadlllllllllllll", action.payload);
			newState[action.payload.id] = action.payload;
			return newState;
		}

		case EDIT_ALBUM:
			newState = { ...state, singleAlbum: {} }
			console.log('action.payload', action.payload)
			action.singleAlbum = action.payload
			return newState
			// return {
			// 	...state,
			// 	[action.payload.id]: action.payload,
			// };

		// case DELETE_ALBUM: {
		// 	newState = { ...state };
		// 	delete newState.userAlbums[action.payload];
		// 	return newState;
		// }

		case DELETE_ALBUM: {
			const newState = {
				allAlbums: { ...state.allAlbums },
				singleAlbum: {},
			};
			delete newState.allAlbums[action.albumId];
			return newState;
		}

		case ADD_IMAGE_TO_ALBUM: {
				newState = {
				allAlbums: { ...state.allAlbums },
				singleAlbum: state.singleAlbum,
				myAlbums: { ...state.myAlbums },
			};
			// updates the playlist in the allPlaylist store
			newState.allAlbums[action.album.id] = action.album;
			newState.myAlbums[action.album.id] = action.album;
			// if there are keys and values in single playlist
			// we want to overwrite that playlist if it's in the single playlist State
			if (Object.values(newState.singleAlbum).length) {
				if (newState.singleAlbum.id === action.album.id) {
					newState.singleAlbum = action.album;
				}
			}
			return newState;
		}
		default:
			return state;
	}
};

export default albumReducer;
