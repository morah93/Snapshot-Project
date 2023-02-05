import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "../homepage.css";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors(["Please Confirm Password"]);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (

		<div className='formPageContainer'>
			<h1 style={{ color: "black" }}>Please Signup</h1>
			<form
				className='loginForm'
				onSubmit={onSignUp}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<img
					className='loginImg'
					src={
						"https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg"
					}
				></img>
				<div className="loginPgText">
					<p>Please signup to share your photos and creativity with the world</p>
				</div>
				<div>
					<label>User Name</label>
					<input
						type='text'
						name='username'
						onChange={updateUsername}
						value={username}
						required
					></input>
				</div>
				<div>
					<label>Email</label>
					<input
						type='text'
						name='email'
						onChange={updateEmail}
						value={email}
						required
					></input>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						name='password'
						onChange={updatePassword}
						value={password}
						required
					></input>
				</div>
				<div>
					<label>Repeat Password</label>
					<input
						type='password'
						name='repeat_password'
						onChange={updateRepeatPassword}
						value={repeatPassword}
						required
					></input>
				</div>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
