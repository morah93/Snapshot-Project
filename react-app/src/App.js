import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import UserPage from "./components/User";
import UploadImage from "./components/images/AddImage";
import { authenticate } from "./store/session";
import HomePage from "./components/images/HomePage";
import DisplayOneImage from "./components/images/SingleImagePage";
import UserAlbums from "./components/albums/AlbumPage";
import SingleAlbum from "./components/albums/SingleAlbumDetails";
// import CreateAlbum from "./components/albums/CreateAlbum";
import EditAlbumForm from "./components/albums/EditAlbum";
import UserImages from "./components/images/ImagePage";

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
					path='/'
					exact={true}
				>
					<HomePage />
				</Route>

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
					<UserPage />
				</ProtectedRoute>


				<ProtectedRoute
					path='/albums'
					exact={true}
				>
					<UserAlbums />
				</ProtectedRoute>

				<ProtectedRoute
					path='/images'
					exact={true}
				>
					<UserImages />
				</ProtectedRoute>

				{/* <ProtectedRoute path={"/albums"}>
					<CreateAlbum />
				</ProtectedRoute> */}

				<ProtectedRoute
					path='/albums/:albumId'
					exact={true}
				>
					<SingleAlbum />
				</ProtectedRoute>

				<Route
					path='/albums/:albumId/edit'
					exact={true}
				>
					<EditAlbumForm />
				</Route>

				<ProtectedRoute
					path='/upload-image'
					exact={true}
				>
					<UploadImage />
				</ProtectedRoute>

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
