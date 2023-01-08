import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Link } from 'react-router-dom';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

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
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="centered-container-form">  
      <form onSubmit={handleSubmit}>
      <div className='form-container'>
      <div className='loginheader'>Create an account</div>
      <br/>  
      <div className="container">
        <div className='input-box'>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
         />  
          <label for="password">
          Email address
          </label>
        </div> 
        </div>
        <br/>

        <div className="container">
        <div className='input-box'>
          <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
         />  
          <label for="password">
          Username
          </label>
        </div> 
        </div>
        <br/>

        <div className="container">
        <div className='input-box'>
          <input
           type="password"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
           required
         />  
          <label for="password">
          Password
          </label>
        </div> 
        </div>
        <br/>
        <br/>
       
        <button type="submit">Continue</button>
        </div>

      </form>
      {error && <p>{error}</p>}

      <div className='login-option'>
        Already have an account?
      <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Registration;
