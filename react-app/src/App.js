import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UploadImage from "./components/images/AddImage";
import { authenticate } from "./store/session";
import HomePage from "./components/images/HomePage";
import DisplayOneImage from "./components/images/SingleImagePage";
import UserAlbums from "./components/albums/AlbumPage";
import SingleAlbum from "./components/albums/SingleAlbumDetails";
import CreateAlbumForm from "./components/albums/CreateAlbum";
// import AddImageToAlbumButton from "./components/albums/addImageToAlbumButton";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>

				<Route
					path='/login'
					exact={true}
				>
					<LoginForm />
				</Route>

				<Route
					path='/sign-up'
					exact={true}
				>
					<SignUpForm />
				</Route>

				<ProtectedRoute
					path='/users'
					exact={true}
				>
					<UsersList />
				</ProtectedRoute>

				<ProtectedRoute
					path='/users/:userId'
					exact={true}
				>
					<User />
				</ProtectedRoute>

				<Route
					path='/images'
					exact={true}
				>
					<HomePage />
				</Route>

				<Route
					path='/albums'
					exact={true}
				>
					<UserAlbums />
				</Route>

				<Route path={'/albums/new-album'}>
          <CreateAlbumForm />
        </Route>


				<Route
					path='/albums/:albumId'
					exact={true}
				>
					<SingleAlbum />
				</Route>

				<Route
					path='/upload-image'
					exact={true}
				>
					<UploadImage />
				</Route>

				<Route
					path='/images/:imageId'
					exact={true}
				>
					<DisplayOneImage />
				</Route>


				{/* <Route
					path='/images/:imageId'
					exact={true}
				>
					<EditImageDetails />
				</Route> */}

			</Switch>
		</BrowserRouter>
	);
}

export default App;
