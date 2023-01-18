import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logout from './Logout';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/blue.png';
import Logout from './Logout';

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
    <div className="containerVerification">
      <img src={logo} alt="logo-logo" id="logo-img"></img>
      <h1>You've successfuly signed up!</h1>
      <p>{status}</p>
      <p>
        Did not receive?
        <a onClick={handleVerifyEmail} className="pointer">
          Resend email.
        </a>
      </p>
      <div id="goback">
        <i class="ri-arrow-left-line" />
        <Logout />
      </div>
    </div>
  );
};

export default VerifyEmail;
