import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, history, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "../homepage.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    // history.push("/");
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='formPageContainer'>
      <h1 style={{ color: "black" }}>Please Log In</h1>
      <form
        className='loginForm'
        onSubmit={onLogin}
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
        <div className="loginPgText">
          <p>Please login to share your photos and creativity with the world</p>
        </div>
        <div className='inputD'>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            id="text"
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div className='inputD'>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            id="text"
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />
        </div>
        <button
          className='submit'
          type='submit'
        >
          Login
        </button>
      </form>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default LoginForm;
