import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Registration() {
  const yearSelect = document.getElementById('year');
  const daySelect = document.getElementById('day');

  function populateDays(month) {
    while (daySelect.firstChild) {
      daySelect.removeChild(daySelect.firstChild);
    }

    let dayNum;

    if (
      month === 'January' ||
      month === 'March' ||
      month === 'May' ||
      month === 'July' ||
      month === 'August' ||
      month === 'October' ||
      month === 'December'
    ) {
      dayNum = 31;
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      dayNum = 30;
    } else {
    }

    for (let i = 1; i <= dayNum; i++) {
      const option = document.createElement('option');
      option.textContent = i;
      daySelect.appendChild(option);
    }
  }

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

          <div className="container">
            <label>Date of Birth</label>
            <br />
            <span>
              <select name="month">
                <option value="" selected disabled>
                  -- Month --
                </option>
                <option value="january">January</option>
                <option value="january">February</option>
                <option value="january">March</option>
                <option value="january">April</option>
                <option value="january">May</option>
                <option value="january">June</option>
                <option value="january">July</option>
                <option value="january">August</option>
                <option value="january">September</option>
                <option value="january">October</option>
                <option value="january">November</option>
                <option value="january">Decemeber</option>
              </select>
            </span>

            <span>
              <select name="day" id="day"></select>
            </span>

            <span>
              <select name="year" id="year"></select>
            </span>
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
