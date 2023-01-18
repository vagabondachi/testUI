import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import PWDRequisite from './PWSRequisite';
import Modal from './TOSModal';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwdRequisite, setPWDRequisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };
  const handleOnFocus = () => {
    setPWDRequisite(true);
  };
  const handleOnBlur = () => {
    setPWDRequisite(false);
  };
  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length > 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // check if user is 18 years or older
    let age = calculateAge(month, day, year);
    if (age < 18) {
      setError('You must be 18 years or older to register.');
      return;
    }
    firebase
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((snapshot) => {
        if (snapshot.size !== 0) {
          setError('This username is already taken. Please choose another.');
          return;
        }
        // continue with registration
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
              username: username,
            });
            user.user
              .sendEmailVerification()
              .then(function () {
                // Email sent.
                setSuccess(true);
              })
              .catch(function (error) {
                // An error happened.
                setError(error.message);
              });
          })
          .catch((error) => {
            setError(error.message);
            console.log(error);
          });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };
  const calculateAge = (month, day, year) => {
    let today = new Date();
    let birthdate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthdate.getFullYear();
    let m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (user) {
      // if user is logged in, redirect to home page
      navigate('/');
    }
  }, [user]);

  return (
    <div className="centered-container-form">
      {' '}
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
      <header id="register">Create an account</header>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {error && (
            <div className="errorbox">
              <p id="errormsg">
                <i class="ri-information-line" id="error-icon" /> {error}
              </p>
            </div>
          )}
          <div className="container">
            <div className="input-box">
              <label htmlFor="password">Email address</label>
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="container">
            <div className="input-box">
              <label htmlFor="password">Username</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="container">
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyUp={handleOnKeyUp}
                required
              />
            </div>
            {pwdRequisite ? (
              <PWDRequisite
                capsLetterFlag={checks.capsLetterCheck ? 'valid' : 'invalid'}
                numFlag={checks.numCheck ? 'valid' : 'invalid'}
                pwdLengthFlag={checks.pwdLengthCheck ? 'valid' : 'invalid'}
                specialCharFlag={checks.specialCharCheck ? 'valid' : 'invalid'}
              />
            ) : null}
          </div>

          <div className="container">
            <div className="input-box">
              <label>Date of Birth</label>
              <br />
              <span className="month-container">
                <select
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="" selected disabled>
                    Month
                  </option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </span>
              <span className="days-container">
                <select
                  name="day"
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="" selected disabled>
                    Day
                  </option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </span>
              <span className="year-container">
                <select
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" selected disabled>
                    Year
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 },
                    (_, i) => i + 1960
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </div>

          <div id="TOScontainer">
            <input type="checkbox" onChange={(e) => setChecks({ ...checks, checkbox: e.target.checked })} onClick={() => setOpenModal(true)} />{' '}
            <label>I agree to the terms and condition</label>
          </div>

          <button id="registersubmit" type="submit"  disabled={!checks.checkbox}>
            Continue
          </button>
        </div>
      </form>
      <div className="login-option">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Registration;
