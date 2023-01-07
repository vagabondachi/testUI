import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../../assets/icons/blue.png';
import eye from '../../../assets/icons/eye-off-line.png'


const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      });
      window.electron.ipcRenderer.sendMessage('on-login');
  };

  useEffect(() => {
    if (user) {
      // if user is logged in, redirect to home page
      navigate('/');
    }
  }, [user]);

  return (
    
    <div  className="centered-container-form">  
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="chat logo" className='login-logo' />
        <br/>
        <div className='form-container'>
          
        <div className="container">
        <div className='input-box'>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
         />  
          <label htmlFor="password">
          Email/username
          </label>
        </div> 
        </div>
        <br></br>
     
<div className="container">
        <div className='input-box'>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            spellCheck="false"
            required
         />  
          <label htmlFor="">
          Password 
          </label>
          <i className="ri-eye-off-line toggle"></i>
        </div> 
        </div>
       
        <div className='forgotpass'>
        <Link to="" >Forgot password?</Link>
        </div>


        <br />
        <br />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        </div>
      </form>
     
    <div className='register'>
          New user?<Link to="/register">Create an account</Link>
      
      </div>
      
    </div>
    

  );
};

export default Login;





