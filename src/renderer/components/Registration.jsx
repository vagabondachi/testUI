import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: username,
          })
          .catch((error) => {
            console.log(error);
          });
        firebase.firestore().collection('users').doc(user.user.uid).set({
          userId: user.user.uid,
          userLanguage: 'en',
          translateToLanguage: 'en',
        });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      // if user is logged in, redirect to home page
      navigate('/');
    }
  }, [user]);

  return (
    <div className="centered-container-form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="loginheader">Create an account</div>
          <br />
          <div className="container">
            <div className="input-box">
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="password">Email address</label>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="input-box">
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <label htmlFor="password">Username</label>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <br />
          <br />

          <button type="submit">Continue</button>
        </div>
      </form>
      {error && <p>{error}</p>}

      <div className="login-option">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Registration;
