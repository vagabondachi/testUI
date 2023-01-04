import React from 'react';
import firebase from 'firebase/app';

function Logout() {
  // Function to log out the user
  function handleLogout() {
    firebase.auth().signOut();
  }

  return <button onClick={handleLogout}>Log out</button>;
}

export default Logout;
