import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Login from './components/Login';
import Registration from './components/Registration';
import MainView from './components/MainView';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store/store';

const App = () => {
  useEffect(() => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyBAvguKI5lZZaGS9cx3UdAsRqkP57MlvHo',
      authDomain: 'weedle-470ae.firebaseapp.com',
      databaseURL:
        'https://weedle-470ae-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'weedle-470ae',
      storageBucket: 'weedle-470ae.appspot.com',
      messagingSenderId: '771482276211',
      appId: '1:771482276211:web:eb346d018899e9caa0f506',
      measurementId: 'G-5VH55E8VQK',
    };

    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      store.dispatch({ type: 'SET_USER', user: user });
    });
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
