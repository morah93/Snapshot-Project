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
		<div className='signupPageContainer'>
			<h1 style={{ color: "black" }}>Please Signup</h1>
			<form
				className='signupForm'
				onSubmit={onSignUp}
			>
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
				<div className='loginPgText'>
					<p>
						Please signup to share your photos and creativity with the world
					</p>
				</div>
				<div>
					{/* <label>User Name</label> */}
					<div className='inputD'>
						<input
							id='text'
							type='text'
							name='username'
							onChange={updateUsername}
							value={username}
							placeholder='Username'
							required
						></input>
					</div>
					<div className='inputD'>
						{/* <label>Email</label> */}
						<input
							id='text'
							type='text'
							name='email'
							onChange={updateEmail}
							value={email}
							placeholder='Email'
							required
						></input>
					</div>
					<div className='inputD'>
						<input
							id='text'
							type='password'
							name='password'
							onChange={updatePassword}
							value={password}
							placeholder='Password'
							required
						></input>
					</div>
					<div className='inputD'>
						{/* <label>Repeat Password</label> */}
						<input
							id='text'
							type='password'
							name='repeat_password'
							onChange={updateRepeatPassword}
							value={repeatPassword}
							placeholder='Repeat Password'
							required
						></input>
					</div>
				</div>
				<button
					className='submit'
					type='submit'
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
