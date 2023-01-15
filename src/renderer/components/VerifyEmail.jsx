import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [status, setStatus] = useState('');
  const [showReload, setShowReload] = useState(false);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    setStatus('Sending verification email...');
    try {
      await user.sendEmailVerification();
      setShowReload(true);
      setStatus('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setStatus('Error sending verification email. Please try again.');
    }
  };

  const emailVerificationListener = () => {
    firebase
      .auth()
      .currentUser.reload()
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          navigate('/');
        } else {
          setStatus('Email not verified. Please check your inbox.');
        }
      });
  };

  return (
    <div>
      <button onClick={handleVerifyEmail}>Verify Email</button>
      <p>{status}</p>
      {showReload && (
        <button onClick={emailVerificationListener}>Check Verification</button>
      )}
      <Logout />
    </div>
  );
};

export default VerifyEmail;
