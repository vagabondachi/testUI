import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const VerifyEmail = () => {
  const [status, setStatus] = useState('');

  const user = useSelector((state) => state.user);

  const handleVerifyEmail = async () => {
    try {
      await user.sendEmailVerification();
      setStatus('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setStatus('Error sending verification email. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleVerifyEmail}>Verify Email</button>
      <p>{status}</p>
      <Logout />
    </div>
  );
};

export default VerifyEmail;
