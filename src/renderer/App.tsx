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
    const firebaseConfig = {
      apiKey: 'AIzaSyDsQ24yFVJB9kJ3XeKAga4-1lBv0x6Zctw',
      authDomain: 'fir-app-f33d1.firebaseapp.com',
      projectId: 'fir-app-f33d1',
      storageBucket: 'fir-app-f33d1.appspot.com',
      messagingSenderId: '491863644679',
      appId: '1:491863644679:web:1b736d3f0e7bebdf4b28a2',
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
