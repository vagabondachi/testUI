import React from 'react';
import firebase from 'firebase/app';

function Logout() {
  // Function to log out the user
  function handleLogout() {
    firebase.auth().signOut();
    window.electron.ipcRenderer.sendMessage('on-logout');
  }

  return (
    <button className="btn-logout" onClick={handleLogout}>
      Log out
    </button>
  );
}

export default Logout;
