import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../../assets/icons/blue.png';
import eye from '../../../assets/icons/eye-off-line.png';

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
  };

  useEffect(() => {
    if (user) {
      // if user is logged in, redirect to home page
      navigate('/');
    }
    const eyeIcon = document.getElementById('eye-icon');
    const passwordInput = document.getElementById('password-input');

    eyeIcon.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.add('ri-eye-line');
        eyeIcon.classList.remove('ri-eye-off-line');
      } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('ri-eye-line');
        eyeIcon.classList.add('ri-eye-off-line');
      }
    });
  }, [user]);

  return (
    <div className="centered-container-form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <img src={Logo} alt="chat logo" className="login-logo" />
          <br />

          <div className="container">
            <div className="input-box">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label htmlFor="password">Username or email address</label>
            </div>
          </div>
          <br></br>

          <div className="container">
            <div className="input-box-password">
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={handlePasswordChange}
                spellCheck="false"
                required
              />
              <label htmlFor="">Password</label>
              <i id="eye-icon" className="ri-eye-off-line"></i>
            </div>
          </div>

          <div className="forgotpass">
            <Link to="">Forgot password?</Link>
          </div>

          <br />
          <br />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </div>
      </form>

      <div className="login-option">
        New user?<Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;
