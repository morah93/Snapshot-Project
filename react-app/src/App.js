import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UploadImage from "./components/AddImage";
import { authenticate } from "./store/session";
import HomePage from "./components/HomePage";
import DisplayOneImage from "./components/SingleImagePage";
import EditImageDetails from "./components/EditImagePage";


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


				<Route
					path='/images/:imageId'
					exact={true}
				>
					<EditImageDetails />
				</Route>

			</Switch>
		</BrowserRouter>
	);
}

export default App;
