const LOAD_ALBUMS = "albums/USER_ALBUMS";
const LOAD_USER_ALBUMS = "albums/USER_ALBUMS";
// const LOAD_SINGLE_ALBUM = "album/SINGLE_ALBUM";
const CREATE_ALBUM = "album/CREATE_ALBUM";
const EDIT_ALBUM = "album/EDIT_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";
const ADD_IMAGE_TO_ALBUM = "album/ADD_IMAGE_TO_ALBUM";



const userAlbums = (albums) => ({
	type: LOAD_USER_ALBUMS,
	albums
});

const allAlbum = (album) => ({
	type: LOAD_ALBUMS,
	payload: album
});

const createAlbum = (album) => ({
	type: CREATE_ALBUM,
	album,
});

const editAlbum = (album) => ({
	type: EDIT_ALBUM,
	album,
});

const deleteAlbum = (album) => ({
	type: DELETE_ALBUM,
	album,
});

const addImageToAlbum = (album) => ({
  type: ADD_IMAGE_TO_ALBUM,
  album,
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

export const getUserAlbumThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/current");
  if (response.ok) {
    const data = await response.json(); //object
    const albumsArr = data.Reviews; //array [{}, {}]
    dispatch(userAlbums(albumsArr));
    return data;
  }
};

export const allAlbumThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/albums/`);
	if (response.ok) {
		const data = await response.json();
		dispatch(allAlbum(data));
		return data;
	}
};

export const createAlbumThunk = (payload) => async (dispatch) => {
	// const { name, description, images, url, user_id } = payload;
  console.log('payloadInThunk--------', payload)
	const response = await fetch("/api/albums/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body:  payload,
	});

	if (response.ok) {
		const data = await response.json();
		await dispatch(createAlbum(data));
		return data;
	}    const data = await response.json();
  if(data.errors) {
      return data.errors
  }
 else return ['An error occurred. Please try again.']
};

// export const create = (data) => async (dispatch) => {
//   const response = await fetch('/api/albums/', {
//       method: 'POST',
//       body: data
//   })

//   if (response.ok) {
//       const final = await response.json();
//       await dispatch(createAlbum(final))

//       return final;
//   } else if (response.status < 500) {
//       const data = await response.json();
//       if(data.errors) {
//           return data.errors
//       }
//   } else return ['An error occurred. Please try again.']
// }

export const updateAlbumThunk = (payload) => async (dispatch) => {
	const {albumId, name, description, images } = payload;
	const response = await fetch(`/api/albums/${albumId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, description, images }),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editAlbum(data));
		return data;
	}
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

export const addImageToAlbumThunk =
  (imageId, albumId) => async (dispatch) => {
    const response = await fetch(
      `/api/albums/${albumId}/images/${imageId}`,
      {
        method: "POST",
      }
    );
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

const initialState = {allAlbums: {}, singleAlbum: {}, myAlbums: {}};

const albumReducer = (state = initialState, action) => {
	switch (action.type) {
		// case LOAD_USER_ALBUMS: {
		// 	const newState = Object.assign({}, state);
		// 	newState.userAlbums = {};
		// 	const albums = action.payload;
		// 	newState.userAlbums = albums;
		// 	return newState;
    // }
    case LOAD_ALBUMS:
      return action.payload

    // case LOAD_ALBUMS:
    //   newState = { ...state };
    //   const normalizedUserReviews = {};
    //   action.reviews.forEach(
    //     (review) => (normalizedUserReviews[review.id] = review)
    //   );
    //   newState.user = normalizedUserReviews;
    //   return newState;

		// case LOAD_SINGLE_ALBUM: {
		// 	// const newState = { ...state };
		// 	// newState.singleAlbum = {};
		// 	// const album = action.payload;
		// 	// newState.singleAlbum = album;
		// 	return action.payload;
    // }

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
      const newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
		}

		case EDIT_ALBUM:
			return {
				...state,
				[action.payload.id]: action.payload,
      };

		case DELETE_ALBUM: {
			const newState = { ...state };
			delete newState.userAlbums[action.payload];
			return newState;
		}

		case ADD_IMAGE_TO_ALBUM: {
      const newState = {
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
