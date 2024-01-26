import React, { useState } from 'react';
import { IoMail } from "react-icons/io5";
import { FaUser,FaKey } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordInput from '../PasswordInput/PasswordInput';
import IconComponent from '../IconComponent/IconComponent';
import './Signup_Login_Form.css';
import { Player } from '@lottiefiles/react-lottie-player';
import settingGif from '../Assets/Setting.gif';


const Signup_Login_Form = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isForgotPassMode, setIsForgotPassMode] = useState(false);
  const [isEmailverified, setIsEmailverified] = useState(false);
  const [isOtpverified, setIsOtpverified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [role,setRole] = useState('Patient');
  const[loader,setLoader] = useState(false);

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/profile', {
        fullName, email, password,role
      });

       toast(response.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
      setIsSignUpMode(false);
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating profile.');
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email, password ,role
      });

      localStorage.setItem('token', response.data.token);

      toast(response.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Redirect to '/ProfilePage' if needed
      // window.location = '/ProfilePage';

    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating profile.');
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
    setEmail('');
    setPassword('');
    setFullName('');
    setIsForgotPassMode(false);
    setIsEmailverified(false);
    setIsOtpverified(false);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
    setIsForgotPassMode(false);
    setIsEmailverified(false);
    setIsOtpverified(false);
  };

  const handleForgotPass = ()=>{
    setPassword('');
    setIsForgotPassMode(true);
    setIsEmailverified(false);
    setIsOtpverified(false);
  }
  const handleEmailVerification = async(e)=>{ 
    e.preventDefault();
    setIsOtpverified(false);
    setLoader(true);
    try{
      const response = await axios.post('http://localhost:3000/user/forgot-password', {
        email
      });
      toast(response.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      if(response.status === 200){
        setIsEmailverified(true);
        setLoader(false);
      }
    }catch(error){
      console.error(error);
      toast.error('An error occurred while updating profile.');
    }
    
  }


  const handleOtpVerification = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/user/verify-otp',{
        otp
      });
      toast(response.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if(response.status === 200){
        setIsOtpverified(true);
      }
    }catch(error){
      console.error(error);
      toast.error('An error occurred while updating profile.');
    }
   
  }
  const handleResetPass = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/user/reset-password',{
       otp, password,confirmPassword
      });
      console.log(response);
      toast(response.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if(response.status === 200){
        setIsForgotPassMode(false);
        setIsEmailverified(false);
        setIsOtpverified(false);
        setOtp('');
      }
    }catch(error){
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(` ${error.response.data.message}`);
      } 
    }
    
  }

  const renderHeading = () => {
    if (isForgotPassMode) {
      if(isEmailverified){
        if(isOtpverified){
          return 'Reset Password';
      }else{
          return 'Enter OTP'
      } 
    } else {
      return 'Forgot Password';
    }
  }else{
    return 'Sign In';
  }
  };

 

  return (
    <div className={`form-main-container ${isSignUpMode  ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form  className="sign-in-form">
         
            <h2 className="title">{renderHeading()}</h2>
            {/* <IconComponent role={role} setRole={setRole}/> */}
            
            
            {!isForgotPassMode ? (
              <>
              <div className="input-field">
              <i><FaUser /></i>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <PasswordInput password={password} setPassword={setPassword} placeholder={"Password"} />
             
            <div className="abc">
              <div className="login_page_remember_me">
                <input type="checkbox" id="remember_me" />
                <label htmlFor="remember_me"> Remember Me</label>
              </div>
              <div className="forgot_password">
                <div onClick={handleForgotPass} style={{cursor : "pointer"}}>Forgot Password?</div>
              </div>
            </div>
            
            <input type="submit" value="Login" className="btn1 solid" onClick={handleLoginClick} />
              </>
            ) : null
              }

            { isForgotPassMode && !isEmailverified && !isOtpverified? (
            <>
            <div className="input-field">
              <i><IoMail /></i>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {loader ? (
                <div className="loader">
              <span>Please wait...</span> 
                </div>
              ) : null}
              <input type="submit" value="Send Otp" className="btn1 solid" onClick={handleEmailVerification} />
              </>
              ) : null
              }

              {isForgotPassMode && isEmailverified && !isOtpverified ?(
                <>
                <div className="input-field">
                <i><FaKey /></i>
              <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <input type="submit" value="Next" className="btn1 solid" onClick={handleOtpVerification} />
              </>

              ): null}

              {isForgotPassMode && isEmailverified && isOtpverified ?(
                <>
              
                <PasswordInput password={password} setPassword={setPassword} placeholder={"Password"} />
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword}  placeholder={"Confirm Password"}/>
              
              <input type="submit" value="Save" className="btn1 solid" onClick={handleResetPass} />
              </>
            ): null}

          </form>

          {/* Forgot Password Form */}
        

          {/* Sign Up Form */}
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <IconComponent role={role} setRole={setRole} />
            <div className="input-field">
              <i><FaUser /></i>
              <input type="text" placeholder="Username" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="input-field">
              <i><IoMail /></i>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <PasswordInput password={password} setPassword={setPassword} />
            <input type="submit" className="btn1" value="Sign up" onClick={handleRegisterClick} />
          </form>
          
        </div>
        <ToastContainer />
      </div>

      <div className="panels-container">
        {/* Left and Right Panel code goes here */}
        <div className="panels-container">
        {/* Left Panel */}
        <div className={`panel left-panel ${isSignUpMode ? 'hidden' : ''}`}>
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn1 transparent" onClick={handleSignUpClick}>
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
            <button className="btn1 transparent" onClick={handleSignInClick}>
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
