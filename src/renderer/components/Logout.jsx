import React from 'react';
import firebase from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import store from 'renderer/store/store';

function Logout() {
  const navigate = useNavigate();
  // Function to log out the user
  function handleLogout() {
    store.dispatch({ type: 'RESET_STATE' });
    firebase.auth().signOut();
    window.electron.ipcRenderer.sendMessage('on-logout');

  }

  return (
   <p id="item-category" onClick={handleLogout}>Log out</p>
  )
}

export default Logout;