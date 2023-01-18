import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../../assets/icons/blue.png';
import eye from '../../../assets/icons/eye-off-line.png';
import Joyride from 'react-joyride';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [steps, setSteps] = useState([
    {
      target: '#em-input',
      content: 'This is where you enter your email address',
    },
  ]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const handleTourCallback = (data) => {
    const { action, index, type } = data;
    if (type === 'step:before') {
      // do something on step change
    }
  };

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
        setError('Email or Password is incorrect');
      });
  };
  useEffect(() => {
    if (user) {
      window.electron.ipcRenderer.sendMessage('on-login');
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
      <header id="login">Welcome</header>
      <p id="em-input">Test If nagana</p>
      <p id="subheader"> We're happy to see you here! </p>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {error && (
            <div className="errorbox">
              <p id="errormsg">
                <span>
                  <i class="ri-information-line" id="error-icon" />
                </span>{' '}
                {error}
              </p>
            </div>
          )}
          <br />
          <div className="container">
            <div className="input-box">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="container">
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={handlePasswordChange}
                spellCheck="false"
                required
              />
              <i id="eye-icon" className="ri-eye-off-line"></i>
            </div>
          </div>

          <div className="forgotpass">
            <Link to="">Forgot password?</Link>
          </div>

          <br />

          <button type="submit">Login</button>
          <button onClick={() => setIsTourOpen(true)}>Start Tour</button>
        </div>
      </form>

      <div className="login-option">
        New user?<Link to="/register">Create an account</Link>
      </div>
      <Joyride
        key={isTourOpen}
        steps={steps}
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#333',
            textColor: '#000000',
            width: '350px',
          },
        }}
      />
    </div>
  );
};

export default Login;
