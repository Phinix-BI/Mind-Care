import React, { useState } from 'react';
import './Signup_Login_Form.css';
import PasswordInput from '../PasswordInput/PasswordInput';
import IconComponent from '../IconComponent/IconComponent';
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


const Signup_Login_Form = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <IconComponent />
            <div className="input-field">
              <i><IoMail /></i>
              <input type="text" placeholder="E-mail" />
            </div>
            {/* <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div> */}
            <PasswordInput />
            {/* <div>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
              <label for="vehicle1"> Remember Me</label>

              <a>Forgot Password?</a>
            </div> */}

            <div className={`abc`}>
              <div className={`login_page_remember_me`}>
                <input type="checkbox" id="remember_me" />
                <label htmlFor="remember_me"> Remember Me</label>
              </div>
              <div className={`forgot_password`}>
                <a to="/ForgotPassword">Forgot Password?</a>
              </div>
            </div>

            <input type="submit" value="Login" className="btn solid" />

          </form>

          {/* Sign Up Form */}
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <IconComponent />
            <div className="input-field">
              <i><FaUser /></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i><IoMail /></i>
              <input type="email" placeholder="Email" />
            </div>
            <PasswordInput />
            <input type="submit" className="btn" value="Sign up" />
          </form>

          {/* Buttons to toggle between Sign In and Sign Up */}
          {/* <div className="buttons-container">
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div> */}
        </div>
      </div>

      <div className="panels-container">
        {/* ... (existing panel code) */}
        <div className="panels-container">
        {/* Left Panel */}
        <div className={`panel left-panel ${isSignUpMode ? 'hidden' : ''}`}>
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="images/5861790.webp" className="image" alt="" />
        </div>

        {/* Right Panel */}
        <div className={`panel right-panel ${isSignUpMode ? '' : 'hidden'}`}>
          <div className="content">
            <h2>One of us ?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="images/login-img.png" className="image" alt="" />
        </div>
      </div>
      </div>
      </div>
  );
};

export default Signup_Login_Form;
