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

  useEffect(() => {
    async function sendVerification() {
      try {
        await user.sendEmailVerification();
        setShowReload(true);
        setStatus(
          "We've sent you a link to confirm your email address.\nPlease check your inbox or spam folder."
        );
      } catch (error) {
        console.error(error);
        setStatus(
          'Error sending verification email. Click on resend verification email to try again.'
        );
      }
    }
    sendVerification();
  }, []);

  const handleVerifyEmail = async () => {
    setStatus('Sending verification email...');
    try {
      await user.sendEmailVerification();
      setShowReload(true);
      setStatus(
        'We sent you another verification email. Please check your inbox.'
      );
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
      <h1>You've Successfuly signed up!</h1>
      <p>{status}</p>
      <p>
        Did not receive?
        <a onClick={handleVerifyEmail} className="pointer">
          Resend email.
        </a>
      </p>
      <Logout />
    </div>
  );
};

export default VerifyEmail;